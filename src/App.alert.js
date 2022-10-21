/**
 * @author AUTHOR_NAME
 * @email AUTHOR_EMAIL
 * @create date
 * @modify date
 * @desc Providing the AlertContext from (/src/context/) which is used by /src/App.js.
 */

import React, { useState } from "react";
import { Alerts as Alert } from "./components/alert";
import { AlertContext } from "./context";

function AppAlert(props) {
  const [state, setState] = useState({
    open: false,
    severity: "success",
    msg: "",
    vertical: "top",
    horizontal: "right",
  });

  const close = () => {
    setState({
      open: false,
      severity: "success",
      msg: "",
      vertical: "top",
      horizontal: "right",
    });
  };

  const set = (props) => {
    debugger;
    setState({ ...props });
  };

  return (
    <AlertContext.Provider
      value={{
        ...state,
        onclose: close,
        setSnack: set,
      }}
    >
      {state.open ? <Alert {...state} onclose={close} /> : ""}
      {props.children}
    </AlertContext.Provider>
  );
}

export default AppAlert;
