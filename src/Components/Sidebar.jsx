import {GrAddCircle} from "react-icons/gr";
import {GlobalContext} from "../Context";
import {useContext} from "react";
import Search from "./Search";
import {RiDislikeFill} from "react-icons/ri"
import {AiTwotoneLike} from "react-icons/ai"


const Sidebar = () => {

  const Store = useContext(GlobalContext);
  const {notes, onAddNote, onDeleteNote, activeNote, setActiveNote,favoriteNoteHandler, likeNoteHandler} = Store;

  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}><GrAddCircle size="1.5rem" className="icon"/> Add</button>
      </div>
      <Search />
      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, body, lastModified, favourite, like }) => (
          <div key = {id}
            className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => setActiveNote(id)}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button onClick={(e) => onDeleteNote(id)}>Delete</button>
            </div>

            <p>{body && body.substr(0, 100) + "..."}</p>
            <small className="note-meta">
              Last Modified{" "}
              {new Date(lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
            <RiDislikeFill size = "1.5rem" style={{ cursor:"pointer", margin:"10px 10px 0", color: `${favourite ? 'red' : ""}`}} 
            onClick={() => favoriteNoteHandler(id)}/>

            <AiTwotoneLike size = "1.5rem" style={{ cursor:"pointer", margin:"10px 10px 0", color: `${like ? 'red' : ""}`}} 
            onClick={() => likeNoteHandler(id)}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
