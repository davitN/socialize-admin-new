import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUseStyles } from "react-jss";
import profile from "../assets/images/profile-img.png";
import logo from "../assets/images/logo.svg";
import { checkSignedInAction, signInActionSG, summitSignInOTP_ActionSG } from "../store/ducks/authDuck";
import notificationService from "../services/notification.service";
import { startLoader } from "../services/loader.service";

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";

import { Link, useNavigate, useLocation } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [smsIsSent, setSmsIsSent] = useState<boolean>(false);
  const [smsCode, setSmsCode] = useState<string>("");
  const from = location.state?.from?.pathname || "/dashboard";

  // handleValidSubmit
  const login = (event: any, values: any) => {
    dispatch(
      signInActionSG(
        { email, password },
        {
          success: () => {
            setErrorMessage("");
            setSmsIsSent(true);
            notificationService.info("sms code's been sent to your phone");
          },
          error: (message: string) => {
            setErrorMessage(message);
          },
        }
      )
    );
  };

  const submitOTP = (event: any, values: any) => {
    dispatch(
      summitSignInOTP_ActionSG(smsCode, {
        success: () => {
          navigate(from, { replace: true });
        },
        error: (message: string) => {
          setErrorMessage(message);
        },
      })
    );
  };

  return (
    <>
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
                        smsIsSent ? submitOTP(e, v) : login(e, v);
                      }}
                    >
                      {errorMessage ? <Alert color="danger">{errorMessage}</Alert> : null}
                      {smsIsSent ? (
                        <div className="mb-3">
                          <AvField
                            name="code"
                            label="code"
                            value={smsCode}
                            type="text"
                            placeholder="Enter Code"
                            required
                            onChange={(event: any) => {
                              setSmsCode(event.target.value);
                            }}
                          />
                        </div>
                      ) : (
                        <>
                          <div className="mb-3">
                            <AvField
                              name="email"
                              label="Email"
                              value={email}
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              required
                              onChange={(event: any) => {
                                setEmail(event.target.value);
                              }}
                            />
                          </div>

                          <div className="mb-3">
                            <AvField
                              name="password"
                              label="Password"
                              value={password}
                              type="password"
                              placeholder="Enter Password"
                              required
                              onChange={(event: any) => {
                                setPassword(event.target.value);
                              }}
                            />
                          </div>
                        </>
                      )}
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
    </>
  );
};

export default Login;
