import { React, useState, useEffect } from 'react'
import api from '../api'
import Notes from '../components/notes'
import "../styles/home.css"

function Home() {
  const [notes, setNotes] = useState([])
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  useEffect(() => {
    getNotes();
  }, [])
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };
  const deleteNote = (id) => {
    api
      .delete(`api/notes/delete/${id}`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!")
        else alert("Failed to delete note.")
      })
      .catch((error) => alert(error))
    getNotes();
  }

  const createNote = (e) => {
    e.preventDefault()
    api.post("api/notes/", { content, title }).then((res) => {
      if (res.status === 201) alert("Note created!")
      else alert("Failed to make note.")
    }).catch((err) => alert(err))
    getNotes();
  }
  return (
    <>
      <div>
        <h2>Notes</h2>
        {notes.map((note) =>
          <Notes note={note} onDelete={deleteNote} key={note.id} />
        )}
      </div>
      <h2>Create Notes</h2>
      <div className="create-note-form">
        <form onSubmit={createNote}>
          <label htmlFor='title'>Title:</label>
          <br />
          <input type="text" id='title' name='title' placeholder='Note Title' required onChange={(e) => setTitle(e.target.value)} value={title} />

          <label htmlFor='content'>Content:</label>
          <br />
          <textarea type="text" id='content' name='content' placeholder='Note Content' required onChange={(e) => setContent(e.target.value)} value={content} />
          <br />

          <input type="submit" value="submit" />
        </form>
      </div>
    </>
  )
}

export default Home