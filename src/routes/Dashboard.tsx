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
import StackedColumnChartYear from '../components/dashboard/StackedColumnChartYear';
import StackedColumnChartMonth from "../components/dashboard/StackedColumnChartMonth";
import StackedColumnChartWeek from '../components/dashboard/StackedColumnChartWeek';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Dashboard = () => {
  const dispatch = useDispatch();
  const [chartPeriod, setChartPeriod] = useState('');
  const { dashboardData } = useSelector((state: RootState) => state.dashboardReducer);
  const { selectedPlaceId } = useSelector((state: RootState) => state.initialDataReducer);
  const { userData } = useSelector((state: RootState) => state.authReducer);
  const [reports, setReports] = useState([]);
  const [renderedChart, setRenderedChart] = useState(<div />);
  const [busiestDay, setBusiestDay] = useState('');

  useEffect(() => {
    if (selectedPlaceId) {
      dispatch(getDashboardDataActionSG(selectedPlaceId))
    }
  }, [selectedPlaceId]);

  useEffect(() => {
    if (!chartPeriod) {
      return;
    }
    renderChart();
  }, [chartPeriod, dashboardData]);

  useEffect(() => {
    if (dashboardData) {
      setChartPeriod('YEARLY')
    }
  }, [dashboardData])

  const renderChart = () => {
    console.log(chartPeriod)
    switch (chartPeriod) {
      case 'YEARLY':
        if (dashboardData.busiestDayLastYear) {
          setBusiestDay(`${weekDays[dashboardData?.busiestDayLastYear?._id - 1]} (${dashboardData?.busiestDayLastYear?.count})`);
        } else { setBusiestDay('') }
        setRenderedChart((
            <StackedColumnChartYear incomeData={dashboardData?.customerTrendsThrowYear || null}/>
        ));
        break;
      case 'MONTHLY':
        if (dashboardData.busiestDayLastMonth) {
          setBusiestDay(`${weekDays[dashboardData?.busiestDayLastMonth?._id - 1]} (${dashboardData?.busiestDayLastMonth?.count})`);
        } else { setBusiestDay('') }
        setRenderedChart((
            <StackedColumnChartMonth incomeData={dashboardData?.customerTrendsThrowMonth || null}/>
        ));
        break;
      case 'WEEKLY':
        if (dashboardData.busiestDayLastWeek) {
          setBusiestDay(`${weekDays[dashboardData?.busiestDayLastWeek?._id - 1]} (${dashboardData?.busiestDayLastWeek?.count})`);
        } else { setBusiestDay('') }
        setRenderedChart((
            <StackedColumnChartWeek incomeData={dashboardData?.customerTrendsThrowWeek || null}/>
        ));
        break;
    }
  }

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
        description: busiestDay || '',
      },
    ]);
  }, [busiestDay]);

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
                              <li className="nav-item">
                                <Link
                                    to="#"
                                    className={classNames(
                                        { active: chartPeriod === 'WEEKLY' },
                                        'nav-link'
                                    )}
                                    onClick={() => {
                                      setChartPeriod('WEEKLY');
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
                                        { active: chartPeriod === 'MONTHLY' },
                                        'nav-link'
                                    )}
                                    onClick={() => {
                                      setChartPeriod('MONTHLY');
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
                                        { active: chartPeriod === 'YEARLY' },
                                        'nav-link'
                                    )}
                                    onClick={() => {
                                      setChartPeriod('YEARLY');
                                    }}
                                    id="one_year"
                                >
                                  Year
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {/* <div className="clearfix"></div> */}
                        {renderedChart}
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
