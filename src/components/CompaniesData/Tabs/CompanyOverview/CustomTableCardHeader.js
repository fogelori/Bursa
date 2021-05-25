import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

function CustomTableCardHeader(props) {
  return (
    <React.Fragment>
      {props.tableHeader && (
        <TableHead>
          <TableRow>
            {props.tableHeader.map((headerName) => (
              <TableCell>{headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
      )}
    </React.Fragment>
  );
}

export default CustomTableCardHeader;
