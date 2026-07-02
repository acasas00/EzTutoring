import {Link} from "react-router-dom";
import logo from "../assets/ez_icon.png";
import {getCurrentUser} from "../utils/auth.js";
import {useEffect, useState} from "react";

export default function Navbar(){

    const currentUser = getCurrentUser();
    const [settings, setSettings] = useState({});

    useEffect(() => {

    fetch("https://eztutoring.onrender.com/settings/")
        .then(response => response.json())
        .then(data => setSettings(data))
        .catch(error => console.error(error));

}, []);

    return(
        <nav className="navbar">
            <div className="logo">
                <img
                    src={logo}
                    alt="EZ Tutoring"
                    className="main-logo"
                />

                <div className="logo-text">
                    <h1>EZ Tutoring</h1>
                    <p className="logo-slogan">
                        Helping Students Succeed
                    </p>
                </div>

                <div className="logo-contact">
                    <span>(786) 355-2862</span>
                    <span>62 W 49th St</span>
                    <span>Hialeah, FL</span>
                </div>
            </div>

            <div className="nav-links">
                <Link to="/">Home</Link>
                {
                    currentUser?.role === "admin" && (
                    <Link to="/admin-dashboard">
                        Dashboard
                    </Link>
                    )
                }
                {settings.show_tutors && (
                    <Link to="/tutors">
                        Our Tutors
                    </Link>
                )}
                <Link to="/services">Our Services</Link>
            </div>
        </nav>
    );
}