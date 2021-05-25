import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CustomChart from "./CustomChart";

const useStyles = makeStyles((theme) => ({
  tableCellStyle: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  tableCellIconStyle: {
    flexBasis: "20%",
  },
}));

function CustomTableCardRow(props) {
  const classes = useStyles();

  return (
    <TableRow>
      {props.selectedProperties.map((selectedproperty) => (
        <TableCell>
          <Box className={classes.tableCellStyle}>
            {props.row[selectedproperty.propertyIconComponentName] && (
              <Box className={classes.tableCellIconStyle}>
                {props.row[selectedproperty.propertyIconComponentName]}
              </Box>
            )}
            <Box>
              {props.row[selectedproperty.propertyHeaderName] && (
                <Typography variant="subtitle2" component="h6" gutterBottom>
                  {props.row[selectedproperty.propertyHeaderName]}
                </Typography>
              )}
              <Typography variant="body2" component="p">
                {props.row[selectedproperty.propertyBodyName]}
              </Typography>
            </Box>
            {props.row[selectedproperty.propertyChart] && (
              <Box ml="auto" width="50%" flexShrink="0">
                <CustomChart
                  chartData={props.row[selectedproperty.propertyChart]}
                />
              </Box>
              /* <StockChart xData={} yData={} /> */
            )}
          </Box>
        </TableCell>
      ))}
    </TableRow>
  );
}

export default CustomTableCardRow;
