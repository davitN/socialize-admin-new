import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import {
  NotificationsModel,
  NotificationsSendModel,
} from '../../types/notifications';
import { TableQueryParams } from '../../types/table';

export const GET_NOTIFICATIONS_SG = 'socialize/main/getNotifications_SG';
export const SET_NOTIFICATIONS = 'socialize/main/setNotifications';
export const POST_NOTIFICATIONS_SG = 'socialize/main/postNotifications_SG';
export const GET_SELECTED_NOTIFICATIONS_SG =
  'socialize/main/getSelectedNotifications_SG';
export const POST_DRAFT_OR_SCHEDULED_NOTIFICATIONS_SG =
  'socialize/main/postDraftOrScheduledNotifications_SG';
export const GET_DRAFT_OR_SCHEDULED_NOTIFICATIONS_SG =
  'socialize/main/getDraftOrScheduledNotifications_SG';

const initialState: { notifications: NotificationsModel } = {
  notifications: {
    data: [],
    count: null,
  },
};

export const notificationsReducer = (
  state = initialState,
  action: AnyAction
) => {
  const { payload } = action;
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload as NotificationsModel,
      };
    default:
      return state;
  }
};

export const getNotificationsActionSG = (
  params: TableQueryParams,
  callbacks: CallBacks
) => ({
  type: GET_NOTIFICATIONS_SG,
  params,
  callbacks,
});

export const setNotificationsAciton = (notifications: NotificationsModel) => ({
  type: SET_NOTIFICATIONS,
  payload: notifications,
});

export const postNotificaiotnsAciotnSG = (
  data: NotificationsSendModel,
  callbacks: CallBacks
) => ({
  type: POST_NOTIFICATIONS_SG,
  data,
  callbacks,
});

export const postDraftOrScheduledActionSG = (
  data: NotificationsSendModel,
  callbacks: CallBacks
) => ({
  type: POST_DRAFT_OR_SCHEDULED_NOTIFICATIONS_SG,
  data,
  callbacks,
});

export const getDraftOrScheduledNotificationsActionSG = (
  params: TableQueryParams,
  callbacks: CallBacks
) => ({
  type: GET_DRAFT_OR_SCHEDULED_NOTIFICATIONS_SG,
  params,
  callbacks,
});

export const getSelectedNotificationsActionSG = (
  id: string,
  callbacks: CallBacks
) => ({
  type: GET_SELECTED_NOTIFICATIONS_SG,
  id,
  callbacks,
});
