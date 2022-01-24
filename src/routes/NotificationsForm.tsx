import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { createUseStyles } from 'react-jss';
import { Card, CardBody, CardTitle } from 'reactstrap';
import TextInput from '../components/shared/form-elements/TextInput';
import { RootState } from '../store/configureStore';
import { Customer } from '../types/dashboard';
import {
  NotificationsDetailModel,
  NotificationsSendModel, NotificationUserModel,
} from '../types/notifications';
import { MultiSelect } from 'primereact/multiselect';
import {
  getSelectedNotificationsActionSG,
  postNotificaiotnsAciotnSG,
} from '../store/ducks/notificationsDuck';
import { useNavigate } from 'react-router';
import { getTopCustomersActionSG } from '../store/ducks/topCustomersDuck';
import { useParams } from 'react-router';
import { DataTable } from 'primereact/datatable';
import { TableHeaderModel } from '../types/table';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';
import { Paginator } from 'primereact/paginator';

const useStyles = createUseStyles({
  inputBlock: {
    '& label': {
      width: '200px',
      marginBottom: 0,
      textAlign: 'start',
    },
    '& input': {
      width: 'calc(100% - 200px)',
      borderRadius: '0.25rem',
    },
  },
  multiSelectClass: {
    height: '40px',
    '& label': {
      width: '200px',
      textAlign: 'start',
    },
    '& .p-dropdown, & .p-multiselect': {
      width: 'calc(100% - 200px)',
      borderRadius: '0.25rem',
      height: '100%',
    },
  },
  inputError: {
    '& input': {
      borderColor: '#ff4a4a',
    },
  },
  borderError: {
    borderColor: '#ff4a4a',
  },
});

