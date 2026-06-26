import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import {useState} from "react";

export default function Home() {

    const interestOptions = [
        {value: "reading", label: "Reading" },
        {value: "math", label: "Math" },
        {value: "test_prep", label: "Test Prep" },
        {value: "afterschool", label: "Afterschool" },
        {value: "summer_camp", label: "Summer Camp" },
        {value: "other", label: "Other"}
    ];

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [interest, setInterest] = useState("");
    const [studentName, setStudentName] = useState("");
    const [studentGrade, setStudentGrade] = useState("");
    const [studentAge, setStudentAge] = useState("");
    const [message, setMessage] = useState("");
    const [testPrepType, setTestPrepType] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();

    const contactMessage = {
        full_name: fullName,
        email: email,
        phone: phone,
        interests: interest,
        message: `Student Name: ${studentName || "Not Provided"}
        Student Grade: ${studentGrade || "Not Provided"}
        Student Age: ${studentAge || "Not Provided"}${
        interest === "test_prep"
            ? `\nTest: ${testPrepType || "Not Provided"}`
            : ""
        }
        
        ${message || "No additional message."}`
        };

    try {
        const response = await fetch("http://localhost:8000/contact-messages/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contactMessage),
        });

        if (!response.ok) {
            throw new Error("Failed to send message.");
        }

        alert("Message sent!");

        setFullName("");
        setEmail("");
        setPhone("");
        setInterest("");
        setTestPrepType("");
        setStudentName("");
        setStudentGrade("");
        setStudentAge("");
        setMessage("");
    } catch (err) {
        console.error(err);
        alert("Failed to send message.");
    }
};

    return (
        <main className="home-page">
            <a href="#contact" className="floating-contact-btn">
            Contact Us
            </a>
            <section className="home-hero">
                <h1>Helping Students Succeed</h1>
                <p>
                    Personalized tutoring, academic coaching, and test preparation
                    designed to help students build confidence and stay organized.
                </p>
                <div className="hero-btn">
                    <Link className="hero-services-btn" to="/services">
                        Learn About Our Services
                    </Link>
                </div>
            </section>

            <section className="services-section">
                <div className="service-card">
                    <h3>Academic Tutoring</h3>
                    <ul>
                        <li>Personalized instruction tailored to each student</li>
                        <li>Strengthen reading, writing, and math skills</li>
                        <li>Homework assistance and test preparation</li>
                        <li>Build confidence and long-term academic success</li>
                    </ul>
                    <Link to="/services">Learn More</Link>
                </div>

                <div className="service-card">
                    <h3>Test Preparation</h3>
                    <ul>
                        <li>SAT, ACT, and placement exam practice</li>
                        <li>Proven test-taking strategies</li>
                        <li>Practice exams and review sessions</li>
                        <li>Improve scores and confidence</li>
                    </ul>
                    <Link to="/services">Learn More</Link>
                </div>

                <div className="service-card">
                    <h3>Afterschool Program</h3>
                    <ul>
                        <li>Homework assistance and daily tutoring</li>
                        <li>Safe and structured learning environment</li>
                        <li>Educational activities and enrichment</li>
                        <li>Support for academic growth and success</li>
                    </ul>
                    <Link to="/services">Learn More</Link>
                </div>

                <div className="service-card">
                    <h3>Summer Camp</h3>
                    <ul>
                        <li>Academic tutoring built into every day</li>
                        <li>Educational activities, art, music, and games</li>
                        <li>Sports, games, art, and enrichment activities</li>
                        <li>Field trips and fun learning experiences all summer long</li>
                    </ul>
                    <Link to="/services">Learn More</Link>
                </div>
            </section>

            <section className="info-section">
                <div className="info-card">
                    <div className="info-image placeholder-one"></div>
                    <div className="info-content">
                        <h2>About Us</h2>
                        <p>
                            EZ Tutoring helps students become more confident,
                            organized, and prepared. Our goal is to make learning
                            feel manageable by breaking difficult subjects into
                            clear steps.
                        </p>
                    </div>
                </div>

                <div className="info-card">
                    <div className="info-image placeholder-two"></div>
                    <div className="info-content">
                        <h2>What We Do</h2>
                        <p>
                            We work with students on practical solutions that fit
                            their schedules, reduce stress, and improve academic
                            performance through personalized tutoring sessions.
                        </p>
                    </div>
                </div>

                <div className="info-card">
                    <div className="info-image placeholder-three"></div>
                    <div className="info-content">
                        <h2>Why EZ Tutoring</h2>
                        <p>
                            Every student learns differently. EZ Tutoring focuses
                            on building trust, improving confidence, and helping
                            students develop skills they can use beyond one class.
                        </p>
                    </div>
                </div>
            </section>

            <section className="testimonials-section">

                <h2>What Families Are Saying</h2>

                <div className="testimonials-grid">

                    <div className="testimonial-card">
                        <div className="stars">★★★★★</div>
                        <p>
                            "My son has attended EZ Tutoring for 1 year. I am very happy with the improvement I have seen in my son, especially in reading."
                        </p>
                        <span>- Jeisy Aballi</span>
                    </div>

                    <div className="testimonial-card">
                        <div className="stars">★★★★★</div>
                        <p>
                            "My daughter went here for two days each week for math and civics and she got a five on both!"
                        </p>
                        <span>- Abel Alfonso</span>
                    </div>

                    <div className="testimonial-card">
                        <div className="stars">★★★★★</div>
                        <p>
                            "My daughter has made incredible progress in her subjects since joining. From an F in math to an A!"
                        </p>
                        <span>- Nileyan Hernandez</span>
                    </div>

                    <div className="testimonial-card">
                        <div className="stars">★★★★★</div>
                        <p>
                            "Excellent service! It helped my daughter tremendously. She passed the 3rd grade FAST exam."
                        </p>
                        <span>- Franye Colmenares</span>
                    </div>

                    <div className="testimonial-card">
                        <div className="stars">★★★★★</div>
                        <p>
                            "My son has been there for 3 years and I am very happy with the service. He has shown immense progress."
                        </p>
                        <span>- Elianys Jara</span>
                    </div>

                    <div className="testimonial-card">
                        <div className="stars">★★★★★</div>
                        <p>
                            "Very happy with EZ Tutoring. My children were happy and made academic progress."
                        </p>
                        <span>- Isa Marques</span>
                    </div>

                </div>

                <a
                    className="reviews-btn"
                    href="https://www.google.com/search?q=ez+tutoring&oq=ez+tutoring&gs_lcrp=EgZjaHJvbWUqDAgAECMYJxiABBiKBTIMCAAQIxgnGIAEGIoFMhUIARAuGBQYrwEYxwEYhwIYgAQYjgUyBggCEEUYOzIOCAMQRRgUGDsYhwIYgAQyBggEEEUYOzIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDMyMjdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8"
                    target="_blank"
                    rel="noreferrer"
                >
                    View More Google Reviews
                </a>

            </section>

            <section id="contact" className="contact-section">
                <h2>Contact Us</h2>
                <p>Have questions? Send us a message and we’ll get back to you.</p>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="tel"
                        pattern="^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />

                    <select
                        required
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                    >
                        <option value="" disabled>
                            What are you interested in?
                        </option>

                        {interestOptions.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {interest === "test_prep" && (
                        <select
                            value={testPrepType}
                            onChange={(e) => setTestPrepType(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Which test?
                            </option>

                            <option value="SAT">SAT</option>
                            <option value="ACT">ACT</option>
                            <option value="PSAT">PSAT</option>
                            <option value="FAST">FAST / Florida Assessments</option>
                            <option value="Other">Other</option>
                        </select>
                    )}

                    <input
                        type="text"
                        placeholder="Student Name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Student Grade"
                        value={studentGrade}
                        onChange={(e) => setStudentGrade(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Student Age"
                        min="3"
                        max="18"
                        value={studentAge}
                        onChange={(e) => setStudentAge(e.target.value)}
                    />

                    <textarea
                        placeholder="Tell us about your tutoring needs (optional)"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button type="submit">
                        Send Message
                    </button>

                </form>

               <div className="social-links">
                    <h3>Follow Us</h3>

                    <a
                        href="https://www.instagram.com/eztutoring/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaInstagram />
                        <span>Instagram</span>
                    </a>
                </div>
            </section>

        </main>
    );
}