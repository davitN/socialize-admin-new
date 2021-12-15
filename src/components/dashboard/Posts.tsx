/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import { Button, Card, CardBody, Col, Row, CardTitle, Badge } from 'reactstrap';

//შესამოწმებელია რაშია ზუსტად საჭირო
// import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal";

const getCustomerTypeColors = (type: string): string => {
  switch (type) {
    case 'Regular':
      return 'success';
    case 'First Visit':
      return 'warning';
    case 'Second Visit':
      return 'danger';
    default:
      return 'danger';
  }
};

import { Post } from '../../types/dashboard';
import PropTypes from 'prop-types';

const Posts: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const selectRow = {
    mode: 'checkbox',
  };

  const [modal1, setModal1] = useState(false);

  const toggleViewModal = () => setModal1(!modal1);

  const EcommerceOrderColumns = () => [
    {
      dataField: '_id',
      text: 'Post',
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent: any, row: any) => (
        <Link to="#" className="text-body fw-bold">
          <img
            data-dz-thumbnail=""
            height="30"
            className={'rounded'}
            alt={row.username}
            src={row.profileImage.imgURL}
          />{' '}
          {row._id}
        </Link>
      ),
    },
    {
      dataField: 'name',
      text: 'Customer Posting',
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent: any, row: any) => (
        <React.Fragment>
          {row.firstName} {row.lastName}
        </React.Fragment>
      ),
    },
    {
      dataField: 'createdAt',
      text: 'Date',
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent: any, row: any) => (
        <React.Fragment>
          {new Date(row.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
          })}
          , {new Date(row.createdAt).getFullYear()}
        </React.Fragment>
      ),
    },
    {
      dataField: 'commentsCount',
      text: 'Comments',
      sort: true,
    },
    {
      dataField: 'customerType',
      text: 'Customer Type',
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent: any, row: any) => (
        <Badge
          className={
            'font-size-12 badge-soft-' + getCustomerTypeColors(row.customerType)
          }
          color={getCustomerTypeColors(row.customerType)}
          pill
        >
          {row.customerType}
        </Badge>
      ),
    },
    {
      dataField: 'viewsCount',
      text: 'Views',
      sort: true,
    },
    {
      dataField: 'view',
      isDummyField: true,
      text: 'View Details',
      // eslint-disable-next-line react/display-name
      formatter: () => (
        <Button
          type="button"
          color="primary"
          className="btn-sm btn-rounded"
          onClick={toggleViewModal}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <React.Fragment>
      {/* <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} /> */}
      <Card>
        <CardBody>
          <CardTitle className={'mb-3 text-start'}>Latest Posts</CardTitle>
          <ToolkitProvider
            keyField="id"
            data={posts}
            columns={EcommerceOrderColumns()}
            bootstrap4
          >
            {(toolkitProps: any) => (
              <React.Fragment>
                <Row className={'text-start'}>
                  <Col xl="12">
                    <div className="table-responsive">
                      <BootstrapTable
                        keyField="id"
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

Posts.propTypes = {
  posts: PropTypes.array,
};

export default Posts;
