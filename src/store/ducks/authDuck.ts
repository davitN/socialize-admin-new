import { AnyAction } from "redux";
import { ISignInData, ISignUpData } from "../../types/auth";
import { IUserData } from "../../types/main";

export const CHECK_SIGNED_IN = "socialize/auth/checkSignedIn";
export const SET_USER_DATA = "socialize/auth/setUserData";
export const UPDATE_USER_DATA = "socialize/auth/updateUserData";
export const REQUEST_SIGN_IN_SG = "socialize/auth/requestSignIn_sg";
export const REQUEST_SIGN_UP_SG = "socialize/auth/requestSignUp_sg";
export const LOGOUT = "socialize/auth/logout";

const initialState = {
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
    default:
      return state;
  }
};

export const checkSignedInAction = () => ({
  type: CHECK_SIGNED_IN,
});

export const signInActionSG = (data: ISignInData, callback: Function) => ({
  type: REQUEST_SIGN_IN_SG,
  data,
  callback,
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

export const logoutAction = () => ({
  type: LOGOUT,
});
