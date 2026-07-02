import "./Tutors.css";
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

export default function Tutors() {
    const[tutors,setTutors] = useState([]);
    const[searchTerm, setSearchTerm] = useState("");
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        fetch("https://eztutoring.onrender.com/tutors")
            .then(response=>response.json())
            .then(data=>{
                setTutors(data)
            })
            .catch(error=>{
                console.error(error);
            });

        fetch("https://eztutoring.onrender.com/settings/")
            .then(response => response.json())
            .then(data => setSettings(data));

    }, []);

    const filteredTutors = tutors.filter((tutor) => {
    return `${tutor.first_name} ${tutor.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });

    if (settings && !settings.show_tutors) {
        return <Navigate to="/" replace />;
}

    return (
        <main className="tutors-page">

            <section className="tutors-header">

                <h1>Meet Our Tutors</h1>
                <p>
                    Experienced educators dedicated to helping students
                    achieve academic success.
                </p>

                <div className="search-filter-container">

                    <input
                        type="text"
                        placeholder="Search tutors..."
                        className="search-bar"
                        value={searchTerm}
                        onChange={(e)=> setSearchTerm(e.target.value)}
                    />

                </div>

            </section>
            <section className="tutors-grid">

                {filteredTutors.map((tutor) => (
                    <div
                        key={tutor.tutor_id}
                        className="tutor-card"
                    >

                        <div className="tutor-photo-container">
                            {tutor.profile_image ? (
                                <img
                                    className="tutor-photo"
                                    src={
                                        tutor.profile_image.startsWith("http")
                                            ? tutor.profile_image
                                            : `https://eztutoring.onrender.com${tutor.profile_image}`
                                    }
                                    alt={`${tutor.first_name} ${tutor.last_name}`}
                                />
                            ) : (
                                <div className="tutor-photo-placeholder">
                                    ?
                                </div>
                            )}

                        </div>

                        <h2>
                            {tutor.first_name}
                            {" "}
                            {tutor.last_name}
                        </h2>

                        <p className="experience">
                            {tutor.experience} Years Experience
                        </p>

                        <p className="bio">
                            {tutor.tutor_bio}
                        </p>
                    </div>
                ))}

            </section>
        </main>
    );
}