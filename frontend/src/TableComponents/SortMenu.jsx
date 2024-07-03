import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

function SortMenu({ setSortType }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
    setSortType(event.target.id);
  };

  return (
    <div className="sortMenu">
      <Button
        id="sortButton"
        aria-controls={open ? "sortMenu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Sort By
      </Button>
      <Menu
        id="sortMenu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem id="alphabetical" onClick={handleClose}>
          Alphabetical
        </MenuItem>
        <MenuItem id="fieldPercentAsc" onClick={handleClose}>
          Field % Asc
        </MenuItem>
        <MenuItem id="fieldPercentDesc" onClick={handleClose}>
          Field % Desc
        </MenuItem>
      </Menu>
    </div>
  );
}

export default SortMenu;
