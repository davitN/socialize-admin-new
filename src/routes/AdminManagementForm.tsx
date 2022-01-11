/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { Card, CardBody, Form } from 'reactstrap';

import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../components/shared/form-elements/TextInput';
import { AdminModel } from '../types/admin';
import {
  getSelectedAdminManagementActionSG,
  putAdminManagementAction,
  saveAdminManagementAction,
} from '../store/ducks/adminManagementDuck';
import { Dropdown } from 'primereact/dropdown';
import {
  AutoComplete,
  AutoCompleteCompleteMethodParams,
} from 'primereact/autocomplete';
import { RootState } from '../store/configureStore';
import { getCompaniesActionSG } from '../store/ducks/companyDuck';
import { CompanyModel } from '../types/company';
import { Password } from 'primereact/password';

const useStyles = createUseStyles({
  inputError: {
    '& input': {
      borderColor: '#ff4a4a',
    },
  },
  borderError: {
    borderColor: '#ff4a4a',
  },
  passwordHint: {
    width: 200,
    marginLeft: 'auto',
    marginBottom: -5,
    listStyle: 'disc'
  },
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
  multiSelectClass: {
    height: '40px',
    '& label': {
      width: '200px',
      textAlign: 'start',
    },
    '& .p-dropdown, & .p-autocomplete': {
      width: 'calc(100% - 200px)',
      borderRadius: '0.25rem',
      height: '100%',
    },
    '& .p-password': {
      width: 'calc(100% - 200px)',
      '& input': {
        width: '100%',
        height: '37px',
      },
    },
  },
  formLabel: {
    width: '200px',
  },
  formValue: {
    width: 'calc(100% - 200px)',
  },
});

