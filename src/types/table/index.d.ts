export interface TableQueryParams {
  offset?: any;
  limit?: any;
  searchWord?: string;
  placeId?: string;
  phoneFilter?: string;
  nameFilter?: string;
  emailFilter?: string;
  roleFilter?: string;
  usernameFilter?: string;
  genderFilter?: string;
  isVerifiedFilter?: string;
  statusFilter?: string;
}

export interface TableHeaderModel {
  name: string;
  field: string;
  haveTemplate?: boolean;
  template?: Function;
}
