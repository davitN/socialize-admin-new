import { AnyAction } from "redux";
// import navigationService from "../../services/navigation.service";
// import notificationService from "../../services/notification.service";

export const DEFAULT = "socialize/main/default";
export const RESET_STORE = "socialize/main/resetStore";
export const CHECKED_SIGNED_IN = "socialize/main/checkedSignedIn";
export const SET_DEVICE_TOKEN = "socialize/main/setDeviceToken";

const initialState = {
  isLoading: true,
  isSignedIn: false,
  isVerified: false,
};

export const mainReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CHECKED_SIGNED_IN:
      return {
        ...state,
        isLoading: false,
        isSignedIn: action.isSignedIn,
      };
    case DEFAULT:
      return state;
    default:
      return state;
  }
};

export const checkedSignedInAction = (isSignedIn: boolean) => ({
  type: CHECKED_SIGNED_IN,
  isSignedIn,
});

export const setDeviceTokenAction_SG = (data: any) => ({
  type: SET_DEVICE_TOKEN,
  data,
});

export const resetStoreAction = (isLoading = false) => ({
  type: RESET_STORE,
  isLoading,
});

// export const navigateAction = (screen: string, params: Object) => {
//   navigationService.navigate(screen, params);
//   return {
//     type: DEFAULT,
//   };
// };

// export const navigateResetAction = (routes: any) => {
//   navigationService.reset(routes);
//   return {
//     type: DEFAULT,
//   };
// };

// export const navigateReplacerAction = (name: string, params: Object) => {
//   navigationService.replace(name, params);
//   return {
//     type: DEFAULT,
//   };
// };

// export const navigateGoBakAction = () => {
//   navigationService.goBack();
//   return {
//     type: DEFAULT,
//   };
// };

// export const goBackAction = () => {
//   navigationService.goBack();
//   return {
//     type: DEFAULT,
//   };
// };

// export const notifyAction = (type: string, title: string, message: string, showError = false) => {
//   if (!(!showError && type === "error")) {
//     notificationService.notify(type, title, message);
//   }
//   return {
//     type: DEFAULT,
//   };
// };
