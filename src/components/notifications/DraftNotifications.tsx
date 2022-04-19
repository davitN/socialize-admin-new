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
      case 'DRAFT':
        return 'success';
      default:
        return 'danger';
    }
  };

const DraftNotifications: React.FC<{
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
      name: 'Date Created',
      field: 'createdAt',
      haveTemplate: true,
      template: (row: NotificationsDetailModel) => (
        <>
          {new Date(row.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
          })}
          {', '}
          {new Date(row.createdAt).getFullYear()}
          {', '}
          {new Date(row.createdAt).getHours().toString().padStart(2, '0')}
          {':'}
          {new Date(row.createdAt).getMinutes().toString().padStart(2, '0')}
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
          Draft Notifications
        </CardTitle>
        <span>
          These are draft notifications you are working on.
        </span>
      </div>
      <DataTable
        className={'fs-6'}
        value={notifications?.data.filter(
            (items) => items.type === 'DRAFT'
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

export default DraftNotifications;
