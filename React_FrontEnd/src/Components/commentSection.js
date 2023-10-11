import React, { useState } from "react";

function CommentSection({ addNote, note }) {
  const handleNoteChange = (event) => {
    note = event.target.value;
    addNote(note);
  };

  return (
    <div>
      <textarea
        id="note"
        style={{
          height: '7rem',
          width: '30rem',
          fontSize: '20pt',
          border: 'solid #e5afb2 2px',
        }}
        className="input-box"
        value={note} // Bind the value to the note state
        onChange={handleNoteChange} // Call the event handler on change
      ></textarea>
    </div>
  );
}

export default CommentSection;
