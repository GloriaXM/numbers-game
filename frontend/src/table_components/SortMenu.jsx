import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import "./SortMenu.css";

function SortMenu({ setSortType, setSortDirection }) {
  const [optionsAnchorEl, setOptionsAnchorEl] = useState(null);
  const optionsIsOpen = optionsAnchorEl == null ? false : true;

  const [directionAnchorEl, setDirectionAnchorEl] = useState(null);
  const directionIsOpen = directionAnchorEl == null ? false : true;

  const SORT_OPTIONS = [
    "no_sort",
    "id",
    "player_name",
    "PTS",
    "field_percent",
    "three_percent",
    "two_percent",
    "effect_fg_percent",
    "ft_percent",
    "ORB",
    "DRB",
    "TRB",
    "AST",
    "STL",
    "BLK",
    "TOV",
    "PF",
  ];

  const SORT_DIRECTIONS = ["no_direction", "asc", "desc"];

  const handleOptionsClick = (event) => {
    setOptionsAnchorEl(event.currentTarget);
  };
  const handleOptionsClose = (event) => {
    setOptionsAnchorEl(null);
    setSortType([event.target.id]);
  };
  const handleDirectionClick = (event) => {
    setDirectionAnchorEl(event.currentTarget);
  };
  const handleDirectionClose = (event) => {
    setDirectionAnchorEl(null);
    setSortDirection([event.target.id]);
  };

  return (
    <div className="sortMenu">
      <Button
        id="sortOptions"
        className="sort sortButton"
        aria-controls={optionsIsOpen ? "sortMenu" : undefined}
        aria-haspopup="true"
        aria-expanded={optionsIsOpen ? "true" : undefined}
        onClick={handleOptionsClick}
      >
        Sort By
      </Button>
      <Menu
        id="sortMenu"
        anchorEl={optionsAnchorEl}
        open={optionsIsOpen}
        onClose={handleOptionsClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem
            key={option}
            id={option}
            className="sort sortOptions"
            onClick={handleOptionsClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>

      <Button
        id="sortDirection"
        className="sort sortButton"
        aria-controls={directionIsOpen ? "sortMenu" : undefined}
        aria-haspopup="true"
        aria-expanded={directionIsOpen ? "true" : undefined}
        onClick={handleDirectionClick}
      >
        Sort Direction
      </Button>
      <Menu
        id="sortMenu"
        anchorEl={directionAnchorEl}
        open={directionIsOpen}
        onClose={handleDirectionClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {SORT_DIRECTIONS.map((option) => (
          <MenuItem
            key={option}
            id={option}
            className="sort sortOptions"
            onClick={handleDirectionClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default SortMenu;
