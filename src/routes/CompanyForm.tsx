/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { Card, CardBody, CardSubtitle, CardTitle, Col, Form, FormGroup, Label } from 'reactstrap';
import Breadcrumbs from '../components/shared/Breadcrumb';

import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import CvSwitcher from '../components/shared/switcher';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import { CompanyModel } from '../types/company';
import { putCompanyAction, saveCompanyAction } from '../store/ducks/companyDuck';
import { getVenuesActionSG } from '../store/ducks/VenueDuck';
import { TableQueryParams } from '../types/table';
import { VenueStateModel } from '../types/venue';
import TextInput from '../components/shared/form-elements/TextInput';
import { MultiSelect, MultiSelectChangeParams, MultiSelectFilterParams } from 'primereact/multiselect';

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
  dropdownClass: {
    height: '40px',
    '& label': {
      width: '200px',
      textAlign: 'start'
    },
    '& .p-dropdown': {
      width: 'calc(100% - 200px)',
      borderRadius: '0.25rem',
      height: '100%'
    },
    '& .p-dropdown-label': {
      fontSize: '0.8125rem'
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedVenues, setSelectedVenues] = useState<Array<VenueStateModel>>([]);
  const [newMode, setNewMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: companyId } = useParams();
  const { venuesData } = useSelector((state: RootState) => state.venueReducer);
  const [values, setValues] = useState<CompanyModel>({
    _id: '',
    placeId: '',
    adminId: '',
    name: '',
    companySubscription: '',
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

  const submitButton = () => {
    setIsSubmitted(true);
    setValues({...values, placeId: selectedVenues[0]._id})
    if (newMode) {
      dispatch(saveCompanyAction(values, {
        success: () => {
          navigate('/company')
        },
        error: (error: any) => console.log(error),
      }))
    } else {
      dispatch(putCompanyAction(values._id, values, {
        success: () => {
          navigate('/company')
        },
        error: (error: any) => console.log(error),
      }))
    }
  }

  const onSelectVenue = (event: MultiSelectChangeParams) => {
    setSelectedVenues([event.value[event.value.length - 1]]);
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
      }
      setValues({ ...values, ...selectedCompany })
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
              <div className={`flex-horizontal mb-3 ${classes.dropdownClass}`}>
                <label>Venue</label>
                <MultiSelect
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
                  <FormGroup className="mb-3" row>
                    <Label md="3" className="col-form-label text-start">
                      Active
                    </Label>
                    <Col md="9" className={'flex-horizontal'}>
                      <CvSwitcher
                          defaultValue={values.isActive}
                          onChange={(event: boolean) => onSwitch(event)}
                      />
                    </Col>
                  </FormGroup>
              )}
              <Button label={'Submit'} onClick={() => submitButton()} type={'submit'}/>
            </Form>
          </CardBody>
        </Card>
      </div>
  );
};

export default CompanyForm;
