import Loader from "components/loader";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "state/index";
import { logoutUser } from "state/slices/auth";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loggedOut } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(logoutUser());
  }, []);

  useEffect(() => {
    if (user === null && loggedOut) {
      navigate("/login");
    }
  }, [user, loggedOut]);

  return <Loader />;
};

export default LogoutPage;
