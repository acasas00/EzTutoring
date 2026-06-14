import "./AdminDashboard.css";
import {useState, useEffect, use} from "react";

export default function AdminDashboard() {

    const [activeTab, setActiveTab] = useState("overview");
    const [users, setUsers] = useState([]);
    const [tutors, setTutors] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState("");
    const [bookings, setBookings] = useState([]);
    const [newTutorEmail, setNewTutorEmail] = useState("");
    const [newTutorBio, setNewTutorBio] = useState("");
    const [newTutorExperience, setNewTutorExperience] = useState("");
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [selectedUserBookings, setSelectedUserBookings] = useState([]);
    const [selectedUserName, setSelectedUserName] = useState("")
    const [userSearch, setUserSearch] = useState("");
    const [tutorSearch, setTutorSearch] = useState("");

   const pendingBookings = Array.isArray(bookings)
    ? bookings.filter(
        booking => booking.status === "pending"
      )
    : [];
    const acceptedBookings = Array.isArray(bookings)
    ? bookings.filter(
        booking => booking.status === "accepted"
      )
    : [];

    const [currentMonth, setCurrentMonth] =  useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {

    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/admin/users",
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

    fetch("http://127.0.0.1:8000/tutors/")
        .then(response => response.json())
        .then(data => setTutors(data))
        .catch(error => console.error(error));

    fetch("http://127.0.0.1:8000/subjects/list")
        .then(response => response.json())
        .then(data => setSubjects(data))
        .catch(error => console.error(error));

    fetch("http://127.0.0.1:8000/admin/bookings",{
        headers: {Authorization: `Bearer ${token}`}})
    .then(async response => {
        if(response.status === 401){
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }
        return response.json();})
    .then(data => {if(data){setBookings(data);}})
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
                 `http://127.0.0.1:8000/users/${userId}`,
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

    const handleCreateSubject = async () => {
        const token = localStorage.getItem("token");

        if (!newSubject.trim()) {
            alert("Enter Subject Name");
            return;
        }

        try{
            const response = await fetch(
                "http://127.0.0.1:8000/admin/subjects",
                {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(
                        {subject_name: newSubject}
                    )
                }
            );

            if (!response.ok) {
                throw new Error("Subject not created")
            }

            const createdSubject = await response.json();

            setSubjects([
                ...subjects,
                createdSubject
            ]);

            setNewSubject("");
        } catch( error){
            console.error(error);
            alert("Unable to create subject");
        }
    }

    const handleDeleteSubject = async (subjectId) => {
        const token = localStorage.getItem("token");

        if (!window.confirm("Delete Subject?")){
            return;
        }

        try{
             const response = await fetch(
                 `http://127.0.0.1:8000/admin/subjects/${subjectId}`,
                 {
                     method: "DELETE",
                     headers: {
                         Authorization: `Bearer ${token}`
                     }
                 }
             );

             if (!response.ok){
                 throw new Error("Delete failed");
             }

             setSubjects(
                 subjects.filter(
                     subject => subject.subject_id !== subjectId
                 )
             );
        } catch (error) {
            console.log(error);
            alert("Unable to delete subject");
        }
    }

    const handleViewUserBookings = async (user) =>{
        try{
            const response = await fetch(`http://127.0.0.1:8000/bookings/tutor_bookings/${user.user_id}`);
            if (!response.ok){
                throw new Error("Failed to display bookings");
            }

            const data = await response.json();
            setSelectedUserBookings(data);
            setSelectedUserName(`${user.first_name} ${user.last_name}`);
            setShowHistoryModal(true);

        }catch(error){
            console.error(error);
            alert("Booking history not loaded");
        }
    }

    const clients = Array.isArray(users)
    ? users.filter(user => user.role === "client")
    : [];

    const tutorsCheck = Array.isArray(users)
    ? users.filter(user => user.role === "tutor")
    : [];

    const adminCheck = Array.isArray(users)
    ? users.filter(user => user.role === "admin")
    : [];

    const previousMonth = () => {
        setCurrentMonth(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth()-1,
                1
            )
        )
    };

    const nextMonth = () => {
        setCurrentMonth(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() +1,
                1
            )
        )
    };

    const firstDay = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    );

    const lastDay = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() +1,
        0
    );

    const daysInMonth = lastDay.getDate();
    const calendarDays = [];
    const startingDay = firstDay.getDay();

    for(let i =0; i < startingDay; i++){
        calendarDays.push(null)
    }

    for(let day =1; day<= daysInMonth; day++){
        calendarDays.push(
            new Date(currentMonth.getFullYear(), currentMonth. getMonth(), day)
        );
    }

    const selectedBookings = Array.isArray(bookings)
    ? bookings.filter(
        booking =>
            new Date(booking.start_time).toDateString() ===
            selectedDate.toDateString()
      )
    : [];

    const handleBookingStatus = async(
        bookingId, status) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://127.0.0.1:8000/bookings/${bookingId}/status?status=${status}`,
                {
                    method: "PUT",
                    headers: {Authorization: `Bearer ${token}`}
                });

            if (!response.ok) {
                throw new Error("Failed status update")
            }

            setBookings(
                bookings.map((booking) =>
                    booking.booking_id === bookingId ? {
                        ...booking, status: status
                    } : booking)
            );
        } catch (error) {
            console.error(error);
            alert("Unable to update booking");
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
            const response = await fetch(`http://127.0.0.1:8000/admin/tutors/${tutorId}`,
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

    return (
        <main className="dashboard-page">

            <h1>Admin Dashboard</h1>

            <nav className="admin-nav">

                <button
                    className={activeTab === "overview" ? "active-tab" : ""}
                    onClick={() => setActiveTab("overview")}
                >
                    Overview
                </button>

                <button
                    className={activeTab === "bookings" ? "active-tab" : ""}
                    onClick={() => setActiveTab("bookings")}
                >
                    Bookings
                </button>

                <button
                    className={activeTab === "tutors" ? "active-tab" : ""}
                    onClick={() => setActiveTab("tutors")}
                >
                    Tutors
                </button>

                <button
                    className={activeTab === "subjects" ? "active-tab" : ""}
                    onClick={() => setActiveTab("subjects")}
                >
                    Subjects
                </button>

                <button
                    className={activeTab === "users" ? "active-tab" : ""}
                    onClick={() => setActiveTab("users")}
                >
                    Users
                </button>

            </nav>

            {activeTab === "overview" && (
                <section className="dashboard-grid">

                    <div className="dashboard-card">
                        <h2>Total Users</h2>
                        <p className="stat-number">
                            {clients.length}
                        </p>
                    </div>

                    <div className ="dashboard-card">
                        <h2> Total Tutors</h2>
                        <p className="stat-number">
                            {tutorsCheck.length}
                        </p>
                    </div>

                    <div className="dashboard-card">
                        <h2>Total Admins</h2>
                        <p className="stat-number">
                            {adminCheck.length}
                        </p>
                    </div>

                    <div className="dashboard-card">
                        <h2>Total Subjects</h2>
                        <p className="stat-number">
                            {subjects.length}
                        </p>
                    </div>
                </section>
            )}

            {activeTab === "bookings" && (
                <section className="calendar-layout">
                    <div className="booking-sidebar">
                        <h2>
                            {selectedDate.toLocaleDateString()}
                        </h2>

                        {selectedBookings.length === 0 ? (
                            <p>No bookings.</p>
                        ) : (
                            selectedBookings.map((booking) => (
                                <div key={booking.booking_id} className="dashboard-card">
                                    <h3>
                                        {booking.client_first_name}
                                        {" "}
                                        {booking.client_last_name}
                                    </h3>

                                    <p>
                                        Subject: {booking.subject_name}
                                    </p>

                                    <p>
                                        Tutor: {booking.tutor_first_name}
                                        {" "}
                                        {booking.tutor_last_name}
                                    </p>

                                    <p>
                                        Status: {booking.status}
                                    </p>

                                    <p>
                                        {new Date(
                                            booking.start_time
                                        ).toLocaleTimeString()}
                                    </p>

                                    <p>
                                        Notes: {booking.notes}
                                    </p>

                                    {booking.status === "pending" ? (
                                        <span className="status-badge pending">
                                            Pending
                                        </span>
                                    ) : booking.status === "confirmed" ? (
                                        <span className="status-badge accepted">
                                            Confirmed
                                        </span>
                                    ) : (
                                        <span className="status-badge rejected">
                                            Rejected
                                        </span>
                                    )}

                                    {booking.status === "pending" && (
                                    <div className="booking-actions">
                                        <button className="approve-btn"
                                        onClick={() =>
                                            handleBookingStatus(booking.booking_id, "confirmed")}>
                                            Approve
                                        </button>
                                        <button className="reject-btn"
                                        onClick={() =>
                                            handleBookingStatus(booking.booking_id, "rejected")}>
                                            Reject
                                        </button>
                                    </div>
                                        )}
                                </div>

                            ))
                        )}

                    </div>
                    <div className="calendar-panel">
                        <div className="calendar-header">
                            <button onClick={previousMonth}>
                                ←
                            </button>

                            <h2>
                                {currentMonth.toLocaleString(
                                    "default",
                                    {
                                        month: "long",
                                        year: "numeric"
                                    }
                                )}
                            </h2>

                            <button onClick={nextMonth}>
                                →
                            </button>

                        </div>

                        <div className="calendar-grid">
                            <>
                                <div className="calendar-weekday">Sun</div>
                                <div className="calendar-weekday">Mon</div>
                                <div className="calendar-weekday">Tue</div>
                                <div className="calendar-weekday">Wed</div>
                                <div className="calendar-weekday">Thu</div>
                                <div className="calendar-weekday">Fri</div>
                                <div className="calendar-weekday">Sat</div>
                            </>
                            {calendarDays.map((day, index) => {
                                if(!day){
                                    return(
                                        <div key={index}
                                             className="calendar-empty"/>
                                    );
                                }

                                const dayBookings = bookings.filter(
                                    booking =>
                                        new Date(booking.start_time).toDateString() === day.toDateString()
                                );

                                const pendingCount = dayBookings.filter(
                                    booking => booking.status === "pending"
                                ).length;

                                const confirmedCount = dayBookings.filter(
                                    booking => booking.status === "confirmed"
                                ).length;

                                const isPast =
                                    day < new Date(
                                        new Date().setHours(0,0,0,0)
                                    );

                                let dayClass = "calendar-day";

                                if(isPast){
                                    dayClass += " past-day";
                                }
                                else if(pendingCount >0){
                                    dayClass += " pending-day";
                                }
                                else if(confirmedCount > 0){
                                    dayClass +=" accepted-day";
                                }


                                return (
                                    <div
                                        key={day.toISOString()}
                                        className={dayClass}
                                        onClick={() => setSelectedDate(day)}
                                    >
                                        <div className="calendar-date">
                                            {day.getDate()}
                                        </div>
                                        {dayBookings.length > 0 && (
                                            <div className="booking-indicator">
                                                {dayBookings.length}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

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
                            }/></div>

                    <section className="tutors-grid">
                        {filteredTutors.map((tutor) => (
                            <div key={tutor.tutor_id} className="dashboard-card">
                                <h2>{tutor.first_name} {tutor.last_name}</h2>
                                <p><strong>Email:</strong> {tutor.email}</p>
                                <p><strong>Experience:</strong> {tutor.experience}</p>
                                <p>{tutor.tutor_bio}</p>

                                <button
                                    className="admin-delete-btn" onClick={() => handleDeleteTutor(tutor.tutor_id)}
                                >
                                    Delete Tutor
                                </button>
                                <button
                                    className="view-availability-btn" onClick={() => handleViewAvailability(tutor)}
                                    >
                                    View Availability
                                </button>
                            </div>
                        ))}
                    </section>
                </>
            )}

            {activeTab === "subjects" && (
                <section className="dashboard-grid">
                    <div className="dashboard-card">
                        <h2>Add Subject</h2>
                        <input
                            className="admin-input"
                            type="text"
                            value={newSubject}
                            onChange={(e) =>
                            setNewSubject(e.target.value)
                            }
                            placeholder="Subject Name"
                        />

                        <button
                            className="admin-action-btn"
                            onClick={handleCreateSubject}
                        >
                            Add Subject
                        </button>

                    </div>

                    {subjects.map((subject) => (

                        <div key={subject.subject_id} className="dashboard-card">
                            <h2>{subject.subject_name}</h2>
                            <p>Subject ID: {subject.subject_id}</p>
                            <button
                                className="admin-delete-btn"
                                onClick={() =>
                                    handleDeleteSubject(
                                        subject.subject_id
                                    )}>
                                Delete Subject
                            </button>
                        </div>
                    ))}
                </section>)})

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
                                    <p><strong>Phone:</strong> {user.phone_number}</p>
                                    <p><strong>User ID:</strong> {user.user_id}</p>

                                    <button
                                        className="admin-action-btn"
                                        onClick={() => handleViewUserBookings(user)}
                                    >
                                        View History
                                    </button>

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

             {showHistoryModal && (
            <div className="modal-overlay">

                <div className="modal-content">

                    <button
                        className="modal-close"
                        onClick={() => setShowHistoryModal(false)}
                    >✕
                    </button>

                    <h2>{selectedUserName} Booking History</h2>

                    {selectedUserBookings.length === 0 ? (<p>No bookings found.</p>) :
                        (selectedUserBookings.map((booking) => (<div key={booking.booking_id} className="history-item">
                                <p><strong>Booking ID:</strong>{" "}{booking.booking_id}</p>
                                <p><strong>Status:</strong>{" "}{booking.status}</p>
                                <p><strong>Start:</strong>{" "}{new Date(booking.start_time).toLocaleString()}</p>
                                <p><strong>Notes:</strong>{" "}{booking.notes}</p>
                            </div>
                        )))}
                </div>
            </div>
        )}

        </main>
    );
}