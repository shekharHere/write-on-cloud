import React, { useContext, useState } from 'react';
import noteContext from '../Context/notes/noteContext';

const AddNote = () => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [ note, setNote ] = useState({title: "", description: "", tags: ""});

    const handleSubmit = (e) => {
        e.preventDefault(); // terminate all events and then execute next line to avoid conflict
        addNote( note.title, note.description, note.tags )
        setNote({title: "", description: "", tags: ""});
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value }) // setting the value in state by appending the corresponding inout field
    }

  return (
    <>
        <h1 className="mt-5 pt-3">Add a Note</h1>
        <form className="container">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tags" className="form-label">Tags</label>
                <input type="text" className="form-control" id="tags" name="tags" value={note.tags} onChange={onChange}/>
            </div>
            <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
        </form>
    </>
  );
}

export default AddNote;
