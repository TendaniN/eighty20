import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "state/index";
import { resetPassword } from "state/slices/auth";
import * as yup from "yup";
import { Button } from "flowbite-react";

import { Header, IsAuthenticated, PageContainer, PageTitle } from "components/";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const PasswordResetPage = () => {
  const dispatch = useDispatch();
  const { user, resetSuccessful, passwordResetPending } = useSelector(
    (state) => state.auth
  );
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    dirty,
    touched,
  } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      dispatch(resetPassword({ user, newPassword: values.password }));
    },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .required("This field is required.")
        .min(8, "Password is too short - should be 8 characters minimum.")
        .matches(passwordRules, {
          message: "Please create a stronger password.",
        }),
      confirmPassword: yup
        .string()
        .required("This field is required.")
        .oneOf([yup.ref("password")], "Passwords must match."),
    }),
  });
  return (
    <IsAuthenticated>
      <Header />
      <PageContainer>
        <PageTitle title="Password Reset" />
        <form
          className="flex mx-auto max-w-md flex-col gap-4 mt-5 px-5"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              required
              className={`block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 text-gray-900 p-2.5 text-sm rounded-lg ${
                errors.password
                  ? "border-red-300 focus:ring-red-500 focus:border-red-600"
                  : "focus:border-cyan-500 border-gray-300 focus:ring-cyan-500"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && (
              <span className="text-red-800 text-xs mx-1 flex flex-wrap">
                {errors.password}
              </span>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <input
              id="confirmPassword"
              className={`block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 text-gray-900 p-2.5 text-sm rounded-lg ${
                errors.confirmPassword
                  ? "border-red-300 focus:ring-red-500 focus:border-red-600"
                  : "focus:border-cyan-500 border-gray-300 focus:ring-cyan-500"
              }`}
              type="password"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            {errors.confirmPassword && (
              <span className="text-red-800 text-xs mx-1 flex flex-wrap">
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <Button
            isProcessing={passwordResetPending}
            type="submit"
            disabled={!dirty || passwordResetPending}
          >
            {passwordResetPending ? "Resetting..." : "Reset"}
          </Button>
        </form>
      </PageContainer>
    </IsAuthenticated>
  );
};

export default PasswordResetPage;
