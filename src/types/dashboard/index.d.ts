export interface CompanySubscription {
  _id: string;
  name: string;
  description: string;
}

export interface CustomerTrend {
  firstTimeVisitor: number;
  secondTimeVisitor: number;
  regular: number;
  visitYearMonthDate?: string;
  visitDayOfMonth?: number;
  visitDayOfWeek?: number;
}

export interface Customer {
  _id: string;
  isRealInfoHidden?: boolean;
  visitsCount?: number;
  lastVisitingTime?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  postsCount?: number;
  viewsOnPosts?: number;
  profileImage?: {
    height?: number;
    width?: number;
    imgURL?: string;
  };
}

export interface PostModel {
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
  postImage?: {
    height: number;
    imgURL: string;
    width: number;
  };
  text: string;
}

export interface DashboardData {
  newCustomersInThisMonth: number;
  totalCustomersInThisMonth: number;
  totalVisitsCount: number;
  totalVisitorsCount: number;
  companySubscription: CompanySubscription;
  topCustomers: Customer[];
  latestPosts: PostModel[];
  customerTrendsThrowYear: CustomerTrend[];
  customerTrendsThrowMonth: CustomerTrend[];
  customerTrendsThrowWeek: CustomerTrend[];
  busiestDayLastYear: BusiestDay;
  busiestDayLastMonth: BusiestDay;
  busiestDayLastWeek: BusiestDay;
  notificationCountLastMonth: number;
  notificationCountThisMonth: number;
  sentAndDeliveredNotificationsCount: {
    deliveredUsersCount: number;
    sentUsersCount: number;
    _id: {
      visitYearMonthDate: string;
    };
  };
  postsViewsCount: {
    postsCount: number;
    viewsCount: number;
    _id: string;
  }
}

interface BusiestDay {
  _id: number;
  count: number;
}

export interface InitialState {
  dashboardData: DashboardData | null;
}
