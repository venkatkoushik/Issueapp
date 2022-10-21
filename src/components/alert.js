import { Alert, Snackbar } from "@mui/material";
import React from "react";

let Alertsnack = (props) => {
  return <Alert elevation={6} variant="filled" {...props} />;
};

export const Alerts = (props) => {
  const [open, setOpen] = React.useState(props?.open);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props?.onclose();
    setOpen(false);
  };

  return (
    <Snackbar
      id="main_alert_snackbar"
      anchorOrigin={{
        vertical: props?.vertical,
        horizontal: props?.horizontal,
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alertsnack
        id="main_alert"
        severity={props?.severity}
        onClose={handleClose}
      >
        {props?.msg}
      </Alertsnack>
    </Snackbar>
  );
};
