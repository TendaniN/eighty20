import { useSelector } from "state/index";
import { Navigate, useLocation } from "react-router-dom";

/**
 *
 * Wrap pages that are only to be seen when authenticated/logged in
 */
export const IsAuthenticated = ({ ...props }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  return user ? (
    props.children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
