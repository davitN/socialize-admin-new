import { CompanyModel } from '../company';
import { VenueStateModel } from '../venue';

export interface NotificationsModel {
  data: Array<NotificationsDetailModel>;
  count: number;
}

interface NotificationsDetailModel {
  notificationText: string;
  notificationTitle: string;
  postText?: string;
  post?: {
    image?: {
      height: number;
      width: number;
      imgURL: string;
    };
    _id: string;
  };
  dateToSend?: string;
  createdAt?: string;
  image?: NotificationImageModel;
  type?: string;
  sentUsersSize?: string;
  deliveredUsersSize?: string;
  clickedUsersSize?: string;
  _id: string;
}

interface NotificationsSendModel {
  data: NotificationsStateModel;
  image: File;
}

interface NotificationImageModel {
  height: number;
  width: number;
  imgURL: string;
}

interface NotificationsStateModel {
  notificationText: string;
  notificationTitle: string;
  postText: string;
  placeId: string;
  postContentType: string;
  type?: string;
  width?: number;
  height?: number;
  img?: NotificationImageModel;
  daysSinceVisited: number;
  dateToSend?: string;
}
