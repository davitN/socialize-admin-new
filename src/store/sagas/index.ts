import { all, takeLatest } from 'redux-saga/effects';
import { checkSignedInSaga } from './mainSaga';
import { GET_DASHBOARD_DATA_SG } from '../ducks/dashboardDuck';
import { getDashboardDataSaga } from './dashboardSaga';
import {
  DELETE_LATEST_POST_SG,
  GET_LATEST_POST_SG,
  GET_LATEST_POSTS_SG,
} from '../ducks/latestPostsDuck';
import {
  deleteLatestPostSaga,
  getLatestPostSaga,
  getLatestPostsSaga,
} from './latestPostsSaga';
import {
  attachUserSaga,
  changePasswordSaga,
  getAccountDetailsSaga,
  logoutSaga,
  recoverPasswordSaga,
  resetPasswordSaga,
  signInSaga,
  signUpSaga,
  summitSignInOTP_Saga,
} from './authSaga';
import {
  CHECK_SIGNED_IN,
  GET_ACCOUNT_DETAILS_SG,
  LOGOUT,
  REQUEST_ATTACH_USER_SG,
  REQUEST_PASSWORD_CHANGE_SG,
  REQUEST_RECOVER_PASSWORD_SG,
  REQUEST_RESET_PASSWORD_SG,
  REQUEST_SIGN_IN_SG,
  REQUEST_SIGN_UP_SG,
  SUBMIT_SIGN_IN_OTP_SG,
} from '../ducks/authDuck';
import { GET_TOP_CUSTOMERS_SG } from '../ducks/topCustomersDuck';
import { getTopCustomersSaga } from './topCustomersSaga';
import {
  getVenueSaga,
  getVenuesSaga,
  putVenueSaga,
  saveVenueSaga,
} from './VenuesSaga';
import {
  GET_COMPANY_AMBASSADOR_SG,
  GET_VENUE_SG,
  GET_VENUES_SG,
  PUT_VENUE,
  SAVE_VENUE,
} from '../ducks/VenueDuck';
import {
  getCompaniesSaga,
  getCompanyAmbassadorSaga,
  getCompanySubscriptionsSaga,
  getSelectedCompanySaga,
  putCompanySaga,
  saveCompanySaga,
} from './companySaga';
import {
  GET_COMPANIES_SG,
  GET_COMPANY_SUBSCRIPTION_SG,
  GET_SELECTED_COMPANY_SG,
  PUT_COMPANY,
  SAVE_COMPANY,
} from '../ducks/companyDuck';
import { GET_INITIAL_DATA_SG } from '../ducks/initialDataDuck';
import { getInitialDataSaga } from './initialDataSaga';
import {
  GET_ADMIN_MANAGEMENTS_SG,
  GET_SELECTED_ADMIN_MANAGEMENT_SG,
  PUT_ADMIN_MANAGEMENT,
  SAVE_ADMIN_MANAGEMENT,
} from '../ducks/adminManagementDuck';
import {
  getAdminManagementSaga,
  getSelectedAdminManagementSaga,
  putAdminManagementSaga,
  saveAdminManagementSaga,
} from './adminManagementSaga';
import {
  APP_USERS_VERIFY_SG,
  GET_APP_USERS_SG,
  GET_SELECTED_APP_USER_SG,
} from '../ducks/appUsersDuck';
import {
  appUsersVerifySaga,
  getAppUsersSaga,
  getSelectedAppUserSaga,
} from './appUsersSaga';
import {
  GET_REPORTED_COMMENTS_SG,
  GET_REPORTED_POSTS_SG,
} from '../ducks/reportsDuck';
import { getReportedCommentsSaga, getReportedPostsSaga } from './reportsSaga';
import {
  GET_DRAFT_OR_SCHEDULED_NOTIFICATIONS_SG,
  GET_NOTIFICATIONS_SG,
  GET_SELECTED_NOTIFICATIONS_SG,
  POST_DRAFT_OR_SCHEDULED_NOTIFICATIONS_SG,
  POST_NOTIFICATIONS_SG,
} from '../ducks/notificationsDuck';
import {
  getDraftOrScheduledNotificationsSaga,
  getNotificationsSaga,
  getSelectedNotificationsSaga,
  postDraftedOrScheduledNotificationsSaga,
  postNotificationsSaga,
} from './notificationsSaga';

