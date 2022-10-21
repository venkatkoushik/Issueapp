import {
  Alert,
  Button,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WithAppbar from "../HOC/withappbar";
import routes from "../Routes/routes";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
const useStyles = makeStyles({
  paper: {
    padding: "10px",
    gridRow: "1/1",
    gridColumn: "2/3",
    position: "relative !important",
  },
  parentdiv: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr 1fr",
    gridTemplateRows: "7fr 1fr",
    margin: "20px",
  },
  button: {
    position: "absolute !important",
    top: "1%",
    left: "1%",
  },
  heading: {},
  divgrid: {
    margin: "0px 0px 10px 0px  ",
  },
  textarea: {
    width: "40vw",
  },
});

function uid() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    ""
  );
}
function Addisue() {
  const [state, setState] = React.useState({
    name: "",
    description: "",
    isedit: false,
    error: {
      totalerror: false,
      nameerror: false,
      descriptionerror: false,
      namemsg: "",
      descmsg: "",
    },
  });
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    open: false,
    msg: "",
  });
  const location = useLocation();
  React.useEffect(() => {
    setState({
      ...state,
      name: location.state?.issuename ?? "",
      description: location.state?.issuedescription ?? "",
      isedit: Boolean(location.state?.issuename) && true,
    });
  }, []);
  const handlechange = (name, value) => {
    setState({ ...state, [name]: value });
  };
  const validation = () => {
    let msg = "This field is required";
    let nameerror = state.name?.length === 0;
    let descerror = state.description?.length === 0;
    setState({
      ...state,
      error: {
        ...state.error,
        totalerror: nameerror || descerror,
        nameerror: nameerror,
        namemsg: nameerror ? msg : " ",
        descriptionerror: descerror,
        descmsg: descerror ? msg : " ",
      },
    });
    return nameerror || descerror;
  };

  const handlesubmit = () => {
    debugger;
    if (validation()) {
      return;
    }
    let pastdata;
    try {
      pastdata = JSON.parse(localStorage.getItem("Totalissue")) ?? [];
    } catch (err) {
      pastdata = [];
    }
    let freshdata = {
      issuename: state.name,
      issuedescription: state.description,
      id: uid(),
    };
    pastdata.push(freshdata);
    localStorage.setItem("Totalissue", JSON.stringify(pastdata));
    setState({
      ...state,
      name: "",
      description: "",
      isedit: false,
      error: {
        totalerror: false,
        nameerror: false,
        descriptionerror: false,
        namemsg: "",
        descmsg: "",
      },
    });
    setAlert({ ...alert, open: true, msg: "The issue added successfully" });
  };
  const handleeditsubmit = () => {
    debugger;
    if (validation()) {
      return;
    }
    let pastdata;
    try {
      pastdata = JSON.parse(localStorage.getItem("Totalissue")) ?? [];
    } catch (err) {
      pastdata = [];
    }

    let freshdata = {
      issuename: state.name,
      issuedescription: state.description,
      id: uid(),
    };
    let result = pastdata.filter((v) => v?.id !== location.state?.id);
    result.push(freshdata);
    localStorage.setItem("Totalissue", JSON.stringify(result));
    // navigate(routes.home);
    setAlert({ ...alert, open: true, msg: "The issue is edited successfully" });
    setState({
      ...state,
      name: "",
      description: "",
      isedit: false,
      error: {
        totalerror: false,
        nameerror: false,
        descriptionerror: false,
        namemsg: "",
        descmsg: "",
      },
    });
  };
  const classes = useStyles();
  return (
    <div className={classes.parentdiv}>
      <Paper className={classes.paper}>
        <div className={classes.divgrid}>
          <Typography className={classes.heading} variant="h5">
            Add Issues
          </Typography>
          <IconButton
            onClick={() => navigate(routes.home)}
            className={classes.button}
          >
            <ArrowBackRoundedIcon />
          </IconButton>
        </div>
        <Grid container direction={"column"} rowSpacing={1}>
          <Grid item>
            <TextField
              required
              label="issuename"
              value={state.name}
              onChange={(e) => {
                handlechange("name", e.target.value);
              }}
              error={state?.error?.nameerror ?? false}
              helperText={
                state?.error?.namemsg ??
                "Description must be in markdown format "
              }
              size="small"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="description"
              value={state.description}
              onChange={(e) => {
                handlechange("description", e.target.value);
              }}
              error={state?.error?.descriptionerror ?? false}
              helperText={state?.error?.descmsg ?? " "}
              size="large"
              multiline
              maxRows={15}
              minRows={10}
              className={classes.textarea}
            />
          </Grid>
          <Grid container item justifyContent={"center"}>
            <Grid item>
              <Button
                onClick={state.isedit ? handleeditsubmit : handlesubmit}
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false, msg: "" })}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false, msg: "" })}
          severity="success"
          elevation={10}
        >
          {alert.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default WithAppbar(Addisue);
