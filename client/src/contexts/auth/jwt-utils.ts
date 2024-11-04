import jwtDecode from "jwt-decode";
import { AuthActions, AuthActionTypes, AuthUser } from "./types";
import { Dispatch } from "react";

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  } else {
    localStorage.removeItem("accessToken");
  }
};
const getSession = (): string | null | undefined =>
  localStorage.getItem("accessToken");

const getSessionUser = (
  token: string
): (AuthUser & { iat: number; exp: number }) | null => {
  if (!token) return null;
  return jwtDecode(token);
};

const logoutOnTimer = (
  accessToken: string,
  dispatch: Dispatch<AuthActionTypes>,
  callback?: Function
) => {
  const token = getSessionUser(accessToken);
  if (!token) return null;
  const time = parseInt(String(token.exp - Date.now() / 1000));
  return setTimeout(() => {
    setSession(null);
    dispatch({
      type: AuthActions.SIGN_OUT,
      payload: null,
    });
    callback && callback();
  }, time * 1000);
};

const isValidToken = (accessToken: string | undefined | null) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

export { isValidToken, getSessionUser, getSession, setSession, logoutOnTimer };
