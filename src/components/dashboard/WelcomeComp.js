/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';

import { Row, Col, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

import altImg from '../../assets/images/alt-profile-img.jpg';
import profileImg from '../../assets/images/profile-img.png';

const WelcomeComp = (props) => {
  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Welcome Back !</h5>
                <p>Premium Business Dashboard</p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="4">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={altImg}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              {/* eslint-disable-next-line react/prop-types */}
              <h5 className="font-size-15 text-truncate">
                {props.userData.firstName + ' ' + props.userData.lastName}
              </h5>
              <p className="text-muted mb-0 text-truncate">UI/UX Designer</p>
            </Col>
            <Col sm="8">
              <div className="pt-4">
                <Row>
                  <Col xs="6">
                    <h5 className="font-size-15">Total Visits</h5>
                    {/* eslint-disable-next-line react/prop-types */}
                    <p className="text-muted mb-0">
                      {props.dashboardData.totalVisitsCount}
                    </p>
                  </Col>
                  <Col xs="6">
                    <h5 className="font-size-15">Total Customers</h5>
                    {/* eslint-disable-next-line react/prop-types */}
                    <p className="text-muted mb-0">
                      {props.dashboardData.totalVisitorsCount}
                    </p>
                  </Col>
                </Row>
                <div className="mt-4">
                  <Link to="" className="btn btn-primary  btn-sm">
                    Upgrade to Business Elite{' '}
                    <i className="mdi mdi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default WelcomeComp;
