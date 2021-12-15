/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import { Paginator } from 'primereact/paginator';
import { PaginationEventModel } from '../types/pagination/pagination';
import { Skeleton } from 'primereact/skeleton';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Customer } from '../types/dashboard';
import { getTopCustomersActionSG } from '../store/ducks/topCustomersDuck';

const tableHeader = [
  {
    name: 'Customer',
    field: 'username',
    haveTemplate: true,
    template: (row: Customer) => <>{row.username}</>,
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
  {
    name: 'Send Offer',
    field: 'viewDetails',
    haveTemplate: true,
    template: () => {
      return (
        <Button type="button" color="primary" className="btn-sm btn-rounded">
          Send Offer
        </Button>
      );
    },
  },
];
const TopCustomers = () => {
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const LIMIT = 10;
  const dispatch = useDispatch();
  const { topCustomers } = useSelector(
    (state: RootState) => state.topCustomersReducer
  );

  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    setDataLoading(true);
    dispatch(
      getTopCustomersActionSG(
        { offset: 0, limit: LIMIT },
        {
          success: () => {
            setDataLoading(false);
          },
          error: () => {
            setDataLoading(false);
          },
        }
      )
    );
  }, [dispatch]);

  const handlePageChange = (event: PaginationEventModel) => {
    setCurrentPage(event.first);
    setDataLoading(true);
    dispatch(
      getTopCustomersActionSG(
        { offset: event.first, limit: LIMIT },
        {
          success: () => {
            setDataLoading(false);
          },
          error: () => {
            setDataLoading(false);
          },
        }
      )
    );
  };

  return (
    <div className="page-content">
      <Card>
        <CardBody>
          <CardTitle title="Latest Posts" />
          <DataTable
            className={'fs-6'}
            value={topCustomers?.data || new Array(5).fill(0)}
            responsiveLayout="scroll"
            rows={LIMIT}
            // tableClassName={classes.table}
            emptyMessage="Data not found..."
          >
            {dataLoading &&
              tableHeader.map(({ name, field }) => (
                <Column
                  field={field}
                  header={name}
                  key={field}
                  body={<Skeleton />}
                />
              ))}
            {!dataLoading &&
              tableHeader.map((item) => {
                if (item.haveTemplate) {
                  return <Column header={item.name} body={item.template} />;
                } else {
                  return <Column field={item.field} header={item.name} />;
                }
              })}
          </DataTable>
          <Paginator
            className="justify-content-end"
            template="PrevPageLink PageLinks NextPageLink"
            first={currentPage}
            rows={LIMIT}
            totalRecords={topCustomers.count}
            onPageChange={handlePageChange}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default TopCustomers;
