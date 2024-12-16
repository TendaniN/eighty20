/* Core */
import {
  configureStore,
  type ConfigureStoreOptions,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import { reducer } from "./root-reducer";
// import { middleware } from "./middleware";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const configureStoreDefaultOptions: ConfigureStoreOptions = { reducer };

export const makeReduxStore = (
  options: ConfigureStoreOptions = configureStoreDefaultOptions
) => {
  const store = configureStore(options);

  return store;
};

export const reduxStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware);
  },
});

sagaMiddleware.run(sagas);

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
