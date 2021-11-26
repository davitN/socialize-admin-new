import { put } from "redux-saga/effects";
import axiosInstance from "../../services/interceptor.service";
import { CallBacks, IUserData } from "../../types/main";
import { setInitialRolesAction } from "../ducks/dashboardDuck";
import { notifyAction } from "../ducks/mainDuck";

export function* getInitialRolesSaga({ callbacks }: { callbacks: CallBacks; type: string }) {
  try {
    const res: IUserData = yield axiosInstance.get("/initial/get_initial_data");
    console.log(res);
    yield put(setInitialRolesAction(res));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error(error.response?.data.message);
    yield put(notifyAction({ type: "error", message: error.response?.data.message, showError: false }));
  }
}
