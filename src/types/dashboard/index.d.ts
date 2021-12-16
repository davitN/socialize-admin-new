export interface CompanySubscription {
  _id: string;
  name: string;
  description: string;
}

export interface CustomerTrend {
  firstTimeVisitor: number;
  secondTimeVisitor: number;
  regular: number;
  visitYearMonthDate: string;
}

export interface Customer {
  _id: string;
  isRealInfoHidden: boolean;
  visitsCount: number;
  lastVisitingTime: string;
  username: string;
  firstName: string;
  lastName: string;
  postsCount: number;
  viewsOnPosts: number;
  profileImage?: {
    height?: number;
    width?: number;
    imgURL?: string;
  };
}

export interface Post {
  _id: string;
  username: string;
  createdAt: string;
  commentsCount: number;
  viewsCount: number;
  customerType: string;
  firstName: string;
  lastName: string;
  profileImage?: {
    width?: number;
    height?: number;
    imgURL?: string;
  };
}

export interface DashboardData {
  newCustomersInThisMonth: number;
  totalCustomersInThisMonth: number;
  totalVisitsCount: number;
  totalVisitorsCount: number;
  companySubscription: CompanySubscription;
  topCustomers: Customer[];
  latestPosts: Post[];
  customerTrendsThrowYear: CustomerTrend[];
}

export interface InitialState {
  dashboardData: DashboardData | null;
}
