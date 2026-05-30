import "./Tutors.css";
import {useEffect, useState} from "react";

export default function Tutors() {
    const[tutors,setTutors] = useState([]);
    const[searchTerm, setSearchTerm] = useState("");
    const [tutorSubjects, setTutorSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("All Subjects");
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {

    fetch("http://127.0.0.1:8000/subjects/list/")
        .then(response => response.json())
        .then(data => {
            setSubjects(data);
        })
        .catch(error => {
            console.error(error);
        });

    }, []);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/tutors")
            .then(response=>response.json())
            .then(data=>{
                setTutors(data)
            })
            .catch(error=>{
                console.error(error);
            });

    }, []);

    useEffect(() => {

    fetch("http://127.0.0.1:8000/tutor-subjects/")
        .then(response => response.json())
        .then(data => {
            setTutorSubjects(data);
        })
        .catch(error => {
            console.error(error);
        });

    }, []);

    const filteredTutors = tutors.filter((tutor) => {

    const matchesName =
        `${tutor.first_name} ${tutor.last_name}`
            .toLowerCase()
            .includes(
                searchTerm.toLowerCase()
            );

    const tutorHasSubject =
        selectedSubject === "All Subjects" || tutorSubjects.some((subject) =>
                subject.tutor_id === tutor.tutor_id && subject.subject_name === selectedSubject
        );
    return (
        matchesName &&
        tutorHasSubject
    );
    });

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

                    <select className="subject-filter"
                            value={selectedSubject}
                            onChange={(e)=> setSelectedSubject(e.target.value)}>

                        <option>
                            All Subjects
                        </option>

                        {subjects.map((subject) => (
                            <option
                                key={subject.subject_id}
                                value={subject.subject_name}
                            >
                                {subject.subject_name}
                            </option>
                        ))}
                    </select>

                </div>

            </section>
            <section className="tutors-grid">

                {filteredTutors.map((tutor) => (
                    <div
                        key={tutor.tutor_id}
                        className="tutor-card"
                    >

                        <div className="tutor-photo-container">
                            <img
                                className="tutor-photo"
                                src={
                                    tutor.profile_image
                                        ? `http://127.0.0.1:8000${tutor.profile_image}`
                                        : "/default-profile.png"}
                                alt={`${tutor.first_name} ${tutor.last_name}`}
                            />
                        </div>

                        <h2>
                            {tutor.first_name}
                            {" "}
                            {tutor.last_name}
                        </h2>

                        <div className="subject-badges">
                            {tutorSubjects
                                .filter(
                                    subject=>
                                        subject.tutor_id === tutor.tutor_id)
                                .map(subject => (
                                    <span key ={
                                        subject.subject_id
                                    }
                                >
                                        {subject.subject_name}
                                    </span>
                                    )
                                )}
                        </div>

                        <p className="experience">
                            {tutor.experience} Years Experience
                        </p>

                        <p className="bio">
                            {tutor.tutor_bio}
                        </p>

                        <button className="book-btn">
                            Book Session
                        </button>

                    </div>
                ))}

            </section>
        </main>
    );
}