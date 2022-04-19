import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { Card, CardBody } from 'reactstrap';
import { Paginator } from 'primereact/paginator';
import { PaginationEventModel } from '../types/pagination/pagination';
import { RootState } from '../store/configureStore';
import { TableQueryParams } from '../types/table';
import {
  getDraftOrScheduledNotificationsActionSG,
  getNotificationsActionSG,
} from '../store/ducks/notificationsDuck';
import { Button } from 'primereact/button';
import { useSearchParams } from 'react-router-dom';
import ScheduledNotifications from '../components/notifications/ScheduledNotifications';
import SentNotifications from '../components/notifications/SentNotifications';
import DraftNotifications from '../components/notifications/DraftNotifications';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  buttonContainer: {
    '& button': {
      marginLeft: '20px',
    },
  },
});

const Notifications = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [sentActive, setSentActive] = useState<boolean>(true);
  const [scheduledActive, setScheduledActive] = useState<boolean>(false);
  const [draftActive, setDraftActive] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();
  const LIMIT = 5;
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
      placeId: selectedPlaceId,
    };
    if (scheduledActive || draftActive) {
      dispatch(
        getDraftOrScheduledNotificationsActionSG(params, {
          success: () => {
            setDataLoading(false);
          },
          error: () => {
            setDataLoading(false);
          },
        })
      );
    } else if (sentActive) {
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
    }
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
  }, [selectedPlaceId, searchParams, sentActive, scheduledActive, draftActive]);

  const handlePageChange = (event: PaginationEventModel) => {
    setCurrentPage(event.first);
    setSearchParams({
      offset: event.first.toString(),
    });
  };

  return (
    <div className="page-content">
      <div className={`mt-2 mb-3 flex-horizontal justify-content-end`}>
        <Button label={'New Notification'} onClick={() => navigate('new')} />
      </div>
      <Card>
        <CardBody>
          <div
            className={`mt-2 mb-3 flex-horizontal justify-content-end ${classes.buttonContainer}`}
          >
            <Button
              label={'Show Sent'}
              disabled={sentActive}
              onClick={() => {
                setSentActive(true);
                setScheduledActive(false);
                setDraftActive(false);
              }}
            />
            <Button
              label={'Show Scheduled'}
              disabled={scheduledActive}
              onClick={() => {
                setSentActive(false);
                setScheduledActive(true);
                setDraftActive(false);
              }}
            />
            <Button
              label={'Show Draft'}
              disabled={draftActive}
              onClick={() => {
                setSentActive(false);
                setScheduledActive(false);
                setDraftActive(true);
              }}
            />
          </div>
          {sentActive && (
            <SentNotifications
              notifications={notifications}
              dataLoading={dataLoading}
            />
          )}
          {scheduledActive && (
            <ScheduledNotifications
              notifications={notifications}
              dataLoading={dataLoading}
            />
          )}
          {draftActive && (
            <DraftNotifications
              notifications={notifications}
              dataLoading={dataLoading}
            />
          )}
          <Paginator
            className="justify-content-end"
            template="PrevPageLink PageLinks NextPageLink"
            first={currentPage}
            rows={5}
            totalRecords={notifications.count}
            onPageChange={handlePageChange}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Notifications;
