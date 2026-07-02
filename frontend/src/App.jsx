import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx"
import "./App.css"
import { Link } from "react-router-dom";

import Home from "./pages/Home.jsx"
import Tutors from "./pages/Tutors.jsx"
import Login from "./pages/Login.jsx";
import Services from "./pages/Services.jsx";
import AdminDashboard from "./pages/Admin-Dashboard.jsx";

function App(){
  return(
      <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path ="/" element={<Home />}/>
            <Route path ="/tutors" element={<Tutors />}/>
            <Route path="/services" element={<Services />}/>
            <Route path ="/login" element={<Login />}/>
            <Route path ="/admin-dashboard" element={<AdminDashboard />}/>
        </Routes>
              <footer className="site-footer">
                <span>© 2026 EZ Tutoring</span>
                <Link to="/login" className="admin-login-link">
                    Admin Portal
                </Link>
            </footer>
      </BrowserRouter>
  )
}

export default App;
