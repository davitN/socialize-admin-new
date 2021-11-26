import React, { useState } from "react"
import Select from "react-select"

import {
  Container,
  Row,
  Col,
  Input,
  Card,
  Form,
  FormGroup,
  Label,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap"
import Breadcrumbs from '../../components/shared/Breadcrumb';
import ImagesCard from './imagesCard';

const provinceOptions = [
  { label: 'Vancouver', value: 'Vancouver' },
  { label: 'Ontario', value: 'Ontario'}
];

const countryOptions = [
  { label: 'Canada', value: 'Canada' },
  { label: 'USA', value: 'USA'}
];

const AddVanue = () => {
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  function handleSelectGroup(key: string, selectedGroup: any) {
    switch (key) {
      case 'province':
        setSelectedProvince(selectedGroup)
        break;
      case 'country':
        setSelectedCountry(selectedGroup)
        break;
    }
  }

  return (
      <React.Fragment>
        <div className="page-content">
          <Breadcrumbs title={'Welcome to That Social App Premium Dashboard'} breadcrumbItem={'VOLLEYBOX SETTINGS'}/>
          <Card>
            <CardBody>
              <CardTitle className={'text-start'}>Location Information</CardTitle>
              <CardSubtitle className="mb-4 text-start">
                Make sure your location information is accurate.
              </CardSubtitle>
              <Form>
                <FormGroup className="mb-3" row>
                  <Label
                      htmlFor="business-name"
                      md="2"
                      className="col-form-label text-start"
                  >
                    Business Name
                  </Label>
                  <Col md="10">
                    <Input
                        type="text"
                        className="form-control"
                        id="business-name"
                        placeholder="Enter your Business Name"
                    />
                  </Col>
                </FormGroup>
                <FormGroup className="mb-3" row>
                  <Label
                      htmlFor="address_1"
                      md="2"
                      className="col-form-label text-start"
                  >
                    Address
                  </Label>
                  <Col md="10">
                    <Input
                        type="text"
                        className="form-control"
                        id="address_1"
                        placeholder="Enter your Address"
                    />
                  </Col>
                </FormGroup>
                <FormGroup className="mb-3" row>
                  <Label
                      htmlFor="address_2"
                      md="2"
                      className="col-form-label text-start"
                  >
                    Address 2
                  </Label>
                  <Col md="10">
                    <Input
                        type="text"
                        className="form-control"
                        id="address_2"
                        placeholder="Enter your Address 2"
                    />
                  </Col>
                </FormGroup>
                <FormGroup className="mb-3" row>
                  <Label
                      htmlFor="city"
                      md="2"
                      className="col-form-label text-start"
                  >
                    City
                  </Label>
                  <Col md="10">
                    <Input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="City"
                    />
                  </Col>
                </FormGroup>
                <FormGroup className="select2-container mb-4" row>
                  <Label md="2" className="col-form-label text-start">
                    Province
                  </Label>
                  <Col md="10">
                    <Select
                        isClearable
                        value={selectedProvince}
                        onChange={(s: any) => {
                          handleSelectGroup('province', s)
                        }}
                        options={provinceOptions}
                        placeholder="Select Province"
                        classNamePrefix="select2-selection"
                    />
                  </Col>
                </FormGroup>
                <FormGroup className="select2-container mb-4" row>
                  <Label md="2" className="col-form-label text-start">
                    Country
                  </Label>
                  <Col md="10">
                    <Select
                        isClearable
                        value={selectedCountry}
                        onChange={(s: any) => {
                          handleSelectGroup('country', s)
                        }}
                        options={countryOptions}
                        placeholder="Select Country"
                        classNamePrefix="select2-selection"
                    />
                  </Col>
                </FormGroup>
                <FormGroup className="mb-3" row>
                  <Label
                      htmlFor="email-address"
                      md="2"
                      className="col-form-label text-start"
                  >
                    Email
                  </Label>
                  <Col md="10">
                    <Input
                        type="email"
                        className="form-control"
                        id="email-address"
                        placeholder="Enter your email"
                    />
                  </Col>
                </FormGroup>
                <FormGroup className="mb-3" row>
                  <Label
                      htmlFor="phone"
                      md="2"
                      className="col-form-label text-start"
                  >
                    Public Phone Number
                  </Label>
                  <Col md={10}>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="(204) 227 - 3308"
                    />
                  </Col>
                </FormGroup>
                <FormGroup className="mb-0" row>
                  <Label
                      htmlFor="description"
                      md="2"
                      className="col-form-label text-start"
                  >
                    Description:
                  </Label>
                  <Col md="10">
                      <textarea
                          className="form-control"
                          id="description"
                          rows={3}
                          placeholder="Write some note.."
                      />
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
          <ImagesCard/>
        </div>
      </React.Fragment>
  )
}

export default AddVanue;
