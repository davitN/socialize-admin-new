export interface CompanyModel {
  _id?: string;
  adminId?: string;
  email?: string;
  phone?: string;
  name?: string;
  companySubscription?: CompanySubscriptionModel;
  paidTill?: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  __v?: number;
}

export interface CompanySubscriptionModel {
  description?: string;
  name?: string;
  ordering?: number;
  __v?: number;
  _id?: string;
}

export interface CompanyTableModel {
  count: number;
  data: Array<CompanyModel>;
}