const NotificationsForm = () => {
  const tableHeader: TableHeaderModel[] = [
    {
      name: 'Username',
      field: 'username',
    },
    {
      name: 'First Name',
      field: 'firstName',
    },
    {
      name: 'Last Name',
      field: 'lastName',
    },
  ];
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LIMIT = 10;
  const [filteredUsers, setFilteredUsers] = useState<NotificationUserModel[]>([]);
  const { selectedPlaceId } = useSelector(
    (state: RootState) => state.initialDataReducer
  );
  const { topCustomers } = useSelector(
    (state: RootState) => state.topCustomersReducer
  );
  const [validation, setValidation] = useState<{
    text: boolean;
    title: boolean;
    selectedUsersList: boolean;
    users: boolean;
    submitted: boolean;
  }>({
    text: false,
    title: false,
    selectedUsersList: false,
    users: false,
    submitted: false,
  });
  const [values, setValues] = useState<NotificationsSendModel>({
    text: '',
    title: '',
    users: [],
    placeId: '',
  });
  const [valuesRecieved, setValuesRecieved] =
    useState<NotificationsDetailModel>({
      text: '',
      title: '',
      company: {},
      createdAt: '',
      data: {
        isInAppNotificationEnabled: null,
        type: '',
      },
      place: {},
      sender: {
        _id: '',
        firstName: '',
        lastName: '',
      },
      updatedAt: '',
      _id: '',
      __v: null,
      users: [],
    });
  const [selectedUsersListDropdown, setSelectedUsersListDropdown] =
    useState('');
  const [usersSearchValue, setUsersSearchValue] = useState<Customer[]>([]);
  const [newMode, setNewMode] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { id: notificationId } = useParams();

  const usersListDropDownSelector = ['Top Customers'];

  const getUsers = () => {
    if (selectedPlaceId) {
      dispatch(
        getTopCustomersActionSG({
          offset: 0,
          limit: 10000,
          placeId: selectedPlaceId,
        })
      );
      setValues({ ...values, placeId: selectedPlaceId });
    }
  };

  useEffect(() => {
    handlePageChange(0);
  }, [valuesRecieved]);


  useEffect(() => {
    getUsers();
  }, [selectedPlaceId]);

  const getNotifications = (notificationId: string) => {
    setDataLoading(true);
    dispatch(
      getSelectedNotificationsActionSG(notificationId, {
        success: (res: NotificationsSendModel) => {
          // if (res.users.length > 0) {
          //   for (let i = 0; i < 20; i++) {
          //     res.users.push({...res.users[0], username: `${res.users[0].username}${i + 1}`})
          //   }
          // }
          setValuesRecieved({ ...valuesRecieved, ...res });
          setDataLoading(false);
        },
        error: () => {
          navigate(-1);
        },
      })
    );
    setDataLoading(false);
  };

  useEffect(() => {
    if (notificationId === 'new') {
      setNewMode(true);
    } else if (notificationId) {
      setNewMode(false);
      getNotifications(notificationId);
    }
  }, [notificationId]);

  const handleValidation = () => {
    let usersArrayLength;
    if (values.users.length === 0) {
      usersArrayLength = false;
    } else {
      usersArrayLength = true;
    }

    setValidation({
      ...validation,
      text: !!values.text,
      selectedUsersList: !!selectedUsersListDropdown,
      title: !!values.title,
      users: usersArrayLength,
    });
  };

  useEffect(() => {
    handleValidation();
  }, [values, selectedUsersListDropdown]);

  const submitFormHandler = (event: Event) => {
    event.preventDefault();
    setValidation({ ...validation, submitted: true });
    if (
      !(validation.text && validation.title && validation.selectedUsersList)
    ) {
      return;
    }
    if (selectedUsersListDropdown && !values.users.length) {
      return;
    }
    dispatch(
      postNotificaiotnsAciotnSG(values, {
        success: () => {
          navigate(-1);
        },
        error: () => {
          //   console.log(message);
        },
      })
    );
  };

  const handlePageChange = (first: number) => {
    setFilteredUsers(valuesRecieved.users.slice(first, (first + LIMIT)))
    setCurrentPage(first);
  };

  return (
    <div className="page-content">
      <Card>
        <CardBody>
          {!newMode && (
            <TextInput
              label={'Sent By'}
              value={`${valuesRecieved?.sender?.firstName} ${valuesRecieved?.sender?.lastName}`}
              customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
              disabled
            />
          )}
          <TextInput
            label={'Title'}
            value={newMode ? values.title : valuesRecieved?.title}
            customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${
              validation.submitted && !validation.title
                ? classes.inputError
                : ''
            }`}
            handleChange={(event) => setValues({ ...values, title: event })}
            required
            disabled={!newMode}
          />
          <TextInput
            label={'Text'}
            value={newMode ? values.text : valuesRecieved?.text}
            customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${
              validation.submitted && !validation.text ? classes.inputError : ''
            }`}
            handleChange={(event) => setValues({ ...values, text: event })}
            required
            disabled={!newMode}
          />
          {!newMode && (
            <TextInput
              label={'Company'}
              value={valuesRecieved?.company?.name}
              customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
              disabled
            />
          )}
          {!newMode && (
            <TextInput
              label={'Venue'}
              value={valuesRecieved?.place?.profile?.name}
              customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
              disabled
            />
          )}
          {newMode && (
            <div className={`flex-horizontal mb-3 ${classes.multiSelectClass}`}>
              <label>Users List</label>
              <Dropdown
                className={`${
                  validation.submitted && !validation.selectedUsersList
                    ? classes.borderError
                    : ''
                }`}
                options={usersListDropDownSelector}
                placeholder={
                  selectedUsersListDropdown
                    ? selectedUsersListDropdown
                    : 'Select Users List'
                }
                value={selectedUsersListDropdown}
                onChange={(e) => setSelectedUsersListDropdown(e.value)}
                required
              />
            </div>
          )}
          {newMode && selectedUsersListDropdown === 'Top Customers' && (
            <div className={`flex-horizontal mb-3 ${classes.multiSelectClass}`}>
              <label>Select Users</label>
              <MultiSelect
                className={
                  validation.submitted && !values.users.length
                    ? classes.borderError
                    : ''
                }
                optionLabel={'username'}
                optionValue={'_id'}
                value={usersSearchValue}
                options={topCustomers.data}
                onChange={
                  (e) => {
                    setValues({ ...values, users: e.value });
                    setUsersSearchValue(e.value);
                  }
                  // setSelectedUsers(e.value)
                }
                placeholder={'Select Users'}
              />
            </div>
          )}
          {newMode && (
            <Button
              label={'Send Notification'}
              type={'submit'}
              onClick={() => submitFormHandler(event)}
            />
          )}
          {!newMode && (
            <Card>
              <CardBody>
                <CardTitle
                  className={'mb-2 flex-horizontal justify-content-start'}
                >
                  Users Sent To
                </CardTitle>
                <DataTable
                  className={'fs-6'}
                  value={filteredUsers}
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
                  totalRecords={valuesRecieved.users.length}
                  onPageChange={(e) => handlePageChange(e.first)}
                />
              </CardBody>
            </Card>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default NotificationsForm;
