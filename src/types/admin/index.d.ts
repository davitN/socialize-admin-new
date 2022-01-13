export interface AdminModel {
  _id?: string,
  password?: string,
  firstName: string,
  lastName: string,
  phone: string,
  roleId: string,
  companyId?: string,
  email?: string,
  role?: { name: string, _id: string },
  company?: {
    email: string,
    name: string,
    phone: string,
    _id: string,
  }
}

export interface AdminTableModel {
  count: number;
  data: Array<AdminModel>;
}
