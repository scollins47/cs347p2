function setupListener() {
    loginButton = document.getElementById("login");

    document.getElementById("html").addEventListener("keyup", (e) => {
        if (e.key == "Enter") {
            login();
        }
    })
}

function login() {
    let username = document.getElementById("username").value;
    if (!validateEmail(username)) {
        alert("Please enter a valid email address.");
        return;
    }
    let password = document.getElementById("password").value;
    if (!validatePassword(password)) {
        alert("Please enter a password with more than 5 characters.");
        return;
    }
    let res = fetch("/login", { method: "POST", body: JSON.stringify({ username, password }), headers: { 'Content-Type': 'application/json' } });
    res.then(function (response) {
        if (response.status == 201) {
            alert("Not a valid username or password");
        }
        if (response.status == 200) {
            window.location.href = "/home";
        }
    });
}

function signup() {
    let username = document.getElementById("username").value;
    if (!validateEmail(username)) {
        alert("Please enter a valid email address.");
        return;
    }
    let password = document.getElementById("password").value;
    if (!validatePassword(password)) {
        alert("Please enter a password with more than 5 characters.");
        return;
    }
    let res = fetch("/signup", { method: "POST", body: JSON.stringify({ username, password }), headers: { 'Content-Type': 'application/json' } });
    res.then(function (response) {
        console.log(response.status);
        if (response.status == 201) {
            alert("Username already exists");
        }
        if (response.status == 200) {
            window.location.href = "/home";
        }
    });
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validatePassword(password) {
    console.log(password);
    if (password.length <= 5) {
        return false;
    }
    return true;
}