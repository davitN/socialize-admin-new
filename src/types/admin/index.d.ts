export interface AdminModel {
  _id?: string,
  username?: string,
  password?: string,
  firstName: string,
  lastName: string,
  phone: string,
  roleId: string,
  companyId?: string,
  email?: string,
}

export interface AdminTableModel {
  count: number;
  data: Array<AdminModel>;
}
