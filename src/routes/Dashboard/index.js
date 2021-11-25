import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import StackedColumnChart from './StackedColumnChart';

//import action
import modalimage1 from '../../assets/images/product/img-7.png';
import modalimage2 from '../../assets/images/product/img-4.png';

// Pages Components
import WelcomeComp from './WelcomeComp';
import MonthlyEarning from './MonthlyEarning';
import SocialSource from './SocialSource';
import ActivityComp from './ActivityComp';
import TopCities from './TopCities';
import LatestTranaction from './LatestTranaction';

//Import Breadcrumb
import Breadcrumbs from '../../components/shared/Breadcrumb';

//i18n
import { withTranslation } from 'react-i18next';

//redux
import { useDispatch } from 'react-redux';
import { getDashboardDataActionSG } from '../../store/ducks/dashboardDuck';

const yearData = [
  {
    name: 'First Visit',
    data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
  },
  {
    name: 'Second Visit',
    data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
  },
  {
    name: 'Regular Customer',
    data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
  },
];

const monthData = [
  {
    name: 'First Visit',
    data: [34, 55, 21, 77, 32, 63, 86, 42, 34, 18, 16, 41],
  },
  {
    name: 'Second Visit',
    data: [10, 63, 40, 80, 52, 41, 11, 32, 30, 86, 44, 33],
  },
  {
    name: 'Regular Customer',
    data: [11, 17, 15, 85, 21, 14, 80, 58, 17, 12, 20, 18],
  },
];

const weekData = [
  {
    name: 'First Visit',
    data: [14, 52, 11, 57, 22, 33, 31, 22, 64, 14, 32, 68],
  },
  {
    name: 'Second Visit',
    data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
  },
  {
    name: 'Regular Customer',
    data: [11, 17, 15, 15, 34, 55, 21, 18, 17, 12, 20, 18],
  },
];

const reports = [
  {
    title: 'New Customers This Month',
    iconClass: 'bx-copy-alt',
    description: '1,235',
  },
  {
    title: 'Total Customers This Month',
    iconClass: 'bx-archive-in',
    description: '2,586',
  },
  {
    title: 'Busiest Day',
    iconClass: 'bx-purchase-tag-alt',
    description: 'Tuesday',
  },
];

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const [modal, setmodal] = useState(false);
  const [subscribemodal, setSubscribemodal] = useState(false);
  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState('yearly');

  useEffect(() => {
    dispatch(getDashboardDataActionSG());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setSubscribemodal(true);
    }, 2000);
  }, []);

  useEffect(() => {
    setPeriodData(yearData);
  }, [dispatch]);

  const onChangeChartPeriod = (pType) => {
    setPeriodType(pType);
    if (pType === 'yearly') {
      setPeriodData(yearData);
    } else if (pType === 'monthly') {
      setPeriodData(monthData);
    } else if (pType === 'weekly') {
      setPeriodData(weekData);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t('Welcome to That Social App Premium Dashboard')}
            breadcrumbItem={props.t('Dashboard')}
          />

          <Row>
            <Col xl="4">
              <WelcomeComp />
              <MonthlyEarning />
            </Col>
            <Col xl="8">
              <Row>
                {/* Reports Render */}
                {reports.map((report, key) => (
                  <Col md="4" key={'_col_' + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <Media>
                          <Media body>
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </Media>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  'bx ' + report.iconClass + ' font-size-24'
                                }
                              ></i>
                            </span>
                          </div>
                        </Media>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <h4 className="card-title mb-4">Customer Trends</h4>
                    <div className="ms-auto">
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === 'weekly' },
                              'nav-link'
                            )}
                            onClick={() => {
                              onChangeChartPeriod('weekly');
                            }}
                            id="one_month"
                          >
                            Week
                          </Link>{' '}
                        </li>
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === 'monthly' },
                              'nav-link'
                            )}
                            onClick={() => {
                              onChangeChartPeriod('monthly');
                            }}
                            id="one_month"
                          >
                            Month
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === 'yearly' },
                              'nav-link'
                            )}
                            onClick={() => {
                              onChangeChartPeriod('yearly');
                            }}
                            id="one_month"
                          >
                            Year
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* <div className="clearfix"></div> */}
                  <StackedColumnChart periodData={periodData} />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/*<Row>*/}
          {/*  <Col xl="4">*/}
          {/*    <SocialSource />*/}
          {/*  </Col>*/}
          {/*  <Col xl="4">*/}
          {/*    <ActivityComp />*/}
          {/*  </Col>*/}

          {/*  <Col xl="4">*/}
          {/*    <TopCities />*/}
          {/*  </Col>*/}
          {/*</Row>*/}

          <Row>
            <Col lg="12">
              <LatestTranaction />
            </Col>
          </Row>
        </Container>
      </div>

      {/* subscribe ModalHeader */}
      <Modal
        isOpen={subscribemodal}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setSubscribemodal(!subscribemodal);
        }}
      >
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <ModalHeader
              toggle={() => {
                setSubscribemodal(!subscribemodal);
              }}
            ></ModalHeader>
          </div>
          <div className="modal-body">
            <div className="text-center mb-4">
              <div className="avatar-md mx-auto mb-4">
                <div className="avatar-title bg-light  rounded-circle text-primary h1">
                  <i className="mdi mdi-email-open"></i>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-xl-10">
                  <h4 className="text-primary">Subscribe !</h4>
                  <p className="text-muted font-size-14 mb-4">
                    Subscribe our newletter and get notification to stay update.
                  </p>

                  <div className="input-group rounded bg-light">
                    <Input
                      type="email"
                      className="form-control bg-transparent border-0"
                      placeholder="Enter Email address"
                    />
                    <Button color="primary" type="button" id="button-addon2">
                      <i className="bx bxs-paper-plane"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={() => {
          setmodal(!modal);
        }}
      >
        <div className="modal-content">
          <ModalHeader
            toggle={() => {
              setmodal(!modal);
            }}
          >
            Order Details
          </ModalHeader>
          <ModalBody>
            <p className="mb-2">
              Product id: <span className="text-primary">#SK2540</span>
            </p>
            <p className="mb-4">
              Billing Name: <span className="text-primary">Neal Matthews</span>
            </p>

            <div className="table-responsive">
              <Table className="table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage1} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Wireless Headphone (Black)
                        </h5>
                        <p className="text-muted mb-0">$ 225 x 1</p>
                      </div>
                    </td>
                    <td>$ 255</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage2} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Hoodie (Blue)
                        </h5>
                        <p className="text-muted mb-0">$ 145 x 1</p>
                      </div>
                    </td>
                    <td>$ 145</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Sub Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Shipping:</h6>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setmodal(!modal);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </React.Fragment>
  );
};

// Dashboard.propTypes = {
//   t: PropTypes.any,
//   chartsData: PropTypes.any,
//   onGetChartsData: PropTypes.func,
// };

export default withTranslation()(Dashboard);
