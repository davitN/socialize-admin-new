import React, { useEffect, useState } from 'react';

// import Breadcrumbs from '../components/shared/Breadcrumb';
import { getCompaniesActionSG } from '../store/ducks/companyDuck';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';
import { Paginator } from 'primereact/paginator';
import { RootState } from '../store/configureStore';
import { TableHeaderModel, TableQueryParams } from '../types/table';
import { PaginationEventModel } from '../types/pagination/pagination';
import { Button } from 'primereact/button';
// import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { CompanyModel } from '../types/company';

let queryParams: TableQueryParams = {
  offset: 0,
  limit: 10,
};

// const useStyles = createUseStyles({
//   searchInput: {
//     marginRight: '20px',
//     width: '200px',
//   },
// });

const Companies: React.FC<{}> = () => {
  const tableHeader: TableHeaderModel[] = [
    {
      name: 'Name',
      field: 'name',
    },
    {
      name: 'Active Status',
      field: 'isActive',
      haveTemplate: true,
      template: (row: CompanyModel) => (
        <React.Fragment>{row.isActive ? 'Active' : 'Inactive'}</React.Fragment>
      ),
    },
    {
      name: 'Package Type',
      field: 'companySubscription.name',
    },
    {
      name: 'Paid Until',
      field: 'paidTill',
      haveTemplate: true,
      template: (row: CompanyModel) => (
        <React.Fragment>
          {new Date(row.paidTill).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
          })}
          , {new Date(row.paidTill).getFullYear()}
        </React.Fragment>
      ),
    },
    {
      name: 'View',
      field: 'view',
      haveTemplate: true,
      template: (row: CompanyModel) => (
        <Button onClick={() => navigate(row._id)}>
          <i className="pi pi-cog" />
        </Button>
      ),
    },
  ];

  //   const classes = useStyles();
  const navigate = useNavigate();
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const LIMIT = 10;
  const dispatch = useDispatch();
  const { companiesData } = useSelector(
    (state: RootState) => state.companyReducer
  );

  const getData = () => {
    setDataLoading(true);
    dispatch(
      getCompaniesActionSG(queryParams, {
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
      limit: 10,
      offset: 0,
    };
    getData();
  }, [dispatch]);

  const handlePageChange = (event: PaginationEventModel) => {
    setCurrentPage(event.first);
    queryParams.offset = event.first / LIMIT;
    queryParams.limit = LIMIT;
    getData();
  };

  return (
    <div className="page-content">
      <Card>
        <CardBody>
          <div className={`mb-2 flex-horizontal justify-content-end`}>
            {/* <TextInput
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
            /> */}
            <Button
              label={'+ Add Company'}
              onClick={() => navigate('new')}
            ></Button>
          </div>
          <DataTable
            className={'fs-6'}
            value={companiesData.data.length > 0 ? companiesData.data : []}
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
            totalRecords={companiesData.count}
            rows={LIMIT}
            onPageChange={handlePageChange}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Companies;
