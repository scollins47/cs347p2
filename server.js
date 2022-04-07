const express = require('express');
const app = express();
const PORT = 3000;
const pg = require("pg");

app.use(express.static(__dirname + "/public"));
app.use(express.json());

const config = {
    host: 'localhost',
    user: 'postgres',
    database: 'lab5',
    password: 'Orange123',
    port: 5432
}
const conString = 'postgres://newuser:Orange123@localhost/accounts';
const pool = new pg.Pool(config);

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
    let resp = await pool.query("SELECT * FROM lab5");
    let { username, password } = req.body;
    for (entry of resp.rows) {
        if (username == entry.username && password == entry.password) {
            // change from sendStatus to send more info
            res.sendFile(`${__dirname}/index.html`);
        }
    }
    // didnt authenticate.
    res.sendStatus(201);
});