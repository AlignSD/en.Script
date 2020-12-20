const fs = require("fs");
// var db = require("../db/db.json");

var db = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

module.exports = function(app) {



    
console.log(db);
console.log(JSON.stringify(db));
//  Routes




//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
    
    res.json(db);
  });






var id = 1;

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

app.post("/api/notes", function(req, res) {
    db.push(req.body);
    res.json("saved note");
});
//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete('/api/notes/:id', function(req, res) {
    let note = db.find( ({ id }) => id === JSON.parse(req.params.id));
    // removes object at index of note id
    db.splice(db.indexOf(note), 1);
    res.end("Note deleted");
    });
}
