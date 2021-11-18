import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createUseStyles } from "react-jss";
import { Chips } from "primereact/chips";
import { checkSignedInAction } from "../store/ducks/authDuck";
import notificationService from "../services/notification.service";
import { startLoader } from "../services/loader.service";

const useStyles = createUseStyles({
  myButton: {
    color: "green",
    margin: {
      // jss-plugin-expand gives more readable syntax
      top: 5, // jss-plugin-default-unit makes this 5px
      right: 0,
      bottom: 0,
      left: "1rem",
    },
    "& span": {
      // jss-plugin-nested applies this to a child span
      fontWeight: "bold", // jss-plugin-camel-case turns this into 'font-weight'
    },
  },
  myLabel: {
    fontStyle: "italic",
  },
  marginBottom200: {
    marginBottom: 200,
  },
});

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [values1, setValues1] = useState<any>([]);
  const [values2, setValues2] = useState<any>([]);
  const [values3, setValues3] = useState<any>([]);

  useEffect(() => {
    dispatch(checkSignedInAction());
    setTimeout(() => {
      // notificationService.success("haiaa");
      // startLoader();
    }, 3000);
  }, [dispatch]);

  const customChip = (item: any) => {
    return (
      <div>
        <span>{item} - (active) </span>
        <i className="pi pi-user-plus" style={{ fontSize: "14px" }}></i>
      </div>
    );
  };

  return (
    <div>
      <button className={classes.myButton}>
        <span className={classes.myLabel}>button</span>
      </button>

      <div className={"card p-fluid " + classes.marginBottom200}>
        <h5>Basic</h5>
        <Chips value={values1} onChange={(e) => setValues1(e.value)} />

        <h5>Comma Separator</h5>
        <Chips value={values2} onChange={(e) => setValues2(e.value)} separator="," />

        <h5>Template</h5>
        <Chips value={values3} onChange={(e) => setValues3(e.value)} max={5} itemTemplate={customChip}></Chips>
      </div>
    </div>
  );
};

export default Login;
