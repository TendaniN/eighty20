import { takeLatest } from "redux-saga/effects";

import {
  editUser,
  editUserSaga,
  loginUser,
  loginUserSaga,
  logoutUser,
  logoutUserSaga,
  signupUser,
  signupUserSaga,
  resetPassword,
  resetPaswordSaga,
} from "./slices/auth";

export default function* rootSaga() {
  // This says no matter what take the last request for the dispatch and run it
  yield takeLatest(loginUser.type, loginUserSaga);
  yield takeLatest(logoutUser.type, logoutUserSaga);
  yield takeLatest(signupUser.type, signupUserSaga);
  yield takeLatest(editUser.type, editUserSaga);
  yield takeLatest(resetPassword.type, resetPaswordSaga);
}
