import { AppBar, Typography } from "@mui/material";

const WithAppbar = (Component) => (props) => {
  return (
    <div>
      <AppBar position="static">
        <Typography
          variant="h4"
          style={{ margin: "5px", fontFamily: "roboto" }}
        >
          {" "}
          Issue App
        </Typography>
      </AppBar>
      <Component />
    </div>
  );
};
export default WithAppbar;
