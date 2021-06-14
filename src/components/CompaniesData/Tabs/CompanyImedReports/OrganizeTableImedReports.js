import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import CompanyImedReportDialog from "./CompanyImedReportDialog";
import ShowIframe from "./ShowIframe";
import { useTranslation } from "react-i18next";

// import { useRouteMatch } from "react-router-dom";

// const NewRenderCell = ({ params }) => {
//   // const [open, setOpen] = useState(false);

//   // const open = false;
//   return (

//   );
// };

// const newRenderCell = (params) => {
//   return <NewRenderCell params={params} />;
// };

export const useCreateColumns = (simpleTable) => {
  // let { url } = useRouteMatch();
  const [open, setOpen] = useState(false);
  const [chosenId, setChosenId] = useState();
  const { t, i18n } = useTranslation();
  const translationObj = t("navBar.companiesData.tabs.immediateReports", {
    returnObjects: true,
  });

  const handleClick = (params) => {
    setOpen(true);
    setChosenId(Number(params.target.id));
    // history.push(`${url}/${params.target.attributes.rptcode.value}`);
  };

  const renderCellFunc = (params) => (
    <React.Fragment>
      <div
        style={{
          cursor: "pointer",
          width: "100%",
          // whiteSpace: "nowrap",
          whiteSpace: "normal",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
        id={params.row.id}
        // rptcode={params.row.rptCode}
        onClick={handleClick}
      >
        {!simpleTable ? (
          params.value
        ) : (
          <React.Fragment>
            <Typography
              variant="subtitle2"
              component="h6"
              id={params.row.id}
              rptcode={params.row.rptCode}
            >
              {params.value}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              id={params.row.id}
              rptcode={params.row.rptCode}
            >
              {params.row.col1}
            </Typography>
          </React.Fragment>
        )}
      </div>
      {open === true && chosenId === params.row.id && (
        // <Switch>
        //   <Route path={`${path}/:rptcode`}>
        <CompanyImedReportDialog
          tabsList={params.row.files}
          title={params.row.col2}
          open={open}
          setOpen={setOpen}
          // previousUrl={url}
        />
        //   </Route>
        // </Switch>
      )}
      {/* {console.log(params)} */}
    </React.Fragment>
  );

  const columns = [
    ...(!simpleTable
      ? [
          {
            field: "col1",
            headerName: translationObj.tableHeaders[0],
            width: 200,
            headerAlign: "center",
          },
        ]
      : []),
    {
      field: "col2",
      headerName: translationObj.tableHeaders[1],
      flex: 1,
      // align: "right",
      headerAlign: "center",
      renderCell: renderCellFunc,
    },
  ];
  return columns;
};

const getFilesObject = (filesArray, rptCode) => {
  const subPath =
    Math.floor(rptCode / 1000) * 1000 +
    1 +
    "-" +
    (Math.floor(rptCode / 1000) + 1) * 1000;
  const files = filesArray.map((file, index) => {
    let fileObj;
    switch (file.Type) {
      case 1:
        fileObj = {
          label: "HTML",
          routeName: "html",
          Component: ShowIframe,
          propsArgs: {
            url: `https://mayafiles.tase.co.il/RHtm/${subPath}/H${rptCode}.htm`,
          },
        };
        break;
      case 2:
        fileObj = {
          label: `PDF${index}`,
          routeName: `pdf${index}`,
          Component: ShowIframe,
          propsArgs: {
            url: `https://mayafiles.tase.co.il/rpdf/${subPath}/P${rptCode}-0${file.Index}.pdf`,
          },
        };
        break;
      case 3:
        // check again https://maya.tase.co.il/reports/details/1290547/3/0
        // because there is txt and excel files
        fileObj = {
          label: "TXT",
          routeName: "txt",
          Component: ShowIframe,
          propsArgs: {
            url: `https://mayafiles.tase.co.il/rtxt/${subPath}/T${rptCode}-0${file.Index}.txt`,
          },
        };
        break;
      case 4:
        fileObj = {
          label: "XBRL",
          routeName: "xbrl",
          Component: ShowIframe,
          propsArgs: {
            url: `https://mayafiles.tase.co.il/xbrl/${subPath}/X${rptCode}.xbrl`,
          },
        };
        break;
      case 6:
        fileObj = {
          label: `PDF${index}`,
          routeName: `pdf${index}`,
          Component: ShowIframe,
          propsArgs: {
            url: `https://mayafiles.tase.co.il/reports/${subPath}/E${rptCode}.pdf`,
          },
        };
        break;
      default:
        fileObj = {};
    }
    return fileObj;
  });
  return files.filter((file) => file);
};

export const transformDateRows = (rows) => {
  return rows.map((row, index) => {
    return {
      id: index + 1,
      col1: new Date(row.PubDate).toLocaleString(),
      col2: row.Subject,
      files: getFilesObject(row.Files, row.RptCode),
      // rptCode: row.RptCode,
    };
  });
};
