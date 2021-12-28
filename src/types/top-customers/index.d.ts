import { Customer, PostModel } from '../dashboard';

export interface TopCustomersModel {
  count: number,
  data: Customer[]
}
