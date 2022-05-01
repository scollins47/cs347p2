import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const socket = io();

// loads all messages from this user to the selected user
socket.on("loadMessages", ({ from, to, messages }) => {
    let messageBox = document.getElementById("messages");
    // clears the message box
    while (messageBox.firstChild) {
        messageBox.removeChild(messageBox.firstChild);
    }
    // loads all messages from this user to the selected user
    for (let i = 0; i < messages.length; i++) {
        let message = document.createElement("p");
        // each message is either a sent or received message
        // deliminated by the class name
        if (messages[i].fromID == from) {
            message.className = "sent";
        } else {
            message.className = "received";
        }
        message.innerHTML = messages[i].message;
        // adds the message to the message box
        messageBox.appendChild(message);
    }
    // scrolls to the bottom of the message box
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;

});

// loads all users to send a message to
document.getElementById("loadMsgs").addEventListener("click", () => {
    // get the first param in the cookie (the username) and extracts the actual
    // username
    let cookie = document.cookie;
    // if the user hasnt set a reciever
    if (cookie.split(",").length == 1) {
        alert("Please select a user to load messages from");
        return;
    }
    // get the username, and recipient from the cookie
    let username = cookie.split(",")[0].split("=")[1];
    let receiver = cookie.split(",")[1].split("=")[1];
    // send the username and recipient to the server
    socket.emit("loadMessages", { from: username, to: receiver });
});

function sendMessage() {
     let cookie = document.cookie;
    // if the user hasnt set a reciever
    if (cookie.split(",").length == 1) {
        alert("Please select a user to send a message to.");
        return;
    }
    // get the username, and recipient from the cookie
    let username = cookie.split(",")[0].split("=")[1];
    let receiver = cookie.split(",")[1].split("=")[1];
    // get the message from the text box
    let message = document.getElementById("message").value;
    document.getElementById("message").value = "";
    // send the message to the server
    socket.emit("sendMessage", { from: username, to: receiver, message: message });
}

// sends a message to the selected user
document.getElementById("sendMsg").addEventListener("click", () => {
    sendMessage();
});
