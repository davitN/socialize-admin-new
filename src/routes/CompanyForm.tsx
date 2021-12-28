/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useEffect, useState } from 'react';

import { Card, CardBody, Form } from 'reactstrap';
// import Breadcrumbs from '../components/shared/Breadcrumb';

import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import CvSwitcher from '../components/shared/switcher';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { CompanyModel } from '../types/company';
import {
  getSelectedCompanyActionSG,
  putCompanyAction,
  saveCompanyAction
} from '../store/ducks/companyDuck';
import TextInput from '../components/shared/form-elements/TextInput';
import { Calendar, CalendarChangeParams } from 'primereact/calendar';

const useStyles = createUseStyles({
  inputError: {
    '& input': {
      borderColor: '#ff4a4a'
    }
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
    '& .p-multiselect': {
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

const CompanyForm: React.FC<{}> = () => {
  const classes = useStyles();
  const [paidTillDate, setPaidTillDate] = useState<Date>(new Date());
  const [newMode, setNewMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validation, setValidation] = useState<{
    email: boolean,
    phone: boolean,
    name: boolean,
    submitted: boolean
  }>({
    email: false,
    name: false,
    phone: false,
    submitted: false
  });
  const { id: companyId } = useParams();
  // const { companySubscriptionData } = useSelector((state: RootState) => state.companyReducer);
  const [values, setValues] = useState<CompanyModel>({
    _id: '',
    email: '',
    phone: '',
    adminId: '',
    name: '',
    companySubscription: {
      name: '',
      _id: '',
      __v: null,
      description: '',
      ordering: null
    },
    paidTill: '',
    createdAt: '',
    updatedAt: '',
    isActive: false,
    __v: null
  })

  // const getCompanySubscriptions = () => {
  //   dispatch(getCompanySubscriptionActionSG({
  //     success: () => {
  //       //
  //     },
  //     error: () => {
  //       //
  //     }
  //   }))
  // }

  const getSelectedCompany = (companyId: string) => {
    dispatch(getSelectedCompanyActionSG(companyId, {
      success: (res: CompanyModel) => {
        console.log(res);
        setValues(res);
        setPaidTillDate(new Date(res.paidTill));
        setValues({ ...values, ...res });
      }
    }))
  }

  const handleValidation = () => {
    setValidation({
      ...validation,
      name: !!values.name,
      phone: !!values.phone,
      email: new RegExp('^[^@]+@[^@]{2,}\\.[^@]{2,}$').test(values.email)
    });
  };

  const calendarResponse = (event: CalendarChangeParams) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setPaidTillDate(event.value)
  }

  const submitButton = (event: Event) => {
    event.preventDefault();
    setValidation({...validation, submitted: true});
    if (!(validation.name && validation.phone && validation.email)) {
      return;
    }
    const sendData: CompanyModel | any = values;
    sendData.paidTill = paidTillDate.toISOString();
    if (newMode) {
      const newData: CompanyModel = {
        email: sendData.email,
        phone: sendData.phone,
        name: sendData.name
      }
      dispatch(saveCompanyAction(newData, {
        success: () => {
          navigate('/company')
        },
        error: (error: any) => console.log(error),
      }))
    } else {
      sendData.companySubscription = values.companySubscription._id;
      dispatch(putCompanyAction(values._id, sendData, {
        success: () => {
          navigate('/company')
        },
        error: (error: any) => console.log(error),
      }))
    }
  }

  useEffect(() => {
    handleValidation();
  }, [values]);


  useEffect(() => {
    if (companyId === 'new') {
      setNewMode(true)
    } else if (companyId) {
      setNewMode(false);
      getSelectedCompany(companyId);
      // getCompanySubscriptions();
    }
  }, [companyId]);

  function onSwitch(active: boolean) {
    setValues({ ...values, isActive: active })
  }

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
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${(validation.submitted && !validation.name) ? classes.inputError : ''}`}
                  value={values.name}
                  handleChange={(name) => setValues({ ...values, name })}
                  label="Company Name"
                  placeholder="Enter your Company Name"
                  required
              />
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
              {!newMode && (
                  <Fragment>
                    <div className={`flex-horizontal mb-3 ${classes.multiSelectClass}`}>
                      <label>Paid till</label>
                      <Calendar
                          showIcon={true}
                          value={paidTillDate}
                          dateFormat={'dd/mm/yy'}
                          onChange={(e) => calendarResponse(e)}
                      />
                    </div>
                    <div className={`flex-horizontal mb-3 ${classes.multiSelectClass}`}>
                      <label>Active</label>
                      <CvSwitcher
                          defaultValue={values.isActive}
                          onChange={(event: boolean) => onSwitch(event)}
                      />
                    </div>
                  </Fragment>
              )}
              <Button label={'Submit'} onClick={() => submitButton(event)} type={'submit'}/>
            </Form>
          </CardBody>
        </Card>
      </div>
  );
};

export default CompanyForm;
