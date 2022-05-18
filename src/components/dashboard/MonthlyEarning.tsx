/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';

import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

import ApexRadial from './ApexRadial';
import { createUseStyles } from 'react-jss';
import { DashboardData } from '../../types/dashboard';

const useStyles = createUseStyles({
  buttonText: {
    paddingTop: '8px',
    textAlign: 'start',
  },
});

const MonthlyEarning = ({ dashbordData }: { dashbordData: DashboardData }) => {
  const classes = useStyles();
  let notificationGrowth = false;

  if (
    dashbordData.notificationCountThisMonth >
    dashbordData.notificationCountLastMonth
  ) {
    notificationGrowth = true;
  }

  const notificationsGrowthPercentage = Math.round(
    ((dashbordData.notificationCountThisMonth -
      dashbordData.notificationCountLastMonth) /
      dashbordData.notificationCountLastMonth) *
      100
  );

  return (
    <React.Fragment>
      {' '}
      <Card>
        <CardBody>
          <CardTitle className="mb-4 text-start">Notification Centre</CardTitle>
          <Row>
            <Col sm="6">
              <p className="text-muted text-start">
                Customers Reached This Month
              </p>
              <h3 className="text-start">
                {dashbordData?.sentAndDeliveredNotificationsCount
                  ?.deliveredUsersCount || 0}
              </h3>
              <p className="text-muted text-start">
                <span
                  className={`me-2 ${
                    notificationGrowth ? 'text-success' : 'text-danger'
                  }`}
                >
                  {' '}
                  {notificationsGrowthPercentage > 0
                    ? notificationsGrowthPercentage
                    : -notificationsGrowthPercentage || 0}
                  %{' '}
                  <i
                    className={`mdi ${
                      notificationGrowth ? 'mdi-arrow-up' : 'mdi-arrow-down'
                    }`}
                  ></i>{' '}
                </span>{' '}
                From previous period
              </p>
              <div className="mt-4 text-start">
                <Link to="" className="btn btn-primary  btn-sm">
                  Send Notification<i className="mdi mdi-arrow-right ms-1"></i>
                </Link>
              </div>
            </Col>
            <Col sm="6">
              <div className="mt-4 mt-sm-0">
                <ApexRadial dashbordData={dashbordData} />
              </div>
            </Col>
          </Row>
          <p className={`text-muted mb-0 ${classes.buttonText}`}>
            You have posted {dashbordData?.postsViewsCount?.postsCount || 0} posts all
            time and had {dashbordData?.postsViewsCount?.viewsCount || 0} total views.
          </p>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default MonthlyEarning;
