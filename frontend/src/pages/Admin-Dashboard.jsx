import "./AdminDashboard.css";
import {useState, useEffect} from "react";
import API_URL from "../utils/api.js";

export default function AdminDashboard() {

    const [users, setUsers] = useState([]);
    const [tutors, setTutors] = useState([]);
    const [userSearch, setUserSearch] = useState("");
    const [messages, setMessages] = useState([]);
    const [messageSearch, setMessageSearch] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [tutorSearch, setTutorSearch] = useState("");
    const [activeTab, setActiveTab] = useState("tutors");
    const [editingTutor, setEditingTutor] = useState(null);
    const [creatingTutor, setCreatingTutor] = useState(null);
    const [mailFilter, setMailFilter] = useState("new");
    const [sortOrder, setSortOrder] = useState("newest");
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [settings, setSettings] = useState({});

    useEffect(() => {

    const token = localStorage.getItem("token");

    fetch(`${API_URL}/admin/users/`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }})
    .then(async response => {
        if(response.status === 401){
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }
        return response.json();})
    .then(data => {if(data){setUsers(data);}})
    .catch(error => console.error(error));

    fetch(`${API_URL}/tutors/`)
        .then(response => response.json())
        .then(data => setTutors(data))
        .catch(error => console.error(error));

    fetch(`${API_URL}/contact-messages/search/all/`)
        .then(response => response.json())
        .then(data => setMessages(data))
        .catch(error => console.error(error));

    fetch(`${API_URL}/settings/`)
    .then(response => response.json())
    .then(data => setSettings(data))
    .catch(error => console.error(error));

}, []);

    const handleDeleteUser = async (userId) => {
        const token = localStorage.getItem("token");
        console.log("TOKEN:" , token)

        if(!window.confirm("Delete user?")) {
            return;
        }

        try {
            const response = await fetch(
                        `${API_URL}/users/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("User not deleted");
            }

            setUsers(
                users.filter(
                    user => user.user_id !== userId
                )
            );
        } catch (error){
            console.error(error);
            alert("Cannot delete user");
        }
    }

    const filteredTutors = tutors.filter((tutor) =>
    `${tutor.first_name} ${tutor.last_name}`
        .toLowerCase()
        .includes(tutorSearch.toLowerCase())
    )

    const filteredUsers = users.filter((user) =>
        `${user.first_name} ${user.last_name} ${user.email}`
            .toLowerCase()
            .includes(userSearch.toLowerCase())
    )

    const handleDeleteTutor = async (tutorId) => {
        const token = localStorage.getItem("token");

        if(!window.confirm("Delete Tutor?")){return}

        try{
            const response = await fetch(`${API_URL}/admin/tutors/${tutorId}/`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            if (!response.ok){throw new Error("Delete failed");}

            setTutors(tutors.filter(
                tutor => tutor.tutor_id !== tutorId
            ));
        } catch(error){
            console.error(error);
            alert("Cannot delete tutor");
        }}

    const handleUpdateTutor = async () => {

    try {

        const response = await fetch(
            `${API_URL}/tutors/`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editingTutor)
            }
        );

        if (!response.ok) {
            throw new Error("Update failed");
        }

        const updatedTutor = await response.json();

        if (selectedImage) {

            const formData = new FormData();
            formData.append("file", selectedImage);

            await fetch(`${API_URL}/tutors/profile_image?tutor_id=${editingTutor.tutor_id}`,
            {
                method: "PUT",
                body: formData
            }
            );
            window.location.reload();

        }

        setTutors(
            tutors.map((tutor) =>
                tutor.tutor_id === updatedTutor.tutor_id
                    ? updatedTutor
                    : tutor
            )
        );

        setEditingTutor(null);
        setSelectedImage(null);

    } catch (error) {
        console.error(error);
        alert("Unable to update tutor");
    }
};

    const handleCreateTutor = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
                `${API_URL}/admin/tutors/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(creatingTutor)
            }
        );

        if (!response.ok) {
            throw new Error("Create failed");
        }

        const newTutor = await response.json();

        setTutors([...tutors, newTutor]);

        setCreatingTutor(null);

    } catch (error) {
        console.error(error);
        alert("Unable to create tutor");
    }
};

    const handleViewMessage = async (message) => {

    setSelectedMessage(message);

    try {
        await fetch(`${API_URL}/contact-messages/${message.message_id}/is-read/`,
            {
                method: "PUT"
            }
        );

        setMessages(
            messages.map((m) =>
                m.message_id === message.message_id
                    ? { ...m, is_read: true }
                    : m
            )
        );

    } catch (error) {
        console.error(error);
    }
};

    const filteredMessages = messages
    .filter((message) => {

        const matchesSearch =
            `${message.full_name} ${message.email} ${message.message}`
                .toLowerCase()
                .includes(messageSearch.toLowerCase());

        if (!matchesSearch) {
            return false;
        }

        if (mailFilter === "inbox") {
            return true;
        }

        if (mailFilter === "unread") {
            return !message.is_read;
        }

        if (mailFilter === "read") {
            return message.is_read;
        }

        return message.status === mailFilter;
    })
    .sort((a, b) => {

        if (sortOrder === "oldest") {
            return new Date(a.created_at) - new Date(b.created_at);
        }

        return new Date(b.created_at) - new Date(a.created_at);
    });

    const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedMessages.length} message(s)?`)) {
        return;
    }

    try {
        await Promise.all(
            selectedMessages.map((messageId) =>
                fetch(`${API_URL}/contact-messages/${messageId}`,
                    {
                        method: "DELETE"
                    }
                )
            )
        );

        setMessages(
            messages.filter(
                (message) =>
                    !selectedMessages.includes(message.message_id)
            )
        );

        setSelectedMessages([]);
        setSelectedMessage(null);

    } catch (error) {
        console.error(error);
        alert("Unable to delete selected messages");
    }
};
    const handleSettingChange = async (settingName, value) => {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(
            `${API_URL}/settings/`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    setting_name: settingName,
                    setting_value: value
                })
            }
        );

        if (!response.ok) {
            throw new Error("Unable to update setting");
        }

        setSettings({
            ...settings,
            [settingName]: value
        });

    } catch (error) {
        console.error(error);
        alert("Unable to save setting.");
    }
};

    return (
        <main className="dashboard-page">

            <h1>Admin Dashboard</h1>

            <nav className="admin-nav">

                <button
                    className={activeTab === "tutors" ? "active-tab" : ""}
                    onClick={() => setActiveTab("tutors")}
                >
                    Tutors
                </button>

                <button
                    className={activeTab === "users" ? "active-tab" : ""}
                    onClick={() => setActiveTab("users")}
                >
                    Users
                </button>

                <button
                    className={activeTab === "inbox" ? "active-tab" : ""}
                    onClick={() => setActiveTab("inbox")}
                    >
                    Inbox
                </button>

                <button
                    className={activeTab === "settings" ? "active-tab" : ""}
                    onClick={() => setActiveTab("settings")}
                >
                    Website
                </button>

            </nav>

            {activeTab === "tutors" && (
                <>
                    <div className="tutor-search-container">
                        <input
                            className="admin-input"
                            type="text"
                            placeholder="Search Tutor"
                            value={tutorSearch}
                            onChange={(e) =>
                                setTutorSearch(e.target.value)
                            }/>

                        <button
                            className="create-tutor-btn"
                            onClick={() =>
                                setCreatingTutor({
                                    first_name: "",
                                    last_name: "",
                                    tutor_bio: "",
                                    experience: 0
                                })
                            }
                        >
                            + Create Tutor
                        </button>
                    </div>

                    <section className="tutors-grid">
                        {filteredTutors.map((tutor) => (
                            <div key={tutor.tutor_id} className="dashboard-card">
                                {tutor.profile_image ? (
                                <img
                                    className="admin-tutor-image"
                                    src={tutor.profile_image}
                                    alt={`${tutor.first_name} ${tutor.last_name}`}
                                />
                            ) : (
                                <div className="admin-tutor-placeholder">
                                    ?
                                </div>
                            )}

                                <h2>{tutor.first_name} {tutor.last_name}</h2>

                                <p><strong>Experience:</strong> {tutor.experience} Years</p>
                                <p>{tutor.tutor_bio}</p>

                                <button
                                    className="admin-action-btn"
                                    onClick={() => setEditingTutor(tutor)}
                                >Edit Tutor</button>

                                <button
                                    className="admin-delete-btn"
                                    onClick={() => handleDeleteTutor(tutor.tutor_id)}
                                > Delete Tutor</button>

                            </div>
                        ))}
                    </section>
                </>
            )}

            {activeTab === "users" && (
                <>
                    <div className="tutor-search-container">
                        <input
                            className="admin-input"
                            type="text"
                            placeholder="Search User"
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                        />
                    </div>

                    <section className="dashboard-grid">
                        {filteredUsers.length === 0 ? (
                            <div className="dashboard-card">
                                <h2>No Users Found</h2>
                            </div>
                        ) : (
                            filteredUsers.map((user) => (
                                <div
                                    key={user.user_id}
                                    className="dashboard-card"
                                >
                                    <h2>{user.first_name} {user.last_name}</h2>

                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>User ID:</strong> {user.user_id}</p>

                                    <button
                                        className="admin-delete-btn"
                                        onClick={() => handleDeleteUser(user.user_id)}
                                    >
                                        Delete User
                                    </button>
                                </div>
                            ))
                        )}
                    </section>
                </>
            )}

            {activeTab === "inbox" && (
                <div className="inbox-page">

                    <div className="mail-sidebar">

                        <button
                            className={mailFilter === "inbox" ? "active-mail-filter" : ""}
                            onClick={() => {
                                setMailFilter("inbox");
                                setSelectedMessage(null);
                            }}
                        >
                            Inbox
                        </button>

                        <button
                            className={mailFilter === "unread" ? "active-mail-filter" : ""}
                            onClick={() => {
                                setMailFilter("unread");
                                setSelectedMessage(null);
                            }}
                        >
                            Unread
                        </button>

                        <button
                            className={mailFilter === "read" ? "active-mail-filter" : ""}
                            onClick={() => {
                                setMailFilter("read");
                                setSelectedMessage(null);
                            }}
                        >
                            Read
                        </button>

                        <button
                            className={mailFilter === "contacted" ? "active-mail-filter" : ""}
                            onClick={() => {
                                setMailFilter("contacted");
                                setSelectedMessage(null);
                            }}
                        >
                            Contacted
                        </button>

                        <button
                            className={mailFilter === "closed" ? "active-mail-filter" : ""}
                            onClick={() => {
                                setMailFilter("closed");
                                setSelectedMessage(null);
                            }}
                        >
                            Closed
                        </button>

                    </div>

                    <div className="mail-main">
                        {!selectedMessage ? (
                            <>
                                <div className="mail-header">
                                    <input
                                        className="mail-search"
                                        type="text"
                                        placeholder="Search emails..."
                                        value={messageSearch}
                                        onChange={(e) => setMessageSearch(e.target.value)}
                                    />

                                    <button
                                        className="mail-sort-btn"
                                        onClick={() =>
                                            setSortOrder(
                                                sortOrder === "newest"
                                                    ? "oldest"
                                                    : "newest"
                                            )
                                        }
                                    >
                                        {sortOrder === "newest"
                                            ? "Newest ↓"
                                            : "Oldest ↑"}
                                    </button>

                                    {selectedMessages.length > 0 && (
                                        <button
                                            className="bulk-delete-btn"
                                            onClick={handleBulkDelete}
                                        >
                                            Delete ({selectedMessages.length})
                                        </button>
                                    )}

                                </div>


                                {filteredMessages.map((message) => (
                                    <div
                                        key={message.message_id}
                                        className="mail-row"
                                    >

                                        <input
                                            type="checkbox"
                                            checked={selectedMessages.includes(message.message_id)}
                                            onChange={(e) => {

                                                e.stopPropagation();

                                                if (selectedMessages.includes(message.message_id)) {

                                                    setSelectedMessages(
                                                        selectedMessages.filter(
                                                            id => id !== message.message_id
                                                        )
                                                    );

                                                } else {

                                                    setSelectedMessages([
                                                        ...selectedMessages,
                                                        message.message_id
                                                    ]);

                                                }
                                            }}
                                        />

                                        <div
                                            className="mail-row-content"
                                            onClick={() => handleViewMessage(message)}
                                        >

                                            <div className="mail-name">
                                                {message.full_name}
                                            </div>

                                            <div className="mail-email">
                                                {message.email}
                                            </div>

                                            <div className="mail-preview">
                                                {message.message.substring(0, 100)}
                                            </div>

                                        </div>

                                    </div>

                                ))}
                            </>
                        ) : (

                            <div className="email-view">

                                <button
                                    className="back-btn"
                                    onClick={() => setSelectedMessage(null)}
                                >
                                    ← Back
                                </button>

                                <h2>{selectedMessage.full_name}</h2>

                                <p>
                                    <strong>Email:</strong>{" "}
                                    {selectedMessage.email}
                                </p>

                                <p>
                                    <strong>Phone:</strong>{" "}
                                    {selectedMessage.phone}
                                </p>

                                <p>
                                    <strong>Interest:</strong>{" "}
                                    {selectedMessage.interests}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {selectedMessage.status}
                                </p>

                                <hr />

                                <p className="message-body">
                                    {selectedMessage.message}
                                </p>

                                <button
                                    className="admin-delete-btn"
                                    onClick={() =>
                                        handleDeleteMessage(
                                            selectedMessage.message_id
                                        )
                                    }
                                >
                                    Delete Message
                                </button>

                            </div>

                        )}

                    </div>

                </div>
            )}

            {activeTab === "settings" && (

            <section className="dashboard-grid">
                <div className="dashboard-card">
                    <h2>Website Settings</h2>
                    <label className="setting-row">

                        <input
                            type="checkbox"
                            checked={settings.show_tutors ?? true}
                            onChange={(e) =>
                                handleSettingChange(
                                    "show_tutors",
                                    e.target.checked
                                )
                            }
                        />
                        Show Tutors Page
                    </label>
                </div>
            </section>
            )}

            {editingTutor && (
    <div className="modal-overlay">
        <div className="modal-content">

            <h2>Edit Tutor</h2>

            <input
                type="text"
                value={editingTutor.first_name}
                onChange={(e) =>
                    setEditingTutor({
                        ...editingTutor,
                        first_name: e.target.value
                    })
                }
            />

            <input
                type="text"
                value={editingTutor.last_name}
                onChange={(e) =>
                    setEditingTutor({
                        ...editingTutor,
                        last_name: e.target.value
                    })
                }
            />

            <textarea
                rows="5"
                value={editingTutor.tutor_bio}
                onChange={(e) =>
                    setEditingTutor({
                        ...editingTutor,
                        tutor_bio: e.target.value
                    })
                }
            />

            <input
                type="number"
                value={editingTutor.experience}
                onChange={(e) =>
                    setEditingTutor({
                        ...editingTutor,
                        experience: Number(e.target.value)
                    })
                }
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
            />

            <div className="modal-buttons">
                <button className="admin-action-btn" onClick={handleUpdateTutor}>
                    Save Changes
                </button>
                <button
                    className="admin-delete-btn"
                    onClick={() => setEditingTutor(null)}>
                    Cancel
                </button>
            </div>

        </div>
    </div>
)}
            {creatingTutor && (
    <div className="modal-overlay">
        <div className="modal-content">

            <h2>Create Tutor</h2>

            <input
                type="text"
                value={creatingTutor.first_name}
                placeholder="First Name"
                onChange={(e) =>
                    setCreatingTutor({
                        ...creatingTutor,
                        first_name: e.target.value
                    })
                }
            />

            <input
                type="text"
                placeholder="Last Name"
                value={creatingTutor.last_name}
                onChange={(e) =>
                    setCreatingTutor({
                        ...creatingTutor,
                        last_name: e.target.value
                    })
                }
            />

            <textarea
                rows="5"
                placeholder="Insert description"
                value={creatingTutor.tutor_bio}
                onChange={(e) =>
                    setCreatingTutor({
                        ...creatingTutor,
                        tutor_bio: e.target.value
                    })
                }
            />

            <input
                type="number"
                placeholder="Experience"
                value={creatingTutor.experience}
                onChange={(e) =>
                    setCreatingTutor({
                        ...creatingTutor,
                        experience: Number(e.target.value)
                    })
                }
            />

            <div className="modal-buttons">
                <button className="admin-action-btn" onClick={handleCreateTutor}>
                    Create Tutor
                </button>
                <button
                    className="admin-delete-btn"
                    onClick={() => setCreatingTutor(null)}>
                    Cancel
                </button>
            </div>

        </div>
    </div>
)}

        </main>
    );
}