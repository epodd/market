import { Dispatch } from "react";
import {
  LoginMutationVariables,
  RegistrationMutationVariables,
} from "../../api";

export type AuthUser = {
  email: string;
  id: string;
  name: string;
  role: string;
} | null;

export enum RoleTypes {
  user = "user",
  admin = "admin",
}

export type InitializePayloadType = {
  isAuthenticated: boolean;
  user: AuthUser;
};

export type SignInPayloadType = {
  isAuthenticated: boolean;
  user: AuthUser;
};

export type JWTContextType = {
  isAuthenticated: boolean;
  dispatch: Dispatch<AuthActionTypes>;
  isInitialized: boolean;
  user: AuthUser;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: RegistrationMutationVariables) => Promise<void>;
  signOut: (userId: string) => Promise<void>;
};

export type SignOutPayloadType = null;

export type SignUpPayloadType = {
  isAuthenticated: boolean;
  user: AuthUser;
};

export type AuthActionTypes =
  | {
      type: AuthActions.INITIALIZE;
      payload: InitializePayloadType;
    }
  | {
      type: AuthActions.SIGN_IN;
      payload: SignInPayloadType;
    }
  | {
      type: AuthActions.SIGN_OUT;
      payload: SignOutPayloadType;
    }
  | {
      type: AuthActions.SIGN_UP;
      payload: SignUpPayloadType;
    };

export enum AuthActions {
  INITIALIZE,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
}

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser | null;
};
