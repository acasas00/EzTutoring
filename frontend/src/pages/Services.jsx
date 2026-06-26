import "./Services.css";

export default function Services() {
    return (
        <main className="services-page">

            <section className="services-hero">
                <h1>Our Services</h1>

                <p>
                    EZ Tutoring offers personalized academic support designed
                    to help students build confidence, improve performance,
                    and reach their educational goals.
                </p>
            </section>

            <section className="services-grid">

                <div className="service-card">
                    <h2>Academic Tutoring</h2>

                    <p>
                        One-on-one and small group tutoring focused on helping
                        students strengthen foundational skills and succeed in
                        the classroom.
                    </p>

                    <ul>
                        <li>Reading & Writing</li>
                        <li>Mathematics</li>
                        <li>Science</li>
                        <li>Homework Assistance</li>
                    </ul>
                </div>

                <div className="service-card">
                    <h2>Test Preparation</h2>

                    <p>
                        Structured preparation programs designed to help
                        students improve confidence and performance on exams.
                    </p>

                    <ul>
                        <li>SAT Preparation</li>
                        <li>ACT Preparation</li>
                        <li>Practice Testing</li>
                        <li>Test-Taking Strategies</li>
                    </ul>
                </div>

                <div className="service-card">
                    <h2>Afterschool Program</h2>

                    <p>
                        A safe and supportive learning environment where
                        students receive academic guidance and enrichment.
                    </p>

                    <ul>
                        <li>Homework Help</li>
                        <li>Daily Tutoring</li>
                        <li>Educational Activities</li>
                        <li>Academic Enrichment</li>
                    </ul>
                </div>

                <div className="service-card">
                    <h2>Summer Camp</h2>

                    <p>
                        Combining learning and fun through educational
                        activities, tutoring, and engaging experiences.
                    </p>

                    <ul>
                        <li>Academic Review</li>
                        <li>Arts & Crafts</li>
                        <li>Games & Activities</li>
                        <li>Field Trips</li>
                    </ul>
                </div>

            </section>

            <section className="services-info">

                <div className="service-detail-card">
                    <h2>Why Families Choose EZ Tutoring</h2>

                    <p>
                        Every student learns differently. Our programs focus on
                        individualized support, confidence building, and creating
                        positive learning habits that extend beyond the classroom.
                    </p>

                    <p>
                        Whether a student needs help catching up, staying on track,
                        or preparing for future challenges, our goal is to provide
                        practical academic support in a welcoming environment.
                    </p>
                </div>

            </section>

        </main>
    );
}