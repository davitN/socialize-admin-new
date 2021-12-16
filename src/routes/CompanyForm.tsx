/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useEffect, useState } from 'react';

import { Card, CardBody, Form } from 'reactstrap';
import Breadcrumbs from '../components/shared/Breadcrumb';

import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import CvSwitcher from '../components/shared/switcher';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import { CompanyModel } from '../types/company';
import { getCompanySubscriptionActionSG, putCompanyAction, saveCompanyAction } from '../store/ducks/companyDuck';
import { getVenuesActionSG } from '../store/ducks/VenueDuck';
import { TableQueryParams } from '../types/table';
import { VenueStateModel } from '../types/venue';
import TextInput from '../components/shared/form-elements/TextInput';
import { MultiSelect, MultiSelectChangeParams, MultiSelectFilterParams } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedVenues, setSelectedVenues] = useState<Array<VenueStateModel>>([]);
  const [newMode, setNewMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: companyId } = useParams();
  const { venuesData } = useSelector((state: RootState) => state.venueReducer);
  const { companySubscriptionData } = useSelector((state: RootState) => state.companyReducer);
  const [values, setValues] = useState<CompanyModel>({
    _id: '',
    placeId: '',
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
  const queryParams: TableQueryParams = {
    limit: 5,
    offset: 0,
    searchWord: ''
  }
  const { companiesData } = useSelector((state: RootState) => state.companyReducer);

  const getVenues = (searchWord?: string) => {
    setDataLoading(true);
    queryParams.searchWord = searchWord || '';
    dispatch(getVenuesActionSG(queryParams, {
      success: () => {
        setDataLoading(false);
      },
      error: () => {
        setDataLoading(false);
      }
    }));
  }

  const getCompanySubscriptions = (id: string) => {
    dispatch(getCompanySubscriptionActionSG(id, {
      success: () => {
        console.log('get')
      },
      error: () => {
        console.log('err')
      }
    }))
  }

  const formNotValid = () => {
    if (selectedVenues.length === 0 && !values.placeId) {
      return true;
    }
    if (!values.name) {
      return true;
    }
    return false;
  }

  const submitButton = (event: Event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (formNotValid()) {
      return;
    }
    const sendData: any = values;
    sendData.placeId = selectedVenues[0] ? selectedVenues[0]._id : values.placeId;
    sendData.paidTill = paidTillDate.toISOString();
    if (newMode) {
      dispatch(saveCompanyAction(values, {
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

  const onSelectVenue = (event: MultiSelectChangeParams) => {
    if (event.value.length > 0) {
      setSelectedVenues([event.value[event.value.length - 1]]);
    } else {
      setSelectedVenues([]);
    }
  };

  const onFilterVenues = (event: MultiSelectFilterParams) => {
    getVenues(event.filter);
  }

  useEffect(() => {
    if (companyId === 'new') {
      setNewMode(true)
    } else if (companyId) {
      setNewMode(false);
      const selectedCompany: CompanyModel = companiesData.data.find(item => item._id === companyId);
      if (!selectedCompany) {
        navigate('/company')
        return;
      }
      setPaidTillDate(new Date(selectedCompany.paidTill));
      setValues({ ...values, ...selectedCompany });
      // getCompanySubscriptions(companyId);

    }
    getVenues();
  }, [companyId]);

  function onSwitch(active: boolean) {
    setValues({ ...values, isActive: active })
  }
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
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${(isSubmitted && !values.name) ? classes.inputError : ''}`}
                  value={values.name}
                  handleChange={(name) => setValues({ ...values, name })}
                  label="Company Name"
                  placeholder="Enter your Company Name"
                  required
              />
              <div className={`flex-horizontal mb-3 ${classes.multiSelectClass}`}>
                <label>Venue</label>
                <MultiSelect
                    scrollHeight={'240px'}
                    showSelectAll={false}
                    value={selectedVenues}
                    optionLabel={'profile.name'}
                    options={venuesData.data}
                    onChange={(e) => onSelectVenue(e)}
                    placeholder="Select a Venue"
                    onFilter={(event) => onFilterVenues(event)}
                    filter={true}
                />
              </div>
              {!newMode && (
                  <Fragment>
                    <div className={`flex-horizontal mb-3 ${classes.multiSelectClass}`}>
                      <label>Paid till</label>
                      <Calendar
                          showIcon={true}
                          value={paidTillDate}
                          dateFormat={'dd/mm/yy'}
                          onChange={(e) => setPaidTillDate(e.value)}
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