function* actionWatcher() {
  yield takeLatest(CHECK_SIGNED_IN, checkSignedInSaga);
  yield takeLatest(REQUEST_SIGN_IN_SG, signInSaga);
  yield takeLatest(SUBMIT_SIGN_IN_OTP_SG, summitSignInOTP_Saga);
  yield takeLatest(REQUEST_SIGN_UP_SG, signUpSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(GET_INITIAL_DATA_SG, getInitialDataSaga);
  yield takeLatest(GET_DASHBOARD_DATA_SG, getDashboardDataSaga);
  yield takeLatest(GET_LATEST_POSTS_SG, getLatestPostsSaga);
  yield takeLatest(GET_LATEST_POST_SG, getLatestPostSaga);
  yield takeLatest(DELETE_LATEST_POST_SG, deleteLatestPostSaga);
  yield takeLatest(GET_TOP_CUSTOMERS_SG, getTopCustomersSaga);
  yield takeLatest(SAVE_VENUE, saveVenueSaga);
  yield takeLatest(PUT_VENUE, putVenueSaga);
  yield takeLatest(GET_VENUES_SG, getVenuesSaga);
  yield takeLatest(GET_VENUE_SG, getVenueSaga);
  yield takeLatest(SAVE_COMPANY, saveCompanySaga);
  yield takeLatest(PUT_COMPANY, putCompanySaga);
  yield takeLatest(GET_COMPANIES_SG, getCompaniesSaga);
  yield takeLatest(GET_COMPANY_SUBSCRIPTION_SG, getCompanySubscriptionsSaga);
  yield takeLatest(GET_SELECTED_COMPANY_SG, getSelectedCompanySaga);
  yield takeLatest(GET_COMPANY_AMBASSADOR_SG, getCompanyAmbassadorSaga);
  yield takeLatest(REQUEST_PASSWORD_CHANGE_SG, changePasswordSaga);
  yield takeLatest(SAVE_ADMIN_MANAGEMENT, saveAdminManagementSaga);
  yield takeLatest(PUT_ADMIN_MANAGEMENT, putAdminManagementSaga);
  yield takeLatest(GET_ADMIN_MANAGEMENTS_SG, getAdminManagementSaga);
  yield takeLatest(
    GET_SELECTED_ADMIN_MANAGEMENT_SG,
    getSelectedAdminManagementSaga
  );
  yield takeLatest(GET_APP_USERS_SG, getAppUsersSaga);
  yield takeLatest(APP_USERS_VERIFY_SG, appUsersVerifySaga);
  yield takeLatest(GET_SELECTED_APP_USER_SG, getSelectedAppUserSaga);
  yield takeLatest(GET_REPORTED_POSTS_SG, getReportedPostsSaga);
  yield takeLatest(GET_REPORTED_COMMENTS_SG, getReportedCommentsSaga);
  yield takeLatest(GET_NOTIFICATIONS_SG, getNotificationsSaga);
  yield takeLatest(POST_NOTIFICATIONS_SG, postNotificationsSaga);
  yield takeLatest(GET_SELECTED_NOTIFICATIONS_SG, getSelectedNotificationsSaga);
  yield takeLatest(
    GET_DRAFT_OR_SCHEDULED_NOTIFICATIONS_SG,
    getDraftOrScheduledNotificationsSaga
  );
  yield takeLatest(
    POST_DRAFT_OR_SCHEDULED_NOTIFICATIONS_SG,
    postDraftedOrScheduledNotificationsSaga
  );
  yield takeLatest(REQUEST_RESET_PASSWORD_SG, resetPasswordSaga);
  yield takeLatest(REQUEST_RECOVER_PASSWORD_SG, recoverPasswordSaga);
  yield takeLatest(REQUEST_ATTACH_USER_SG, attachUserSaga);
  yield takeLatest(GET_ACCOUNT_DETAILS_SG, getAccountDetailsSaga);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
