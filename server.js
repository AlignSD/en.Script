// Dependencies
// ================================================================================================
var fs = require("fs");
var express = require("express");
var path = require("path");
// const render = require("./lib/htmlRenderer");

// Sets up the Express App
// ================================================================================================
var app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// const OUTPUT_DIR = path.resolve(__dirname, "db");
// const outputPath = path.join(OUTPUT_DIR, "db.json");

const allNotes = [];

var db = require("./db/db.json")
    
console.log(db);
console.log(JSON.stringify(db));
//  Routes
// ================================================================================================

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
    
    return res.json(db);
  });
//   * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
//   * GET `*` - Should return the `index.html` file
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

// POST
// ================================================================================================

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
var id = 1;
app.post("/api/notes", function(req, res) {
    var data = req.body;
    var newNotes = {
        title: data.title,
        text: data.text,
        id: id
    };
    db.push(newNotes);
    id++;
    fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
        if (err) throw err;
    })
    res.json(newNotes);
});

// DELETE
// ================================================================================================
  //* DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
app.delete('/api/notes/:id', (req, res) => {
  let note = db.find( ({ id }) => id === JSON.parse(req.params.id));
  // removes object at index of note id
  db.splice(db.indexOf(note), 1);
  res.end("Note deleted");
  });


// Starts the server to begin listening
// ================================================================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });