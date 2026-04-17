const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let user = { username: "admin", password: "123" };

// SESSION STORAGE (simple demo storage)
let sessions = [];
let currentSession = null;

// =====================
// LOGIN
// =====================
app.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.json({ success: false, error: "Missing credentials" });
        }

        if (username === user.username && password === user.password) {
            return res.json({ success: true });
        }

        return res.json({ success: false });

    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
});

// =====================
// CLOCK IN
// =====================
app.post('/clock-in', (req, res) => {
    try {
        if (currentSession) {
            return res.json({ error: "Already clocked in" });
        }

        currentSession = {
            clockIn: new Date(),
            clockOut: null
        };

        sessions.push(currentSession);

        console.log("CLOCK IN → sessions:", sessions);

        return res.json({ time: currentSession.clockIn });

    } catch (err) {
        return res.status(500).json({ error: "Clock-in failed" });
    }
});

// =====================
// CLOCK OUT
// =====================
app.post('/clock-out', (req, res) => {
    try {
        if (!currentSession) {
            return res.json({ error: "Must clock in first" });
        }

        currentSession.clockOut = new Date();

        console.log("CLOCK OUT → sessions:", sessions);

        let finished = currentSession;
        currentSession = null;

        return res.json({ time: finished.clockOut });

    } catch (err) {
        return res.status(500).json({ error: "Clock-out failed" });
    }
});

// =====================
// GET ATTENDANCE
// =====================
app.get('/attendance', (req, res) => {
    try {
        console.log("GET ATTENDANCE:", sessions);
        return res.json(sessions);
    } catch (err) {
        return res.status(500).json({ error: "Failed to load attendance" });
    }
});

// =====================
// GET CURRENT SESSION
// =====================
app.get('/current-session', (req, res) => {
    try {
        console.log("GET CURRENT SESSION:", currentSession);
        return res.json(currentSession);
    } catch (err) {
        return res.status(500).json({ error: "Failed to get current session" });
    }
});

// =====================
// GET PAYSLIP
// =====================
app.get('/payslip', (req, res) => {
    try {
        let totalHours = 0;

        sessions.forEach(s => {
            if (s.clockIn && s.clockOut) {
                let diff = (new Date(s.clockOut) - new Date(s.clockIn)) / (1000 * 60 * 60);
                totalHours += diff;
            }
        });

        let hourlyRate = 20;
        let pay = totalHours * hourlyRate;

        return res.json({
            name: "Anthony",
            hours: totalHours.toFixed(2),
            rate: hourlyRate,
            pay: pay.toFixed(2)
        });

    } catch (err) {
        return res.status(500).json({ error: "Payslip calculation failed" });
    }
});

// =====================
// START SERVER
// =====================
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});