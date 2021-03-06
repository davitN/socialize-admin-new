import { AnyAction } from 'redux';
import { AdminAttachUserModel } from '../../types/admin';
import { AuthState, ISignInData, ISignUpData } from '../../types/auth';
import { CallBacks, IUserData } from '../../types/main';
import { UserProfileSendModel } from '../../types/profile';

export const CHECK_SIGNED_IN = 'socialize/auth/checkSignedIn';
export const SET_USER_DATA = 'socialize/auth/setUserData';
export const UPDATE_USER_DATA = 'socialize/auth/updateUserData';
export const REQUEST_SIGN_IN_SG = 'socialize/auth/requestSignIn_sg';
export const SUBMIT_SIGN_IN_OTP_SG = 'socialize/auth/summitSignInOTP_sg';
export const REQUEST_SIGN_UP_SG = 'socialize/auth/requestSignUp_sg';
export const REQUEST_PASSWORD_CHANGE_SG =
  'socialize/auth/requestPasswordChange_sg';
export const LOGOUT = 'socialize/auth/logout';
export const LOGOUT_SG = 'socialize/auth/logout_sg';
export const REQUEST_RESET_PASSWORD_SG =
  'socialize/auth/requestResetPassword_sg';
export const REQUEST_RECOVER_PASSWORD_SG =
  'socialize/auth/requestRecoverPassword_sg';
export const REQUEST_ATTACH_USER_SG = 'socialize/auth/requestAttachUser_sg';
export const GET_ACCOUNT_DETAILS_SG = 'socialize/auth/getAcctountDetails_sg';

const initialState: AuthState = {
  userData: {},
};

export const authReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.userData,
      };
    case UPDATE_USER_DATA:
      console.log(action);
      return {
        ...state,
        userData: { ...state.userData, ...action.userData },
      };
    case LOGOUT_SG:
      return initialState;
    default:
      return state;
  }
};

export const checkSignedInAction = () => ({
  type: CHECK_SIGNED_IN,
});

export const signInActionSG = (data: ISignInData, callbacks?: CallBacks) => ({
  type: REQUEST_SIGN_IN_SG,
  data,
  callbacks,
});

export const summitSignInOTP_ActionSG = (
  code: string,
  callbacks?: CallBacks
) => ({
  type: SUBMIT_SIGN_IN_OTP_SG,
  code,
  callbacks,
});

export const signUpActionSG = (data: ISignUpData, callback: Function) => ({
  type: REQUEST_SIGN_UP_SG,
  data,
  callback,
});

export const setUserDataAction = (userData: IUserData) => ({
  type: SET_USER_DATA,
  userData,
});

export const changePasswordActionSG = (
  userData: UserProfileSendModel,
  callback: CallBacks
) => ({
  type: REQUEST_PASSWORD_CHANGE_SG,
  userData,
  callback,
});

export const logoutAction = () => ({
  type: LOGOUT,
});

export const logoutActionSG = () => ({
  type: LOGOUT_SG,
});

export const requestResetPasswordActionSG = (
  email: string,
  callback: CallBacks
) => ({
  type: REQUEST_RESET_PASSWORD_SG,
  email,
  callback,
});

export const requestRecoverPasswordActionSG = (
  password: string,
  token: string,
  callback: CallBacks
) => ({
  type: REQUEST_RECOVER_PASSWORD_SG,
  password,
  token,
  callback,
});

export const attachUserActionSG = (
  data: AdminAttachUserModel,
  callback: CallBacks,
) => ({
  type: REQUEST_ATTACH_USER_SG,
  data,
  callback,
});

export const getAccountDetailsActionSG = (callback: CallBacks) => ({
  type: GET_ACCOUNT_DETAILS_SG,
  callback,
});
