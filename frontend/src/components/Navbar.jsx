import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/ez_icon.png";

export default function Navbar(){

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

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
                <Link to="/tutors">Our Tutors</Link>
                <Link to="/services">Our Services</Link>
                <Link to="/bookings">Book Session</Link>
            </div>

            <div>
                {token ? (
                        <button className="login-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <Link className="login-btn" to="/login">
                            Login
                        </Link>
                    )
                }
            </div>
        </nav>
    );
}