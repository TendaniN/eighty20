import { Route, Routes } from "react-router-dom";
import LoginPage from "./login";
import { useSelector } from "state/index";
import Loader from "components/loader";
import ProfilePage from "./profile";
import SignUpPage from "./signup";
import WelcomePage from "./welcome";
import LogoutPage from "./logout";
import PasswordResetPage from "./password-reset";

const Pages = () => {
  const loginPending = useSelector((state) => state.auth.loginPending);

  return loginPending ? (
    <Loader />
  ) : (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </div>
  );
};

export default Pages;
