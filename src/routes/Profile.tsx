/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { VenueImages, VenueSendModel, VenueStateModel } from '../types/venue';
import Breadcrumbs from '../components/shared/Breadcrumb';
import TextInput from '../components/shared/form-elements/TextInput';

import { createUseStyles } from 'react-jss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import { putVenueAction, saveVenueAction } from '../store/ducks/VenueDuck';
import { UserProfileModel, userProfileSendModel } from '../types/profile';

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
    '& input': {
      borderColor: '#ff4a4a',
    },
  },
  errorBorder: {
    borderColor: '#ff4a4a',
  },
  formLabel: {
    width: '200px',
  },
  formValue: {
    width: 'calc(100% - 200px)',
  },
  dropZoneWrapper: {
    padding: 0,
    '& .dropzone': {
      width: '400px',
    },
  },
  dropZonePreviewImg: {
    width: '140px',
    height: 'calc(140px - 1rem)',
    objectFit: 'cover',
  },
});

const UserProfile: React.FC<{}> = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  };

  const onChangeState = (changedStates: UserProfileModel) => {
    sendData.data = changedStates;
  };

  useEffect(() => {
    onChangeState(values);
  });

  const formNotValid = () => {
    if (!values.password) {
      return true;
    }
    if (!values.newPassword) {
      return true;
    }
    return false;
  };

  const togglePasswordInputs = () => {
    setShowPasswordsForm(true);
  };

  const submitButton = (event: any) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (formNotValid()) {
      return;
    }
    dispatch(
      putVenueAction(userData._id, sendData, {
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

            {!showPasswordsForm ? (
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
            ) : (
              <Card>
                <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${
                    isSubmitted && !values.password ? classes.inputError : ''
                  }`}
                  type="password"
                  value={values.password}
                  handleChange={() =>
                    setValues({ ...values, password: values.password })
                  }
                  label="Old Password"
                />

                <TextInput
                  type="password"
                  value={values.newPassword}
                  label="New Password"
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${
                    isSubmitted && !values.newPassword ? classes.inputError : ''
                  }`}
                  handleChange={() =>
                    setValues({ ...values, newPassword: values.newPassword })
                  }
                />

                <TextInput
                  type="password"
                  value={values.confirmPassword}
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${
                    isSubmitted && !values.confirmPassword
                      ? classes.inputError
                      : ''
                  }`}
                  label="Confirm Password"
                  handleChange={() =>
                    setValues({
                      ...values,
                      confirmPassword: values.confirmPassword,
                    })
                  }
                />
              </Card>
            )}

            <Button
              label={'Submit'}
              type={'submit'}
              onClick={(event) => submitButton(event)}
            />
          </CardBody>
        </Card>
      </Form>
    </div>
  );
};

export default UserProfile;
