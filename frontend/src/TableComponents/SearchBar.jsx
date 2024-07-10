import TextField from "@mui/material/TextField";

function SearchBar({ setSearchQuery }) {
  return (
    <TextField
      id="searchBar"
      className="searchBar"
      onChange={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Search for a player"
      variant="outlined"
      placeholder="Search..."
      size="small"
      margin="normal"
    />
  );
}

export default SearchBar;
