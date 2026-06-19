{/*import "./Register.css";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const registerData = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email: email,
            password: password
        };

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/users/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(registerData)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                alert(data.detail || "Registration failed");
                return;
            }
            alert("Account created successfully");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    };

    return (
        <main className="register-page">

            <div className="register-card">

                <h1>Create Account</h1>

                <p className="register-subtitle">
                    Join EZ Tutoring today
                </p>

                <div className="register-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter first name"
                    />
                </div>

                <div className="register-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
                    />
                </div>

                <div className="register-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number"
                    />
                </div>

                <div className="register-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </div>

                <div className="register-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                </div>

                <div className="register-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                    />
                </div>

                <button
                    className="register-btn"
                    onClick={handleRegister}
                >
                    Create Account
                </button>
                <div className="register-footer">
                    <span>
                        Already have an account?
                    </span>
                    <Link
                        to="/login"
                        className="register-link"
                    >
                        Login
                    </Link>

                </div>

            </div>

        </main>
    );
}

 */}