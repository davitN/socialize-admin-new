/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Form,
  FormGroup, Input,
  Label,
  Row,
} from 'reactstrap';
import { VenueImages, VenueSendModel, VenueStateModel } from '../types/venue';
import TextInput from '../components/shared/form-elements/TextInput';

import { createUseStyles } from 'react-jss';
import Dropzone from 'react-dropzone';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CvSwitcher from '../components/shared/switcher';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import { putVenueAction, saveVenueAction } from '../store/ducks/VenueDuck';
import { getCompaniesActionSG } from '../store/ducks/companyDuck';
import { CompanyModel } from '../types/company';
import {
  AutoComplete,
  AutoCompleteCompleteMethodParams,
} from 'primereact/autocomplete';
import readImgAsync from '../helpers/utils/readImgAsync';

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
  multiSelectClass: {
    height: '40px',
    '& label': {
      width: '200px',
      textAlign: 'start',
    },
    '& .p-autocomplete': {
      width: 'calc(100% - 200px)',
      borderRadius: '0.25rem',
      height: '100%',
    },
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

const VenueForm: React.FC<{}> = () => {
  const userRole = useSelector(
      (state: RootState) => state.authReducer?.userData?.role?.name
  );
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const classes = useStyles();
  const [companySearchValue, setCompanySearchValue] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [newMode, setNewMode] = useState(false);
  const dispatch = useDispatch();
  const [selectedCompany, setSelectedCompany] = useState<CompanyModel>({
    name: '',
    _id: '',
  });
  const navigate = useNavigate();
  const { id: venueId } = useParams();
  const [logoImg, setLogo] = useState([]);
  const [coverThumbnailImg, setCoverThumbnail] = useState([]);
  const [coverImg, setCover] = useState([]);
  const { companiesData } = useSelector(
    (state: RootState) => state.companyReducer
  );
  const [values, setValues] = useState<VenueStateModel>({
    accessDaysAfter: null,
    company: '',
    allowUsersToAccessAfterLeaving: false,
    cover: {
      width: null,
      height: null,
      imgURL: '',
    },
    coverThumbnail: {
      width: null,
      height: null,
      imgURL: '',
    },
    location: {
      state: '',
      city: '',
      address: '',
      code: '',
      country: '',
      point: {
        type: 'Point',
        coordinates: [41.123123, 44.123123],
      },
      street: '',
    },
    inObjectRadiusInMeters: 100,
    logo: {
      width: null,
      height: null,
      imgURL: '',
    },
    profile: {
      name: '',
      phoneNumber: '',
      webSite: '',
      description: '',
      rating: null,
    },
    type: 'Restaurant',
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
    setIsSuperAdmin(userRole === 'SuperAdmin');
  }, [userRole]);

  useEffect(() => {
    if (isSuperAdmin) {
      getCompanies();
    }
  }, [isSuperAdmin]);

  const onSelectCompany = (value: CompanyModel) => {
    if (value._id) {
      setSelectedCompany(value);
    }
  };

  useEffect(() => {
    if (selectedCompany._id) {
      setValues({ ...values, company: selectedCompany._id });
      setCompanySearchValue(selectedCompany.name);
    }
  }, [selectedCompany]);

  const sendData: VenueSendModel = {
    data: null,
    coverThumbnail: null,
    cover: null,
    logo: null,
  };
  const { venuesData } = useSelector((state: RootState) => state.venueReducer);

  const onChangeState = (changedStates: VenueStateModel) => {
    sendData.data = changedStates;
  };

  const onChangeFiles = (changedFiles: { [key in VenueImages]: any }) => {
    if (changedFiles.logo.length > 0) {
      sendData.logo = changedFiles.logo[0];
    }
    if (changedFiles.cover.length > 0) {
      sendData.cover = changedFiles.cover[0];
    }
    if (changedFiles.coverThumbnail.length > 0) {
      sendData.coverThumbnail = changedFiles.coverThumbnail[0];
    }
  };
  const formNotValid = () => {
    if (!companySearchValue && isSuperAdmin) {
      return true;
    }
    if (!values.company) {
      return true;
    }
    if (!values.profile.name) {
      return true;
    }
    if (!values.location.address) {
      return true;
    }
    if (!values.location.city) {
      return true;
    }
    if (!values.location.country) {
      return true;
    }
    if (!values.profile.webSite) {
      return true;
    }
    if (!values.profile.phoneNumber) {
      return true;
    }
    if (!values.profile.description) {
      return true;
    }
    if (!values.logo.imgURL && logoImg.length === 0) {
      return true;
    }
    if (!values.cover.imgURL && coverImg.length === 0) {
      return true;
    }
    if (newMode && coverThumbnailImg.length === 0) {
      return true;
    }
    if (!values.accessDaysAfter) {
      return true;
    }
    return false;
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

  const submitButton = (event: any) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (formNotValid()) {
      return;
    }
    if (newMode) {
      dispatch(
        saveVenueAction(sendData, {
          success: () => {
            navigate(-1);
          },
          error: () => {
            //
          },
        })
      );
    } else {
      dispatch(
        putVenueAction(
          values._id,
          { ...sendData },
          {
            success: () => {
              navigate(-1);
            },
            error: () => {
              //
            },
          }
        )
      );
    }
  };

  useEffect(() => {
    onChangeState(values);
    onChangeFiles({
      logo: logoImg,
      cover: coverImg,
      coverThumbnail: coverThumbnailImg,
    });
  });

  useEffect(() => {
    if (!newMode && values.company) {
      const company = companiesData.data.find(
        (item) => item._id === values.company
      );
      if (company) {
        setSelectedCompany(company);
      }
    }
  }, [companiesData]);

  useEffect(() => {
    getCompanies();
    if (venueId === 'new') {
      setNewMode(true);
    } else if (venueId) {
      setNewMode(false);
      const selectedVenue: VenueStateModel = venuesData.data.find(
        (item) => item._id === venueId
      );
      if (!selectedVenue) {
        navigate(-1);
      }
      setValues({ ...values, ...selectedVenue });
    }
  }, [venueId]);

  function onSwitch(active: boolean) {
    if (isSuperAdmin) {
      setValues({ ...values, allowUsersToAccessAfterLeaving: active });
    }
  }

  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  function handleAcceptedFiles(key: VenueImages, files: any) {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    switch (key) {
      case 'logo':
        setImgDimensions(files[0], key);
        setLogo(files);
        break;
      case 'cover':
        setImgDimensions(files[0], key);
        setCover(files);
        break;
    }
  }

  const setImgDimensions = async (e: any, key: VenueImages) => {
    const {
      imgDimension,
      thumbnail,
      thumbnailDimension
    } = await readImgAsync(e);
    switch (key) {
      case 'logo':
        setValues({
          ...values,
          logo: {
            width: imgDimension.width,
            height: imgDimension.height,
            imgURL: ''
          },
          coverThumbnail: {
            width: thumbnailDimension.width,
            height: thumbnailDimension.height,
            imgURL: ''
          }
        });
        setCoverThumbnail([thumbnail])
        break;
      case 'cover':
        setValues({
          ...values,
          cover: {
            width: imgDimension.width,
            height: imgDimension.height,
            imgURL: ''
          }
        });
        break;
    }
  }

  return (
      <div className="page-content">
        <Form>
          <Card>
            <CardBody>
              <CardTitle className={'text-start'}>Location Information</CardTitle>
              <CardSubtitle className="mb-4 text-start">
                Make sure your location information is accurate.
              </CardSubtitle>
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${(isSubmitted && !values.profile.name) ? classes.inputError : ''}`}
                  value={values.profile.name}
                  handleChange={(name) => setValues({ ...values, profile: { ...values.profile, name } })}
                  label="Business Name"
                  placeholder="Enter your Business Name"
                  required
              />
              {isSuperAdmin && (
                  <div className={`flex-horizontal mb-3 ${classes.multiSelectClass}`}>
                    <label>Company</label>
                    <AutoComplete
                        className={
                          isSubmitted && !companySearchValue ? classes.inputError : ''
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
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${(isSubmitted && !values.location.address) ? classes.inputError : ''}`}
                  value={values.location.address}
                  handleChange={(address) => setValues({ ...values, location: { ...values.location, address } })}
                  label="Address"
                  placeholder="Enter your Address"
                  required
                  readonly={!isSuperAdmin}
              />
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${(isSubmitted && !values.location.city) ? classes.inputError : ''}`}
                  value={values.location.city}
                  handleChange={(city) => setValues({ ...values, location: { ...values.location, city } })}
                  label="City"
                  placeholder="City"
                  required
                  readonly={!isSuperAdmin}
              />
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
                  value={values.location.state}
                  handleChange={(state) => setValues({ ...values, location: { ...values.location, state } })}
                  label="Province"
                  placeholder="Enter Province"
                  required
                  readonly={!isSuperAdmin}
              />
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${(isSubmitted && !values.location.country) ? classes.inputError : ''}`}
                  value={values.location.country}
                  handleChange={(country) => setValues({ ...values, location: { ...values.location, country } })}
                  label="Country"
                  placeholder="Enter Country"
                  required
                  readonly={!isSuperAdmin}
              />
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${(isSubmitted && !values.profile.webSite) ? classes.inputError : ''}`}
                  value={values.profile.webSite}
                  handleChange={(webSite) => setValues({ ...values, profile: { ...values.profile, webSite } })}
                  label="Website"
                  placeholder="Enter Website"
                  required
              />
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${(isSubmitted && !values.profile.phoneNumber) ? classes.inputError : ''}`}
                  value={values.profile.phoneNumber}
                  handleChange={(phoneNumber) => setValues({ ...values, profile: { ...values.profile, phoneNumber } })}
                  label="Public Phone Number"
                  placeholder="(204) 227 - 3308"
                  required
              />
              <FormGroup className="mb-0" row>
                <Label
                    htmlFor="description"
                    className={`col-form-label text-start ${classes.formLabel}`}
                >
                  Description:
                </Label>
                <Col className={classes.formValue}>
                  <textarea
                      value={values.profile.description}
                      className={`form-control ${(isSubmitted && !values.profile.description) ? classes.errorBorder : ''}`}
                      id="description"
                      rows={3}
                      placeholder="Write some note.."
                      onChange={event => setValues({
                        ...values,
                        profile: { ...values.profile, description: event.target.value }
                      })}
                  />
                </Col>
              </FormGroup>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle className={'text-start'}>
                Premium Business Settings
              </CardTitle>
              <CardSubtitle className="mb-4 text-start">
                Please feel free to change these settings for your business listing.
              </CardSubtitle>
              <FormGroup className="mb-3" row>
                <Label md="3" className="col-form-label text-start">
                  Logo Image
                </Label>
                <Col
                    md="9"
                    className={`flex-horizontal ${classes.dropZoneWrapper}`}
                >
                  <Dropzone
                      onDrop={(acceptedFiles) => {
                        handleAcceptedFiles('logo', acceptedFiles);
                      }}
                  >
                    {({ getRootProps, getInputProps }) => (
                        <div
                            className={`dropzone ${(isSubmitted && !values.logo.imgURL && logoImg.length === 0) ? classes.errorBorder : ''}`}>
                          <div className="dz-message needsclick" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="dz-message needsclick">
                              <div className="mb-3">
                                <i className="display-4 text-muted bx bxs-cloud-upload"/>
                              </div>
                              <h5>Drop Image here or click to upload.</h5>
                            </div>
                          </div>
                        </div>
                    )}
                  </Dropzone>
                  <div className="dropzone-previews ms-3" id="file-previews">
                    {
                        (logoImg.length === 0 && values.logo.imgURL) && (
                            <Card
                                className="mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className={`avatar-sm rounded bg-light ${classes.dropZonePreviewImg}`}
                                        alt={'logo'}
                                        src={values.logo.imgURL}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                        to="#"
                                        className="text-muted font-weight-bold"
                                    >
                                      Logo
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{values.logo.width} X {values.logo.height}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                        )
                    }
                    {logoImg.map((f: any, i) => {
                      return (
                          <Card
                              className="mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + '-file'}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className={`avatar-sm rounded bg-light ${classes.dropZonePreviewImg}`}
                                      alt={f.name}
                                      src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                      );
                    })}
                  </div>
                </Col>
              </FormGroup>
              <FormGroup className="mb-3" row>
                <Label md="3" className="col-form-label text-start">
                  Background Image
                </Label>
                <Col
                    md="9"
                    className={`flex-horizontal ${classes.dropZoneWrapper}`}
                >
                  <Dropzone
                      onDrop={(acceptedFiles) => {
                        handleAcceptedFiles('cover', acceptedFiles);
                      }}
                  >
                    {({ getRootProps, getInputProps }) => (
                        <div
                            className={`dropzone ${(isSubmitted && !values.cover.imgURL && coverImg.length === 0) ? classes.errorBorder : ''}`}>
                          <div className="dz-message needsclick" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="dz-message needsclick">
                              <div className="mb-3">
                                <i className="display-4 text-muted bx bxs-cloud-upload"/>
                              </div>
                              <h5>Drop Image here or click to upload.</h5>
                            </div>
                          </div>
                        </div>
                    )}
                  </Dropzone>
                  <div className="dropzone-previews ms-3" id="file-previews">
                    {
                        (coverImg.length === 0 && values.cover.imgURL) && (
                            <Card
                                className="mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className={`avatar-sm rounded bg-light ${classes.dropZonePreviewImg}`}
                                        alt={'cover'}
                                        src={values.cover.imgURL}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                        to="#"
                                        className="text-muted font-weight-bold"
                                    >
                                      Background
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{values.cover.width} X {values.cover.height}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                        )
                    }
                    {coverImg.map((f: any, i) => {
                      return (
                          <Card
                              className="mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + '-file'}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className={`avatar-sm rounded bg-light ${classes.dropZonePreviewImg}`}
                                      alt={f.name}
                                      src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                      );
                    })}
                  </div>
                </Col>
              </FormGroup>
              <FormGroup className="mb-3" row>
                <Label md="3" className="col-form-label text-start">
                  Allow Users To Access Location When They Leave?
                </Label>
                <Col md="9" className={'flex-horizontal'}>
                  <CvSwitcher
                      readonly={!isSuperAdmin}
                      defaultValue={values.allowUsersToAccessAfterLeaving}
                      onChange={(event: boolean) => onSwitch(event)}
                  />
                </Col>
              </FormGroup>
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${(isSubmitted && !values.accessDaysAfter) ? classes.inputError : ''}`}
                  value={values.accessDaysAfter}
                  type={'number'}
                  handleChange={(num) => setValues({ ...values, accessDaysAfter: parseInt(num) })}
                  label="How Many Days After?"
                  required
                  readonly={!isSuperAdmin}
              />
              {!newMode && (
                  <TextInput
                      customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
                      value={values.allTimeVisitorsCount || ''}
                      label="All time visitors count"
                      readonly={true}
                  />
              )}
              <Button label={'Submit'} type={'submit'} onClick={(event) => submitButton(event)}/>
            </CardBody>
          </Card>
        </Form>
      </div>
  );
};

export default VenueForm;
