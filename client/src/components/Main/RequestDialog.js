import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  FormGroup,
  RadioGroup,
  Radio,
  Box,
} from "@material-ui/core";

export default function FormDialog({ requestData }) {
  const [open, setOpen] = useState(false);
  const [desiredTypes, setDesiredTypes] = useState({
    byFemale: true,
    byLastName: true,
    byAge: true,
  });
  const [requestButtonStatus, setRequestButtonStatus] = useState(true);

  useEffect(() => {
    setRequestButtonStatus(
      desiredTypes.byAge | desiredTypes.byFemale | desiredTypes.byLastName
    );
  }, [desiredTypes.byAge, desiredTypes.byFemale, desiredTypes.byLastName]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setDesiredTypes({
      ...desiredTypes,
      [event.target.name]: event.target.checked,
    });
  };

  const handleRequest = () => {
    setOpen(false);
    requestData({ desiredTypes });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Request Data
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Box px={2} py={1}>
          <DialogTitle id="form-dialog-title">Request Form</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select necessary statistic types
            </DialogContentText>
            <Box mx={2}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={desiredTypes.byFemale}
                      onChange={handleChange}
                      name="byFemale"
                      color="primary"
                    />
                  }
                  label="By female"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={desiredTypes.byLastName}
                      onChange={handleChange}
                      name="byLastName"
                      color="primary"
                    />
                  }
                  label="By last name"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={desiredTypes.byAge}
                      onChange={handleChange}
                      name="byAge"
                      color="primary"
                    />
                  }
                  label="By age"
                />
              </FormGroup>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={!requestButtonStatus}
              onClick={() => handleRequest()}
              color="primary"
            >
              Request
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
