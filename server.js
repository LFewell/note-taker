const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");
const nid = require("nid");

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static("public"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.get("/api/notes", (req, res) => {
    const notes = fs.readFileSync(path.join(__dirname, "./db/db.json"));
    let parse = JSON.parse(notes);
    res.json(parse);
})

app.post("/api/notes", (req, res) => {
    const db = fs.readFileSync(path.join(__dirname, "./db/db.json"));
    let parse = JSON.parse(db);
    let newNote = req.body;
    newNote.id = nid();
    
    parse.push(newNote);
    let newDb = JSON.stringify(parse);
    
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), newDb);
    res.json(newNote);
})

// app.post("/api/notes", (req, res) => {
    //     const newNote = req.body;
    //     newNote.id = nid();
    //     db.push(newNote);
    //     console.log(newNote);
    // })
    
    app.get("*", (req, res) => {
        res.status(404).sendFile(path.join(__dirname, "/public/index.html"));
    });
    
    
    app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`))