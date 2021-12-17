import { Customer } from '../dashboard';
import React from 'react';

export interface TableQueryParams {
  offset: number,
  limit: number,
  searchWord?: string,
  placeId?: string
}

export interface TableHeaderModel {
  name: string,
  field: string,
  haveTemplate?: boolean,
  template?: Function
}
