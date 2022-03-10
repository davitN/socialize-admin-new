/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Fragment, useEffect, useState } from 'react';
import { Badge, Card, CardBody, CardTitle } from 'reactstrap';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import { getLatestPostsActionSG } from '../store/ducks/latestPostsDuck';
import { Paginator } from 'primereact/paginator';
import { PaginationEventModel } from '../types/pagination/pagination';
import { Skeleton } from 'primereact/skeleton';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { PostModel } from '../types/dashboard';
import altImg from '../assets/images/alt-profile-img.jpg';
import { useNavigate } from 'react-router-dom';

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

const LatestPosts = () => {
  const navigate = useNavigate();
  const getImgUrl = (url: string) => {
    if (url.includes('res.cloudinary.com')) {
      url = url.substr(0, url.lastIndexOf('.'));
      url += '.jpg'
    }
    return url;
  }
  const tableHeader = [
    {
      name: 'Post',
      field: '_id',
      haveTemplate: true,
      template: (rowData: PostModel) => (
        <>
          {rowData?.postImage?.imgURL && (
            <img
              data-dz-thumbnail=""
              height="50"
              className={'rounded'}
              src={rowData?.postImage ? (getImgUrl(rowData?.postImage.imgURL)) : altImg}
            />
          )}{' '}
          {rowData.text}
        </>
      ),
    },
    {
      name: 'Customer Posting',
      field: 'name',
      haveTemplate: true,
      template: (rowData: PostModel) => (
        <Fragment>
          {rowData?.profileImage?.imgURL && (
            <img
              data-dz-thumbnail=""
              height="30"
              className={'rounded'}
              src={rowData?.profileImage?.imgURL || altImg}
            />
          )}{' '}
          {rowData.firstName} {rowData.lastName}
        </Fragment>
      ),
    },
    {
      name: 'Date',
      field: 'createdAt',
      haveTemplate: true,
      template: (rowData: PostModel) => (
        <Fragment>
          {new Date(rowData.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
          })}
          , {new Date(rowData.createdAt).getFullYear()}
        </Fragment>
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
      template: (row: PostModel) => (
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
      name: 'View',
      field: 'view',
      haveTemplate: true,
      template: (row: PostModel) => (
        <Button onClick={() => navigate(row._id)}>
          <i className="pi pi-cog" />
        </Button>
      ),
    },
  ];
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const LIMIT = 10;
  const dispatch = useDispatch();
  const { latestPosts } = useSelector(
    (state: RootState) => state.latestPostsReducer
  );
  const { selectedPlaceId } = useSelector(
    (state: RootState) => state.initialDataReducer
  );
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    if (selectedPlaceId) {
      setDataLoading(true);
      dispatch(
        getLatestPostsActionSG(
          {
            offset: 0,
            limit: LIMIT,
            placeId: selectedPlaceId,
          },
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
    }
    setDataLoading(false);
  }, [selectedPlaceId]);

  const handlePageChange = (event: PaginationEventModel) => {
    setCurrentPage(event.first);
    setDataLoading(true);
    dispatch(
      getLatestPostsActionSG(
        { offset: event.first, limit: LIMIT, placeId: selectedPlaceId },
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
            value={latestPosts?.data || new Array(5).fill(0)}
            responsiveLayout="scroll"
            rows={LIMIT}
            // tableClassName={classes.table}
            emptyMessage="Data not found..."
          >
            {dataLoading &&
              tableHeader.map(({ name, field }, index) => (
                <Column
                  field={field}
                  header={name}
                  key={`${field}_${index}`}
                  body={<Skeleton />}
                />
              ))}
            {!dataLoading &&
              tableHeader.map((item, index) => {
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
          <Paginator
            className="justify-content-end"
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
};

export default LatestPosts;
