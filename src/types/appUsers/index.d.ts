export interface AppUsersModel {
  count: number;
  data: Array<AppUsers>;
}

export interface AppUsersDataModel {
  username?: string;
  firstName?: string;
  lastName?: string;
  profileImage?: {
    height?: number;
    imgURL?: string;
    width?: number;
  };
  gender?: string;
  birthday?: string;
  isVerified?: boolean;
  phone?: string;
  createdAt?: string;
  _id?: string;
}
