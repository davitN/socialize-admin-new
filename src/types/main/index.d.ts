export interface IUserData {
  _id: string;
  accessToken: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyCode: string;
}

export interface NotificationManager {
  info: (
    message: string,
    title?: string,
    duration?: number,
    callback?: Function
  ) => void;
  success: (
    message: string,
    title?: string,
    duration?: number,
    callback?: Function
  ) => void;
  warning: (
    message: string,
    title?: string,
    duration?: number,
    callback?: Function
  ) => void;
  error: (
    message: string,
    title?: string,
    duration?: number,
    callback?: Function
  ) => void;
}

export interface CallBacks {
  success?: Function;
  error?: Function;
}
