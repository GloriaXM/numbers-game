import { Button, Menu, MenuItem } from "@mui/material";
import "./SortMenu.css";

function SortBar({
  isOpen,
  option,
  setOption,
  anchorEl,
  setAnchorEl,
  optionsList,
}) {
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
    if (event.target.id !== "") {
      setOption(event.target.id);
    }
  };

  return (
    <div className="sortMenu">
      <Button
        id="sortOptions"
        className="sort sortButton"
        aria-controls={isOpen ? "sortMenu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={handleClick}
      >
        {option}
      </Button>
      <Menu
        id="sortMenu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {optionsList.map((option) => (
          <MenuItem
            key={option}
            id={option}
            className="sort sortOptions"
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default SortBar;
