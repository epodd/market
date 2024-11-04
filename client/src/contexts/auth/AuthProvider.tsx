import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  getSession,
  getSessionUser,
  isValidToken,
  logoutOnTimer,
  setSession,
} from "./jwt-utils";
import { useSnackbars } from "src/hooks/useSnackbar";
import { AuthState, JWTContextType } from "./types";
import {
  RegistrationMutationVariables,
  useGetUserLazyQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegistrationMutation,
} from "src/api";
import {
  initializeAction,
  signInAction,
  signOutAction,
  signUpAction,
} from "./actions";
import { initialState, JWTReducer } from "./reducer";
import { useRouter } from "src/hooks/useRouter";
import { MAIN_PATH } from "src/routes/routes-config";

const AuthContext = createContext<JWTContextType | null>(null);
const SessionContext = createContext<AuthState | null>(null);
let timeoutId: null | ReturnType<typeof setTimeout> = null;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbars();
  const { push } = useRouter();
  const [signIn] = useLoginMutation();
  const [signUp] = useRegistrationMutation();
  const [getUser] = useGetUserLazyQuery();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const initialization = async () => {
      try {
        const accessToken = getSession();
        console.log(accessToken, isValidToken(accessToken));

        if (accessToken && isValidToken(accessToken)) {
          const sessionUser = getSessionUser(accessToken);
          // @ts-ignore
          if (!sessionUser) return;
          await getUser({
            variables: {
              userId: sessionUser?.id,
            },
            // @ts-ignore
            onCompleted: ({ getUser: { user, ok, errors } }) => {
              if (!ok) {
                return showErrorSnackbar(errors[0].message);
              }
              dispatch(
                initializeAction({
                  isAuthenticated: true,
                  user,
                })
              );
            },
          });
        } else {
          dispatch(
            initializeAction({
              isAuthenticated: false,
              user: null,
            })
          );
        }
      } catch (e) {}
    };

    initialization();
  }, []);

  const handlers = useMemo(
    () => ({
      signIn: async (email: string, password: string) => {
        signIn({
          variables: {
            email,
            password,
          },
          onCompleted: ({ login: { ok, errors, user } }) => {
            if (!ok && errors) {
              return showErrorSnackbar(errors[0].message);
            }
            setSession(user.accessToken);
            dispatch(
              signInAction({
                isAuthenticated: true,
                user: {
                  email: user.email,
                  id: user.id,
                  name: user.name,
                  role: user.role,
                },
              })
            );
            showSuccessSnackbar("You logged in!");
            if (user.accessToken) {
              timeoutId = logoutOnTimer(user.accessToken, dispatch, () =>
                showErrorSnackbar("Time your session expired!")
              );
            }
          },
        });
      },
      signUp: async ({
        name,
        password,
        email,
      }: RegistrationMutationVariables) => {
        signUp({
          variables: { name, password, email },
          onCompleted: ({ registration: { user, ok, errors } }) => {
            if (!ok && errors) {
              return showErrorSnackbar(errors[0].message);
            }
            setSession(user.accessToken);
            dispatch(
              signUpAction({
                isAuthenticated: true,
                user: {
                  email: user.email,
                  id: user.id,
                  name: user.name,
                  role: user.role,
                },
              })
            );
            showSuccessSnackbar("Registration completed successfully!");
          },
        });
      },
      signOut: async (userId: string) => {
        logout({
          variables: {
            userId,
          },
          onCompleted: (data) => {
            dispatch(signOutAction(null));
            if (timeoutId) {
              clearTimeout(timeoutId);
              timeoutId = null;
            }
            setSession(null);
            showSuccessSnackbar("Logout successful!");
            push(MAIN_PATH);
          },
          onError: (error) => {
            showErrorSnackbar(`Something went wrong! ${error}`);
          },
        });
      },
    }),
    [dispatch]
  );

  useEffect(() => {
    const accessToken = getSession();
    if (accessToken) {
      timeoutId = logoutOnTimer(accessToken, dispatch);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
  }, []);

  const contextValue = useMemo(() => {
    return {
      ...state,
      dispatch,
      ...handlers,
    };
  }, [state, handlers]);

  return (
    <div>
      <AuthContext.Provider value={contextValue}>
        <SessionContext.Provider value={state}>
          {state.isInitialized && children}
        </SessionContext.Provider>
      </AuthContext.Provider>
    </div>
  );
};

export { AuthContext, AuthProvider, SessionContext };
