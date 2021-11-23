import React from "react";
import { createUseStyles } from "react-jss";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";

const useStyles = createUseStyles({
  container: {
    height: "100vh",
  },
  subContainer: {
    flex: 1,
  },
  mainWrapper: {
    flex: 1,
    overflow: "hidden",
  },
});

function Layout() {
  const location = useLocation();
  const classes = useStyles();
  return (
    <>
      {location.pathname === "/auth" ? (
        <Outlet />
      ) : (
        <div className={`flex-horizontal horizontal-filled ${classes.container}`}>
          <SideNav />
          <div className={`flex-vertical vertical-filled ${classes.subContainer}`}>
            <Header />
            <div className={`${classes.mainWrapper}`}>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
