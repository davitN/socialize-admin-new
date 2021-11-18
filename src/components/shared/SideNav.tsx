import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: { height: "100%", width: "200px", backgroundColor: "#2A3042" },
});

export default function SideNav() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className="p-col">1</div>
      <div className="p-col">2</div>
    </div>
  );
}
