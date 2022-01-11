import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import { VenueSendModel, VenuesTableModel } from '../../types/venue';
import { TableQueryParams } from '../../types/table';

export const SAVE_VENUE = 'socialize/main/saveVenue';
export const PUT_VENUE = 'socialize/main/putVenue';
export const GET_VENUES_SG = 'socialize/main/getVenues_sg';
export const GET_VENUE_SG = 'socialize/main/getVenue_sg';
export const SET_VENUES = 'socialize/main/setVenues';
export const GET_COMPANY_AMBASSADOR_SG = 'socialize/main/getCompanyAmbassador';

const initialState: { venuesData: VenuesTableModel } = {
  venuesData: {
    count: 0,
    data: [],
  },
};

export const venueReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_VENUES:
      return {
        ...state,
        venuesData: payload as VenuesTableModel,
      };
    default:
      return state;
  }
};

export const setVenuesAction = (venues: VenuesTableModel) => ({
  type: SET_VENUES,
  payload: venues,
});

export const getCompanyAmbassadorAction = (companyId: string, callbacks: CallBacks) => ({
  type: GET_COMPANY_AMBASSADOR_SG,
  companyId,
  callbacks
});

export const getVenueActionSG = (venueId: string, callbacks: CallBacks) => ({
  type: GET_VENUE_SG,
  venueId,
  callbacks
});

export const getVenuesActionSG = (
  params: TableQueryParams,
  callbacks?: CallBacks
) => ({
  params,
  type: GET_VENUES_SG,
  callbacks,
});

export const saveVenueAction = (
  data: VenueSendModel,
  callbacks?: CallBacks
) => ({
  type: SAVE_VENUE,
  data,
  callbacks,
});

export const putVenueAction = (
  id: string,
  data: VenueSendModel,
  callbacks?: CallBacks
) => ({
  type: PUT_VENUE,
  id,
  data,
  callbacks,
});
