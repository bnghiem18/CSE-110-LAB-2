import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import {ClickCounter} from "./hooksExercise"
import { useState, useEffect, useContext } from 'react';
import {FavoriteButton} from './favorite'
import {ToggleTheme} from './hooksExercise'
import { ThemeContext, themes } from "./themeContext";


function App() {
  //Favorites function
  const [favorites, setFavorites] = useState<string[]>([]);
  const toggleFavorite = (noteTitle: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(noteTitle)) {
        // If the note is already a favorite, remove it from the favorites
        return prevFavorites.filter((title) => title !== noteTitle);
      } else {
        // If it's not a favorite, add it to the favorites
        return [...prevFavorites, noteTitle];
      }
    });
  };
  
  //Toggling Themes
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  const theme = useContext(ThemeContext);


  //Creatw
  const [notes, setNotes] = useState(dummyNotesList); 
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [label, setLabel] = useState<Label>(Label.personal);
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  //update
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
  const updateNoteHandler = (updatedNote: Note) => {
    setNotes((prevNotes) => 
      prevNotes.map(note => note.id === updatedNote.id ? updatedNote : note)
    );
    setSelectedNote(initialNote); // Reset selected note after editing
  };

  //delete note
  const deleteNote = (id: number, title: string) =>{
    setNotes(prevNotes => prevNotes.filter(note => note.id!== id))
    setFavorites(prevFavorites => prevFavorites.filter(noteTitle => noteTitle !== title ))
  }

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div style={{ background: currentTheme.background, color: currentTheme.foreground }}>
        {/* Toggle Theme Button */}
        <button onClick={toggleTheme}>Toggle Theme</button>
    
      <div>

      
      <div className='app-container'>
      <form className="note-form" onSubmit={createNoteHandler}>
    	<div>
      	<input
        	placeholder="Note Title"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
        	required>
      	</input>
    	</div>

    	<div>
      	<textarea
        	onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        	required
          style={{ width: '90%', height: '150px' }} >
          
      	</textarea>
    	</div>

  <div>
     	<select
       	onChange={(event) =>
         	setCreateNote({ ...createNote, label: event.target.value as Label})}
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
   	</div>

    	<div><button type="submit">Create Note</button></div>
  	</form>



        <div className="notes-grid"  >
              {notes.map((note) => (
                <div style={{ background: currentTheme.background, color: currentTheme.foreground }}
                  key={note.id}
                  className="note-item">
                    <div className="notes-header" >
                      <button onClick = {()=>deleteNote(note.id, note.title)}>x</button>
                      <FavoriteButton 
                      isFavorite={favorites.includes(note.title)}
                      onClick={() => toggleFavorite(note.title)}/>
                    </div>
                  <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => updateNoteHandler({ ...note, title: e.currentTarget.textContent || note.title })}
                  > {note.title} </div>
                  <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => updateNoteHandler({ ...note, content: e.currentTarget.textContent || note.content })}
                >{note.content} </div>
                 <div>
                  <select
                    value={note.label}
                    onChange={(e) => updateNoteHandler({ ...note, label: e.target.value as Label })}
                  >
                    <option value={Label.personal}>Personal</option>
                    <option value={Label.study}>Study</option>
                    <option value={Label.work}>Work</option>
                    <option value={Label.other}>Other</option>
                  </select>
                </div>
                </div>
              ))}
        </div>
     </div>


      <div className="favorites-list">
            <h3>List of Favorites:</h3>
              {favorites.map((title) => (
                <li key={title}>{title}</li>
              ))}
      </div>
  </div>
  </div>

  </ThemeContext.Provider>

  );
}
export default App;
