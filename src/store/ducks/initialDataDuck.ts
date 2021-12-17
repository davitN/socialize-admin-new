import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import { InitialDataModel } from '../../types/initial-data';

export const GET_INITIAL_DATA_SG = "socialize/main/getInitialData_sg";
export const SET_INITIAL_DATA = "socialize/main/setInitialData";
export const SET_SELECTED_PLACE_ID = "socialize/main/setSelectedPlaceId";

const initialState: { initialData: InitialDataModel, selectedPlaceId: string } = {
  initialData: {
    places: [],
    adminRole: {
      __v: null,
      _id: '',
      description: '',
      name: ''
    },
    roles: []
  },
  selectedPlaceId: ''
};

export const initialDataReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_INITIAL_DATA:
      return {
        ...state,
        initialData: (payload as InitialDataModel),
      };
    case SET_SELECTED_PLACE_ID:
      return {
        ...state,
        selectedPlaceId: (payload as string)
      }
    default:
      return state;
  }
};

export const setInitialDataAction = (data: InitialDataModel) => ({
  type: SET_INITIAL_DATA,
  payload: data,
});

export const setSelectedPlaceIdAction = (placeId: string) => ({
  type: SET_SELECTED_PLACE_ID,
  payload: placeId,
});

export const getInitialDataActionSG = (callbacks?: CallBacks) => ({
  type: GET_INITIAL_DATA_SG,
  callbacks,
});
