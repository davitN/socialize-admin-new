import React from "react";
import { createUseStyles } from "react-jss";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";

const useStyles = createUseStyles({
  container: {
    height: "100vh",
  },
  subContainer: {
    height: "calc(100vh - 80px)",
  },
  flex1: {
    flex: 1,
  },
});

function Layout() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Header />
      <div className={"p-grid p-mt-0 " + classes.subContainer}>
        <div>
          <SideNav />
        </div>
        <div className={classes.flex1}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
