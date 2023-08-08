import React, { useContext } from 'react';
import noteContext from "../Context/notes/noteContext"; // import context

const Noteitem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <>
        <div className="col-4 my-2">
            <div className="card">
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{note.title}</h5>
                        <div className='float-end'>
                            <i className="fa-regular fa-trash-can mx-2" type="button" data-bs-toggle="modal" data-bs-target={`#${note._id}`}></i>
                            <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(note)}}></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>

        {/* Modal */}
        <div className="modal fade" id={`${note._id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    Do you want to delete this note?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {deleteNote(note._id)}}>Yes</button>
                </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Noteitem;
