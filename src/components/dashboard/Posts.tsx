/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Post } from '../../types/dashboard';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

import { Card, CardBody, CardTitle, Badge } from 'reactstrap';
import altImg from '../../assets/images/alt-profile-img.jpg';

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

import PropTypes from 'prop-types';

const tableHeader = [
  {
    name: 'Post',
    field: '_id',
    haveTemplate: true,
    template: (rowData: Post) => (
      <Link to="#" className="text-body fw-bold">
        {
          <img
            data-dz-thumbnail=""
            height="30"
            className={'rounded'}
            alt={rowData.username}
            src={rowData?.profileImage?.imgURL || altImg}
          />
        }{' '}
        {rowData._id}
      </Link>
    ),
  },
  {
    name: 'Customer Posting',
    field: 'name',
    haveTemplate: true,
    template: (rowData: Post) => (
      <>
        {rowData.firstName} {rowData.lastName}
      </>
    ),
  },
  {
    name: 'Date',
    field: 'createdAt',
    haveTemplate: true,
    template: (rowData: Post) => (
      <>
        {new Date(rowData.createdAt).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        })}
        , {new Date(rowData.createdAt).getFullYear()}
      </>
    ),
  },
  {
    name: 'Comments',
    field: 'commentsCount',
  },
  {
    name: 'Customer Type',
    field: 'customerType',
    haveTemplate: true,
    template: (row: Post) => (
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
    name: 'Views',
    field: 'viewsCount',
  },
  {
    name: 'View Details',
    field: 'viewDetails',
    haveTemplate: true,
    template: () => {
      return (
        <Button type="button" color="primary" className="btn-sm btn-rounded">
          View Details
        </Button>
      );
    },
  },
];
const Posts: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const LIMIT = 5;

  return (
    <Card>
      <CardBody>
        <CardTitle title="Latest Posts" />
        <DataTable
          className={'fs-6'}
          value={posts}
          responsiveLayout="scroll"
          rows={LIMIT}
          // tableClassName={classes.table}
          emptyMessage="Data not found..."
        >
          {tableHeader.map((item, index) => {
            if (item.haveTemplate) {
              return (
                <Column
                  header={item.name}
                  body={item.template}
                  key={`${item.field}_${index}`}
                />
              );
            } else {
              return (
                <Column
                  field={item.field}
                  header={item.name}
                  key={`${item.field}_${index}`}
                />
              );
            }
          })}
        </DataTable>
      </CardBody>
    </Card>
  );
};

Posts.propTypes = {
  posts: PropTypes.array,
};

export default Posts;
