import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { Card, CardBody, CardTitle } from 'reactstrap';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { PaginationEventModel } from '../types/pagination/pagination';
import { Skeleton } from 'primereact/skeleton';
import { Column } from 'primereact/column';
import { RootState } from '../store/configureStore';
import { TableHeaderModel, TableQueryParams } from '../types/table';
import { getNotificationsActionSG } from '../store/ducks/notificationsDuck';
import { Button } from 'primereact/button';
import { NotificationsDetailModel } from '../types/notifications';
import { useSearchParams } from 'react-router-dom';

const Notifications = () => {
  const tableHeader: TableHeaderModel[] = [
    {
      name: 'Title',
      field: 'title',
    },
    {
      name: 'Text',
      field: 'text',
    },
    {
      name: 'Company',
      field: 'company.name',
    },
    {
      name: 'Venue',
      field: 'place.profile.name',
    },
    {
      name: 'View',
      field: 'view',
      haveTemplate: true,
      template: (row: NotificationsDetailModel) => (
        <Button onClick={() => navigate(row._id)}>
          <i className="pi pi-cog" />
        </Button>
      ),
    },
  ];
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const LIMIT = 10;
  const { notifications } = useSelector(
    (state: RootState) => state.notificationsReducer
  );
  const { selectedPlaceId } = useSelector(
    (state: RootState) => state.initialDataReducer
  );

  const getData = () => {
    setDataLoading(true);
    const params: TableQueryParams = {
      offset: searchParams.get('offset'),
      limit: LIMIT,
    };
    dispatch(
      getNotificationsActionSG(params, {
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
    if (selectedPlaceId) {
      if (searchParams.toString().includes('offset')) {
        getData();
      }
    }
  }, [selectedPlaceId, searchParams]);

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
              label={'Send Notification'}
              onClick={() => navigate('new')}
            />
          </div>
          <CardTitle className={'mb-2 flex-horizontal justify-content-start'}>
            Sent Notifications
          </CardTitle>
          <DataTable
            className={'fs-6'}
            value={notifications?.data}
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
            totalRecords={notifications.count}
            onPageChange={handlePageChange}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Notifications;
