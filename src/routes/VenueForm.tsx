/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { Card, CardBody, CardSubtitle, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { VenueImages, VenueSendModel, VenueStateModel } from '../types/venue';
import Breadcrumbs from '../components/shared/Breadcrumb';
import TextInput from '../components/shared/form-elements/TextInput';

import { createUseStyles } from 'react-jss';
import Dropzone from 'react-dropzone';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CvSwitcher from '../components/shared/switcher';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import { putVenueAction, saveVenueAction } from '../store/ducks/VenueDuck';

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
})

const VenueForm: React.FC<{}> = () => {
  const classes = useStyles();
  const [newMode, setNewMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: venueId } = useParams();
  const [logoImg, setLogo] = useState([]);
  const [coverThumbnailImg, setCoverThumbnail] = useState([]);
  const [coverImg, setCover] = useState([]);
  const [values, setValues] = useState<VenueStateModel>({
    accessDaysAfter: null,
    allowUsersToAccessAfterLeaving: false,
    allTimeVisitorsCount: null,
    cover: {
      width: null,
      height: null,
      imgURL: ''
    },
    coverThumbnail: {
      width: null,
      height: null,
      imgURL: ''
    },
    location: {
      state: '',
      city: '',
      address: '',
      code: '',
      country: '',
      point: {
        type: 'Point',
        coordinates: [41.123123, 44.123123]
      },
      street: '',
    },
    inObjectRadiusInMeters: 100,
    logo: {
      width: null,
      height: null,
      imgURL: ''
    },
    profile: {
      name: '',
      phoneNumber: '',
      webSite: '',
      description: '',
      rating: null
    },
    type: 'Restaurant'
  })
  const sendData: VenueSendModel = { data: null, coverThumbnail: null, cover: null, logo: null };
  const { venuesData } = useSelector((state: RootState) => state.venueReducer);

  const onChangeState = (changedStates: VenueStateModel) => {
    sendData.data = changedStates
  }

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
  }
  const submitButton = () => {
    console.log(sendData);
    if (newMode) {
      dispatch(saveVenueAction(sendData, {
        success: () => {
          navigate('/venues')
        },
        error: (error: any) => console.log(error),
      }))
    } else {
      dispatch(putVenueAction(values._id, sendData, {
        success: () => {
          navigate('/venues')
        },
        error: (error: any) => console.log(error),
      }))
    }
  }


  useEffect(() => {
    onChangeState(values);
    onChangeFiles({ logo: logoImg, cover: coverImg, coverThumbnail: coverThumbnailImg });
  });

  useEffect(() => {
    if (venueId === 'new') {
      setNewMode(true)
    } else if (venueId) {
      setNewMode(false);
      const selectedVenue: VenueStateModel = venuesData.find(item => item._id === venueId);
      if (!selectedVenue) {
        navigate('/venues')
      }
      setValues({ ...values, ...selectedVenue })
    }
  }, [venueId]);


  const getSizesFromImg = (imgFile: File | any, key: VenueImages) => {
    const img = document.createElement('img');
    img.src = imgFile.preview;
    setTimeout(() => {
      switch (key) {
        case 'logo':
          setValues({ ...values, logo: { width: img.width, height: img.height, imgURL: '' } });
          break;
        case 'coverThumbnail':
          setValues({ ...values, coverThumbnail: { width: img.width, height: img.height, imgURL: '' } });
          break;
        case 'cover':
          setValues({ ...values, cover: { width: img.width, height: img.height, imgURL: '' } });
          break;
      }
    }, 1000)
  }

  function onSwitch(active: boolean) {
    setValues({ ...values, allowUsersToAccessAfterLeaving: active })
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
        getSizesFromImg(files[0], key);
        setLogo(files);
        break;
      case 'coverThumbnail':
        getSizesFromImg(files[0], key);
        setCoverThumbnail(files);
        break;
      case 'cover':
        getSizesFromImg(files[0], key);
        setCover(files);
        break;
    }
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
                  value={values.profile.name}
                  handleChange={(name) => setValues({ ...values, profile: { ...values.profile, name } })}
                  label="Business Name"
                  placeholder="Enter your Business Name"
                  required
              />
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
                  value={values.location.address}
                  handleChange={(address) => setValues({ ...values, location: { ...values.location, address } })}
                  label="Address"
                  placeholder="Enter your Address"
                  required
              />
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
                  value={values.location.city}
                  handleChange={(city) => setValues({ ...values, location: { ...values.location, city } })}
                  label="City"
                  placeholder="City"
                  required
              />
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
                  value={values.location.state}
                  handleChange={(state) => setValues({ ...values, location: { ...values.location, state } })}
                  label="Province"
                  placeholder="Enter Province"
                  required
              />
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
                  value={values.location.country}
                  handleChange={(country) => setValues({ ...values, location: { ...values.location, country } })}
                  label="Country"
                  placeholder="Enter Country"
                  required
              />
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
                  value={values.profile.webSite}
                  handleChange={(webSite) => setValues({ ...values, profile: { ...values.profile, webSite } })}
                  label="Website"
                  placeholder="Enter Website"
                  required
              />
              <TextInput
                  customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
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
                      className="form-control"
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
            </Form>
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
            <Form>
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
                        <div className={`dropzone`}>
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
                  Listing Image
                </Label>
                <Col
                    md="9"
                    className={`flex-horizontal ${classes.dropZoneWrapper}`}
                >
                  <Dropzone
                      onDrop={(acceptedFiles) => {
                        handleAcceptedFiles('coverThumbnail', acceptedFiles);
                      }}
                  >
                    {({ getRootProps, getInputProps }) => (
                        <div className={`dropzone`}>
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
                        (coverThumbnailImg.length === 0 && values.coverThumbnail.imgURL) && (
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
                                        alt={'coverThumbnailImg'}
                                        src={values.coverThumbnail.imgURL}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                        to="#"
                                        className="text-muted font-weight-bold"
                                    >
                                      Listing Image
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{values.coverThumbnail.width} X {values.coverThumbnail.height}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                        )
                    }
                    {coverThumbnailImg.map((f: any, i) => {
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
                        <div className={`dropzone`}>
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
                      defaultValue={values.allowUsersToAccessAfterLeaving}
                      onChange={(event: boolean) => onSwitch(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup className="mb-3" row>
                <Label
                    htmlFor="days-after"
                    md="3"
                    className="col-form-label text-start"
                >
                  How Many Days After?
                </Label>
                <Col md="9">
                  <Input type="number" value={values.accessDaysAfter || 0} className="form-control" id="days-after" onChange={event => setValues({
                    ...values,
                    accessDaysAfter: parseInt(event.target.value)
                  })}/>
                </Col>
              </FormGroup>
              <FormGroup className="mb-3" row>
                <Label
                    htmlFor="admin-accounts"
                    md="3"
                    className="col-form-label text-start"
                >
                  All time visitors count
                </Label>
                <Col md="9">
                  <Input type="number" value={values.allTimeVisitorsCount || 0} className="form-control" id="all-time-visitors-count" onChange={event => setValues({
                    ...values,
                    allTimeVisitorsCount: parseInt(event.target.value)
                  })}/>
                </Col>
              </FormGroup>
            </Form>
            <Button label={'Submit'} onClick={() => submitButton()} type={'submit'}/>
          </CardBody>
        </Card>
      </div>
  );
};

export default VenueForm;
