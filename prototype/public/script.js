// LOGIN FUNCTION
async function login() {
    let username = document.getElementById("user")?.value.trim();
    let password = document.getElementById("pass")?.value.trim();

    let errorEl = document.getElementById("error") || document.getElementById("message");
    let loadingEl = document.getElementById("loading");
    let btn = document.getElementById("btn");

    if (errorEl) errorEl.innerText = "";
    if (loadingEl) loadingEl.innerText = "";

    if (!username || !password) {
        if (errorEl) errorEl.innerText = "Please enter both username and password.";
        return;
    }

    if (btn) btn.disabled = true;
    if (loadingEl) loadingEl.innerText = "Logging in...";

    try {
        let res = await fetch('/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        let data = await res.json();

        if (data.success) {
            localStorage.setItem("loggedIn", "true");

            if (loadingEl) {
                loadingEl.className = "success";
                loadingEl.innerText = "Login successful!";
            }

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 500);

        } else {
            if (errorEl) errorEl.innerText = "Invalid username or password.";
            if (loadingEl) loadingEl.innerText = "";
            if (btn) btn.disabled = false;
        }

    } catch (err) {
        if (errorEl) errorEl.innerText = "Server error. Try again.";
        if (loadingEl) loadingEl.innerText = "";
        if (btn) btn.disabled = false;
    }
}

// AUTH CHECK
function checkAuth() {
    let loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn && !window.location.pathname.includes("index.html")) {
        window.location.href = "index.html";
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}
