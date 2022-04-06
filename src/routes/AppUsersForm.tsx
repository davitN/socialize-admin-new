/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { Card, CardBody, CardTitle } from 'reactstrap';
// import Breadcrumbs from '../components/shared/Breadcrumb';

import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TextInput from '../components/shared/form-elements/TextInput';
import { getSelectedAppUserActionSG } from '../store/ducks/appUsersDuck';
import { AppUsersDataModel } from '../types/appUsers';
import altImg from '../assets/images/alt-profile-img.jpg';

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
  formLabel: {
    width: '200px',
  },
  formValue: {
    width: 'calc(100% - 200px)',
  },
  image: {
    maxWidth: '400px',
  },
});

const AppUserForm: React.FC<{}> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id: userId } = useParams();
  const [values, setValues] = useState<AppUsersDataModel>({
    _id: '',
    username: '',
    firstName: '',
    gender: '',
    isVerified: null,
    lastName: '',
    phone: '',
    birthday: '',
    profileImage: {
      height: null,
      imgURL: '',
      width: null,
    },
    createdAt: '',
  });

  const getSelectedCompany = (userId: string) => {
    dispatch(
      getSelectedAppUserActionSG(userId, {
        success: (res: AppUsersDataModel) => {
          setValues(res);
        },
      })
    );
  };

  useEffect(() => {
    getSelectedCompany(userId);
  }, []);

  return (
    <div className="page-content">
      <Card>
        <CardBody>
          <CardTitle className={'text-start mb-4'}>User Info</CardTitle>
          {values.profileImage?.imgURL && (
            <div className={`flex-horizontal mb-3 ${classes.inputBlock}`}>
              <label>Image</label>
              <img
                src={values.profileImage.imgURL || altImg}
                className={`rounded ${classes.image}`}
              />
            </div>
          )}
          <TextInput
            customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
            value={`${values.firstName} ${values.lastName}`}
            label="Name"
            readonly={true}
          />
          <TextInput
            customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
            value={values.username}
            label="Username"
            readonly={true}
          />
          <TextInput
            customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
            value={values.phone}
            label="Phone"
            readonly={true}
          />
          <TextInput
            customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
            value={values.gender}
            label="Gender"
            readonly={true}
          />
          <TextInput
            customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
            value={`${new Date(values.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
            })} ${new Date(values.createdAt).getFullYear()}`}
            label="Date Created"
            readonly={true}
          />
          <TextInput
            customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
            value={values.isVerified ? 'Yes' : 'No'}
            label="Verified"
            readonly={true}
          />
          <TextInput
            customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
            value={`${new Date(values.birthday).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
            })} ${new Date(values.birthday).getFullYear()}`}
            label="Date of Birth"
            readonly={true}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default AppUserForm;
