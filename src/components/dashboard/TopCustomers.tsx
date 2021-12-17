/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Customer } from '../../types/dashboard';
import PropTypes from 'prop-types';
import altImg from '../../assets/images/alt-profile-img.jpg';

//შესამოწმებელია რაშია ზუსტად საჭირო
// import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal";

//redux

const tableHeader = [
  {
    name: 'Customer',
    field: 'username',
    haveTemplate: true,
    template: (row: Customer) => (
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
    ),
  },
  {
    name: '# of Visits',
    field: 'visitsCount',
  },
  {
    name: 'Last Visit',
    field: 'lastVisitingTime',
    haveTemplate: true,
    template: (row: Customer) => (
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
    name: '# of Posts',
    field: 'postsCount',
  },
  {
    name: 'Views on Posts',
    field: 'viewsOnPosts',
  },
  // {
  //   name: 'Send Offer',
  //   field: 'viewDetails',
  //   haveTemplate: true,
  //   template: () => {
  //     return (
  //       <Button type="button" color="primary" className="btn-sm btn-rounded">
  //         Send Offer
  //       </Button>
  //     );
  //   },
  // },
];
const TopCustomers: React.FC<{ incomeData: Customer[] }> = ({ incomeData }) => {
  const LIMIT = 10;

  return (
    <Card>
      <CardBody>
        <CardTitle title="Latest Posts" />
        <DataTable
          className={'fs-6'}
          value={incomeData || new Array(5).fill(0)}
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

TopCustomers.propTypes = {
  incomeData: PropTypes.array,
};

export default TopCustomers;
