import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from "../Context/notes/noteContext"; // import context
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

function Notes() {
    
    const context = useContext(noteContext); // fetching data using context
    const { notes, fetchNotes, editNote } = context; // destructuring the values passed through context
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null) // initialize ref as null
    const refClose = useRef(null) //  to trigger the close button of modal
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateNote = (currentNote) => {
        ref.current.click(); // ref is populated with the target note
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tags}) // setting the value to populate the edit modal with previously saved data
    }

    const handleClick = (e)=>{
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <h1 className="my-3">Your Notes</h1>
                <div className="container ms-3">{notes.length === 0 && "No notes to display"}</div>
                {notes.length > 0 && notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes