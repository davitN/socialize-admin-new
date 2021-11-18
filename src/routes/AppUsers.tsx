import React, { useState } from "react";
import { createUseStyles } from "react-jss";

const F1: React.FC<{ fff: any }> = ({ fff }) => {
  return <div onClick={() => fff("davit")}>some text</div>;
};

const useStyles = createUseStyles({
  container: {
    backgroundColor: "red",
  },
});

function AppUsers() {
  const [name, setName] = useState("non");
  const classes = useStyles();

  const func = () => {
    setName("asjdnasjkdn");
  };

  return (
    <div onClick={() => func()} className={classes.container}>
      {name}
      {/* <F1 fff={func} /> */}
    </div>
  );
}

export default AppUsers;
