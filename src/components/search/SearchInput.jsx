import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ darkMode = false, onSearch = () => {} }) => {
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState({ text: "", type: "" });

  const handleSearch = async (e) => {
    if (query && e.key === "Enter") {
      try {
        const res = await fetch(`/api/search?query=${query}`);
        const data = await res.json();
        if (res.ok) {
          onSearch(data.users);
          setMsg({ text: data.msg, type: "success" });
        } else {
          setMsg({ text: data.msg, type: "error" });
        }
      } catch (err) {
        setMsg({ text: "Search failed", type: "error" });
      } finally {
        setTimeout(() => setMsg({ text: "", type: "" }), 2500);
      }
    }
  };

  return (
    <>
      {msg.text && (
        <p style={{ textAlign: "center", color: msg.type === "success" ? "green" : "red" }}>
          {msg.text}
        </p>
      )}
      <TextField
        sx={{
          width: "90%",
          maxWidth: "750px",
          boxShadow: "5px 5px 5px gray",
          borderRadius: "15px",
          px: 2,
          py: 1,
          my: 5,
          mx: "auto",
          "& .MuiOutlinedInput-root": {
            color: darkMode ? "whitesmoke" : "black",
            "& fieldset": {
              border: "none",
            },
          },
        }}
        placeholder="search user..."
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{ color: darkMode ? "whitesmoke" : "black" }}>

              <FaSearch />

            </InputAdornment>
          ),
        }}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleSearch}/>
    </>
  );
};

export default SearchInput;