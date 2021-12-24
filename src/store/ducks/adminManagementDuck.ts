import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import { TableQueryParams } from '../../types/table';
import { AdminModel, AdminTableModel } from '../../types/admin';

export const SAVE_ADMIN_MANAGEMENT = 'socialize/main/saveAdminManagement';
export const PUT_ADMIN_MANAGEMENT = 'socialize/main/putAdminManagement';
export const GET_ADMIN_MANAGEMENTS_SG = 'socialize/main/getAdminManagements_sg';
export const GET_SELECTED_ADMIN_MANAGEMENT_SG = 'socialize/main/getAdminManagement_sg';
export const SET_ADMIN_MANAGEMENTS = 'socialize/main/setAdminManagements';

const initialState: { adminManagements: AdminTableModel } = {
  adminManagements: {
    count: 0,
    data: [],
  }
};

export const adminManagementReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_ADMIN_MANAGEMENTS:
      return {
        ...state,
        adminManagements: payload as AdminTableModel,
      };
    default:
      return state;
  }
};

export const setAdminManagementsAction = (data: AdminTableModel) => ({
  type: SET_ADMIN_MANAGEMENTS,
  payload: data,
});

export const getAdminManagementsActionSG = (
  params: TableQueryParams,
  callbacks?: CallBacks
) => ({
  params,
  type: GET_ADMIN_MANAGEMENTS_SG,
  callbacks,
});

export const getSelectedAdminManagementActionSG = (
    id: string,
    callbacks?: CallBacks
) => ({
  type: GET_SELECTED_ADMIN_MANAGEMENT_SG,
  id,
  callbacks,
});


export const saveAdminManagementAction = (
  data: AdminModel,
  callbacks?: CallBacks
) => ({
  type: SAVE_ADMIN_MANAGEMENT,
  data,
  callbacks,
});

export const putAdminManagementAction = (
  id: string,
  data: AdminModel,
  callbacks?: CallBacks
) => ({
  type: PUT_ADMIN_MANAGEMENT,
  id,
  data,
  callbacks,
});
