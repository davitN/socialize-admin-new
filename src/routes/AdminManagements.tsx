import React, { Fragment, useEffect, useState } from 'react';

// import Breadcrumbs from '../components/shared/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';
import { Paginator } from 'primereact/paginator';
import { RootState } from '../store/configureStore';
import { TableHeaderModel } from '../types/table';
import { PaginationEventModel } from '../types/pagination/pagination';
import { Button } from 'primereact/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAdminManagementsActionSG } from '../store/ducks/adminManagementDuck';
import { AdminModel } from '../types/admin';
import TextInput from '../components/shared/form-elements/TextInput';
import { createUseStyles } from 'react-jss';
import { Dropdown } from 'primereact/dropdown';

const useStyles = createUseStyles({
  searchInput: {
    maxWidth: '200px',
    marginRight: '20px',
  },
});

const AdminManagements: React.FC<{}> = () => {
  const tableHeader: TableHeaderModel[] = [
    {
      name: 'Name',
      field: 'name',
      haveTemplate: true,
      template: (row: AdminModel) => (
        <Fragment>
          {row.firstName} {row.lastName}
        </Fragment>
      ),
    },
    {
      name: 'Role',
      field: 'role.name',
    },
    {
      name: 'Email',
      field: 'email',
    },
    {
      name: 'Phone',
      field: 'phone',
    },
    {
      name: 'View',
      field: 'view',
      haveTemplate: true,
      template: (row: AdminModel) => (
        <Button onClick={() => navigate(row._id)}>
          <i className="pi pi-cog" />
        </Button>
      ),
    },
  ];

  const navigate = useNavigate();
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [phoneFilter, setPhoneFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const LIMIT = 10;
  const dispatch = useDispatch();
  const { adminManagements } = useSelector(
    (state: RootState) => state.adminManagementReducer
  );
  const [selectedRole, setSelectedRole] = useState<{
    _id: string;
    name: string;
  }>({
    _id: '',
    name: '',
  });
  const roles = useSelector(
    (state: RootState) => state.initialDataReducer?.initialData?.roles
  );
  const classes = useStyles();

  const getData = () => {
    setDataLoading(true);
    const params = {
      limit: LIMIT,
      offset: searchParams.get('offset'),
      phoneFilter: searchParams.get('phoneFilter'),
      nameFilter: searchParams.get('nameFilter'),
      emailFilter: searchParams.get('emailFilter'),
      roleFilter: searchParams.get('roleFilter'),
    };
    dispatch(
      getAdminManagementsActionSG(params, {
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
  }, []);

  useEffect(() => {
    setSearchParams({
      offset: searchParams.get('offset') || '0',
    });
  }, []);

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

  const handleNameFilter = (event: any) => {
    setNameFilter(event);
    setSearchParams({
      offset: searchParams.get('offset'),
      nameFilter: event,
    });
  };

  const handlePhoneFilter = (event: any) => {
    setPhoneFilter(event);
    setSearchParams({
      offset: searchParams.get('offset'),
      phoneFilter: event,
    });
  };

  const handleEmailFilter = (event: any) => {
    setEmailFilter(event);
    setSearchParams({
      offset: searchParams.get('offset'),
      emailFilter: event,
    });
  };

  const handleRoleChange = (event: any) => {
    setSelectedRole(event);
    setSearchParams({
      offset: searchParams.get('offset'),
      roleFilter: event?._id || '',
    });
  };

  return (
    <div className="page-content">
      <Card>
        <CardBody>
          <div className={`mb-2 flex-horizontal justify-content-end`}>
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
              value={emailFilter}
              customClasses={classes.searchInput}
              icon={<i className="pi pi-search" />}
              placeholder="Search by Email..."
              handleChange={(value) => {
                if (handleEmailFilter) {
                  handleEmailFilter(value);
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
              options={roles}
              optionLabel={'name'}
              className={classes.searchInput}
              placeholder={
                selectedRole?.name ? selectedRole?.name : 'Filter by Role'
              }
              value={selectedRole}
              showClear={selectedRole?.name ? true : false}
              onChange={(event) => {
                setSelectedRole(event.value);
                handleRoleChange(event.value);
              }}
            />
            <Button
              label={'+ Add Admin Management'}
              onClick={() => navigate('new')}
            />
          </div>
          <DataTable
            className={'fs-6'}
            value={
              adminManagements.data.length > 0 ? adminManagements.data : []
            }
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
            totalRecords={adminManagements.count}
            rows={LIMIT}
            onPageChange={handlePageChange}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminManagements;
