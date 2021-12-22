export interface TableQueryParams {
  offset?: any,
  limit?: any,
  searchWord?: string,
  placeId?: string
}

export interface TableHeaderModel {
  name: string,
  field: string,
  haveTemplate?: boolean,
  template?: Function
}
