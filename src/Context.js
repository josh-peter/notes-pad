import React, { useState, useEffect } from "react";
import uuid from "react-uuid";

const GlobalContext = React.createContext();

const Provider = ({ children }) => {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);
  const [favourite, setFavourite] = useState([]);
  const [like, setlike] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Your Title",
      body: "",
      lastModified: Date.now(),
      favourite: false,
      like: false,
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const handleSearchNote = (e) => {
    const search = e.target.value.toLowerCase();
    const filteredNotes = notes.filter((note) => {
      return note.title.toLowerCase().includes(search)
    });
    setSearch(search);
    console.log(filteredNotes);
    }

  const favoriteNoteHandler = (noteId) => {
    const copy = [...notes];
    const note = copy.find(({ id }) => id === noteId);
    note.favourite = !note.favourite;
    setNotes(copy);

    const isPresent = favourite.find(({ id }) => id === noteId);
    if (isPresent) {
      setFavourite([...favourite, note]);
    } else {
      const newFavourite = favourite.filter(({ id }) => id !== noteId);
      setFavourite(newFavourite);
    }
  };

  const likeNoteHandler = (noteId) => {
    const copy = [...notes];
    const likeNote = copy.find(({ id }) => id === noteId);
    likeNote.like = !likeNote.like;
    setNotes(copy);
  };



  const state = {
    notes,
    setNotes,
    activeNote,
    setActiveNote,
    onAddNote,
    onDeleteNote,
    onUpdateNote,
    favoriteNoteHandler,
    favourite,
    likeNoteHandler,
    like,
    search, 
    setSearch,
    setlike,
    handleSearchNote 
  };

  return (
    <GlobalContext.Provider value={state}>
        {children}
    </GlobalContext.Provider>
  );
};

const Consumer = GlobalContext.Consumer;

export { GlobalContext, Provider, Consumer };
