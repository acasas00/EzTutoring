import "./Services.css";
import { Link } from "react-router-dom";

export default function Services() {
    return (
        <main className="services-page">

            <section className="services-hero">
                <h1>Our Services</h1>

                <p>
                    At EZ Tutoring, we provide personalized educational programs
                    designed to help students build confidence, improve academic
                    performance, and develop lifelong learning skills. Whether
                    your child needs ongoing support or preparation for an
                    important exam, we offer programs tailored to every stage of
                    their academic journey.
                </p>
            </section>

            <section className="services-grid">

                <div className="service-card">
                    <h2>Academic Tutoring</h2>

                    <p>
                        Personalized tutoring designed to strengthen classroom
                        performance while helping students gain confidence in
                        their abilities. Sessions are customized to meet each
                        student's individual learning style and academic goals.
                    </p>

                    <ul>
                        <li>Personalized one-on-one or small group instruction</li>
                        <li>Reading, writing, and mathematics support</li>
                        <li>Homework assistance and study skills</li>
                        <li>Confidence building and long-term academic success</li>
                    </ul>
                </div>

                <div className="service-card">
                    <h2>Test Preparation</h2>

                    <p>
                        Our comprehensive test preparation programs help students develop the
                        knowledge, strategies, and confidence needed to perform their best on
                        standardized exams. Through guided instruction and realistic practice,
                        students learn effective techniques while strengthening the academic
                        skills required for success.
                    </p>

                    <ul>
                        <li>SAT and ACT preparation</li>
                        <li>Practice exams and detailed performance reviews</li>
                        <li>Effective test-taking strategies and problem-solving techniques</li>
                        <li>Time management, confidence building, and score improvement</li>
                    </ul>
                </div>

                <div className="service-card">
                    <h2>Afterschool Program</h2>

                    <p>
                        Our afterschool program provides a safe, structured, and engaging
                        environment where students receive academic support while continuing to
                        grow socially and personally. We combine homework assistance,
                        individualized tutoring, and educational enrichment to help students
                        stay on track throughout the school year.
                    </p>

                    <ul>
                        <li>Daily homework assistance and study support</li>
                        <li>Individualized tutoring tailored to each student's needs</li>
                        <li>Educational enrichment activities and skill development</li>
                        <li>Safe, supportive environment that encourages confidence and success</li>
                    </ul>
                </div>

                <div className="service-card">
                    <h2>Summer Camp</h2>

                    <p>
                        Our summer program combines learning with fun, helping
                        students maintain academic progress while enjoying a
                        variety of exciting activities throughout the summer.
                    </p>

                    <ul>
                        <li>Daily academic tutoring</li>
                        <li>Arts, crafts, music, and enrichment</li>
                        <li>Sports, games, and group activities</li>
                        <li>Educational field trips and special events</li>
                    </ul>
                </div>

                <div className="service-card">
                    <h2>Winter Break Program</h2>

                    <p>
                        Keep students engaged over winter break with a balanced
                        program that reinforces classroom concepts while making
                        learning enjoyable through interactive activities.
                    </p>

                    <ul>
                        <li>Academic tutoring and homework support</li>
                        <li>Reading, writing, and math review</li>
                        <li>Educational games and enrichment activities</li>
                        <li>Prepare for a successful return to school</li>
                    </ul>
                </div>

            </section>

            <section className="services-info">

                <div className="service-detail-card">
                    <h2>Why Families Choose EZ Tutoring</h2>

                    <p>
                        Every student learns differently, which is why our
                        programs focus on individualized instruction, positive
                        encouragement, and building confidence both inside and
                        outside the classroom. Our experienced tutors work
                        closely with students to create a supportive learning
                        environment where questions are welcomed and progress is
                        celebrated.
                    </p>

                    <p>
                        Whether your child needs extra academic support, wants
                        to prepare for an upcoming exam, or is looking for an
                        engaging afterschool or seasonal program, EZ Tutoring is
                        committed to helping every student achieve their full
                        potential through personalized guidance and meaningful
                        educational experiences.
                    </p>

                </div>

            </section>

            <section className="services-contact">
                <h2>Questions? We're Here to Help!</h2>

                <p>
                    Choosing the right academic program is an important decision, and we're
                    here to make the process easy. Whether you're looking for personalized
                    tutoring, SAT or ACT preparation, our afterschool program, or one of
                    our seasonal programs, our team is happy to answer your questions and
                    help you find the best fit for your student.
                </p>

                <p>
                    If you'd like to learn more about our services, discuss your child's
                    academic goals, or schedule a visit, please don't hesitate to reach
                    out. We'd love the opportunity to meet your family and show you how
                    EZ Tutoring can help your student succeed.
                </p>

                <div className="services-contact-info">

                    <div className="contact-item">
                        <h3>📞 Give Us a Call</h3>
                        <p>(786) 355-2862</p>
                    </div>

                    <div className="contact-item">
                        <h3>📍 Visit Our Learning Center</h3>
                        <p>
                            62 W 49th St<br />
                            Hialeah, FL
                        </p>
                    </div>

                </div>

                <Link
                    to="/#contact"
                    className="services-contact-btn"
                >
                    Contact Us Today
                </Link>

            </section>
        </main>
    );
}