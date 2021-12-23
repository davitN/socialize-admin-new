/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { Card, CardBody, Form } from 'reactstrap';
import Breadcrumbs from '../components/shared/Breadcrumb';

import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../components/shared/form-elements/TextInput';
import { AdminModel } from '../types/admin';
import {
  getSelectedAdminManagementActionSG,
  putAdminManagementAction,
  saveAdminManagementAction
} from '../store/ducks/adminManagementDuck';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete, AutoCompleteCompleteMethodParams } from 'primereact/autocomplete';
import { RootState } from '../store/configureStore';
import { getCompaniesActionSG } from '../store/ducks/companyDuck';
import { CompanyModel } from '../types/company';

const useStyles = createUseStyles({
  inputError: {
    '& input': {
      borderColor: '#ff4a4a'
    }
  },
  borderError: {
    borderColor: '#ff4a4a'
  },
  inputBlock: {
    '& label': {
      width: '200px',
      marginBottom: 0,
      textAlign: 'start'
    },
    '& input': {
      width: 'calc(100% - 200px)',
      borderRadius: '0.25rem',
    }
  },
  multiSelectClass: {
    height: '40px',
    '& label': {
      width: '200px',
      textAlign: 'start'
    },
    '& .p-dropdown, & .p-autocomplete': {
      width: 'calc(100% - 200px)',
      borderRadius: '0.25rem',
      height: '100%'
    }
  },
  formLabel: {
    width: '200px',
  },
  formValue: {
    width: 'calc(100% - 200px)'
  }
})

