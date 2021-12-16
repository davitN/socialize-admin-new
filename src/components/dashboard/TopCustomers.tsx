/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import { Card, CardBody, Col, Row, CardTitle, CardSubtitle } from 'reactstrap';
import { Customer } from '../../types/dashboard';
import PropTypes from 'prop-types';
import altImg from '../../assets/images/alt-profile-img.jpg';

//შესამოწმებელია რაშია ზუსტად საჭირო
// import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal";

//redux

const TopCustomers: React.FC<{ incomeData: Customer[] }> = ({ incomeData }) => {
  const selectRow = {
    mode: 'checkbox',
  };
  const [isEdit, setIsEdit] = useState(false);
  const EcommerceOrderColumns = () => [
    {
      dataField: 'username',
      text: 'Customer',
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent: any, row: any) => (
        <Link to="#" className="text-body fw-bold">
          <>
            <img
              data-dz-thumbnail=""
              height="30"
              className={'rounded'}
              alt={row.username}
              src={row?.profileImage?.imgURL || altImg}
            />
            {'   '}
            {row.firstName} {row.lastName}
          </>
        </Link>
      ),
    },
    {
      dataField: 'visitsCount',
      text: '# of Visits',
      sort: true,
    },
    {
      dataField: 'lastVisitingTime',
      text: 'Last Visit',
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent: any, row: any) => (
        <React.Fragment>
          {new Date(row.lastVisitingTime).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
          })}
          , {new Date(row.lastVisitingTime).getFullYear()}
        </React.Fragment>
      ),
    },
    {
      dataField: 'postsCount',
      text: '# of Posts',
      sort: true,
    },
    {
      dataField: 'viewsOnPosts',
      text: 'Views on Posts',
      sort: true,
    },
  ];

  useEffect(() => {
    if (!isEmpty(incomeData) && !!isEdit) {
      setIsEdit(false);
    }
  }, [incomeData]);

  return (
    <React.Fragment>
      {/* <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} /> */}
      <Card>
        <CardBody>
          <div className={'flex-horizontal mb-3'}>
            <CardTitle className={'mb-0'}>Top Customers</CardTitle>
            <CardSubtitle className={'ms-4'}>
              To unlock customers name, simply send an offer and ask that they
              reveal their name to your business.
            </CardSubtitle>
          </div>
          <ToolkitProvider
            keyField={"dataField"}
            data={incomeData}
            columns={EcommerceOrderColumns()}
            bootstrap4
          >
            {(toolkitProps: any) => (
              <React.Fragment>
                <Row className={'text-start'}>
                  <Col xl="12">
                    <div className="table-responsive">
                      <BootstrapTable
                        keyField={'dataField'}
                        responsive
                        bordered={false}
                        striped={false}
                        selectRow={selectRow}
                        classes={'table align-middle table-nowrap table-check'}
                        headerWrapperClasses={'table-light'}
                        {...toolkitProps.baseProps}
                      />
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            )}
          </ToolkitProvider>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

TopCustomers.propTypes = {
  incomeData: PropTypes.array,
};

export default TopCustomers;
