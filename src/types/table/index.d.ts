export interface TableQueryParams {
  offset?: any;
  limit?: any;
  searchWord?: string;
  placeId?: string;
  phoneFilter?: string;
  nameFilter?: string;
  emailFilter?: string;
  roleFilter?: string;
}

export interface TableHeaderModel {
  name: string;
  field: string;
  haveTemplate?: boolean;
  template?: Function;
}
