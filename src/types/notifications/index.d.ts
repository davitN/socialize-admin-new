import { CompanyModel } from '../company';
import { VenueStateModel } from '../venue';

export interface NotificationsModel {
  data: Array<NotificationsDetailModel>;
  count: number;
}

interface NotificationsDetailModel {
  text: string;
  title: string;
  company: CompanyModel;
  createdAt: string;
  data: {
    isInAppNotificationEnabled: boolean;
    type: string;
  };
  place: Object<VenueStateModel>;
  sender: string;
  updatedAt: string;
  users: NotificationUserModel[];
  __v: number;
  _id: string;
}

interface NotificationsSendModel {
  text: string;
  title: string;
  users: NotificationUserModel[];
  placeId: string;
}

export interface NotificationUserModel {
  firstName: string;
  lastName: string;
  username: string;
  _id: string;
}
