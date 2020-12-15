// Dependencies
// =============================================================
var fs = require("fs");
var express = require("express");
var path = require("path");
const render = require("./lib/htmlRenderer");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "Develop/public")));

const OUTPUT_DIR = path.resolve(__dirname, "db");
const outputPath = path.join(OUTPUT_DIR, "db.json");

const allNotes = [];
const noteID = [];

//  Routes
// * The following HTML routes should be created:

//   * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
//   * GET `*` - Should return the `index.html` file
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
// * The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

// * The following API routes should be created:

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
    return res.json(characters);
  });
//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.


// Function used to save data to db.json file
function outputTeam() {
    // if output dir doesnt exist, create one
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    // write fullteam array to outputPath variable
    fs.writeFileSync(outputPath, render(allNotes), "utf-8");
}
outputTeam();
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });