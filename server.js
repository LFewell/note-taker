const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static("public"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// app.get("*", (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, "/public/index.html"));
// });

app.get("/api/notes", (req, res) => res.json(db))


app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (data) => {
        const newNote = req.body;
        const parsedNote = JSON.parse(data);
        parsedNote.push(newNote);
        fs.writeFile(
            "./db/db.json",
            JSON.stringify(newNote)
        )

    })
    
})



app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`))