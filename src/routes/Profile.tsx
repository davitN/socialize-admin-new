/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import Breadcrumbs from '../components/shared/Breadcrumb';
import { Password } from 'primereact/password';
import { createUseStyles } from 'react-jss';
import { Button } from 'primereact/button';
import { RootState } from '../store/configureStore';
import { UserProfileModel, userProfileSendModel } from '../types/profile';
import { changePasswordActionSG } from '../store/ducks/authDuck';

const useStyles = createUseStyles({
  inputBlock: {
    '& label': {
      width: '200px',
      marginBottom: 0,
      textAlign: 'start',
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
    display: 'flex',
    justifyContent: 'center',
    height: '30px',
    color: '#ff4a4a',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
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
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const { userData } = useSelector((state: RootState) => state.authReducer);

  const sendData: userProfileSendModel = {
    data: null,
    _id: userData._id,
  };

  const onChangeState = (changedStates: UserProfileModel) => {
    sendData.data = changedStates;
  };

  useEffect(() => {
    onChangeState(values);
  });

  const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  const togglePasswordInputs = () => {
    setShowPasswordsForm(true);
  };

  const submitButton = (event: any) => {
    event.preventDefault();

    if (!values.password) {
      setOldPassIsValid(false);
      setFormInvalid(true);
      errorText = 'Please enter valid password.';
      return;
    }
    if (!values.newPassword) {
      setNewPassIsValid(false);
      setFormInvalid(true);
      errorText = 'Please enter valid password.';
      return;
    }

    // Check for safety

    // if (!regEx.test(values.newPassword)) {
    //   setNewPassIsValid(false);
    //   setFormInvalid(true);
    //   errorText = 'Please enter stronger password.';
    //   return;
    // }
    if (!values.confirmPassword) {
      setConfirmPassIsValid(false);
      setFormInvalid(true);
      errorText = 'Please repeat passsword.';
      return;
    } else {
      if (values.confirmPassword !== values.newPassword) {
        errorText = 'Passwords do not match!';
        setConfirmPassIsValid(false);
        setNewPassIsValid(false);
        setFormInvalid(true);
        return;
      }
    }
    errorText = '';

    if (!formInvalid) {
      return;
    }
    dispatch(
      changePasswordActionSG(sendData, {
        success: () => {
          navigate('/dashboard');
        },
        error: (error: any) => console.log(error),
      })
    );
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
            <FormGroup className="mb-3" row>
              <Label
                md="3"
                className="col-form-label text-start"
                htmlFor="first-name"
              >
                First Name
              </Label>
              <Col md="9" className={'flex-horizontal'}>
                <Input
                  className={`form-control`}
                  value={userData.firstName}
                  readOnly={true}
                  id="first-name"
                />
              </Col>
            </FormGroup>
            <FormGroup className="mb-3" row>
              <Label
                md="3"
                className="col-form-label text-start"
                htmlFor="last-name"
              >
                Last Name
              </Label>
              <Col md="9" className={'flex-horizontal'}>
                <Input
                  className={`form-control`}
                  value={userData.lastName}
                  readOnly={true}
                  id="last-name"
                />
              </Col>
            </FormGroup>
            {!showPasswordsForm && (
              <FormGroup className="mb-3" row>
                <Label md="3" className="col-form-label text-start">
                  Password
                </Label>
                <Col md="9" className={'flex-horizontal'}>
                  <Button
                    label="Change Password"
                    onClick={togglePasswordInputs}
                  ></Button>
                </Col>
              </FormGroup>
            )}
          </CardBody>
        </Card>
        {showPasswordsForm && (
          <Card>
            <CardBody>
              {/* <FormGroup className={'flex-horizontal flex-end'}>
                <TextInput
                  type="password"
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${
                    isSubmitted && !values.password ? classes.inputError : ''
                  }`}
                  handleChange={(password) =>
                    setValues({ ...values, password: password })
                  }
                  value={values.password}
                  label="Old Password"
                  required
                />
              </FormGroup> */}

              <FormGroup className="flex-horizontal">
                <Label
                  md="3"
                  className="col-form-label text-start"
                  htmlFor="old-password"
                >
                  Old Password
                </Label>
                <Col
                  md="9"
                  className={`flex-horizontal mb-3 ${classes.inputBlock}`}
                >
                  <Password
                    inputId="old-password"
                    className={`${classes.passwordInput} ${
                      !oldPassIsValid ? classes.inputError : ''
                    }`}
                    inputClassName={`${classes.passwordInput} ${
                      !oldPassIsValid ? classes.inputError : ''
                    } `}
                    value={values.password}
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                    feedback={false}
                    toggleMask
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup className="flex-horizontal">
                <Label
                  md="3"
                  className="col-form-label text-start"
                  htmlFor="new-password"
                >
                  New Password
                </Label>
                <Col md="9" className={`flex-horizontal mb-3 `}>
                  <Password
                    inputId="new-password"
                    className={`${classes.passwordInput} ${
                      !newPassIsValid ? classes.inputError : ''
                    }`}
                    inputClassName={`${classes.passwordInput} ${
                      !newPassIsValid ? classes.inputError : ''
                    } `}
                    value={values.newPassword}
                    onChange={(e) =>
                      setValues({ ...values, newPassword: e.target.value })
                    }
                    feedback={false}
                    toggleMask
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup className="flex-horizontal">
                <Label
                  md="3"
                  className="col-form-label text-start"
                  htmlFor="confirm-password"
                >
                  New Password
                </Label>
                <Col
                  md="9"
                  className={`flex-horizontal mb-3 ${classes.inputBlock}`}
                >
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
                </Col>
              </FormGroup>
              <Button
                label={'Submit'}
                type={'submit'}
                onClick={(event) => submitButton(event)}
              />
              <FormGroup className="flex-horizontal">
                {formInvalid ? (
                  <div className={`md-3 ${classes.errText}`}>
                    <span>{errorText}</span>
                  </div>
                ) : (
                  ''
                )}
              </FormGroup>
            </CardBody>
          </Card>
        )}
      </Form>
    </div>
  );
};

export default UserProfile;
