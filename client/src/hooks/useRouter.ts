import { useMemo } from "react";
import { To, useLocation, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";

export const useRouter = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return useMemo(() => {
    const router = {
      push: (path: To) => navigate(path),
      replace: (path: To) => navigate(path, { replace: true }),
      back: () => navigate(-1),
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search),
        ...params,
      },
      location,
    };

    return router;
  }, [params, location]);
};
