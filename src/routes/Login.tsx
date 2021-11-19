import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createUseStyles } from "react-jss";
import profile from "../assets/images/profile-img.png";
import logo from "../assets/images/logo.svg";
import { checkSignedInAction } from "../store/ducks/authDuck";
import notificationService from "../services/notification.service";
import { startLoader } from "../services/loader.service";

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";

import { Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// უბრალოდ მაგალითი
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

  // handleValidSubmit
  const login = (event: any, values: any) => {};

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <p>Sign in to continue.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img src={logo} alt="" className="rounded-circle" height="34" />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e: any, v: any) => {
                        login(e, v);
                      }}
                    >
                      {true ? <Alert color="danger">{"error"}</Alert> : null}

                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          value="admin@themesbrand.com"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          value="123456"
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>
                      <div className="mt-3 d-grid">
                        <button className="btn btn-primary btn-block" type="submit">
                          Log In
                        </button>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;
