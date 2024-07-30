import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import TableCell from "@mui/material/TableCell";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";

function TableColumn({
  stat,
  statName,
  setSortType,
  setSortDirection,
  sortType,
}) {
  const [arrowType, setArrowType] = useState(null);
  const isSortable = setSortType != null && setSortDirection != null;

  useEffect(() => {
    if (setSortDirection == null) {
      return;
    }
    setSortDirection(arrowType == true ? "asc" : "desc");
  }, [arrowType]);

  useEffect(() => {
    if (sortType != stat) {
      setArrowType(null);
    }
  }, [sortType]);

  function handleSortArrowClick() {
    if (arrowType == null) {
      setArrowType(false);
      setSortType(stat);
      setSortDirection("desc");
    } else {
      setArrowType(!arrowType);
    }
  }

  return (
    <TableCell align="right">
      <Typography>{statName}</Typography>
      {isSortable && arrowType == null && (
        <HorizontalRuleIcon
          onClick={handleSortArrowClick}
          className="sortArrow"
          fontSize="xsmall"
        />
      )}
      {isSortable && arrowType == true && (
        <ArrowDropUpIcon
          onClick={handleSortArrowClick}
          className="sortArrow"
          fontSize="medium"
        />
      )}
      {isSortable && arrowType == false && (
        <ArrowDropDownIcon
          onClick={handleSortArrowClick}
          className="sortArrow"
          fontSize="medium"
        />
      )}
    </TableCell>
  );
}

export default TableColumn;
