import { IsAuthenticated } from "components/is-authenticated";
import { Badge, Button, Toast, ToastToggle } from "flowbite-react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "state/index";
import { editUser } from "state/slices/auth";
import { Header } from "components/header";
import * as yup from "yup";
import { PageContainer } from "components/page-container";
import { PageTitle } from "components/title";
import { HiCheck } from "react-icons/hi";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { editUserPending, user, editedUser } = useSelector(
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
      email: user && user.email ? user.email : "",
    },
    onSubmit: (values) => {
      dispatch(editUser({ email: values.email }));
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("This field is required.")
        .email("Please enter a valid email address"),
    }),
  });

  return (
    <IsAuthenticated>
      <Header />
      <PageContainer>
        <PageTitle title="Profile" />
        <form
          className="flex mx-auto max-w-md flex-col gap-4 mt-5 px-5"
          onSubmit={handleSubmit}
        >
          {user && !user.emailVerified && (
            <Badge color="warning" className="ml-auto">
              Account email unverified
            </Badge>
          )}
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
            isProcessing={editUserPending}
            type="submit"
            color="purple"
            disabled={!dirty || editUserPending}
          >
            {editUserPending ? "Saving..." : "Save"}
          </Button>
          {editedUser && (
            <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiCheck className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">Saved!</div>
              <ToastToggle />
            </Toast>
          )}
        </form>
      </PageContainer>
    </IsAuthenticated>
  );
};

export default ProfilePage;
