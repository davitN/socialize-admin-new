import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Paginator } from 'primereact/paginator';
import { Skeleton } from 'primereact/skeleton';
import { createUseStyles } from 'react-jss';
import { Card, CardBody } from 'reactstrap';
import { RootState } from '../store/configureStore';
import {
  getReportedCommentsActionSG,
  getReportedPostsActionSG,
} from '../store/ducks/reportsDuck';
import { ReportDetailsModel } from '../types/reports';
import { PaginationEventModel } from '../types/pagination/pagination';
import { TableHeaderModel, TableQueryParams } from '../types/table';
import { useSearchParams } from 'react-router-dom';

const useStyles = createUseStyles({
  multiSelectClass: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    height: '40px',
    '& label': {
      width: '200px',
      textAlign: 'start',
    },
    '& .p-dropdown': {
      width: 'calc(50% - 200px)',
      borderRadius: '0.25rem',
      height: '100%',
      marginLeft: '20px',
    },
  },
});

const params: TableQueryParams = {
  offset: 0,
  limit: 10,
  statusFilter: '',
};

const Reports = () => {
  const tableHeader: TableHeaderModel[] = [
    {
      name: 'Reporter',
      field: 'reporter',
      haveTemplate: true,
      template: (row: ReportDetailsModel) => (
        <>
          {row?.reporter?.profileImage?.imgURL && (
            <img
              alt={'profile'}
              data-dz-thumbnail=""
              height="30"
              className={'rounded'}
              src={row?.reporter?.profileImage?.imgURL}
            />
          )}{' '}
          {row.reporter.firstName} {row.reporter.lastName}
        </>
      ),
    },
    {
      name: 'Post Owner',
      field: 'postOwner',
      haveTemplate: true,
      template: (row: ReportDetailsModel) => (
        <>
          {row?.postOwner?.profileImage?.imgURL && (
            <img
              alt={'post'}
              data-dz-thumbnail=""
              height="30"
              className={'rounded'}
              src={row?.postOwner?.profileImage?.imgURL}
            />
          )}{' '}
          {row.reporter.firstName} {row.reporter.lastName}
        </>
      ),
    },
    {
      name: 'Post Info',
      field: 'post',
      haveTemplate: true,
      template: (row: ReportDetailsModel) => (
        <>
          {row.post?.image?.imgURL && (
            <img
              alt={'post'}
              data-dz-thumbnail=""
              height="30"
              className={'rounded'}
              src={row.post?.image?.imgURL}
            />
          )}{' '}
          {row.post.text}
        </>
      ),
    },
    {
      name: 'Comment Info',
      field: 'comment',
      haveTemplate: true,
      template: (row: ReportDetailsModel) => (
        <>
          {row?.comment?.image?.imgURL && (
            <img
              alt={'comment'}
              data-dz-thumbnail=""
              height="30"
              className={'rounded'}
              src={row.comment?.image?.imgURL}
            />
          )}{' '}
          {row?.comment?.text}
        </>
      ),
    },
    {
      name: 'Status',
      field: 'status',
    },
    {
      name: 'Created At',
      field: 'createdAt',
      haveTemplate: true,
      template: (row: ReportDetailsModel) => (
        <>
          {new Date(row.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
          })}{' '}
          {new Date(row.createdAt).getFullYear()}
        </>
      ),
    },
    {
      name: 'View',
      field: 'view',
      haveTemplate: true,
      template: (row: ReportDetailsModel) => (
        <Button onClick={() => navigate(row.post._id)}>
          <i className="pi pi-cog" />
        </Button>
      ),
    },
  ];
  const { reports } = useSelector((state: RootState) => state.reportsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedReportFilter, setSelectedReportFilter] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const LIMIT = 10;
  const classes = useStyles();

  const dropdownOptions = ['Posts', 'Comments', 'Chat Room'];
  const statusFilter = ['REPORTED', 'CONFIRMED', 'DECLINED'];

  const callbacks = {
    success: () => {
      setDataLoading(false);
    },
    error: () => {
      setDataLoading(false);
    },
  };

  const getData = () => {
    setDataLoading(true);
    switch (selectedReportFilter) {
      case 'Posts':
        dispatch(
          getReportedPostsActionSG(
            { ...params, statusFilter: searchParams.get('statusFilter') || '' },
            callbacks
          )
        );
        break;
      case 'Comments':
        dispatch(
          getReportedCommentsActionSG(
            { ...params, statusFilter: searchParams.get('statusFilter') || '' },
            callbacks
          )
        );
        break;
      case 'Chat Room':
        // dispatch(getReportedPostsActionSG(params, callbacks));
        console.log('Chat Room');
        break;
      default:
        setSelectedReportFilter(undefined);
        setDataLoading(false);
        break;
    }
  };

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get('offset')) || 0);
    setSearchParams({
      offset: searchParams.get('offset') || '0',
      // reportFilter: searchParams.get('reportFilter') || '',
      statusFilter: searchParams.get('phoneFilter') || '',
    });
  }, []);

  useEffect(() => {
    if (searchParams.toString().includes('offset')) {
      getData();
    }
  }, [selectedReportFilter, selectedStatusFilter, searchParams]);

  const handlePageChange = (event: PaginationEventModel) => {
    setCurrentPage(event.first);
    setSearchParams({
      offset: event.first.toString(),
      // reportFilter: searchParams.get('reportFilter') || '',
      statusFilter: searchParams.get('statusFilter') || '',
    });
  };

  // const handleReportFilter = (event: any) => {
  //   setSelectedReportFilter(event);
  //   setSearchParams({
  //     offset: '0',
  //     reportFilter: event || '',
  //     statusFilter: searchParams.get('statustFilter'),
  //   });
  // };

  const handleStatusFilter = (event: string) => {
    setSelectedStatusFilter(event);
    setSearchParams({
      offset: '0',
      // reportFilter: searchParams.get('reportFilter'),
      statusFilter: event || '',
    });
  };

  const clearFilterHandler = () => {
    setSearchParams({
      offset: '0',
      reportFilter: '',
      statusFilter: '',
    });
    // setSelectedReportFilter('');
    setSelectedStatusFilter('');
  };

  return (
    <div className={'page-content'}>
      <Card>
        <CardBody>
          <div className={`flex-horizontal mb-3 ${classes.multiSelectClass}`}>
            <label>Select Report Filter</label>
            <Dropdown
              options={dropdownOptions}
              placeholder={
                selectedReportFilter
                  ? selectedReportFilter
                  : 'Select report filter...'
              }
              value={selectedReportFilter}
              className={'mb-3'}
              onChange={(e) => {
                // handleReportFilter(e);
                setSelectedReportFilter(e.value);
                setSearchParams({
                  ...searchParams,
                  offset: '0',
                  reportFilter: e.value,
                });
              }}
            />
            <Dropdown
              options={statusFilter}
              placeholder={
                selectedStatusFilter
                  ? selectedStatusFilter
                  : 'Select report filter...'
              }
              value={selectedStatusFilter}
              className={'mb-3'}
              showClear={!!selectedStatusFilter}
              onChange={(e) => {
                setSelectedStatusFilter(e.value);
                handleStatusFilter(e.value);
              }}
            />
            <Button
              label={'Clear Filter'}
              onClick={clearFilterHandler}
              // className={classes.clearButton}
            />
          </div>
          <DataTable
            className={'fs-6'}
            value={reports.data}
            responsiveLayout="scroll"
            rows={LIMIT}
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
            totalRecords={reports.count || 1}
            onPageChange={handlePageChange}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Reports;
