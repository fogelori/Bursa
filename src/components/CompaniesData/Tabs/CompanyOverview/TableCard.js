import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import CustomCardHeader from "./CustomCardHeader";
import CustomTableCardHeader from "./CustomTableCardHeader";
import CustomTableCardRow from "./CustomTableCardRow";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./TableCard.css";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  tableBody: {
    height: "20%",
  },
  boxScrollBar: {
    height: "100%",
    overflowY: "auto",
    flexGrow: "1",
  },
}));

function PerfectScrollbarCustom({ children, ...rest }) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  if (smallScreen) {
    return children;
  } else {
    return <PerfectScrollbar {...rest}>{children}</PerfectScrollbar>;
  }
}

function TableCard(props) {
  const classes = useStyles();

  return (
    <Paper elevation={1} component={Card} className={classes.root}>
      <CustomCardHeader cardHeader={props.cardHeader} />
      <Divider />
      <Box className={classes.boxScrollBar}>
        <PerfectScrollbarCustom>
          <Table className={classes.tableBody}>
            <CustomTableCardHeader tableHeader={props.tableHeader} />
            <TableBody>
              {props.tableRows.map((row) => (
                <CustomTableCardRow
                  row={row}
                  selectedProperties={props.selectedProperties}
                />
              ))}
            </TableBody>
          </Table>
        </PerfectScrollbarCustom>
      </Box>
    </Paper>
  );
}

export default TableCard;
