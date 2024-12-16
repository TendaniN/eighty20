import { Button, Toast } from "flowbite-react";
import { useSelector } from "state/index";
import { HiCheck } from "react-icons/hi";
import { resetPassword } from "state/slices/auth";
import { PageContainer, PageTitle } from "components/";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

const ProfilePage = () => {
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
    touched,
    dirty,
  } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      dispatch(
        resetPassword({
          email: values.email,
          url: "http://localhost:5173/login",
        })
      );
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("This field is required.")
        .email("Please enter a valid email address"),
    }),
  });

  const resetEmailSend = () => {
    dispatch(
      resetPassword({ email: user.email, url: "http://localhost:5173" })
    );
  };

  return (
    <PageContainer>
      <PageTitle title="Profile" />
      <div className="flex mx-auto max-w-md flex-col gap-4 mt-5">
        {user !== null ? (
          <>
            <Button onClick={() => resetEmailSend()}>Reset Password</Button>
            {resetSuccessful && (
              <Toast className="mx-auto bg-white border border-green-400 dark:bg-white">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal text-gray-600 dark:text-gray-600">
                  Email Sent! <br />
                  <p className="text-xs mt-1">
                    Follow the instructions sent via email to complete Resetting
                    your password.
                  </p>
                </div>
              </Toast>
            )}
          </>
        ) : (
          <form
            className="flex mx-auto max-w-md flex-col gap-4 mt-5"
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
            <Button
              isProcessing={passwordResetPending}
              type="submit"
              disabled={!dirty || passwordResetPending}
            >
              {passwordResetPending ? "Resetting..." : "Reset"}
            </Button>
            {resetSuccessful && (
              <Toast className="mx-auto bg-white border border-green-400 dark:bg-white">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal text-gray-600 dark:text-gray-600">
                  Email Sent! <br />
                  <p className="text-xs mt-1">
                    Follow the instructions sent via email to complete Resetting
                    your password.
                  </p>
                </div>
              </Toast>
            )}
          </form>
        )}
      </div>
    </PageContainer>
  );
};

export default ProfilePage;
