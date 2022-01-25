/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Media,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import StackedColumnChart from '../components/dashboard/StackedColumnChart';

//import action

// Pages Components
import WelcomeComp from "../components/dashboard/WelcomeComp";
import MonthlyEarning from "../components/dashboard/MonthlyEarning";

//Import Breadcrumb
import Breadcrumbs from '../components/shared/Breadcrumb';

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import TopCustomers from '../components/dashboard/TopCustomers';
import Posts from '../components/dashboard/Posts';
import { getDashboardDataActionSG } from '../store/ducks/dashboardDuck';

const correctTrends = (incomeArr: Array<{
  firstTimeVisitor: number,
  secondTimeVisitor: number,
  regular: number,
  visitYearMonthDate: string
}>) => {
  const yearData = [
    {
      name: 'First Visit',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Second Visit',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Regular Customer',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }
  ];
  incomeArr.map(item => {
    yearData[0].data[parseInt(item.visitYearMonthDate.split('-')[1]) - 1] = item.firstTimeVisitor;
    yearData[1].data[parseInt(item.visitYearMonthDate.split('-')[1]) - 1] = item.secondTimeVisitor;
    yearData[2].data[parseInt(item.visitYearMonthDate.split('-')[1]) - 1] = item.regular;
  });
  return yearData;
}

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardData } = useSelector((state: RootState) => state.dashboardReducer);
  const { selectedPlaceId } = useSelector((state: RootState) => state.initialDataReducer);
  const { userData } = useSelector((state: RootState) => state.authReducer);
  const [reports, setReports] = useState([]);
  const [periodData, setPeriodData] = useState([]);

  useEffect(() => {
    if (selectedPlaceId) {
      dispatch(getDashboardDataActionSG(selectedPlaceId))
    }
  }, [selectedPlaceId]);

  useEffect(() => {
    if (!dashboardData) {
      return;
    }
    setReports([
      {
        title: "New Customers This Month",
        iconClass: "bx-copy-alt",
        description: dashboardData.newCustomersInThisMonth
      },
      {
        title: "Total Customers This Month",
        iconClass: "bx-archive-in",
        description: dashboardData.totalCustomersInThisMonth
      },
      {
        title: "Busiest Day",
        iconClass: "bx-purchase-tag-alt",
        description: dashboardData.busiestDay ? `${weekDays[dashboardData.busiestDay._id - 1] || ''} (${dashboardData.busiestDay.count})` : '',
      },
    ]);
    const years = correctTrends(dashboardData.customerTrendsThrowYear);
    setPeriodData(years);
  }, [dashboardData]);

  return (
      <>
        {dashboardData &&
            <div className="page-content">
              {/*<MetaTags>*/}
              {/*  <title>Dashboard | Skote - React Admin & Dashboard Template</title>*/}
              {/*</MetaTags>*/}
              <Container fluid>
                {/* Render Breadcrumb */}
                <Breadcrumbs
                    title={'Welcome to That Social App Premium Dashboard'}
                    breadcrumbItem={'Dashboard'}
                />

                <Row>
                  <Col xl="4">
                    <WelcomeComp userData={userData} dashboardData={dashboardData}/>
                    <MonthlyEarning/>
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
                            <i className={"bx " + report.iconClass + " font-size-24"}/>
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
                              {/*<li className="nav-item">*/}
                              {/*  <Link*/}
                              {/*      to="#"*/}
                              {/*      className={classNames(*/}
                              {/*          { active: periodType === 'weekly' },*/}
                              {/*          'nav-link'*/}
                              {/*      )}*/}
                              {/*      onClick={() => {*/}
                              {/*        onChangeChartPeriod('weekly');*/}
                              {/*      }}*/}
                              {/*      id="one_month"*/}
                              {/*  >*/}
                              {/*    Week*/}
                              {/*  </Link>{' '}*/}
                              {/*</li>*/}
                              {/*<li className="nav-item">*/}
                              {/*  <Link*/}
                              {/*      to="#"*/}
                              {/*      className={classNames(*/}
                              {/*          { active: periodType === 'monthly' },*/}
                              {/*          'nav-link'*/}
                              {/*      )}*/}
                              {/*      onClick={() => {*/}
                              {/*        onChangeChartPeriod('monthly');*/}
                              {/*      }}*/}
                              {/*      id="one_month"*/}
                              {/*  >*/}
                              {/*    Month*/}
                              {/*  </Link>*/}
                              {/*</li>*/}
                              <li className="nav-item">
                                <Link
                                    to="#"
                                    className={classNames(
                                        { active: true },
                                        'nav-link'
                                    )}
                                    id="one_month"
                                >
                                  Year
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {/* <div className="clearfix"></div> */}
                        <StackedColumnChart periodData={periodData}/>
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
                    <TopCustomers incomeData={dashboardData.topCustomers}/>
                  </Col>
                </Row>
                <Row>
                  <Col lg="12">
                    <Posts posts={dashboardData.latestPosts}/>
                  </Col>
                </Row>
              </Container>
            </div>
        }
      </>
  );
}

export default Dashboard;