const AdminManagementForm: React.FC<{}> = () => {
  const classes = useStyles();
  const [newMode, setNewMode] = useState(false);
  const [companySearchValue, setCompanySearchValue] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState<CompanyModel>({
    name: '',
    _id: '',
  });

  const [selectedRole, setSelectedRole] = useState<{ _id: string, name: string }>({
    _id: '',
    name: ''
  });
  const { companiesData } = useSelector(
      (state: RootState) => state.companyReducer
  );
  const roles = useSelector((state: RootState) => state.initialDataReducer?.initialData?.roles)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validation, setValidation] = useState<{
    username: boolean,
    firstName: boolean,
    lastName: boolean,
    email: boolean,
    phone: boolean,
    role: boolean,
    submitted: boolean
  }>({
    username: false,
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    role: false,
    submitted: false
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
  })

  const getCompanies = () => {
    dispatch(
        getCompaniesActionSG({offset: 0, limit: 1000000}, {
          success: () => {
            //
          },
          error: () => {
            //
          },
        })
    );
  };

  useEffect(() => {
    setValues({...values, roleId: selectedRole._id})
  }, [selectedRole]);

  useEffect(() => {
    if (selectedCompany._id) {
      setValues({...values, companyId: selectedCompany._id});
      setCompanySearchValue(selectedCompany.name);
    }
  }, [selectedCompany]);

  const getSelectedAdminManagement = (adminId: string) => {
    dispatch(getSelectedAdminManagementActionSG(adminId, {
      success: (res: AdminModel) => {
        console.log(res);
        setValues(res);
        setValues({ ...values, ...res });
      }
    }))
  }

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
        results = companiesData.data.filter(item => item.name.toLowerCase().includes(event.query.toLowerCase()))
      }
      setFilteredCompanies(results)
    }, 250)
  }

  const handleValidation = () => {
    setValidation({
      ...validation,
      username: !!values.username,
      firstName: !!values.firstName,
      lastName: !!values.lastName,
      phone: !!values.phone,
      email: new RegExp('^[^@]+@[^@]{2,}\\.[^@]{2,}$').test(values.email),
      role: !!values.roleId
    });
  };

  const submitButton = (event: Event) => {
    event.preventDefault();
    setValidation({ ...validation, submitted: true });
    if (!(validation.username && validation.phone && validation.email && validation.firstName && validation.lastName)) {
      return;
    }
    const sendData: AdminModel | any = values;
    if (selectedRole.name === 'CompanyOwner' && !values.companyId) {
      return;
    }
    console.log(values);
    if (newMode) {
      if (!values.password) {
        return;
      }
      const newData: AdminModel = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
        roleId: values.roleId,
        password: values.password
      }
      if (selectedRole.name === 'CompanyOwner') {
        newData.companyId = values.companyId;
      }
      dispatch(saveAdminManagementAction(newData, {
        success: () => {
          navigate(-1)
        },
        error: (error: any) => console.log(error),
      }))
    } else {
      dispatch(putAdminManagementAction(values._id, sendData, {
        success: () => {
          navigate(-1)
        },
        error: (error: any) => console.log(error),
      }))
    }
  }

  useEffect(() => {
    handleValidation();
  }, [values]);


  useEffect(() => {
    getCompanies();
    if (adminId === 'new') {
      setNewMode(true)
    } else if (adminId) {
      setNewMode(false);
      getSelectedAdminManagement(adminId);
    }
  }, [adminId]);

  return (
      <div className="page-content">
        <Breadcrumbs
            title={'Welcome to That Social App Premium Dashboard'}
            breadcrumbItem={'VOLLEYBOX SETTINGS'}
        />
        <Card>
          <CardBody>
            {/*<CardTitle className={'text-start'}>Location Information</CardTitle>*/}
            {/*<CardSubtitle className="mb-4 text-start">*/}
            {/*  Make sure your location information is accurate.*/}
            {/*</CardSubtitle>*/}
            <Form>
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${(validation.submitted && !validation.username) ? classes.inputError : ''}`}
                  value={values.username}
                  handleChange={(username) => setValues({ ...values, username })}
                  label="Username"
                  placeholder="Enter Username"
                  required
              />
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${(validation.submitted && !validation.firstName) ? classes.inputError : ''}`}
                  value={values.firstName}
                  handleChange={(firstName) => setValues({ ...values, firstName })}
                  label="Firstname"
                  placeholder="Enter Firstname"
                  required
              />
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${(validation.submitted && !validation.lastName) ? classes.inputError : ''}`}
                  value={values.lastName}
                  handleChange={(lastName) => setValues({ ...values, lastName })}
                  label="Lastname"
                  placeholder="Enter Lastname"
                  required
              />
              <div className={`flex-horizontal mb-3 ${classes.multiSelectClass}`}>
                <label>Company</label>
                <Dropdown
                    className={(validation.submitted && !validation.role) ? classes.borderError : ''}
                    optionLabel={'name'}
                    value={selectedRole}
                    options={roles}
                    onChange={e => {setSelectedRole(e.value)}}
                    placeholder={'Select a Role'}
                />
              </div>
              {selectedRole.name === 'CompanyOwner' && (
                  <div className={`flex-horizontal mb-3 ${classes.multiSelectClass}`}>
                    <label>Company</label>
                    <AutoComplete
                        className={(validation.submitted && !companySearchValue) ? classes.inputError : ''}
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
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${(validation.submitted && !validation.phone) ? classes.inputError : ''}`}
                  value={values.phone}
                  handleChange={(phone) => setValues({ ...values, phone })}
                  label="Phone"
                  placeholder="Enter Phone Number"
                  required
              />
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${(validation.submitted && !validation.email) ? classes.inputError : ''}`}
                  value={values.email}
                  handleChange={(email) => setValues({ ...values, email })}
                  label="Email"
                  type={'email'}
                  placeholder="Enter Email"
                  required
              />
              {newMode && (
                  <TextInput
                      customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${(validation.submitted && !values.password) ? classes.inputError : ''}`}
                      value={values.password}
                      handleChange={(password) => setValues({ ...values, password })}
                      label="Password"
                      type={'password'}
                      placeholder="Enter Password"
                      required
                  />
              )}
              <Button label={'Submit'} onClick={() => submitButton(event)} type={'submit'}/>
            </Form>
          </CardBody>
        </Card>
      </div>
  );
};

export default AdminManagementForm;
