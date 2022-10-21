import React from "react";

export let AlertContext = React.createContext({
  open: false,
  severity: "success",
  msg: "",
  vertical: "top",
  horizontal: "right",
  onclose: () => null,
  setSnack: () => null,
});
