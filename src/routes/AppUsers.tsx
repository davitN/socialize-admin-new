import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { confirmPopup } from 'primereact/confirmpopup';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { Skeleton } from 'primereact/skeleton';
import { createUseStyles } from 'react-jss';
import { Card, CardBody } from 'reactstrap';
import { Button } from 'primereact/button';
import TextInput from '../components/shared/form-elements/TextInput';
import { RootState } from '../store/configureStore';
import {
  appUsersVerifyActionSG,
  getAppUsersActionSG,
} from '../store/ducks/appUsersDuck';
import { PaginationEventModel } from '../types/pagination/pagination';
import { TableHeaderModel, TableQueryParams } from '../types/table';
import { AppUsersDataModel } from '../types/appUsers';
import altImg from '../assets/images/alt-profile-img.jpg';
import notificationService from '../services/notification.service';
import { Dropdown } from 'primereact/dropdown';

const useStyles = createUseStyles({
  searchInput: {
    maxWidth: '150px',
    marginRight: '20px',
    '& input': {
      fontSize: '0.7rem',
    },
  },
  clearButton: {
    marginRight: '10px',
  },
  button: {
    minWidth: '117.11px',
  },
  sortInput: {
    width: '150px',
    marginRight: '10px',
    '& input': {
      fontSize: '0.7rem',
    },
  },
});

