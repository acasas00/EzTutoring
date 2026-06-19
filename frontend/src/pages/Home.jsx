import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

export default function Home() {
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

                <form className="contact-form">
                    <input type="text" placeholder="Full Name" />
                    <input type="email" placeholder="Email Address" />
                    <input type="tel" placeholder="Phone Number" />

                    <select>
                        <option>What are you interested in?</option>
                        <option>Reading, Writing & Math Tutoring</option>
                        <option>Test Preparation</option>
                        <option>Afterschool Program</option>
                        <option>Summer Camp</option>
                    </select>

                    <textarea placeholder="Message" rows="5"></textarea>

                    <button type="submit">Send Message</button>
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