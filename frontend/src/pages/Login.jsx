import "./Login.css";
import {useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API_URL from "../utils/api";


export default function Login() {
    const [email,setEmail] =useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async()=> {
        try{
            const formData = new URLSearchParams();

            formData.append("username", email);
            formData.append("password", password)
            formData.append("grant_type","password")

            console.log(formData.toString());
            const response = await  fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    },
                    body: formData
                }
            );

            const data = await response.json();
            console.log("LOGIN RESPONSE:", data);

            if(!response.ok){
                alert("Invalid email or password");
                return;
            }

            localStorage.setItem(
                "token",
                data.access_token
            );

            localStorage.setItem(
                "role",
                data.role
            );

            if (location.state?.redirectTo) {
                navigate(location.state.redirectTo)
            }
            else{
                navigate("/admin-dashboard")
            }


        } catch(error){
            console.error(error);
            alert("Login Failed");
        }
    };

    return (
        <main className="login-page">

            <div className="login-card">
                <h1>Welcome Back</h1>
                <p className="login-subtitle">
                    Sign in to your EZTutoring account
                </p>

                <div className="login-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div className="login-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                <button className="login-btn"
                        onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </main>
    );
}