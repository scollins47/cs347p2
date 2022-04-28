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
    if (validatePassword(password)) {
        alert("Please enter a password with more than 5 characters.");
        return;
    }
    let res = fetch("/login", { method: "POST", body: JSON.stringify({ username, password }), headers: { 'Content-Type': 'application/json' } });
    res.then(function (response) {
        if (response.status == 201) {
            alert("Not a valid username or password");
        }
        if (response.status == 200) {
            document.cookie = "username=" + username;
            window.location.href = "/home";
        }
    });
}
/**
 * Validates email and password
 * @returns nothing sends client to the home page if sucessful
 */
function signup() {
    let username = document.getElementById("username").value;
    if (!validateEmail(username)) {
        document.getElementById("username").style.borderColor = "#ff0000";
        alert("Please enter a valid email address.");
        return;
    }
    let password = document.getElementById("password").value;
    if (validatePassword(password)) {
        document.getElementById("username").style.borderColor = "#ff0000";
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
            document.cookie = "username=" + username;
            window.location.href = "/home";
        }
    });
}

/**
 * 
 * @param {String} email 
 * @returns boolean if email is valid
 */
function validateEmail(email) {
    // from grepper
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
/**
 * 
 * @param {String} password 
 * @returns boolean if password is valid
 */
function validatePassword(password) {
    console.log(password);
    return (password.length <= 5);
}