import { Flex, Spinner } from "@chakra-ui/react";
import {
  logoutAllTabs,
  useAuthentication,
  useLogoutMutation
} from "@neoWeb/services/service-auth";
import { useFetchInitData } from "@neoWeb/services/service-init";
import { Suspense, lazy, useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AdditionalInfo from "../NoAuth/Components/AdditionalInfo";
import SetPassword from "../NoAuth/Components/SetPassword";
import SetupPin from "../NoAuth/Components/SetupPin";
import { appRoutes } from "./appRoutes";
import { NAVIGATION_ROUTES } from "./navigationRoutes";
const Login = lazy(() => import("@neoWeb/pages/NoAuth/Login"));
const Register = lazy(() => import("@neoWeb/pages/NoAuth/Register"));
const OTP = lazy(() => import("@neoWeb/pages/NoAuth/OTP"));

export default function App() {
  // Check if app is authenticated
  const {
    data: isAuthenticated,
    isLoading: isAuthLoading,
    refetch: checkTokenAndRefresh
  } = useAuthentication();

  const { mutateAsync: logoutUser } = useLogoutMutation();

  //  Fetching Initial data in app
  const { isLoading: isInitDataLoading, isError: isInitDataError } =
    useFetchInitData(!!isAuthenticated);

  useEffect(() => {
    if (typeof isAuthenticated === "boolean" && !isAuthenticated) {
      localStorage.getItem("token") ? logoutUser() : null;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    let iID = null as null | NodeJS.Timeout;
    if (isAuthenticated) {
      iID = setInterval(() => checkTokenAndRefresh, 30_000);
    }

    return () => {
      if (iID) {
        clearInterval(iID);
      }
    };
  }, [isAuthenticated, checkTokenAndRefresh]);
  useEffect(() => {
    logoutAllTabs();
  }, []);

  if ((isInitDataLoading || isAuthLoading) && !isInitDataError) {
    return (
      <Flex justifyContent={"center"} alignItems="center" height={"100vh"}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <Suspense
      fallback={
        <Flex justifyContent={"center"} alignItems="center" height={"100vh"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.500"
            size="xl"
          />
        </Flex>
      }
    >
      <>
        <Routes>
          {isAuthenticated ? (
            <>
              {appRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}>
                  {route.children &&
                    route.children.map((childRoute, childIndex) => (
                      <Route
                        key={childIndex}
                        path={childRoute.path}
                        element={childRoute.element}
                        {...(childRoute.index && { index: childRoute.index })}
                      />
                    ))}
                </Route>
              ))}
            </>
          ) : (
            <Route path="/" element={<Outlet />}>
              <Route index element={<Login />} />
              <Route path={NAVIGATION_ROUTES.LOGIN} element={<Login />} />

              <Route path={NAVIGATION_ROUTES.REGISTER} element={<Register />} />
              <Route
                path={NAVIGATION_ROUTES.ADDITIONALINFORMATION}
                element={<AdditionalInfo />}
              />
              <Route path={NAVIGATION_ROUTES.OTP} element={<OTP />} />
              <Route
                path={NAVIGATION_ROUTES.SET_PASSWORD}
                element={<SetPassword />}
              />
              <Route
                path={NAVIGATION_ROUTES.SETUP_PIN}
                element={<SetupPin />}
              />
            </Route>
          )}
        </Routes>
      </>
    </Suspense>
  );
}
