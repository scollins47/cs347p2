/**
 * {number} buttonChange used for keeping track of the button changes
 */
let buttonChange = 0;


/**
 * Changes the buttons hover style on each mouseover event
 */
function addButtonListeners() {
    let buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("mouseover", function (e) {
            fadeOutEffect(buttons[i].id);
            e.stopPropagation();
        });
    }
}

/**
 * Displays the greeting.
 * @returns {void}
 */
function displayGreeting() {
    let time = new Date();
    // get the hour of the day
    let hour = time.getHours();
    // check if the time is in the morning, afternoon, or at night
    const greeting = document.getElementById("greeting");
    if (hour < 12) {
        greeting.innerHTML = "Good Morning!";
    }
    else if (time < 17) {
        greeting.innerHTML = "Good Afternoon!";
    }
    else {
        greeting.innerHTML = "Good Evening!";
    }
}
/**
 * Changes the buttons hover style
 * @param {String} id button id
 */
function fadeOutEffect(id) {
    var fadeTarget = document.getElementById(id);
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > .1) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 100);
    fadeTarget.style.opacity = 1;
}

/**
 * Gets the valid users to send a message to.
 */
async function choosePerson() {
    let username = document.cookie.split(",")[0].split("=")[1];
    document.getElementById("people").innerHTML = "";
    let response = await fetch("/choosePerson", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({username})
    });
    let data = await response.json();
    for (user of data) {
        let option = document.createElement("button");
        option.innerHTML = user.username;
        option.addEventListener("click", () => {
            let user = option.innerHTML;
            setReceiver(user);
        });
        document.getElementById("people").appendChild(option);
    }
}

function setReceiver(username) {
    let cookie = document.cookie;
    let user = cookie.split(",")[0];
    let receiver = ",receiver=" + username;
    document.cookie = `${user}${receiver}`;
    let childArr = document.getElementById("people").children;
    for (let i = 0; i < childArr.length; i++) {
        if (childArr[i].innerHTML != username) {
            childArr[i].style.display = "none";
        }
    }
}

/**
 * Sets up event listeners and document.
 */
function setup() {
    displayGreeting();
    addButtonListeners();
}