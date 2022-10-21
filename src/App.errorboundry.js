import { Grid, Typography } from "@mui/material";
import React, { Component } from "react";
import { withStyles } from "@mui/styles";

const styles = {
  div: {
    height: "100vh",
  },
};

class Apperrorboundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iserror: false,
    };
  }

  componentDidCatch(e) {
    this.setState({ iserror: true });
    console.log(e);
  }
  render() {
    console.log(this.props.classes);
    const classes = this.props.classes;
    return (
      <div>
        {this.state.iserror ? (
          <div>
            <Grid
              className={classes.div}
              container
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid item>
                <Typography variant="h2">500! something went wrong</Typography>
              </Grid>
            </Grid>
          </div>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Apperrorboundry);
