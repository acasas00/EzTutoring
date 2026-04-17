const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let user = { username: "admin", password: "123" };
let attendance = { clockIn: null, clockOut: null };

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === user.username && password === user.password) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.post('/clock-in', (req, res) => {
    attendance.clockIn = new Date();
    res.json({ time: attendance.clockIn });
});

app.post('/clock-out', (req, res) => {
    attendance.clockOut = new Date();
    res.json({ time: attendance.clockOut });
});

app.get('/attendance', (req, res) => {
    res.json(attendance);
});

app.get('/payslip', (req, res) => {
    res.json({
        name: "Anthony",
        hours: 40,
        pay: 800
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
