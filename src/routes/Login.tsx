/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, CardBody, Card, Alert, Container, Form } from 'reactstrap';
import { Button } from 'primereact/button';
import TextInput from '../components/shared/form-elements/TextInput';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import profile from '../assets/images/profile-img.png';
import logo from '../assets/images/logo.svg';
import {
  signInActionSG,
  summitSignInOTP_ActionSG,
} from '../store/ducks/authDuck';
import notificationService from '../services/notification.service';
import { RootState } from '../store/configureStore';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  inputError: {
    '& input': {
      borderColor: '#ff4a4a',
    },
  },
});

const Login: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>('');
  const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordIsInvalid, setPasswordIsInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [smsIsSent, setSmsIsSent] = useState<boolean>(false);
  const [smsCode, setSmsCode] = useState<string>('');
  const [smsCodeIsInvalid, setSmsCodeIsInvalid] = useState<boolean>(false);
  const from = location.state?.from?.pathname || '/dashboard';
  const { isSignedIn } = useSelector((state: RootState) => state.mainReducer);
  console.log(isSignedIn);
  const classes = useStyles();

  const submitHandler = (event: any) => {
    event.preventDefault();
    if (smsIsSent) {
      submitOTP(event);
    } else {
      login(event);
    }
  };

  // handleValidSubmit
  const login = (event: any) => {
    console.log(event);
    dispatch(
      signInActionSG(
        { email, password },
        {
          success: () => {
            setErrorMessage('');
            setSmsIsSent(true);
            notificationService.info("sms code's been sent to your phone");
          },
          error: (message: string) => {
            if (!email) {
              setEmailIsInvalid(true);
              setErrorMessage(message);
            }
            if (!password) {
              setPasswordIsInvalid(true);
              setErrorMessage(message);
            }
          },
        }
      )
    );
  };

  const submitOTP = (event: any) => {
    event.preventDefault();
    console.log(event);
    dispatch(
      summitSignInOTP_ActionSG(smsCode, {
        success: () => {
          navigate(from, { replace: true });
        },
        error: (message: string) => {
          if (!smsCode) {
            setSmsCodeIsInvalid(true);
            setErrorMessage(message);
            return;
          }
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
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form className="form-horizontal">
                      {errorMessage ? (
                        <Alert color="danger">{errorMessage}</Alert>
                      ) : null}
                      {smsIsSent ? (
                        <div className="mb-3">
                          <TextInput
                            value={smsCode}
                            type={'text'}
                            label={'Code'}
                            placeholder={'Enter Code'}
                            customClasses={
                              smsCodeIsInvalid ? classes.inputError : ''
                            }
                            required
                            handleChange={(event) => {
                              setSmsCode(event);
                            }}
                          />
                        </div>
                      ) : (
                        <>
                          <div className="mb-3">
                            <TextInput
                              value={email}
                              type={'email'}
                              label={'Email'}
                              placeholder={'Enter Email'}
                              customClasses={
                                emailIsInvalid ? classes.inputError : ''
                              }
                              required
                              handleChange={(event) => {
                                setEmail(event);
                              }}
                            />
                          </div>

                          <div className="mb-3">
                            <TextInput
                              value={password}
                              type={'password'}
                              label={'Password'}
                              placeholder={'Enter Password'}
                              customClasses={
                                passwordIsInvalid ? classes.inputError : ''
                              }
                              required
                              handleChange={(event) => {
                                setPassword(event);
                              }}
                            />
                          </div>
                        </>
                      )}
                      <div className="mt-4 d-grid">
                        <Button
                          className={'btn btn-primary btn-block'}
                          label={'Log In'}
                          type={'submit'}
                          onClick={submitHandler}
                        />
                      </div>
                    </Form>
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
