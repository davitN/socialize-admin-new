import React from "react"

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"

import ApexRadial from "./ApexRadial"
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  buttonText: {
    paddingTop: '8px',
    textAlign: "start"
  }
});

const MonthlyEarning = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {" "}
      <Card>
        <CardBody>
          <CardTitle className='mb-4 text-start'>Notification Centre</CardTitle>
          <Row>
            <Col sm="6">
              <p className="text-muted text-start">Customers Reached This Month</p>
              <h3 className="text-start">351</h3>
              <p className="text-muted text-start">
                <span className="text-success me-2">
                  {" "}
                  12% <i className="mdi mdi-arrow-up"></i>{" "}
                </span>{" "}
                From previous period
              </p>
              <div className="mt-4">
                <Link
                  to=""
                  className="btn btn-primary  btn-sm"
                >Send Notification<i className="mdi mdi-arrow-right ms-1"></i>
                </Link>
              </div>
            </Col>
            <Col sm="6">
              <div className="mt-4 mt-sm-0">
                <ApexRadial />
              </div>
            </Col>
          </Row>
          <p className={`text-muted mb-0 ${classes.buttonText}`}>
            3 of your 4 notifications for this period sent. Period ends Nov. 9th, 2019
          </p>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default MonthlyEarning
