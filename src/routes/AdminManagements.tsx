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
  const LIMIT = 10;
  const dispatch = useDispatch();
  const { adminManagements } = useSelector(
    (state: RootState) => state.adminManagementReducer
  );

  const getData = () => {
    setDataLoading(true);
    const params = {
      limit: LIMIT,
      offset: searchParams.get('offset'),
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

  return (
    <div className="page-content">
      <Card>
        <CardBody>
          <div className={`mb-2 flex-horizontal justify-content-end`}>
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
