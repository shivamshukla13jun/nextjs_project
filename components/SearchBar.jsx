import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/context";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [title, settitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [NotFound, setNotFound] = useState("");
  console.log({search:searchResults.length})
//   console.log({title})
  useEffect(() => {
    if (title.length > 0) {
      const search = async () => {
       await axios.post("http://localhost:7000/api/movies/random",{title} ).
       then(response =>{
        setSearchResults(response.data.result);
        console.log({responseresult:response.data.result.length})
    })
       .catch((error) => console.log({error}));
       
        
      };
      search();
    } else {
      setSearchResults([]);
    }
  }, [title]);

  const handleChange = (e) => {
    settitle(e.target.value);
    if(searchResults.length===0){
     setNotFound("Not found")
    }else{
      setNotFound("")
    }
  };
// alert(title)
  return (
    <div>
      <input type="text" value={title} onChange={handleChange} />
      {
           searchResults.length>0 ?(<>{
            searchResults.map((result) => (
              <>
              <div key={result?._id}><Link to={"/singlemovie/" + result?._id}>
              <small  style={{ whiteSpace: "nowrap", textOverflow: "ellipsis",height: "400px", overflowY: "scroll" }}>{result?.title}</small>
            </Link></div>
              </>
              ))
           }
            </>):<div id="not">{NotFound}</div>
        
    }
    </div>
  );
};

export default SearchBar;
