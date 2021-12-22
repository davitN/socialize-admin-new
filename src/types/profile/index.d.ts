export interface UserProfileModel {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export interface UserProfileSendModel {
  oldPassword: string;
  password: string;
}
