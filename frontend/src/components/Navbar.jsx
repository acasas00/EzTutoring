import {Link} from "react-router-dom";
import logo from "../assets/ez_icon.png";
import {getCurrentUser} from "../utils/auth.js";

export default function Navbar(){

    const currentUser = getCurrentUser();

    return(
        <nav className="navbar">
            <div className="logo">
                <img src={logo}
                     alt="EZ Tutoring"
                     className="main-logo" />

                <div className="logo-text">
                    <h1>EZ Tutoring</h1>
                    <p>Helping Students Succeed</p>
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
                <Link to="/tutors">Our Tutors</Link>
                <Link to="/services">Our Services</Link>
            </div>
        </nav>
    );
}