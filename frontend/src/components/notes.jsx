import React from 'react'

function Notes({note, onDelete}) {
    const formatedDate = new Date(note.created_at).toLocaleDateString("en-US")
  return (
    <div className='note-container'>
        <div>
        <p className='note-title'>{note.title}</p>
        <p className='note-content'>{note.content}</p>
        <p className="note-date">{formatedDate}</p>
        </div>
        <div>
            <button className='del-button' onClick={()=> onDelete(note.id)}>
                delete
            </button>
        </div>

    </div>
  )
}

export default Notes