const AppUsers = () => {
  const classes = useStyles();
  const tableHeader: TableHeaderModel[] = [
    {
      name: 'Name',
      field: 'firstName',
      haveTemplate: true,
      template: (rowData: AppUsersDataModel) => (
        <>
          <img
            alt={'profile'}
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
      name: 'Date Created',
      field: 'createdAt',
      haveTemplate: true,
      template: (rowData: AppUsersDataModel) => (
        <React.Fragment>
          {new Date(rowData?.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
          })}
          , {new Date(rowData?.createdAt).getFullYear()}
        </React.Fragment>
    ),
    },
    {
      name: 'Verify',
      field: 'isVerified',
      haveTemplate: true,
      template: (rowData: AppUsersDataModel) => (
        <>
          <Button
            label={rowData.isVerified ? 'Verified' : 'Verify'}
            onClick={(event) => verifyHandler(event, rowData)}
            className={classes.button}
            icon={rowData.isVerified ? 'pi pi-check' : ''}
            disabled={rowData.isVerified}
          />
        </>
      ),
    },
    {
      name: 'View',
      field: 'view',
      haveTemplate: true,
      template: (rowData: AppUsersDataModel) => (
        <>
          <Button onClick={() => navigate(rowData._id)}>
            <i className="pi pi-cog" />
          </Button>
        </>
      ),
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [phoneFilter, setPhoneFilter] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [isVerifiedFilter, setIsVerifiedFilter] = useState('');
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [sortFilter, setSortFilter] = useState('');
  const [sortFilterPlaceholder, setSortFilterPlaceholder] = useState('');
  const [sortOrder, setSortOrder] = useState<number>(1);
  const dispatch = useDispatch();
  const { appUsers } = useSelector((state: RootState) => state.appUsersReducer);
  const LIMIT = 10;
  const navigate = useNavigate();

  const arrayOfGender = ['Male', 'Female'];
  const arrayOfIsVerified = ['Yes', 'No'];
  const arrayOfSortFilter = ['Name ↓', 'Name ↑', 'Username ↓', 'Username ↑', 'Date Created ↓', 'Date Created ↑', 'Verify ↓', 'Verify ↑'];

  const getData = () => {
    setDataLoading(true);
    const params: TableQueryParams = {
      offset: searchParams.get('offset'),
      limit: LIMIT,
      phoneFilter: searchParams.get('phoneFilter'),
      nameFilter: searchParams.get('nameFilter'),
      usernameFilter: searchParams.get('usernameFilter'),
      genderFilter: searchParams.get('genderFilter'),
      isVerifiedFilter: searchParams.get('isVerifiedFilter') || '',
      sortType: sortFilter,
      ordering: sortOrder,
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
    setCurrentPage(parseInt(searchParams.get('offset')) || 0);
    setSearchParams({
      offset: searchParams.get('offset') || '0',
      phoneFilter: searchParams.get('phoneFilter') || '',
      nameFilter: searchParams.get('nameFilter') || '',
      usernameFilter: searchParams.get('usernameFilter') || '',
      genderFilter: searchParams.get('genderFilter') || '',
      isVerifiedFilter: searchParams.get('isVerifiedFilter') || '',
    });
    setNameFilter(searchParams.get('nameFilter') || '');
    setUsernameFilter(searchParams.get('usernameFilter') || '');
    setPhoneFilter(searchParams.get('phoneFilter') || '');
    setGenderFilter(searchParams.get('genderFilter') || '');
    if (searchParams.get('isVerifiedFilter') === 'true') {
      setIsVerifiedFilter('Yes');
    } else if (searchParams.get('isVerifiedFilter') === 'false') {
      setIsVerifiedFilter('No');
    }
  }, []);

  useEffect(() => {
    if (searchParams.toString().includes('offset')) {
      getData();
    }
  }, [searchParams, sortFilter, sortOrder]);

  const handlePageChange = (event: PaginationEventModel) => {
    setCurrentPage(event.first);
    setSearchParams({
      offset: event.first.toString(),
      phoneFilter: searchParams.get('phoneFilter') || '',
      nameFilter: searchParams.get('nameFilter') || '',
      usernameFilter: searchParams.get('usernameFilter') || '',
      genderFilter: searchParams.get('genderFilter') || '',
      isVerifiedFilter: searchParams.get('isVerifiedFilter') || '',
    });
  };

  const putData = (data: AppUsersDataModel) => {
    setDataLoading(true);
    const newData: AppUsersDataModel = {
      ...data,
      isVerified: true,
    };
    dispatch(
      appUsersVerifyActionSG(data._id, newData, {
        success: () => {
          setDataLoading(false);
          notificationService.success('User successfully verified!');
          getData();
        },
        error: () => {
          setDataLoading(false);
        },
      })
    );
  };

  const verifyHandler = (event: React.MouseEvent<HTMLButtonElement>, data: AppUsersDataModel) => {
    const confirm = confirmPopup({
      target: event.currentTarget,
      message: 'Are you sure you want to verify this user?',
      accept: () => putData(data),
      reject: () => confirm.hide,
    });
  };

  const handleNameFilter = (event: string) => {
    setNameFilter(event);
    setSearchParams({
      offset: '0',
      nameFilter: event,
      phoneFilter: searchParams.get('phoneFilter') || '',
      usernameFilter: searchParams.get('emailFilter') || '',
      genderFilter: searchParams.get('genderFilter') || '',
      isVerifiedFilter: searchParams.get('isVerifiedFilter') || '',
    });
  };

  const handlePhoneFilter = (event: string) => {
    setPhoneFilter(event);
    setSearchParams({
      offset: '0',
      phoneFilter: event,
      nameFilter: searchParams.get('nameFilter'),
      usernameFilter: searchParams.get('usernameFilter'),
      genderFilter: searchParams.get('genderFilter'),
      isVerifiedFilter: searchParams.get('isVerifiedFilter'),
    });
  };

  const handleUsernameFilter = (event: string) => {
    setUsernameFilter(event);
    setSearchParams({
      offset: '0',
      usernameFilter: event,
      phoneFilter: searchParams.get('phoneFilter'),
      nameFilter: searchParams.get('nameFilter'),
      genderFilter: searchParams.get('genderFilter'),
      isVerifiedFilter: searchParams.get('isVerifiedFilter'),
    });
  };

  const handleGenderFilter = (event: string) => {
    setGenderFilter(event);
    setSearchParams({
      offset: '0',
      usernameFilter: searchParams.get('usernameFilter'),
      phoneFilter: searchParams.get('phoneFilter'),
      nameFilter: searchParams.get('nameFilter'),
      genderFilter: event || '',
      isVerifiedFilter: searchParams.get('isVerifiedFilter'),
    });
  };

  const handleIsVerifiedFilter = (event: string) => {
    let verifiedBoolean: string;
    if (event === 'Yes') {
      verifiedBoolean = 'true';
    } else if (event === 'No') {
      verifiedBoolean = 'false';
    } else verifiedBoolean = '';

    setIsVerifiedFilter(event);
    setSearchParams({
      offset: '0',
      usernameFilter: searchParams.get('usernameFilter'),
      phoneFilter: searchParams.get('phoneFilter'),
      nameFilter: searchParams.get('nameFilter'),
      genderFilter: searchParams.get('genderFilter'),
      isVerifiedFilter: verifiedBoolean,
    });
  };

  const clearFilterHandler = () => {
    setSearchParams({
      offset: '0',
      phoneFilter: '',
      nameFilter: '',
      usernameFilter: '',
      genderFilter: '',
      isVerifiedFilter: '',
    });
    setUsernameFilter('');
    setNameFilter('');
    setPhoneFilter('');
    setGenderFilter('');
    setIsVerifiedFilter('');
  };

  const handleSortFilter = (value: string) => {
    const i = arrayOfSortFilter.indexOf(value);
    setSortOrder( i % 2 === 0 ? 1 : -1);
    switch (i) {
      case 0:
      case 1:
        setSortFilter('name');
        break;
      case 2:
      case 3:
        setSortFilter('username');
        break;
      case 4:
      case 5:
        setSortFilter('createdAt');
        break;
      case 6:
      case 7:
        setSortFilter('isVerified');
        break;
      default:
        setSortFilter('');
    }
  }

  return (
    <div className="page-content">
      <Card>
        <CardBody>
          <div className={`mb-3 flex-horizontal justify-content-end`}>
            {showFilter ? (
              <>
                <TextInput
              value={usernameFilter}
              customClasses={classes.searchInput}
              icon={<i className="pi pi-search" />}
              placeholder="Search by Username..."
              handleChange={(value) => {
                if (handleUsernameFilter) {
                  handleUsernameFilter(value);
                  setCurrentPage(0);
                }
              }}
            />
            <TextInput
              value={nameFilter}
              customClasses={classes.searchInput}
              icon={<i className="pi pi-search" />}
              placeholder="Search by Name..."
              handleChange={(value) => {
                if (handleNameFilter) {
                  handleNameFilter(value);
                  setCurrentPage(0);
                }
              }}
            />
            <TextInput
              value={phoneFilter}
              customClasses={classes.searchInput}
              icon={<i className="pi pi-search" />}
              placeholder="Search by Phone..."
              handleChange={(value) => {
                if (handlePhoneFilter) {
                  handlePhoneFilter(value);
                  setCurrentPage(0);
                }
              }}
            />
            <Dropdown
              options={arrayOfGender}
              className={classes.searchInput}
              placeholder={genderFilter ? genderFilter : 'Gender'}
              value={genderFilter}
              showClear={!!genderFilter}
              onChange={(event) => {
                handleGenderFilter(event.value);
                setGenderFilter(event.value);
              }}
            />
            <Dropdown
              options={arrayOfIsVerified}
              className={classes.searchInput}
              placeholder={'Verified'}
              value={isVerifiedFilter}
              showClear={!!isVerifiedFilter}
              onChange={(event) => {
                handleIsVerifiedFilter(event.value);
                setIsVerifiedFilter(event.value);
              }}
            />
              </>
            ) : 
            <Dropdown
                options={arrayOfSortFilter}
                className={classes.sortInput}
                placeholder={sortFilterPlaceholder ? sortFilterPlaceholder : 'Sort'}
                value={sortFilterPlaceholder}
                showClear={!!sortFilter}
                onChange={(event) => {
                  setSortFilterPlaceholder(event.value);
                  handleSortFilter(event.value);
                }}
              />}
            
            <Button
                label={showFilter ? 'Hide Filter' : 'Show Filter'}
                onClick={() => setShowFilter(!showFilter)}
                className={classes.clearButton}
              />
              <Button
              label={'Clear Filter'}
              onClick={clearFilterHandler}
              className={classes.clearButton}
            />
          </div>
          <DataTable
            className={'fs-6'}
            value={appUsers?.data?.length > 0 ? appUsers.data : []}
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
