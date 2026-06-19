import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx"

import Home from "./pages/Home.jsx"
import Tutors from "./pages/Tutors.jsx"
import Testimonials from "./pages/Testimonials.jsx";
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
            <Route path ="/testimonials" element={<Testimonials />}/>
            <Route path ="/login" element={<Login />}/>
            <Route path ="/admin-dashboard" element={<AdminDashboard />}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
