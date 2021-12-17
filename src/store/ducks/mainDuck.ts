import { AnyAction } from 'redux';
import notificationService from '../../services/notification.service';
import { CallBacks } from '../../types/main';
// import navigationService from "../../services/navigation.service";
// import notificationService from "../../services/notification.service";

export const DEFAULT = 'socialize/main/default';
export const RESET_STORE = 'socialize/main/resetStore';
export const CHECKED_SIGNED_IN = 'socialize/main/checkedSignedIn';
export const GET_INITIAL_ROLES_SG = "socialize/main/getInitialRoles_sg";

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


export const resetStoreAction = (isLoading = false) => ({
  type: RESET_STORE,
  isLoading,
});

export const getInitialRolesActionSG = (callbacks?: CallBacks) => ({
  type: GET_INITIAL_ROLES_SG,
  callbacks,
});

export const notifyAction = ({
  type,
  message,
  title,
  duration,
  callback,
  showError,
}: {
  type: 'error' | 'info' | 'success' | 'warning';
  message: string;
  title?: string | undefined;
  duration?: number | undefined;
  callback?: Function | undefined;
  showError?: boolean;
}) => {
  if (!(!showError && type === 'error')) {
    notificationService[type](message, title, duration, callback);
  }
  return {
    type: DEFAULT,
  };
};

export const defaultAction = () => {
  return {
    type: DEFAULT,
  };
};
