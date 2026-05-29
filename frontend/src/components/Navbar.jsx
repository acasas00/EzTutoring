import {Link} from "react-router-dom";

export default function Navbar(){
    return(
        <nav className="navbar">
            <div className="logo">
                EZ Tutoring
            </div>

            <div>
                <Link to="/">Home</Link>{"|"}
                <Link to="/tutors">Our Tutors</Link>{"|"}
                <Link to="/bookings">Book Session</Link>{"|"}
                <Link to="/testimonials">Testimonials</Link>
            </div>

            <div>
                <Link className="login-btn" to="/login">
                    Login
                </Link>
            </div>
        </nav>
    )
}