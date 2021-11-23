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
    flex: 1
  },
  mainWrapper: {
    flex: 1,
    overflow: 'hidden'
  }
});

function Layout() {
  const classes = useStyles();
  return (
    <div className={`flex-horizontal horizontal-filled ${classes.container}`}>
      <SideNav />
      <div className={`flex-vertical vertical-filled ${classes.subContainer}`}>
        <Header />
        <div className={`${classes.mainWrapper}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
