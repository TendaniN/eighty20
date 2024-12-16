import { auth as apiAuth } from "api/auth";

import { createSlice } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  updateEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { StrictAction } from "state/types";

interface State {
  user: User | null;
  loginPending: boolean;
  signupPending: boolean;
  signedUp: boolean;
  editUserPending: boolean;
  editedUser: boolean;
  logoutPending: boolean;
  loggedOut: boolean;
  passwordResetPending: boolean;
  resetSuccessful: boolean;
  accountSetup: {
    id: number;
    complete: boolean;
    label: string;
    description: string;
  }[];
  error: any | null;
}

export interface Props {
  auth: State;
}

/* INITIALISING */
export const auth: State = {
  user: null,
  loginPending: false,
  signupPending: false,
  signedUp: false,
  editUserPending: false,
  editedUser: false,
  logoutPending: false,
  loggedOut: false,
  passwordResetPending: false,
  resetSuccessful: false,
  accountSetup: [
    {
      id: 1,
      complete: false,
      label: "Setup Account",
      description: "Sign up with email and password.",
    },
    {
      id: 2,
      complete: false,
      label: "Complete your profile",
      description:
        "Fill in missing details from your profile, including choosing your own display name as well as updating your password.",
    },
  ],
  error: null,
};

/* SLICE WHERE NAMES, ACTIONTYPES & REDUCERS ARE DECLARED */
export const slice = createSlice({
  name: "auth",
  initialState: auth,
  reducers: {
    // Sign up user actions
    signupUser: (draft, { payload }) => {
      draft.signupPending = true;
      draft.error = null;
    },
    signupUserSuccess: (draft, { payload }) => {
      draft.user = payload.user;
      draft.signedUp = true;
      draft.signupPending = false;
    },
    signupUserFailed: (draft, { payload }) => {
      draft.error = payload.error;
      draft.signedUp = false;
      draft.signupPending = false;
    },

    // Login user actions
    loginUser: (draft, { payload }) => {
      draft.loginPending = true;
      draft.error = null;
    },
    loginUserSuccess: (draft, { payload }) => {
      draft.user = payload.user;
      draft.loginPending = false;
    },
    loginUserFailed: (draft, { payload }) => {
      draft.error = payload.error;
      draft.loginPending = false;
    },

    // Logout user actions
    logoutUser: (draft) => {
      draft.logoutPending = true;
      draft.loggedOut = false;
      draft.error = null;
    },
    logoutUserSuccess: (draft) => {
      draft.user = null;
      draft.loggedOut = true;
      draft.logoutPending = false;
    },
    logoutUserFailed: (draft, { payload }) => {
      draft.error = payload.error;
      draft.loggedOut = false;
      draft.logoutPending = false;
    },

    // Update user profile actions
    editUser: (draft, { payload }) => {
      draft.editUserPending = true;
      draft.editedUser = false;
      draft.error = null;
    },
    editUserSuccess: (draft, { payload }) => {
      draft.user = payload.user;
      draft.editedUser = true;
      draft.editUserPending = false;
    },
    editUserFailed: (draft, { payload }) => {
      draft.error = payload.error;
      draft.editedUser = false;
      draft.editUserPending = false;
    },

    // Pasword reset actions
    resetPassword: (draft, { payload }) => {
      draft.passwordResetPending = true;
      draft.resetSuccessful = false;
      draft.error = null;
    },
    resetPasswordSuccess: (draft) => {
      draft.resetSuccessful = true;
      draft.passwordResetPending = false;
    },
    resetPasswordFailed: (draft, { payload }) => {
      draft.error = payload.error;
      draft.passwordResetPending = false;
      draft.resetSuccessful = false;
    },

    // Update setup steps
    updateSetupSteps: (draft, { payload }) => {
      draft.accountSetup[payload.index].complete = payload.complete;
    },
  },
});

/* EXPORTING ALL ACTIONS */
export const {
  signupUser,
  signupUserFailed,
  signupUserSuccess,
  loginUser,
  loginUserFailed,
  loginUserSuccess,
  logoutUser,
  logoutUserFailed,
  logoutUserSuccess,
  editUser,
  editUserFailed,
  editUserSuccess,
  resetPassword,
  resetPasswordFailed,
  resetPasswordSuccess,
  updateSetupSteps,
} = slice.actions;
/* EXPORTING ALL REDUCERS */
export default slice.reducer;
// If too many actions present can just be exported as:
// export const { actions, reducer } = slice;

/* SAGA DECLARATIONS - can be in a separate file if too many are present */
export function* signupUserSaga({ payload }: StrictAction) {
  try {
    const { email, password } = payload;
    const { user } = yield call(
      createUserWithEmailAndPassword,
      apiAuth,
      email,
      password
    );

    yield put(
      signupUserSuccess({
        user: {
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          providerId: user.providerData[0].providerId,
          uid: user.uid,
          emailVerfied: user.emailVerified,
          accessToken: user.accessToken,
        },
      })
    );
  } catch (error: any) {
    yield put(signupUserFailed({ error: error.code }));
  }
}

export function* loginUserSaga({ payload }: StrictAction) {
  try {
    const { email, password } = payload;
    const { user } = yield call(
      signInWithEmailAndPassword,
      apiAuth,
      email,
      password
    );
    yield put(
      loginUserSuccess({
        user: {
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          providerId: user.providerData[0].providerId,
          uid: user.uid,
          emailVerfied: user.emailVerified,
          accessToken: user.accessToken,
        },
      })
    );
  } catch (error: any) {
    yield put(loginUserFailed({ error: error.code }));
  }
}

export function* logoutUserSaga() {
  try {
    yield call(signOut, apiAuth);
    yield put(logoutUserSuccess());
  } catch (error: any) {
    yield put(logoutUserFailed({ error: error.code }));
  }
}

export function* editUserSaga({ payload }: StrictAction) {
  try {
    yield call(updateEmail, payload.user, payload.email);
    yield put(editUserSuccess({ user: payload.user }));
  } catch (error: any) {
    yield put(editUserFailed({ error: error.code }));
  }
}

export function* resetPaswordSaga({ payload }: StrictAction) {
  try {
    yield call(sendPasswordResetEmail, apiAuth, payload.email, {
      url: payload.url,
    });
    yield put(resetPasswordSuccess());
  } catch (error: any) {
    yield put(resetPasswordFailed({ error: error.code }));
  }
}
