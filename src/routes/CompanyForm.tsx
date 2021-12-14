/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { Card, CardBody, CardSubtitle, CardTitle, Col, Form, FormGroup, Label } from 'reactstrap';
import Breadcrumbs from '../components/shared/Breadcrumb';
import TextInput from '../components/shared/form-elements/TextInput';

import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import CvSwitcher from '../components/shared/switcher';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import { CompanyModel } from '../types/company';
import { putCompanyAction, saveCompanyAction } from '../store/ducks/companyDuck';

const useStyles = createUseStyles({
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
  formLabel: {
    width: '200px',
  },
  formValue: {
    width: 'calc(100% - 200px)'
  }
})

const CompanyForm: React.FC<{}> = () => {
  const classes = useStyles();
  const [newMode, setNewMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: companyId } = useParams();
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
  const { companiesData } = useSelector((state: RootState) => state.companyReducer);

  const submitButton = () => {
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

  useEffect(() => {
    if (companyId === 'new') {
      setNewMode(true)
    } else if (companyId) {
      setNewMode(false);
      const selectedCompany: CompanyModel = companiesData.find(item => item._id === companyId);
      if (!selectedCompany) {
        navigate('/company')
      }
      setValues({ ...values, ...selectedCompany })
    }
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
            <CardTitle className={'text-start'}>Location Information</CardTitle>
            <CardSubtitle className="mb-4 text-start">
              Make sure your location information is accurate.
            </CardSubtitle>
            <Form>
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
                  value={values.name}
                  handleChange={(name) => setValues({ ...values, name })}
                  label="Company Name"
                  placeholder="Enter your Company Name"
                  required
              />
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
              <Button label={'Submit'} onClick={() => submitButton()} type={'submit'}/>
            </Form>
          </CardBody>
        </Card>
      </div>
  );
};

export default CompanyForm;