import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Button, CardTitle } from 'reactstrap';
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

const SentNotifications: React.FC<{
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
          {row?.post?.image?.imgURL && (
            <img
              data-dz-thumbnail=""
              height="40"
              className={'rounded'}
              src={row?.post?.image?.imgURL}
            />
          )}
        </>
      ),
    },
    {
      name: 'Date Sent',
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
      name: 'Sent',
      field: 'sentUsersSize',
    },
    {
      name: 'Delivered',
      field: 'deliveredUsersSize',
      haveTemplate: true,
      template: (row: NotificationsDetailModel) => (
        <>
          {row.deliveredUsersSize}{' '}
          {row.sentUsersSize
            ? `(${(
                (+row.deliveredUsersSize / +row.sentUsersSize) *
                100
              ).toFixed(2)}%)`
            : '(0%)'}
        </>
      ),
    },
    {
      name: 'Clicked',
      field: 'clickedUsersSize',
      haveTemplate: true,
      template: (row: NotificationsDetailModel) => (
        <>
          {row.clickedUsersSize}{' '}
          {row.deliveredUsersSize
            ? `(${(
                (+row.clickedUsersSize / +row.deliveredUsersSize) *
                100
              ).toFixed(2)}%)`
            : '(0%)'}
        </>
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
          Sent Notifications
        </CardTitle>
        <span>These are notifications that are already sent.</span>
      </div>
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
    </>
  );
};

export default SentNotifications;
