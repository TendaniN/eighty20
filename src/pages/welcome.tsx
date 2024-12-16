import { IsAuthenticated } from "components/is-authenticated";
import { Alert, Button, Progress } from "flowbite-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "state/index";
import { updateSetupSteps } from "state/slices/auth";
import { HiCheck, HiArrowRight, HiInformationCircle } from "react-icons/hi";
import { PageTitle, PageContainer, Header } from "components/index";

const WelcomePage = () => {
  const dispatch = useDispatch();
  const { user, accountSetup } = useSelector((state) => state.auth);

  // Local so it shows up every time the page is displayed until user verifies
  const [alertDisplay, setAlertDisplay] = useState(true);

  const displayAlert = useMemo(() => {
    if (!alertDisplay) {
      return false;
    } else {
      return user && !user.emailVerified;
    }
  }, [user, alertDisplay]);

  const setupProgress = useMemo(() => {
    const completed = accountSetup.filter((step) => step.complete).length;
    return (completed / accountSetup.length) * 100;
  }, [accountSetup]);

  useEffect(() => {
    dispatch(updateSetupSteps({ index: 0, complete: true }));
  }, [dispatch]);

  return (
    <IsAuthenticated>
      <Header />
      <PageContainer>
        <PageTitle />
        <div className="m-2 px-5">
          {displayAlert && (
            <Alert
              color="warning"
              icon={HiInformationCircle}
              onDismiss={() => setAlertDisplay(false)}
            >
              Account email not verified
            </Alert>
          )}
          <div className="text-base font-medium text-green-700 my-3">
            You are almost done with your account setup
          </div>
          <Progress progress={setupProgress} color="green" />
        </div>
        <div className="my-5 mx-2 px-5">
          <h2 className="text-3xl text-cyan-600 font-bold">Tasks</h2>
          {accountSetup.map((step) => (
            <div
              key={`setup-step-${step.id}`}
              className={`mx-2 mb-3 mt-1 rounded-lg border border-gray-200 shadow-md flex-col grid grid-cols-12 p-3 ${
                step.complete ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <div className="sm:col-span-2 col-span-3">
                <div
                  className={`flex items-center gap-1 border-2 border-solid font-semibold group-hover:bg-cyan-200 text-xs rounded-full w-8 h-8 mx-auto ${
                    step.complete
                      ? "bg-green-200 text-green-800 border-green-800"
                      : "bg-gray-200 text-gray-800 border-gray-800"
                  }`}
                >
                  <HiCheck className="mx-auto" strokeWidth={2} />
                </div>
              </div>
              <div className="sm:col-span-10 col-span-9 flex flex-col">
                <div className="text-md font-semibold">{step.label}</div>
                <div className="text-xs py-3 text-gray-600">
                  {step.description}
                </div>
                {step.id == 2 && (
                  <Button
                    pill
                    color="purple"
                    className="ml-auto flex justify-end"
                    as={Link}
                    to={"/profile"}
                  >
                    Update Profile
                    <HiArrowRight className="my-auto ml-2" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </IsAuthenticated>
  );
};

export default WelcomePage;
