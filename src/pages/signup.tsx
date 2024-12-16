import { PageContainer } from "components/page-container";
import { PageTitle } from "components/title";
import { Button } from "flowbite-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "state/index";
import { signupUser, updateSetupSteps } from "state/slices/auth";
import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState<string | null>(null);
  const { signupPending, signedUp, error } = useSelector((state) => state.auth);

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    dirty,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      dispatch(signupUser({ email: values.email, password: values.password }));
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("This field is required.")
        .email("Please enter a valid email address"),
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

  useEffect(() => {
    if (signedUp) {
      dispatch(updateSetupSteps({ index: 0, complete: true }));
      navigate("/");
    }
  }, [signedUp, dispatch]);

  useEffect(() => {
    if (error && error === "auth/email-already-in-use") {
      setSignupError("Account already exists.");
    }
  }, [error]);

  return (
    <PageContainer>
      <PageTitle title="SIGN UP" />
      <form
        className="flex mx-auto max-w-md flex-col gap-4 mt-5 px-5"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900"
            >
              Email
            </label>
          </div>
          <input
            id="email"
            className={`block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 text-gray-900 p-2.5 text-sm rounded-lg ${
              touched.email && errors.email
                ? "border-red-300 focus:ring-red-500 focus:border-red-600"
                : "focus:border-cyan-500 border-gray-300 focus:ring-cyan-500"
            }`}
            type="email"
            placeholder="janedoe@gmail.com"
            required
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {touched.email && errors.email && (
            <span className="text-red-800 text-xs mx-1 flex flex-wrap">
              {errors.email}
            </span>
          )}
        </div>
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
              touched.password && errors.password
                ? "border-red-300 focus:ring-red-500 focus:border-red-600"
                : "focus:border-cyan-500 border-gray-300 focus:ring-cyan-500"
            }`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {touched.password && errors.password && (
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
              touched.confirmPassword && errors.confirmPassword
                ? "border-red-300 focus:ring-red-500 focus:border-red-600"
                : "focus:border-cyan-500 border-gray-300 focus:ring-cyan-500"
            }`}
            type="password"
            required
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <span className="text-red-800 text-xs mx-1 flex flex-wrap">
              {errors.confirmPassword}
            </span>
          )}
        </div>
        <Button
          isProcessing={signupPending}
          type="submit"
          disabled={!dirty || signupPending}
        >
          {signupPending ? "Signing in..." : "Sign up"}
        </Button>
        <div
          className={`mx-auto flex flex-wrap text-sm text-center ${
            signupError ? "text-red-800 font-bold" : ""
          }`}
        >
          {signupError ? signupError : "Have an account?"}
          <Link to="/login" className="text-blue-500 mx-1 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </PageContainer>
  );
};

export default SignUpPage;
