/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Fragment, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody, CardTitle,
} from 'reactstrap';

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { getLatestPostsActionSG } from '../store/ducks/latestPostsDuck';
import { Paginator } from 'primereact/paginator';
import { PaginationEventModel } from '../types/pagination/pagination';
import { Skeleton } from 'primereact/skeleton';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Post } from '../types/dashboard';

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
}

const tableHeader = [
  {
    name: 'Post',
    field: '_id'
  },
  {
    name: 'Customer Posting',
    field: 'name',
    haveTemplate: true,
    template: (rowData: Post) => (
        <Fragment>
          {rowData.firstName} {rowData.lastName}
        </Fragment>
    )
  },
  {
    name: 'Date',
    field: 'createdAt',
    haveTemplate: true,
    template: (rowData: Post) => (
        <Fragment>
          {new Date(rowData.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short'
          })}, {new Date(rowData.createdAt).getFullYear()}
        </Fragment>
    )
  },
  {
    name: 'Comments',
    field: 'commentsCount'
  },
  {
    name: 'Customer Type',
    field: 'customerType',
    haveTemplate: true,
    template: (row: Post) => (
        <Badge className={"font-size-12 badge-soft-" + getCustomerTypeColors(row.customerType)}
               color={getCustomerTypeColors(row.customerType)} pill>
          {row.customerType}
        </Badge>
    )
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
      )
    }
  }
]
const LatestPosts = () => {
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const LIMIT = 10;
  const dispatch = useDispatch();
  const { latestPosts } = useSelector((state: RootState) => state.latestPostsReducer);

  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    setDataLoading(true);
    dispatch(getLatestPostsActionSG({ offset: 0, limit: LIMIT }, {
      success: () => {
        setDataLoading(false);
      },
      error: () => {
        setDataLoading(false);
      }
    }));
  }, [dispatch]);

  const handlePageChange = (event: PaginationEventModel) => {
    setCurrentPage(event.first)
    setDataLoading(true);
    dispatch(getLatestPostsActionSG({ offset: event.first, limit: LIMIT }, {
      success: () => {
        setDataLoading(false);
      },
      error: () => {
        setDataLoading(false);
      }
    }));
  };

  return (
      <div className="page-content">
        <Card>
          <CardBody>
            <CardTitle title='Latest Posts'/>
            <DataTable className={'fs-6'}
                value={(latestPosts?.data || new Array(5).fill(0))}
                responsiveLayout="scroll"
                rows={LIMIT}
                // tableClassName={classes.table}
                emptyMessage="Data not found..."
            >
              {dataLoading && tableHeader.map(({ name, field }) => <Column field={field} header={name} key={field}
                                                                           body={<Skeleton/>}/>)}
              {!dataLoading && tableHeader.map((item) => {
                if (item.haveTemplate) {
                  return (
                      <Column header={item.name} body={item.template}/>
                  )
                } else {
                  return (
                      <Column field={item.field} header={item.name}/>
                  )
                }
              })}
            </DataTable>
            <Paginator
                className='justify-content-end'
                template="PrevPageLink PageLinks NextPageLink"
                first={currentPage}
                rows={LIMIT}
                totalRecords={latestPosts.count}
                onPageChange={handlePageChange}
            />
          </CardBody>
        </Card>
      </div>
  );
}

export default LatestPosts;
