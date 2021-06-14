import React from "react";
import "./CreateTable.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  DataGrid,
  // GridToolbar,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
  GridToolbarExport,
  // GridRowsProp,
} from "@material-ui/data-grid";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "0px",
  },
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridColumnsToolbarButton />
      <GridFilterToolbarButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function CreateTable(props) {
  const { t } = useTranslation();
  const translationObj = t("navBar.companiesData.components.createTable", {
    returnObjects: true,
  });
  const classes = useStyles();

  // const additionalProps = props.rows.length > 30 && {
  //   components: {
  //     Toolbar: CustomToolbar,
  //   },
  // };

  /* React material table automatic page size
https://stackoverflow.com/questions/57787218/react-material-table-automatic-page-size
*/

  console.log("CreateTable Rendered");
  return (
    // <div
    //   className="createTable"
    //   style={{
    //     width: "100%",
    //     textAlign: "right",
    //     flexGrow: 1,
    //     overflowY: "auto",
    //   }}
    // >
    <DataGrid
      // autoPageSize
      autoHeight // accidentally make the header not sticky... MuiDataGrid-window should be overflow-y:auto
      rowHeight={25}
      // autoPageSize
      hideFooterSelectedRowCount
      // disableExtendRowFullWidth
      // disableSelectionOnClick
      // hideFooterRowCount
      // disableExtendRowFullWidth
      showColumnRightBorder
      showCellRightBorder
      columns={props.columns}
      rows={props.rows}
      disableColumnMenu
      // hideFooterPagination
      hideFooter
      headerHeight={0}
      // components={{
      //   Toolbar: CustomToolbar,
      // }}
      className={classes.root}
      localeText={{
        ...translationObj,
      }}
      {...(!props.isSimpleTable && {
        components: { Toolbar: CustomToolbar },
        hideFooter: false,
        autoPageSize: false,
        headerHeight: 56,
      })}
    />
    // </div>
  );
}

export default React.memo(CreateTable);
