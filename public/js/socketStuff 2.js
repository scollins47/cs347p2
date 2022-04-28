import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const socket = io();

// loads all messages from this user to the selected user
socket.on("loadMessages", ({ from, to, messages }) => {
    let messageBox = document.getElementById("messages");
    while (messageBox.firstChild) {
        messageBox.removeChild(messageBox.firstChild);
    }
    for (let i = 0; i < messages.length; i++) {
        let message = document.createElement("p");
        if (messages[i].fromID == from) {
            message.className = "sent";
        } else {
            message.className = "received";
        }
        message.innerHTML = messages[i].message;
        messageBox.appendChild(message);
    }
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;

});
document.getElementById("loadMsgs").addEventListener("click", () => {
    // get the first param in the cookie (the username) and extract the actual
    // username
    let cookie = document.cookie;
    if (cookie.split(",").length == 1) {
        alert("Pleasse select a user to load messages from");
        return;
    }
    let username = cookie.split(",")[0].split("=")[1];
    let receiver = cookie.split(",")[1].split("=")[1];
    socket.emit("loadMessages", { from: username, to: receiver });
});
document.getElementById("sendMsg").addEventListener("click", () => {
    let cookie = document.cookie;
    if (cookie.split(",").length == 1) {
        alert("Please select a user to send a message to.");
        return;
    }
    let username = cookie.split(",")[0].split("=")[1];
    let receiver = cookie.split(",")[1].split("=")[1];
    let message = document.getElementById("message").value;
    socket.emit("sendMessage", { from: username, to: receiver, message: message });
});