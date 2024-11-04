import { AuthActions, AuthActionTypes, AuthState } from "./types";

export const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

export const JWTReducer = (state: AuthState, action: AuthActionTypes) => {
  switch (action.type) {
    case AuthActions.INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case AuthActions.SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case AuthActions.SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case AuthActions.SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};
