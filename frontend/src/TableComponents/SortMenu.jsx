import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

function SortMenu({ setSortType }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const playerInfoSortOptions = [
    ["id asc", "ID"],
    ["player_name asc", "Alphabetical"],
  ];
  const scoringSortOptions = [
    ["PTS desc", "Points Scored"],
    ["field_percent desc", "FG % Decreasing"],
    ["three_percent desc", "Three % Decreasing"],
    ["two_percent desc", "Two % Decreasing"],
    ["effect_fg_percent desc", "Effective FG % Decreasing"],
    ["ft_percent desc", "FT% Decreasing"],
    ["field_percent asc", "FG % Increasing"],
    ["three_percent asc", "Three % Increasing"],
    ["two_percent asc", "Two % Increasing"],
    ["effect_fg_percent asc", "Effective FG % Increasing"],
    ["ft_percent asc", "FT% Increasing"],
  ];

  const miscSortOptions = [
    ["ORB desc", "ORB Descending"],
    ["DRB desc", "DRB Decreasing"],
    ["TRB desc", "TRB Decreasing"],
    ["AST desc", "AST Decreasing"],
    ["STL desc", "STL Decreasing"],
    ["BLK desc", "BLK Decreasing"],
    ["TOV desc", "TOV Decreasing"],
    ["PF desc", "PF Decreasing"],
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
        {/* TODO: add css to color code the attributes or restructure into three different sort menus for readability */}
        {playerInfoSortOptions.map((option) => (
          <MenuItem key={option[0]} id={option[0]} onClick={handleClose}>
            {option[1]}
          </MenuItem>
        ))}
        {scoringSortOptions.map((option) => (
          <MenuItem key={option[0]} id={option[0]} onClick={handleClose}>
            {option[1]}
          </MenuItem>
        ))}
        {miscSortOptions.map((option) => (
          <MenuItem key={option[0]} id={option[0]} onClick={handleClose}>
            {option[1]}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default SortMenu;
