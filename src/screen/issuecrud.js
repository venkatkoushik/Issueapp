import {
  Alert,
  Button,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import WithAppbar from "../HOC/withappbar";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import routes from "../Routes/routes";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    masterdiv: {
      height: "80vh",
      width: "100vw",
      display: "grid",
      gridTemplateColumns: "1fr",
      gridTemplateRows: "12fr 1fr",
      placeItems: "start",
    },
    toppaper: {
      padding: "10px",
      position: "relative",
      maxHeight: "80vh",
      maxWidth: "80vw",
      marginInline: "auto",
      marginTop: "20px",
    },
    divgrid: {
      margin: "5px 0px",
    },
    addbutton: {
      position: "absolute !important",
      top: "2%",
      right: "2%",
      textTransform: "capitalize",
    },
    heading: {
      gridRow: 1 / 1,
      gridColumn: 1 / 2,
    },
    paper: {
      margin: "5px 8px",
      width: "100%",
      maxHeight: "50vh",
      wordBreak: "break-word",
      textAlign: "left",
      boxShadow: "0 0 11px rgb(33 33 33 / 20%) !important",
    },
    topgrid: {
      borderBottom: `1px solid grey`,
      boxShadow: "0px 1px rgb(0,0,0,0.4) !important",
    },
    grid: {
      padding: "5px",
    },
    cardcontainer: {
      padding: "10px 0px 0px 10px",
      maxHeight: "70vh",
      overflow: "auto",
    },
    description: {
      textIndent: "10px",
    },
  };
});
function Issuecrud() {
  const [state, setState] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    msg: "",
  });
  const navigate = useNavigate();
  React.useEffect(() => {
    try {
      setState(JSON.parse(localStorage.getItem("Totalissue")) ?? []);
    } catch (err) {
      setState([]);
    }
  }, []);
  const handledelete = (value) => {
    debugger;
    let data;
    try {
      data = JSON.parse(localStorage.getItem("Totalissue")) ?? [];
    } catch (err) {
      data = [];
    }
    let result = data.filter((v) => v.id !== value?.id);
    setState(result);
    localStorage.setItem("Totalissue", JSON.stringify(result));
    setAlert({
      ...alert,
      open: true,
      msg: "This issue is deleted successfully",
    });
  };
  const classes = useStyles();
  return (
    <div className={classes.masterdiv}>
      <Paper className={classes.toppaper} elevation="3">
        <div className={classes.divgrid}>
          <Typography className={classes.heading} variant="h5">
            List of Issues
          </Typography>
          <Button
            startIcon={<AddRoundedIcon />}
            onClick={() => navigate(routes.addissue)}
            className={classes.addbutton}
            variant="contained"
          >
            Add Issue
          </Button>
        </div>

        <Grid container className={classes.cardcontainer} flexWrap="wrap">
          {state.map((v) => {
            return (
              <Paper className={classes.paper} elevation="2">
                <Grid container>
                  <Grid
                    container
                    item
                    className={classes.topgrid}
                    justifyContent="space-between"
                    alignItems={"center"}
                    p={1}
                  >
                    <Grid item>
                      <Typography variant="body1">
                        <strong>Issue name :</strong>
                        {v?.issuename}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container item spacing={1}>
                        <Grid item>
                          <Button
                            startIcon={<EditRoundedIcon />}
                            onClick={() =>
                              navigate(routes.addissue, { state: v })
                            }
                            variant="outlined"
                            size="small"
                          >
                            Edit
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            startIcon={<DeleteRoundedIcon />}
                            onClick={() => handledelete(v)}
                            variant="outlined"
                            size="small"
                          >
                            Delete
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container p={1}>
                    <Grid container item className={classes.grid} wrap={"wrap"}>
                      <Typography variant="body2">
                        <strong>Description</strong>
                      </Typography>
                    </Grid>
                    <Grid item md={12}>
                      <Typography
                        paragraph
                        sx={{
                          textIndent: "10px",
                          whiteSpace: "normal !important",
                        }}
                      >
                        {v?.issuedescription}
                      </Typography>
                      {/* <p style={{ whiteSpace: "normal" }}>
                        {v?.issuedescription}
                      </p> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </Grid>
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
      </Paper>
    </div>
  );
}

export default WithAppbar(Issuecrud);
