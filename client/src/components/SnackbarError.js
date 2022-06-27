import React from "react";
import { Button, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  snackbar: {
    backgroundColor: "red",
    fontWeight: "bold",
  },
  icon: {
    color: "white",
  },
}));

const SnackbarError = ({ setSnackBarOpen, errorMessage, snackBarOpen }) => {
  const classes = useStyles();
  return (
    <Snackbar
      open={snackBarOpen}
      onClose={() => setSnackBarOpen(false)}
      message={errorMessage || "Sorry, an error occured. Please try again"}
      action={
        <React.Fragment>
          <Button
            className={classes.icon}
            size="small"
            onClick={() => setSnackBarOpen(false)}
          >
            <Close color="secondary" />
          </Button>
        </React.Fragment>
      }
      ContentProps={{
        classes: {
          root: classes.snackbar,
        },
      }}
    />
  );
};

export default SnackbarError;
