import { useEffect, useState } from 'react';
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
// import TextInput from '../components/shared/form-elements/TextInput';
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

const useStyles = createUseStyles({
  button: {
    minWidth: '117.11px',
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
            disabled={rowData.isVerified ? true : false}
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
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { appUsers } = useSelector((state: RootState) => state.appUsersReducer);
  const LIMIT = 10;
  const navigate = useNavigate();

  const getData = () => {
    setDataLoading(true);
    const params: TableQueryParams = {
      offset: searchParams.get('offset'),
      limit: LIMIT,
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
    });
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.toString().includes('offset')) {
      getData();
    }
  }, [searchParams]);

  const handlePageChange = (event: PaginationEventModel) => {
    setCurrentPage(event.first);
    setSearchParams({
      offset: event.first.toString(),
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

  const verifyHandler = (event: any, data: AppUsersDataModel) => {
    const confirm = confirmPopup({
      target: event.currentTarget,
      message: 'Are you sure you want to verify this user?',
      accept: () => putData(data),
      reject: () => confirm.hide,
    });
  };

  return (
    <div className="page-content">
      <Card>
        <CardBody>
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
