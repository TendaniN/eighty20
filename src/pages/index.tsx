import { Route, Routes } from "react-router-dom";
import { useSelector } from "state/index";
import Loader from "components/loader";
import { lazyWithRetry } from "utils/lazy-with-retry";

// Lazy loading to separate chunks to decrease main chunks
const LoginPage = lazyWithRetry(() => import("./login"));
const ProfilePage = lazyWithRetry(() => import("./profile"));
const SignUpPage = lazyWithRetry(() => import("./signup"));
const WelcomePage = lazyWithRetry(() => import("./welcome"));
const LogoutPage = lazyWithRetry(() => import("./logout"));

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
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </div>
  );
};

export default Pages;
