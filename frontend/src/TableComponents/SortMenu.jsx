import { Button, Menu, MenuItem, Divider } from "@mui/material";
import { useState } from "react";
import "./SortMenu.css";

function SortMenu({ setSortType }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = anchorEl == null ? false : true;
  const playerInfoSortOptions = [
    ["id asc", "ID"],
    ["player_name asc", "Alphabetical"],
  ];
  const scoringSortOptionsDecreasing = [
    ["PTS desc", "Points Scored"],
    ["field_percent desc", "FG % Decreasing"],
    ["three_percent desc", "Three % Decreasing"],
    ["two_percent desc", "Two % Decreasing"],
    ["effect_fg_percent desc", "Effective FG % Decreasing"],
    ["ft_percent desc", "FT% Decreasing"],
  ];

  const scoringSortOptionsIncreasing = [
    ["field_percent asc", "FG % Increasing"],
    ["three_percent asc", "Three % Increasing"],
    ["two_percent asc", "Two % Increasing"],
    ["effect_fg_percent asc", "Effective FG % Increasing"],
    ["ft_percent asc", "FT% Increasing"],
  ];

  const miscSortOptionsDecreasing = [
    ["ORB desc", "ORB Descending"],
    ["DRB desc", "DRB Decreasing"],
    ["TRB desc", "TRB Decreasing"],
    ["AST desc", "AST Decreasing"],
    ["STL desc", "STL Decreasing"],
    ["BLK desc", "BLK Decreasing"],
    ["TOV desc", "TOV Decreasing"],
    ["PF desc", "PF Decreasing"],
  ];

  const miscSortOptionsIncreasing = [
    ["ORB desc", "ORB Increasing"],
    ["DRB desc", "DRB Increasing"],
    ["TRB desc", "TRB Increasing"],
    ["AST desc", "AST Increasing"],
    ["STL desc", "STL Increasing"],
    ["BLK desc", "BLK Increasing"],
    ["TOV desc", "TOV Increasing"],
    ["PF desc", "PF Decreasing"],
  ];

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
        className="sortButton"
        aria-controls={isOpen ? "sortMenu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Sort By
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
        {playerInfoSortOptions.map((option) => (
          <MenuItem
            key={option[0]}
            id={option[0]}
            className="playerInfoSortOptions"
            onClick={handleClose}
          >
            {option[1]}
          </MenuItem>
        ))}
        <Divider />

        {scoringSortOptionsDecreasing.map((option) => (
          <MenuItem
            key={option[0]}
            id={option[0]}
            className="scoringSortOptionsDecreasing"
            onClick={handleClose}
          >
            {option[1]}
          </MenuItem>
        ))}
        <Divider />

        {scoringSortOptionsIncreasing.map((option) => (
          <MenuItem
            key={option[0]}
            id={option[0]}
            className="scoringSortOptionsIncreasing"
            onClick={handleClose}
          >
            {option[1]}
          </MenuItem>
        ))}
        <Divider />

        {miscSortOptionsDecreasing.map((option) => (
          <MenuItem
            key={option[0]}
            id={option[0]}
            className="miscSortOptionsDecreasing"
            onClick={handleClose}
          >
            {option[1]}
          </MenuItem>
        ))}
        <Divider />

        {miscSortOptionsIncreasing.map((option) => (
          <MenuItem
            key={option[0]}
            id={option[0]}
            className="miscSortOptionsIncreasing"
            onClick={handleClose}
          >
            {option[1]}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default SortMenu;
