import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CustomTabs from "../../CustomTabs";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: "flex",
  },
  title: {
    paddingTop: theme.spacing(1),
    flex: 1,
  },
  paper: {
    height: `calc(100% - ${theme.spacing(8)}px)`,
  },
}));

function CompanyImedReportDialog(props) {
  // const dialogStore = useDialogState();
  // const setDialogStore = useDialogUpdater();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // const [open, setOpen] = React.useState(true);

  // const handleClickOpen = () => {
  //   props.setOpen(true);
  // };

  const handleClose = () => {
    props.setOpen(false);
    // history.push(`${props.previousUrl}`);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      scroll="paper"
      fullWidth
      fullScreen={fullScreen}
      maxWidth={false}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      classes={{
        paper: classes.paper,
      }}
    >
      <DialogTitle
        id="scroll-dialog-title"
        disableTypography
        className={classes.dialogTitle}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" className={classes.title}>
          {props.title}
        </Typography>
      </DialogTitle>
      <DialogContent dividers={true}>
        <CustomTabs tabsList={props.tabsList} disableRouter />
      </DialogContent>
    </Dialog>
  );
}

export default CompanyImedReportDialog;
