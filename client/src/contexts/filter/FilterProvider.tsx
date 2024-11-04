import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { IFilter } from "src/types";
import { useGetFilter, usePutFilter } from "src/api/filter/useRequests";
import { useAuth } from "../auth/hooks/use-auth";
import { FilterContextType } from "./types";
import {
  clearFilterAction,
  getFilterAction,
  setFilterAction,
  setLoadingAction,
} from "./actions";
import { emptyFilter, FilterReducer, initialState } from "./reducer";

const FilterContext = createContext<FilterContextType | null>(null);

const FilterProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [getFilter, { loading: getFilterLoading }] = useGetFilter();
  const [putFilter, { loading: putFilterLoading }] = usePutFilter();
  const [state, dispatch] = useReducer(FilterReducer, initialState);

  useEffect(() => {
    if (user?.id) {
      getFilter({
        variables: {
          userId: user.id,
        },
        onCompleted: (data) => {
          dispatch(getFilterAction({ filter: data.getFilter.filter }));
        },
      });
    } else {
    }
  }, [user]);
  console.log("filter render");

  useEffect(() => {
    if (getFilterLoading || putFilterLoading) {
      dispatch(setLoadingAction({ loading: true }));
    } else {
      dispatch(setLoadingAction({ loading: false }));
    }
  }, [getFilterLoading, putFilterLoading]);

  const handlers = useMemo(
    () => ({
      setFilter: async (filter: IFilter) => {
        if (user?.id && filter) {
          await putFilter({
            variables: {
              filter,
              userId: user.id,
            },
            onCompleted: ({ putFilter }) => {
              dispatch(
                setFilterAction({
                  filter: putFilter.filter,
                })
              );
            },
          });
        } else {
          dispatch(
            setFilterAction({
              filter: filter,
            })
          );
        }
      },
      clearFilter: async () => {
        if (user?.id) {
          await putFilter({
            variables: {
              filter: emptyFilter,
              userId: user.id,
            },
            onCompleted: () => {
              dispatch(
                clearFilterAction({
                  filter: emptyFilter,
                })
              );
            },
          });
        } else {
          dispatch(
            clearFilterAction({
              filter: emptyFilter,
            })
          );
        }
      },
    }),
    [dispatch, user]
  );

  useEffect(() => {}, []);

  const contextValue = useMemo(() => {
    return {
      ...state,
      dispatch,
      ...handlers,
    };
  }, [state, handlers]);

  return (
    <div>
      <FilterContext.Provider value={contextValue}>
        {children}
      </FilterContext.Provider>
    </div>
  );
};

export { FilterProvider, FilterContext };
