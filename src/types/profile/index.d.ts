export interface UserProfileModel {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface userProfileSendModel {
  _id: string;
  data: UserProfileModel;
}