const AdminManagementForm: React.FC<{}> = () => {
  const classes = useStyles();
  const [newMode, setNewMode] = useState(false);
  const [companySearchValue, setCompanySearchValue] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState<CompanyModel>({
    name: '',
    _id: '',
  });

  const [selectedRole, setSelectedRole] = useState<{
    _id: string;
    name: string;
  }>({
    _id: '',
    name: '',
  });
  const { companiesData } = useSelector(
    (state: RootState) => state.companyReducer
  );
  const roles = useSelector(
    (state: RootState) => state.initialDataReducer?.initialData?.roles
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validation, setValidation] = useState<{
    username: boolean;
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    phone: boolean;
    role: boolean;
    password: boolean;
    submitted: boolean;
  }>({
    username: false,
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    role: false,
    password: true,
    submitted: false,
  });
  const { id: adminId } = useParams();
  const [values, setValues] = useState<AdminModel>({
    _id: '',
    email: '',
    phone: '',
    roleId: '',
    firstName: '',
    lastName: '',
    password: '',
    companyId: '',
    username: '',
  });

  const getCompanies = () => {
    dispatch(
      getCompaniesActionSG(
        { offset: 0, limit: 1000000 },
        {
          success: () => {
            //
          },
          error: () => {
            //
          },
        }
      )
    );
  };

  useEffect(() => {
    setValues({ ...values, roleId: selectedRole._id });
  }, [selectedRole]);

  useEffect(() => {
    if (selectedCompany._id) {
      setValues({ ...values, companyId: selectedCompany._id });
      setCompanySearchValue(selectedCompany.name);
    }
  }, [selectedCompany]);

  const getSelectedAdminManagement = (adminId: string) => {
    dispatch(
      getSelectedAdminManagementActionSG(adminId, {
        success: (res: AdminModel) => {
          setValues({ ...values, ...res, roleId: res.role._id });
          setSelectedRole(res.role);
          if (res.role.name === 'CompanyOwner' || selectedRole.name === 'CompanyAdministrator') {
            setSelectedCompany(res.company);
          }
        },
        error: () => {
          navigate(-1);
        },
      })
    );
  };

  const onSelectCompany = (value: CompanyModel) => {
    if (value._id) {
      setSelectedCompany(value);
    }
  };

  const searchCompanies = (event: AutoCompleteCompleteMethodParams) => {
    setTimeout(() => {
      let results;
      if (event.query.length === 0) {
        results = [...companiesData.data];
      } else {
        results = companiesData.data.filter((item) =>
          item.name.toLowerCase().includes(event.query.toLowerCase())
        );
      }
      setFilteredCompanies(results);
    }, 250);
  };

  const checkPassword = (): boolean => {
    const regexp = new RegExp(
      '^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9]{6,50}$'
    );
    if (newMode) {
      return regexp.test(values.password);
    }
    return true;
    // if (newMode) {
    //   return regexp.test(values.password);
    // } else {
    //   if (values.password) {
    //     return regexp.test(values.password);
    //   }
    //   return true;
    // }
  };

  const handleValidation = () => {
    setValidation({
      ...validation,
      username: !!values.username,
      firstName: !!values.firstName,
      lastName: !!values.lastName,
      phone: !!values.phone,
      role: !!values.roleId,
      email: new RegExp('^[^@]+@[^@]{2,}\\.[^@]{2,}$').test(values.email),
      password: checkPassword(),
    });
  };

  const submitButton = (event: Event) => {
    event.preventDefault();
    setValidation({ ...validation, submitted: true });
    if (
      !(
        validation.username &&
        validation.phone &&
        validation.email &&
        validation.firstName &&
        validation.lastName &&
        validation.password &&
        validation.role
      )
    ) {
      return;
    }
    if (selectedRole.name === 'CompanyOwner' || selectedRole.name === 'CompanyAdministrator' && !values.companyId) {
      return;
    }
    if (newMode) {
      const newData: AdminModel = {
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
        roleId: values.roleId,
        password: values.password,
      };
      if (selectedRole.name === 'CompanyOwner' || selectedRole.name === 'CompanyAdministrator') {
        newData.companyId = values.companyId;
      }
      dispatch(
        saveAdminManagementAction(newData, {
          success: () => {
            navigate(-1);
          },
          error: (error: any) => console.log(error),
        })
      );
    } else {
      const sendData: AdminModel = {
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
        roleId: values.roleId,
        password: values.password,
      };
      if (selectedRole.name === 'CompanyOwner' || selectedRole.name === 'CompanyAdministrator') {
        sendData.companyId = values.companyId;
      }
      dispatch(
        putAdminManagementAction(values._id, sendData, {
          success: () => {
            navigate(-1);
          },
          error: () => {
            //
          },
        })
      );
    }
  };

  useEffect(() => {
    handleValidation();
  }, [values]);

  useEffect(() => {
    getCompanies();
    if (adminId === 'new') {
      setNewMode(true);
    } else if (adminId) {
      setNewMode(false);
      getSelectedAdminManagement(adminId);
    }
  }, [adminId]);

  return (
    <div className="page-content">
      <Card>
        <CardBody>
          {/*<CardTitle className={'text-start'}>Location Information</CardTitle>*/}
          {/*<CardSubtitle className="mb-4 text-start">*/}
          {/*  Make sure your location information is accurate.*/}
          {/*</CardSubtitle>*/}
          <Form>
            <TextInput
              customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${
                validation.submitted && !validation.username
                  ? classes.inputError
                  : ''
              }`}
              value={values.username}
              handleChange={(username) => setValues({ ...values, username })}
              label="Username"
              placeholder="Enter Username"
              required
            />
            <TextInput
              customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${
                validation.submitted && !validation.firstName
                  ? classes.inputError
                  : ''
              }`}
              value={values.firstName}
              handleChange={(firstName) => setValues({ ...values, firstName })}
              label="Firstname"
              placeholder="Enter Firstname"
              required
            />
            <TextInput
              customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${
                validation.submitted && !validation.lastName
                  ? classes.inputError
                  : ''
              }`}
              value={values.lastName}
              handleChange={(lastName) => setValues({ ...values, lastName })}
              label="Lastname"
              placeholder="Enter Lastname"
              required
            />
            <div className={`flex-horizontal mb-3 ${classes.multiSelectClass}`}>
              <label>Role</label>
              <Dropdown
                className={
                  validation.submitted && !validation.role
                    ? classes.borderError
                    : ''
                }
                optionLabel={'name'}
                value={selectedRole}
                options={roles}
                onChange={(e) => setSelectedRole(e.value)}
                placeholder={
                  selectedRole.name ? selectedRole.name : 'Select a Role'
                }
              />
            </div>
            {(selectedRole.name === 'CompanyOwner' || selectedRole.name === 'CompanyAdministrator') && (
              <div
                className={`flex-horizontal mb-3 ${classes.multiSelectClass}`}
              >
                <label>Company</label>
                <AutoComplete
                  className={
                    validation.submitted && !companySearchValue
                      ? classes.inputError
                      : ''
                  }
                  completeMethod={searchCompanies}
                  scrollHeight={'240px'}
                  value={companySearchValue}
                  dropdown={true}
                  field={'name'}
                  suggestions={filteredCompanies}
                  onSelect={(e) => onSelectCompany(e.value)}
                  onChange={(e) => setCompanySearchValue(e.value)}
                  placeholder="Select a Company"
                  forceSelection={true}
                />
              </div>
            )}
            <TextInput
              customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${
                validation.submitted && !validation.phone
                  ? classes.inputError
                  : ''
              }`}
              value={values.phone}
              handleChange={(phone) => setValues({ ...values, phone })}
              label="Phone"
              placeholder="Enter Phone Number"
              required
            />
            <TextInput
              customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${
                validation.submitted && !validation.email
                  ? classes.inputError
                  : ''
              }`}
              value={values.email}
              handleChange={(email) => setValues({ ...values, email })}
              label="Email"
              type={'email'}
              placeholder="Enter Email"
              required
            />
            {newMode && (
                <div className={`flex-horizontal mb-3 ${classes.multiSelectClass}`}>
                  <label>Password</label>
                  <Password
                      className={`${
                          validation.submitted && !validation.password
                              ? classes.inputError
                              : ''
                      }`}
                      value={values.password}
                      onChange={(e) =>
                          setValues({ ...values, password: e.target.value })
                      }
                      type={'password'}
                      placeholder="Enter Password"
                      toggleMask={true}
                      content={() => (<ul className={classes.passwordHint}>
                        <li>At least one lowercase</li>
                        <li>At least one uppercase</li>
                        <li>At least one numeric</li>
                        <li>Minimum 6 characters</li>
                      </ul>)}
                      required
                      autoComplete={'off'}
                  />
                </div>
            )}
            <Button
              label={'Submit'}
              onClick={() => submitButton(event)}
              type={'submit'}
            />
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminManagementForm;
