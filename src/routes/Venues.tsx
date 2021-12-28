import React, { useEffect, useState } from 'react';

// import Breadcrumbs from '../components/shared/Breadcrumb';
import { VenueStateModel } from '../types/venue';
import { getVenuesActionSG } from '../store/ducks/VenueDuck';
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
import { createUseStyles } from 'react-jss';
import TextInput from '../components/shared/form-elements/TextInput';
import { useNavigate, useSearchParams } from 'react-router-dom';

const useStyles = createUseStyles({
  searchInput: {
    marginRight: '20px',
    width: '200px'
  }
})

const Venues: React.FC<{}> = () => {
  const userRole = useSelector(
      (state: RootState) => state.authReducer?.userData?.role?.name
  );
  const tableHeader: TableHeaderModel[] = [
    {
      name: 'Business Name',
      field: 'profile.name',
    },
    {
      name: 'Rating',
      field: 'profile.rating',
    },
    {
      name: 'Business Type',
      field: 'type',
    },
    {
      name: 'City',
      field: 'location.city',
    },
    {
      name: 'Country',
      field: 'location.country',
    },
    {
      name: 'View',
      field: 'view',
      haveTemplate: true,
      template: (row: VenueStateModel) => (
          <Button onClick={() => navigate(row._id)}>
            <i className="pi pi-cog"/>
          </Button>
      )
    }
  ]
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({});
  const [searchValue, setSearchValue] = useState('');
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const LIMIT = 10;
  const dispatch = useDispatch();
  const { venuesData } = useSelector((state: RootState) => state.venueReducer);

  const getData = () => {
    setDataLoading(true);
    const params: TableQueryParams = {
      limit: LIMIT,
      offset: searchParams.get('offset'),
      searchWord: searchParams.get('searchWord')
    }
    dispatch(getVenuesActionSG(params, {
      success: () => {
        setDataLoading(false);
      },
      error: () => {
        setDataLoading(false);
      }
    }));
  }
  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get('offset')) || 0);
    setSearchParams({
      offset: searchParams.get('offset') || '0',
      searchWord: searchParams.get('searchWord') || ''
    });
  }, [dispatch]);

  useEffect(() => {
    if (searchParams.toString().includes('offset')) {
      getData();
    }
  }, [searchParams]);

  const handlePageChange = (event: PaginationEventModel) => {
    setCurrentPage(event.first)
    setSearchParams({
      offset: event.first.toString(),
      searchWord: searchParams.get('searchWord')
    });
  };

  const handleSearch = (event: string) => {
    setSearchValue(event);
    setSearchParams({
      offset: searchParams.get('offset'),
      searchWord: event
    });
  }

  return (
      <div className="page-content">
        <Card>
          <CardBody>
            <div className={`mb-2 flex-horizontal justify-content-end`}>
              <TextInput
                  customClasses={classes.searchInput}
                  icon={<i className="pi pi-search"/>}
                  placeholder="Search..."
                  value={searchValue}
                  handleChange={(val) => {
                    if (handleSearch) {
                      handleSearch(val);
                      setCurrentPage(0);
                    }
                  }}
              />
              {
                userRole === 'SuperAdmin' && (
                      <Button
                          label={'+ Add Venue'}
                          onClick={() => navigate('new')}
                      />
                  )
              }
            </div>
            <DataTable className={'fs-6'}
                       value={venuesData.data.length > 0 ? venuesData.data : []}
                       responsiveLayout="scroll"
                       rows={LIMIT}
                // tableClassName={classes.table}
                       emptyMessage="Data not found..."
            >
              {dataLoading && tableHeader.map(({ name, field }, index) => <Column field={field} header={name}
                                                                                  key={`${field}_${index}`}
                                                                                  body={<Skeleton/>}/>)}
              {!dataLoading && tableHeader.map((item, index) => {
                if (item.haveTemplate) {
                  return (
                      <Column key={`${item.field}_${index}`} header={item.name} body={item.template}/>
                  )
                } else {
                  return (
                      <Column key={`${item.field}_${index}`} field={item.field} header={item.name}/>
                  )
                }
              })}
            </DataTable>
            <Paginator
                className='justify-content-end'
                template="PrevPageLink PageLinks NextPageLink"
                first={currentPage}
                totalRecords={venuesData.count}
                rows={LIMIT}
                onPageChange={handlePageChange}
            />
          </CardBody>
        </Card>
      </div>
  );
};

export default Venues;
