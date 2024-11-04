import { actionCreator } from "../utils";
import {
  AuthActions,
  InitializePayloadType,
  SignInPayloadType,
  SignOutPayloadType,
  SignUpPayloadType,
} from "./types";

export const initializeAction = actionCreator<InitializePayloadType>(
  AuthActions.INITIALIZE
);
export const signInAction = actionCreator<SignInPayloadType>(
  AuthActions.SIGN_IN
);
export const signUpAction = actionCreator<SignUpPayloadType>(
  AuthActions.SIGN_UP
);
export const signOutAction = actionCreator<SignOutPayloadType>(
  AuthActions.SIGN_OUT
);
