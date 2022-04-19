import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Badge, Button, CardTitle } from 'reactstrap';
import {
  NotificationsDetailModel,
  NotificationsModel,
} from '../../types/notifications';
import { createUseStyles } from 'react-jss';
import { TableHeaderModel } from '../../types/table';
import { useNavigate } from 'react-router';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';

const useStyles = createUseStyles({
  title: {
    width: '260px',
  },
  titleContainer: {
    alignItems: 'baseline',
  },
});

const getNotificationTypeColors = (type: string): string => {
  switch (type) {
    case 'SCHEDULED':
      return 'info';
    default:
      return 'danger';
  }
};

const ScheduledNotifications: React.FC<{
  notifications: NotificationsModel;
  dataLoading: boolean;
}> = ({ notifications, dataLoading }) => {
  const tableHeader: TableHeaderModel[] = [
    {
      name: 'Title',
      field: 'notificationTitle',
    },
    {
      name: 'Text',
      field: 'notificationText',
    },
    {
      name: 'Post Linked',
      field: 'post',
      haveTemplate: true,
      template: (row: NotificationsDetailModel) => (
        <>
          {row?.image?.imgURL && (
            <img
              data-dz-thumbnail=""
              height="40"
              className={'rounded'}
              src={row?.image?.imgURL}
            />
          )}
        </>
      ),
    },
    {
      name: 'Scheduled Date',
      field: 'dateToSend',
      haveTemplate: true,
      template: (row: NotificationsDetailModel) => (
        <>
          {new Date(row?.dateToSend).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
          })}
          {', '}
          {new Date(row?.dateToSend).getFullYear()}
          {', '}
          {new Date(row?.dateToSend).getHours().toString().padStart(2, '0')}
          {':'}
          {new Date(row?.dateToSend).getMinutes().toString().padStart(2, '0')}
        </>
      ),
    },
    {
      name: 'Status',
      field: 'type',
      haveTemplate: true,
      template: (row: NotificationsDetailModel) => (
        <Badge
          className={
            'font-size-12 badge-soft-' + getNotificationTypeColors(row.type)
          }
          color={getNotificationTypeColors(row.type)}
          pill
        >
          {row.type}
        </Badge>
      ),
    },
    {
      name: 'View',
      field: 'view',
      haveTemplate: true,
      template: (row: NotificationsDetailModel) => (
        <Button onClick={() => navigate(row._id)} disabled>
          <i className="pi pi-cog" />
        </Button>
      ),
    },
  ];
  const navigate = useNavigate();
  const LIMIT = 5;
  const classes = useStyles();
  return (
    <>
      <div className={`mb-2 flex-horizontal ${classes.titleContainer}`}>
        <CardTitle className={`flex-horizontal ${classes.title}`}>
          Scheduled Notifications
        </CardTitle>
        <span>These are scheduled to be sent in the future.</span>
      </div>
      <DataTable
        className={'fs-6'}
        value={notifications?.data.filter(
          (items) => items.type === 'SCHEDULED'
        )}
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
    </>
  );
};

export default ScheduledNotifications;
