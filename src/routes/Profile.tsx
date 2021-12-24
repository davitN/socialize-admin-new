/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Card, CardBody, CardTitle, Form } from 'reactstrap';
import Breadcrumbs from '../components/shared/Breadcrumb';
import { Password } from 'primereact/password';
import { createUseStyles } from 'react-jss';
import { Button } from 'primereact/button';
import TextInput from '../components/shared/form-elements/TextInput';
import { RootState } from '../store/configureStore';
import { UserProfileModel, UserProfileSendModel } from '../types/profile';
import { changePasswordActionSG } from '../store/ducks/authDuck';

const useStyles = createUseStyles({
  inputBlock: {
    '& label': {
      width: '200px',
      marginBottom: 0,
      textAlign: 'start',
    },
    '& input': {
      width: 'calc(100% - 200px)',
      borderRadius: '0.25rem',
    },
  },
  inputError: {
    borderColor: '#ff4a4a',
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
  formLabel: {
    width: '200px',
  },
  formValue: {
    width: 'calc(100% - 200px)',
  },
});

let errorText = '';

const UserProfile: React.FC<{}> = () => {
  const [formInvalid, setFormInvalid] = useState(false);
  const [oldPassIsValid, setOldPassIsValid] = useState(true);
  const [newPassIsValid, setNewPassIsValid] = useState(true);
  const [confirmPassIsValid, setConfirmPassIsValid] = useState(true);
  const classes = useStyles();
  const [showPasswordsForm, setShowPasswordsForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState<UserProfileModel>({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });
  const { userData } = useSelector((state: RootState) => state.authReducer);

  let sendData: UserProfileSendModel = {
    oldPassword: '',
    password: '',
  };

  const onChangeState = (changedStates: UserProfileSendModel) => {
    sendData = changedStates;
  };

  useEffect(() => {
    onChangeState(values);
  });

  useEffect(() => {
    setFormInvalid(false);
    setNewPassIsValid(true);
    setOldPassIsValid(true);
    setConfirmPassIsValid(true);
  }, [values]);

  const togglePasswordInputs = () => {
    setShowPasswordsForm(true);
  };

  const submitButton = (event: any) => {
    event.preventDefault();

    if (!values.oldPassword || values.oldPassword.length < 6) {
      setOldPassIsValid(false);
      setFormInvalid(true);
      errorText = 'Please enter valid password.';
      return;
    }
    if (!values.password || values.password.length < 6) {
      setNewPassIsValid(false);
      setFormInvalid(true);
      errorText = 'Please enter valid password.';
      return;
    }
    if (!values.confirmPassword || values.confirmPassword.length < 6) {
      setConfirmPassIsValid(false);
      setFormInvalid(true);
      errorText = 'Please repeat passsword.';
      return;
    } else {
      if (values.confirmPassword !== values.password) {
        errorText = 'Passwords do not match!';
        setConfirmPassIsValid(false);
        setFormInvalid(true);
        return;
      }
    }

    if (formInvalid) {
      return;
    }
    dispatch(
      changePasswordActionSG(sendData, {
        success: () => {
          navigate('/dashboard');
        },
        error: (error: any) => {
          if (error.response.status === 409) {
            errorText = 'Old password was incorrect!';
            setOldPassIsValid(false);
          }
        },
      })
    );
    setValues({
      oldPassword: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="page-content">
      <Breadcrumbs
        title={'Welcome to That Social App Premium Dashboard'}
        breadcrumbItem={'User Profile'}
      />
      <Form>
        <Card>
          <CardBody>
            <CardTitle className={'text-start'}>User Information</CardTitle>
            <div className={'mb-3'}>
              <TextInput
                value={userData.firstName}
                label={'First Name'}
                id={'first-name'}
                customClasses={`flex-horizontal ${classes.inputBlock}`}
                readonly={true}
              />
            </div>
            <div className="mb-3">
              <TextInput
                value={userData.lastName}
                id={'last-name'}
                label={'Last Name'}
                customClasses={`flex-horizontal ${classes.inputBlock}`}
                readonly={true}
              />
            </div>
            {!showPasswordsForm && (
              <div className={`mb-3 flex-horizontal`}>
                <label className={`text-start ${classes.formLabel}`}>
                  Password
                </label>
                <div className={`flex-horizontal ${classes.formValue}`}>
                  <Button
                    label="Change Password"
                    onClick={togglePasswordInputs}
                  ></Button>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
        {showPasswordsForm && (
          <Card>
            <CardBody>
              <div className={`flex-horizontal mb-3`}>
                <label
                  className={`${classes.formLabel} text-start`}
                  htmlFor="old-password"
                >
                  Old Password
                </label>
                <div className={`flex-horizontal mb-3 ${classes.formValue}`}>
                  <Password
                    inputId="old-password"
                    className={`${classes.passwordInput} ${
                      !oldPassIsValid ? classes.inputError : ''
                    }`}
                    inputClassName={`${classes.passwordInput} ${
                      !oldPassIsValid ? classes.inputError : ''
                    } `}
                    value={values.oldPassword}
                    onChange={(e) =>
                      setValues({ ...values, oldPassword: e.target.value })
                    }
                    feedback={false}
                    toggleMask
                    required
                  />
                </div>
              </div>
              {!oldPassIsValid && (
                <div className={`md-3 ${classes.errText}`}>
                  <span>{errorText}</span>
                </div>
              )}
              <div className={`flex-horizontal mb-3`}>
                <label
                  className={`${classes.formLabel} text-start`}
                  htmlFor="new-password"
                >
                  New Password
                </label>
                <div className={`flex-horizontal mb-3 ${classes.formValue}`}>
                  <Password
                    inputId="new-password"
                    className={`${classes.passwordInput} ${
                      !newPassIsValid ? classes.inputError : ''
                    }`}
                    inputClassName={`${classes.passwordInput} ${
                      !newPassIsValid ? classes.inputError : ''
                    } `}
                    value={values.password}
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                    feedback={false}
                    toggleMask
                    required
                  />
                </div>
              </div>
              {!newPassIsValid && (
                <div className={`md-3 ${classes.errText}`}>
                  <span>{errorText}</span>
                </div>
              )}
              <div className={`flex-horizontal mb-3`}>
                <label
                  className={`${classes.formLabel} text-start`}
                  htmlFor="confirm-password"
                >
                  Confirm Password
                </label>
                <div className={`flex-horizontal mb-3 ${classes.formValue}`}>
                  <Password
                    inputId="confirm-password"
                    className={`${classes.passwordInput} ${
                      !confirmPassIsValid ? classes.inputError : ''
                    }`}
                    inputClassName={`${classes.passwordInput} ${
                      !confirmPassIsValid ? classes.inputError : ''
                    } `}
                    value={values.confirmPassword}
                    onChange={(e) =>
                      setValues({ ...values, confirmPassword: e.target.value })
                    }
                    feedback={false}
                    toggleMask
                    required
                  />
                </div>
              </div>
              {!confirmPassIsValid && (
                <div className={`md-3 ${classes.errText}`}>
                  <span>{errorText}</span>
                </div>
              )}
              <Button
                label={'Submit'}
                type={'submit'}
                onClick={(event) => submitButton(event)}
              />
            </CardBody>
          </Card>
        )}
      </Form>
    </div>
  );
};

export default UserProfile;
