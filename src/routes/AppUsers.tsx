import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { Skeleton } from 'primereact/skeleton';
// import { createUseStyles } from 'react-jss';
import { Card, CardBody } from 'reactstrap';
import { Button } from 'primereact/button';
// import TextInput from '../components/shared/form-elements/TextInput';
import { RootState } from '../store/configureStore';
import { getAppUsersActionSG } from '../store/ducks/appUsersDuck';
import { PaginationEventModel } from '../types/pagination/pagination';
import { TableHeaderModel, TableQueryParams } from '../types/table';
import { AppUsersDataModel } from '../types/appUsers';
import altImg from '../assets/images/alt-profile-img.jpg';

// const useStyles = createUseStyles({
//   searchInput: {
//     marginRight: '20px',
//     width: '200px',
//   },
// });

let queryParams: TableQueryParams = {
  offset: 0,
  limit: 10,
};

const tableHeader: TableHeaderModel[] = [
  {
    name: 'Name',
    field: 'firstName',
    haveTemplate: true,
    template: (rowData: AppUsersDataModel) => (
      <>
        <img
          className={'rounded'}
          height="30"
          width="30"
          src={rowData?.profileImage?.imgURL || altImg}
        />{' '}
        {rowData.firstName} {rowData.lastName}
      </>
    ),
  },
  {
    name: 'Username',
    field: 'username',
  },
  {
    name: 'Gender',
    field: 'gender',
  },
  {
    name: 'Phone',
    field: 'phone',
  },
  {
    name: 'Veirfied',
    field: 'isVerified',
    haveTemplate: true,
    template: (rowData: AppUsersDataModel) => (
      <>{rowData.isVerified ? 'Yes' : 'No'}</>
    ),
  },
  {
    name: 'Verify',
    field: 'isVerified',
    haveTemplate: true,
    template: (rowData: AppUsersDataModel) => (
      <>
        <Button label={'Verify'} disabled={rowData.isVerified ? true : false} />
      </>
    ),
  },
];

const AppUsers = () => {
  const [searchValue, setSearchValue] = useState('');
  // const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { appUsers } = useSelector((state: RootState) => state.appUsersReducer);
  const LIMIT = 10;
  console.log(appUsers);

  const getData = () => {
    setDataLoading(true);
    const params: TableQueryParams = {
      offset: searchParams.get('offset'),
      limit: searchParams.get('limit'),
    };
    dispatch(
      getAppUsersActionSG(params, {
        success: () => {
          setDataLoading(false);
        },
        error: () => {
          setDataLoading(false);
        },
      })
    );
  };
  useEffect(() => {
    queryParams = {
      offset: parseInt(searchParams.get('offset')) || 0,
      limit: parseInt(searchParams.get('limit')) || 10,
      searchWord: searchParams.get('searchWord') || '',
    };
    console.log(parseInt(queryParams.offset) / parseInt(queryParams.limit));
    setCurrentPage(queryParams.offset);
    setSearchParams({
      limit: queryParams.limit.toString(),
      offset: queryParams.offset.toString(),
    });
    // navigate({
    //   search: `?${createSearchParams({
    //     limit: queryParams.limit.toString(),
    //     offset: queryParams.offset.toString(),
    //     searchWord: queryParams.searchWord
    //   })}`
    // })
  }, [searchParams]);

  useEffect(() => {
    getData();
  }, [searchParams]);

  const handlePageChange = (event: PaginationEventModel) => {
    setCurrentPage(event.first);
    queryParams.offset = event.first;
    queryParams.limit = LIMIT;
    setSearchParams({
      offset: queryParams.offset.toString(),
      limit: queryParams.limit.toString(),
    });
  };

  const handleSearch = (event: string) => {
    setSearchValue(event);
    queryParams.searchWord = event;
    setSearchParams({
      offset: queryParams.offset.toString(),
      limit: queryParams.limit.toString(),
    });
  };

  return (
    <div className="page-content">
      <Card>
        <CardBody>
          {/* <div className={`mb-2 flex-horizontal justify-content-end`}>
            <TextInput
              customClasses={classes.searchInput}
              icon={<i className="pi pi-search" />}
              placeholder="Search..."
              value={searchValue}
              handleChange={(val) => {
                if (handleSearch) {
                  handleSearch(val);
                  setCurrentPage(0);
                }
              }}
            />
          </div> */}
          <DataTable
            className={'fs-6'}
            value={appUsers.data.length > 0 ? appUsers.data : []}
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
                      key={`${item.field}_${index}`}
                      header={item.name}
                      body={item.template}
                    />
                  );
                } else {
                  return (
                    <Column
                      key={`${item.field}_${index}`}
                      field={item.field}
                      header={item.name}
                    />
                  );
                }
              })}
          </DataTable>
          <Paginator
            className="justify-content-end"
            template="PrevPageLink PageLinks NextPageLink"
            first={currentPage}
            totalRecords={appUsers.count}
            rows={LIMIT}
            onPageChange={handlePageChange}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default AppUsers;
