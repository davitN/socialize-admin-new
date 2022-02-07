/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, CardBody, Card, Alert, Container, Form } from 'reactstrap';
import { Button } from 'primereact/button';
import TextInput from '../components/shared/form-elements/TextInput';
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import profile from '../assets/images/profile-img.png';
import logo from '../assets/images/logo.svg';
import {
  requestRecoverPasswordActionSG,
  requestResetPasswordActionSG,
  signInActionSG,
  summitSignInOTP_ActionSG,
} from '../store/ducks/authDuck';
import notificationService from '../services/notification.service';
// import { RootState } from '../store/configureStore';
import { createUseStyles } from 'react-jss';
import { Password } from 'primereact/password';

const useStyles = createUseStyles({
  inputError: {
    '& input': {
      borderColor: '#ff4a4a',
    },
  },
  resetButton: {
    cursor: 'pointer',
    color: 'blue',
  },
  passwordInput: {
    width: '100% !important',
    lineHeight: 'normal !important',
  },
  errText: {
    justifyContent: 'center',
    color: '#ff4a4a',
    width: '100%',
    marginTop: '-1.5rem',
    marginBottom: '0.5rem',
  },
  passwordHint: {
    width: 200,
    marginLeft: 'auto',
    marginBottom: -5,
    listStyle: 'disc',
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
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [successfullySent, setSuccessfullySent] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>('');
  const from = location.state?.from?.pathname || '/dashboard';
  const [searchParams] = useSearchParams({
    token: '',
    type: '',
    email: '',
  });
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [newPassIsValid, setNewPassIsValid] = useState(true);
  const [confirmPassIsValid, setConfirmPassIsValid] = useState(true);
  const classes = useStyles();
  const [content, setContent] = useState(<div />);

  const submitHandler = (event: any) => {
    event.preventDefault();
    if (smsIsSent) {
      submitOTP(event);
    } else if (!smsIsSent && forgotPassword) {
      requestResetPassword(event);
    } else if (searchParams.get('token')) {
      resetPassword(event);
    } else {
      login(event);
    }
  };

  // handleValidSubmit
  const login = (event: any) => {
    event.preventDefault();
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

  const requestResetPassword = (event: any) => {
    event.preventDefault();
    dispatch(
      requestResetPasswordActionSG(resetEmail, {
        success: () => {
          setSuccessfullySent(true);
        },
        error: (message: string) => {
          setEmailIsInvalid(true);
          setErrorMessage(message);
          return;
        },
      })
    );
  };

  const resetPassword = (event: any) => {
    event.preventDefault();

    if (!newPassword) {
      setNewPassIsValid(false);
      setErrorMessage('Please enter valid password.');
      return;
    }
    if (!confirmPassword) {
      setConfirmPassIsValid(false);
      setErrorMessage('Please repeat passsword.');
      return;
    } else {
      if (confirmPassword !== newPassword) {
        setErrorMessage('Passwords do not match!');
        setConfirmPassIsValid(false);
        return;
      }
    }
    dispatch(
      requestRecoverPasswordActionSG(newPassword, searchParams.get('token'), {
        success: () => {
          navigate({ search: '' }, { replace: true });
        },
        error: (message: string) => {
          setErrorMessage(message);
        },
      })
    );
  };

  useEffect(() => {
    if (successfullySent) {
      setContent(
        <div className={'flex-horizontal'}>
          <span>Confirmation link has been sent to your email!</span>
        </div>
      );
    } else if (smsIsSent) {
      setContent(
        <div className="mb-3">
          <TextInput
            value={smsCode}
            type={'text'}
            label={'Code'}
            placeholder={'Enter Code'}
            customClasses={smsCodeIsInvalid ? classes.inputError : ''}
            required
            handleChange={(event) => {
              setSmsCode(event);
            }}
          />
        </div>
      );
    } else if (!smsIsSent && forgotPassword) {
      setContent(
        <div className="mb-3">
          <TextInput
            value={resetEmail}
            type={'email'}
            label={'Enter Email'}
            placeholder={'Enter Email'}
            customClasses={emailIsInvalid ? classes.inputError : ''}
            required
            handleChange={(event) => {
              setResetEmail(event);
            }}
          />
        </div>
      );
    } else if (searchParams.get('token')) {
      setContent(
        <>
          <div className={`mb-3`}>
            <label className={`mb-3`} htmlFor="new-password">
              New Password
            </label>
            <div className={`mb-3`}>
              <Password
                inputId="new-password"
                className={`${classes.passwordInput} ${
                  !newPassIsValid ? classes.inputError : ''
                }`}
                inputClassName={`${classes.passwordInput} ${
                  !newPassIsValid ? classes.inputError : ''
                } `}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                content={() => (
                  <ul className={classes.passwordHint}>
                    <li>At least one lowercase</li>
                    <li>At least one uppercase</li>
                    <li>At least one numeric</li>
                    <li>Minimum 6 characters</li>
                  </ul>
                )}
                toggleMask
                required
              />
            </div>
          </div>
          <div className={` mb-3`}>
            <label className={`mb-3`} htmlFor="confirm-password">
              Confirm Password
            </label>
            <div className={`mb-3`}>
              <Password
                inputId="confirm-password"
                className={`${classes.passwordInput} ${
                  !confirmPassIsValid ? classes.inputError : ''
                }`}
                inputClassName={`${classes.passwordInput} ${
                  !confirmPassIsValid ? classes.inputError : ''
                } `}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                feedback={false}
                toggleMask
                required
              />
            </div>
          </div>
        </>
      );
    } else if (!forgotPassword && !searchParams.get('token')) {
      setContent(
        <>
          <div className="mb-3">
            <TextInput
              value={email}
              type={'email'}
              label={'Email'}
              placeholder={'Enter Email'}
              customClasses={emailIsInvalid ? classes.inputError : ''}
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
              customClasses={passwordIsInvalid ? classes.inputError : ''}
              required
              handleChange={(event) => {
                setPassword(event);
              }}
            />
          </div>
        </>
      );
    }
  }, [
    successfullySent,
    forgotPassword,
    searchParams,
    password,
    email,
    resetEmail,
    smsCode,
    newPassword,
    confirmPassword,
    smsIsSent,
  ]);

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

                      {content}

                      {!successfullySent && (
                        <div className="mt-4 d-grid">
                          <Button
                            className={'btn btn-primary btn-block'}
                            label={forgotPassword ? 'Reset Password' : 'Log In'}
                            type={'submit'}
                            onClick={submitHandler}
                          />
                        </div>
                      )}

                      {!smsIsSent &&
                        !forgotPassword &&
                        !searchParams.get('token') && (
                          <div
                            className="mt-2 flex-horizontal"
                            onClick={() => setForgotPassword(true)}
                          >
                            <span className={classes.resetButton}>
                              Forgot your password?
                            </span>
                          </div>
                        )}
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
