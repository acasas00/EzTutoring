function login() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    if(user === "admin" && pass === "123") {
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "Invalid login!";
    }
}

function clockIn() {
    document.getElementById("status").innerText =
        "Clocked In at " + new Date().toLocaleTimeString();
}

function clockOut() {
    document.getElementById("status").innerText =
        "Clocked Out at " + new Date().toLocaleTimeString();
}
