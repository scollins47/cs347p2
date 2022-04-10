const express = require('express');
const app = express();
const PORT = 3000;
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Orange123',
    database: 'credentials'
});

app.use(express.static(__dirname + "/public"));
app.use(express.json());

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get("/home", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get("/otherGames", (req, res) => {
    res.sendFile(`${__dirname}/otherGames.html`);
});

app.get("/hands", (req, res) => {
    res.sendFile(`${__dirname}/pokerHand.html`);
});

app.get("/values", (req, res) => {
    res.sendFile(`${__dirname}/handVal.html`);
});

app.get("/biblio", (req, res) => {
    res.sendFile(`${__dirname}/biblio.html`);
})

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/login.html`);
});

app.post("/login", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let sql = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result.length > 0) {
            console.log(result[0]);
            res.sendStatus(200);
        } else {
            res.sendStatus(201);
        }
    });

});

app.post("/signup", async (req, res) => {
    let { username, password } = req.body;
    let sql1 = `SELECT * FROM user WHERE username = '${username}'`;
    // first check for duplicate username
    connection.query(sql1, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        if (result.length >= 1) {
            console.log("USERNAME TAKEN");
            res.sendStatus(201);
            return;
        }
        let sql = `INSERT INTO user (username, password) VALUES ('${username}', '${password}')`;
        connection.query(sql, (err, result) => {
            if (err) {
                console.log("Error insterting into database");
                res.sendStatus(500);
                return;
            }
            console.log("USER CREATED");
            res.sendStatus(200);
        });
    });
});