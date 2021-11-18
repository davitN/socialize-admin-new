import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
const useStyles = createUseStyles({
  container: {
    width: "100%",
    height: "80px",
    backgroundColor: "white",
  },
});
function Header() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Link to="/companies">companies</Link> | <Link to="/app-users">app users</Link> | <Link to="/auth">log in</Link> |{" "}
      <Link to="/dashboard">dashboard</Link>
    </div>
  );
}

export default Header;
