import { PageTitle } from "components/title";
import { Button } from "flowbite-react";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "state/index";
import { PageContainer } from "components/page-container";
import { loginUser, updateSetupSteps } from "state/slices/auth";
import * as yup from "yup";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginPending, user } = useSelector((state) => state.auth);
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
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginUser({ email: values.email, password: values.password }));
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("This field is required.")
        .email("Please enter a valid email address"),
      password: yup.string().required("This field is required."),
    }),
  });

  useEffect(() => {
    if (user && !loginPending) {
      dispatch(updateSetupSteps({ index: 0, complete: true }));
      navigate("/");
    }
  }, [loginPending, user]);

  return (
    <PageContainer>
      <PageTitle title="LOGIN" />
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
        <Button
          isProcessing={loginPending}
          type="submit"
          disabled={!dirty || loginPending}
        >
          {loginPending ? "Logging in..." : "Login"}
        </Button>
        <div className="mx-auto flex flex-wrap text-sm text-center">
          Do not have an account? Sign up{" "}
          <Link to="/signup" className="text-blue-500 mx-1 hover:underline">
            here
          </Link>
        </div>
      </form>
    </PageContainer>
  );
};

export default LoginPage;
