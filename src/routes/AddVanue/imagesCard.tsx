import React, { useState } from "react"
import Dropzone from "react-dropzone"

import {
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  Label,
  CardBody,
  CardTitle,
  CardSubtitle, Input,
} from "reactstrap"
import { Link } from "react-router-dom"
import { createUseStyles } from 'react-jss';
import CvSwitcher from '../../components/custom-elements/switcher';

const useStyles = createUseStyles({
  dropZoneWrapper: {
    padding: 0,
    '& .dropzone': {
      width: '400px'
    }
  },
  dropZonePreviewImg: {
    width: '140px',
    height: 'calc(140px - 1rem)',
    objectFit: 'cover'
  }
});

const ImagesCard = () => {
  const classes = useStyles();
  const [selectedLogo, setSelectedLogo] = useState([])
  const [selectedListing, setSelectedListing] = useState([])
  const [selectedBackground, setSelectedBackground] = useState([])

  function onSwitch(active: boolean) {
    console.log(active);
  }
  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }
  type ImageKeys = 'logo' | 'listing' | 'background';
  function handleAcceptedFiles(key: ImageKeys, files: any) {
    files.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          formattedSize: formatBytes(file.size)
        }))
    switch (key) {
      case 'logo':
        setSelectedLogo(files);
        break;
      case 'listing':
        setSelectedListing(files);
        break;
      case 'background':
        setSelectedBackground(files);
        break;
    }
  }

  return (
      <Card>
        <CardBody>
          <CardTitle className={'text-start'}>Premium Business Settings</CardTitle>
          <CardSubtitle className="mb-4 text-start">
            Please feel free to change these settings for your business listing.
          </CardSubtitle>
          <Form>
            <FormGroup className="mb-3" row>
              <Label
                  md="3"
                  className="col-form-label text-start"
              >
                Logo Image
              </Label>
              <Col md="9" className={`flex-horizontal ${classes.dropZoneWrapper}`}>
                <Dropzone
                    onDrop={acceptedFiles => {
                      handleAcceptedFiles('logo', acceptedFiles)
                    }}
                >
                  {({ getRootProps, getInputProps }) => (
                      <div className={`dropzone`}>
                        <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                        >
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
                  {selectedLogo.map((f: any, i) => {
                    return (
                        <Card
                            className="mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
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
                    )
                  })}
                </div>
              </Col>
            </FormGroup>
            <FormGroup className="mb-3" row>
              <Label
                  md="3"
                  className="col-form-label text-start"
              >
                Listing Image
              </Label>
              <Col md="9" className={`flex-horizontal ${classes.dropZoneWrapper}`}>
                <Dropzone
                    onDrop={acceptedFiles => {
                      handleAcceptedFiles('listing', acceptedFiles)
                    }}
                >
                  {({ getRootProps, getInputProps }) => (
                      <div className={`dropzone`}>
                        <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                        >
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
                  {selectedListing.map((f: any, i) => {
                    return (
                        <Card
                            className="mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
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
                    )
                  })}
                </div>
              </Col>
            </FormGroup>
            <FormGroup className="mb-3" row>
              <Label
                  md="3"
                  className="col-form-label text-start"
              >
                Background Image
              </Label>
              <Col md="9" className={`flex-horizontal ${classes.dropZoneWrapper}`}>
                <Dropzone
                    onDrop={acceptedFiles => {
                      handleAcceptedFiles('background', acceptedFiles)
                    }}
                >
                  {({ getRootProps, getInputProps }) => (
                      <div className={`dropzone`}>
                        <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                        >
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
                  {selectedBackground.map((f: any, i) => {
                    return (
                        <Card
                            className="mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
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
                    )
                  })}
                </div>
              </Col>
            </FormGroup>
            <FormGroup className="mb-3" row>
              <Label
                  md="3"
                  className="col-form-label text-start"
              >
                Allow Users To Access Location When They Leave?
              </Label>
              <Col md="9" className={'flex-horizontal'}>
                <CvSwitcher onChange={(event: boolean) => onSwitch(event)}/>
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
                <Input
                    type="number"
                    className="form-control"
                    id="days-after"
                />
              </Col>
            </FormGroup>
            <FormGroup className="mb-3" row>
              <Label
                  htmlFor="admin-accounts"
                  md="3"
                  className="col-form-label text-start"
              >
                App Admin Accounts
              </Label>
              <Col md="9">
                <Input
                    type="text"
                    className="form-control"
                    id="admin-accounts"
                />
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
  )
}

export default ImagesCard
