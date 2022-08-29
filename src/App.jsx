import "./App.css";
import Sidebar from "./Components/Sidebar"
import Main from "./Components/Main"
import React, {useContext} from "react";
import {GlobalContext} from "./Context";

function App() {

  const Store = useContext(GlobalContext);
  const {notes, activeNote} = Store;
  
  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  return (
    <div className="App">
      <Sidebar/>
      <Main activeNote={getActiveNote()} />
    </div>
  );
}

export default App;