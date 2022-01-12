import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import { ReportsModel } from '../../types/reports';
import { TableQueryParams } from '../../types/table';

export const GET_REPORTED_POSTS_SG = 'socialize/main/getReportedPosts_sg';
export const GET_REPORTED_COMMENTS_SG = 'socialize/main/getReportedComments_sg';
export const SET_REPORTS = 'socialize/main/setReports_sg';

const initialState: { reports: ReportsModel } = {
  reports: {
    data: [],
    count: null,
  },
};

export const reportsReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_REPORTS:
      return {
        ...state,
        reports: payload as ReportsModel,
      };
    default:
      return state;
  }
};

export const getReportedPostsActionSG = (
  params: TableQueryParams,
  callbacks?: CallBacks
) => ({
  type: GET_REPORTED_POSTS_SG,
  params,
  callbacks,
});

export const getReportedCommentsActionSG = (
  params: TableQueryParams,
  callbacks?: CallBacks
) => ({
  type: GET_REPORTED_COMMENTS_SG,
  params,
  callbacks,
});

export const setReportsAction = (reports: ReportsModel) => ({
  type: SET_REPORTS,
  payload: reports,
});
