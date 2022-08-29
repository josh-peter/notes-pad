import React, {useContext} from "react";
import {GlobalContext} from "../Context";

const Search = () => {

  const Store = useContext(GlobalContext);
  const {handleSearchNote} = Store;


  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="type to search..."
        onChange={(e)=> handleSearchNote(e.target.value)}
      />
    </div>
  );
};

export default Search;
