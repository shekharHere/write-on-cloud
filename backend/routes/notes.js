const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const Notes = require("../models/Notes");
var fetchuser = require("../middleware/fetchuser");

// Fetch all notes of a loggedin user using 'GET' request "/api/notes/allnotes". Login required
router.get("/allnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});


// Add a new note loggedin user using 'POST' request "/api/notes/addnote". Login required
router.post("/addnote", fetchuser, [
    body("title").isLength({ min: 3 }), // must contain atleast 3 characters
    body("description", "Cannot save empty note!").not().isEmpty(), // cannot be empty -- 2nd param is used to give customized error msg
  ], async (req, res) => {

    const errors = validationResult(req); // Find validation errors if any
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    
    try {
        const { title, description, tags } = req.body; // deconstruct and save values from req
        const note = new Notes({ // alligning values as json obj 
            title: title,
            description: description,
            tags: tags,
            user: req.user.id
        });

        const savedNote = await note.save(); // saving the data on the DB
        res.json(savedNote);
    } catch (error) {
        // handle any error while API callout
        // console.error(error.message);
        res.status(500).send("Internal Server Occured");
    }
});


// Update an existing note using 'PUT' request "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    
    const { title, description, tags } = req.body; // deconstruct and save values from req
    const newNote = {};
    
    try {
        // only add the sectons which need to be updated
        if (title) {
            newNote.title = title;
        }

        if (description) {
            newNote.description = description;
        }

        if (tags) {
            newNote.tags = tags;
        }

        // Find note to be updated and update it
        const note = await Notes.findById(req.params.id);
        if (!note) { // if note is not found in database
            return res.status(404).send("Not Found");
        }

        if (note.user.toString() !== req.user.id) { // check if its the owner of the note who is making changes
            return res.status(401).send("Not Allowed");
        }

        const updateNote = await Notes.findByIdAndUpdate(
            req.params.id, // id of the note
            {$set: newNote} // the object with updated data
        )
        res.json(updateNote);
    } catch (error) {
        // handle any error while API callout
        // console.error(error.message);
        res.status(500).send("Internal Server Occured");
    }
});

// Delete an existing note using 'DELETE' request "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    
    try {
        
        // Find note to be deleted and delete it
        const note = await Notes.findById(req.params.id);
        if (!note) { // if note is not found in database
            return res.status(404).send("Not Found");
        }

        if (note.user.toString() !== req.user.id) { // check if its the owner of the note who is deleting the note
            return res.status(401).send("Not Allowed");
        }

        const deletedNote = await Notes.findByIdAndDelete(req.params.id);
        res.json({
            "Success": "Note has been deleted",
            deletedNote: deletedNote
        });
    } catch (error) {
        // handle any error while API callout
        console.error(error.message);
        res.status(500).send("Internal Server Occured");
    }
});

module.exports = router;
