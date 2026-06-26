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

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const isAdmin = token && role === "admin";
    const [serviceIndex, setServiceIndex] = useState(0);

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

    const uploadHomepageImage = async (e, section) => {
        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(
                `http://localhost:8000/homepage/image/${section}`,
                {
                    method: "PUT",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            alert("Image uploaded!");

            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Image upload failed.");
        }
    };

    const services = [
        {
            order: 2,
            title: "Academic Tutoring",
            items: [
                "Personalized instruction tailored to each student",
                "Strengthen reading, writing, and math skills",
                "Homework assistance and test preparation",
                "Build confidence and long-term academic success",
            ],
        },
        {
            order: 3,
            title: "Test Preparation",
            items: [
                "SAT, ACT, and placement exam practice",
                "Proven test-taking strategies",
                "Practice exams and review sessions",
                "Improve scores and confidence",
            ],
        },
        {
            order: 1,
            title: "Afterschool Program",
            items: [
                "Homework assistance and daily tutoring",
                "Safe and structured learning environment",
                "Educational activities and enrichment",
                "Support for academic growth and success",
            ],
        },
        {
            order: 4,
            title: "Summer Camp",
            items: [
                "Academic tutoring built into every day",
                "Educational activities, art, music, and games",
                "Sports, games, art, and enrichment activities",
                "Field trips and fun learning experiences all summer long",
            ],
        },
    ];

    const sortedServices = [...services].sort(
        (a, b) => a.order - b.order
    );

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
                    <div className="scholarship-section">
                        <p className="scholarship-title">
                            We Proudly Accept
                        </p>

                        <div className="scholarship-logos">

                            <img
                                src="/elc.png"
                                alt="Early Learning Coalition"
                            />

                            <img
                                src="/stepup.png"
                                alt="Step Up For Students"
                            />

                        </div>

                        <p className="scholarship-text">
                            ✓ Government Scholarships Accepted
                        </p>

                    </div>
                </div>
            </section>

            <section className="services-wrapper">
                {sortedServices.length > 4 && (
                    <button
                        className="services-arrow"
                        onClick={() =>
                            setServiceIndex((prev) => Math.max(prev - 1, 0))
                        }
                        disabled={serviceIndex === 0}
                    >
                        &#10094;
                    </button>
                )}

                <section className="services-section">

                    {sortedServices
                        .slice(serviceIndex, serviceIndex + 4)
                        .map((service, index) => (

                            <div
                                className="service-card"
                                key={index}
                            >
                                <h3>{service.title}</h3>

                                <ul>
                                    {service.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>

                                <Link to="/services">
                                    Learn More
                                </Link>
                            </div>

                        ))}

                </section>

                {sortedServices.length > 4 && (
                    <button
                        className="services-arrow"
                        onClick={() =>
                            setServiceIndex((prev) =>
                                Math.min(prev + 1, sortedServices.length - 4)
                            )
                        }
                        disabled={serviceIndex >= sortedServices.length - 4}
                    >
                        &#10095;
                    </button>
                )}

            </section>

            <section className="info-section">
                <div className="info-card">
                    <div className="info-image">
                        <img
                            src={`http://localhost:8000/uploads/homepage/about.jpg?v=${Date.now()}`}
                            alt="About Us"
                        />
                        {isAdmin && (
                            <>
                                <input
                                    id="about-upload"
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => uploadHomepageImage(e, "about")}
                                />

                                <label
                                    htmlFor="about-upload"
                                    className="homepage-upload-btn"
                                >
                                    +
                                </label>
                            </>
                        )}
                    </div>

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
                    <div className="info-image">
                        <img
                            src={`http://localhost:8000/uploads/homepage/what_we_do.jpg?v=${Date.now()}`}
                            alt="About Us"
                        />

                        {isAdmin && (
                            <>
                                <input
                                    id="what-we-do-upload"
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => uploadHomepageImage(e, "what_we_do")}
                                />

                                <label
                                    htmlFor="what-we-do-upload"
                                    className="homepage-upload-btn"
                                >
                                    +
                                </label>
                            </>
                        )}
                    </div>

                    <div className="info-content">
                        <h2>What We Do</h2>
                        <p>
                            We work with students on practical solutions that fit
                            their schedules, reduce stress, and improve academic
                            performance through personalized tutoring sessions.
                        </p>`
                    </div>
                </div>

                <div className="info-card">
                    <div className="info-image">
                        <img
                            src={`http://localhost:8000/uploads/homepage/why_ez_tutoring.jpg?v=${Date.now()}`}
                            alt="About Us"
                        />

                        {isAdmin && (
                            <>
                                <input
                                    id="why-upload"
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => uploadHomepageImage(e, "why")}
                                />

                                <label
                                    htmlFor="why-upload"
                                    className="homepage-upload-btn"
                                >
                                    +
                                </label>
                            </>
                        )}
                    </div>

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