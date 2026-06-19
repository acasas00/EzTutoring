{/*
import "./Bookings.css";
import {useEffect, useState} from "react";
import {getCurrentUser} from "../utils/auth.js";
import { useNavigate, useLocation } from "react-router-dom";


export default function Bookings() {
    const[tutors, setTutors] = useState([]);
    const [selectedDate, setSelectedDate] = useState("")
    const [durationHours, setDurationHours] = useState(1);
    const[selectedTutor, setSelectedTutor] = useState("");
    const[slots, setSlots] = useState([]);
    const selectedTutorInfo = tutors.find(tutor => tutor.tutor_id === Number(selectedTutor));
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [sessionType, setSessionType] = useState("InPerson");
    const [notes, setNotes] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [tutorSubjects, setTutorSubjects] = useState([]);
    const currentUser = getCurrentUser();
    const navigate = useNavigate();
    const location = useLocation()

    const filteredTutors = tutors.filter((tutor) =>
        tutorSubjects.some(
            (ts) =>
                ts.tutor_id === tutor.tutor_id &&
                ts.subject_id === Number(selectedSubject)
        )
    );

    const handleBooking =async() =>{
        const token = localStorage.getItem("token");
        if(!token) {
            alert("Login Required");
            navigate(
                "/login",
                {
                    state:{
                        redirectTo: location.pathname
                    }
                }
            );
            return;
        }

        if(!selectedTutor){
            alert("Select a tutor");
            return;
        }

        if(!selectedSlot){
            alert("Select a slot");
            return;
        }

        const bookingData = {
            tutor_id: Number(selectedTutor),
            client_id: currentUser.user_id,
            start_time: selectedSlot.start_time,
            end_time: selectedSlot.end_time,
            subject_id: Number(selectedSubject),
            session_type: sessionType,
            status: "Pending",
            meeting_link: null,
            notes: notes
        };

        try{
            const response = await fetch(
                "http://127.0.0.1:8000/bookings/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bookingData)
                }
            );

            const data = await response.json();
            console.log(data);
            alert("Booking request submitted");

            localStorage.setItem(
                "token",
                data.access_token
            );
        } catch (error){
            console.error(error);
            alert("Booking failed.");
        }
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/tutors/")
            .then(response => response.json())
            .then(data=> {
                setTutors(data);
            })
            .catch(error=> {
                console.error(error)
            });
    }, []);

    useEffect(() => {

        if (
            selectedTutor === "" ||
            selectedDate === "")
        {return;}

        fetch(
            `http://127.0.0.1:8000/availability/slots?tutor_id=${selectedTutor}&selected_date=${selectedDate}&duration_hours=${durationHours}`
        )
            .then(response => response.json())
            .then(data =>
            {console.log("SLOTS", data)
                setSlots(data);
            })
            .catch(error => {console.error(error);});
        }, [selectedTutor, selectedDate, durationHours]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/subjects/list")
            .then(response=> response.json())
            .then(data => {
                setSubjects(data);
            })
            .catch(error => {
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

    return (
        <main className="booking-page">

            <section className="booking-header">
                <h1>Book a Session</h1>

                <p>
                    Select a tutor, choose a time, and request a tutoring session.
                </p>
            </section>

            <section className="booking-container">

                <div className="booking-tutor-panel">

                    {
                        selectedTutorInfo && (
                            <img
                                className="booking-tutor-photo"
                                src={
                                selectedTutorInfo.profile_image
                                    ?`http://127.0.0.1:8000${selectedTutorInfo.profile_image}`
                                    : "/default-profile.png"
                                }
                                alt="Tutor"
                                />
                        )
                    }

                    <h2>{
                        selectedTutorInfo?`${selectedTutorInfo.first_name} ${selectedTutorInfo.last_name}`
                            : "Select a Tutor"
                    }</h2>

                    <div className="booking-subjects">
                        <span>Calculus</span>
                        <span>Physics</span>
                    </div>

                    <p className="booking-experience">
                        3 Years Experience
                    </p>

                    <p className="booking-bio">
                        Experienced tutor dedicated to helping students
                        achieve academic success.
                    </p>

                </div>

                <div className="booking-form-panel">

                    <div className="booking-group">

                        <div className="booking-group">
                            <label>
                                Select Subject
                                <select
                                    value={selectedSubject}
                                    onChange={(e)=> {
                                        setSelectedSubject(e.target.value);
                                        setSelectedTutor("");
                                        setSelectedSlot(null);
                                    }}>
                                    <option value="">
                                        Select Subject
                                    </option>

                                    {subjects.map((subject) => (
                                        <option
                                        key={subject.subject_id}
                                        value={subject.subject_id}
                                        >
                                            {subject.subject_name}
                                        </option>
                                    ))}
                                </select>

                            </label>
                        </div>

                        <label>Select Tutor</label>

                        <select value = {selectedTutor}
                                disabled={!selectedSubject}
                                onChange={(e)=> setSelectedTutor(e.target.value)}>
                            <option value="">
                                Select Tutor
                            </option>
                            {filteredTutors.map((tutor) => (
                                <option
                                    key={tutor.tutor_id}
                                    value={tutor.tutor_id}
                                >
                                    {tutor.first_name} {tutor.last_name}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="booking-group">

                        <label>Select Date</label>

                        <input type="date"
                               value={selectedDate}
                               onChange={(e)=>setSelectedDate(e.target.value)}
                        />

                    </div>

                    <div className="booking-group">

                        <label>Session Length</label>

                        <div className="duration-buttons">

                            <button
                                type="button"
                                className={
                                durationHours === 1 ? "selected-option" : ""
                                }
                                onClick={() => setDurationHours(1)}>
                                1 Hour
                            </button>

                            <button
                                type="button"
                                className={
                                durationHours ===2
                                    ? "selected-option"
                                    : ""
                                }
                                    onClick={() => setDurationHours(2)}>
                                2 Hours
                            </button>

                        </div>

                    </div>

                    <div className="booking-group">

                        <label>Available Times</label>

                        <div className="time-slots">
                            {slots.map((slot) => (
                                <button
                                    key={slot.start_time}
                                    type="button"
                                    className={
                                    selectedSlot?.start_time === slot.start_time
                                        ? "selected-option"
                                        : ""
                                    }
                                    onClick={()=> setSelectedSlot(slot)}
                                    >
                                        {new Date(slot.start_time)
                                            .toLocaleTimeString([], {
                                                hour: "numeric",
                                                minute: "2-digit"
                                            })}
                                    </button>
                                ))}
                        </div>

                    </div>
                    <div className="booking-group">
                        <label>Session Type</label>
                        <div className="session-types">

                            <button
                                type="button" className={
                                sessionType === "InPerson"
                                ? "selected-option"
                                    : ""
                            }
                            onClick={() => setSessionType("InPerson")}>
                                In Person
                            </button>

                            <button
                                type="button"
                                disabled
                            >
                                Online (Coming Soon)
                            </button>

                        </div>

                    </div>

                    <div className="booking-group">
                        <label>Notes</label>
                        <textarea
                            rows="4"
                            value={notes}
                            onChange={(e)=>setNotes(e.target.value)}
                            placeholder="Anything the tutor should know?"
                        />
                    </div>
                    <button className="booking-submit-btn"
                            onClick={handleBooking}>
                        Request Session
                    </button>
                </div>
            </section>
        </main>
    );
}

*/}