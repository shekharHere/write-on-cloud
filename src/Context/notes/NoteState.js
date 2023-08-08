import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const allNotes = []

    const [notes, setNotes] = useState(allNotes);

    // func to fetch all notes
    const fetchNotes = async () => {
        // API callout
        const response = await fetch(`${host}/api/notes/allnotes`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })

        const json = await response.json()
        console.log(json);
        setNotes(json);
    }

    // func to Add a Note
    const addNote = async ( title, description, tags ) => {
        // API callout
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tags })
        })

        const json = await response.json()
        console.log(json);
        console.log("token -", localStorage.getItem('token'));
        console.log(localStorage.getItem('oneMore'));

        setNotes(notes.concat(json));
    }

    // func to Delete a Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })

        const json = response.json();
        console.log(json);
        // console.log("delete success of note -" + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    // func to Edit a Note
    const editNote = async ( id, title, description, tags ) => {

        // API callout
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tags })
        })

        const json = response.json();
        console.log(json);

        const editNote = JSON.parse(JSON.stringify(notes)); // create a duplicate instance for the same obj

        for (let i = 0; i < editNote.length; i++) {
            const ele = editNote[i];
            
            if (ele._id === id) {
                editNote[i].title = title;
                editNote[i].description = description;
                editNote[i].tags = tags;
                break;
            }
        }
        setNotes(editNote);
    }


    return (
        <NoteContext.Provider value={{ notes, fetchNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
