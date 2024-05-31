import { Flex, Spinner } from "@chakra-ui/react";
import {
  logoutAllTabs,
  useAuthentication,
  useLogoutMutation
} from "@neoWeb/services/service-auth";
import { useFetchInitData } from "@neoWeb/services/service-init";
import { Suspense, lazy, useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdditionalInfo from "../NoAuth/Components/AdditionalInfo";
import ForgotPassword from "../NoAuth/Components/ForgotPassword";
import { appRoutes } from "./appRoutes";
import { NAVIGATION_ROUTES } from "./navigationRoutes";
const Login = lazy(() => import("@neoWeb/pages/NoAuth/Login"));
const Register = lazy(() => import("@neoWeb/pages/NoAuth/Register"));

export default function App() {
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
  function MissingRoute() {
    return <Navigate to={{ pathname: "/" }} />;
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
              <Route
                path={NAVIGATION_ROUTES.FORGOT_PASSWORD}
                element={<ForgotPassword />}
              />

              <Route path={NAVIGATION_ROUTES.REGISTER} element={<Register />} />
              <Route
                path={NAVIGATION_ROUTES.ADDITIONALINFORMATION}
                element={<AdditionalInfo />}
              />

              <Route path="*" element={<MissingRoute />} />
            </Route>
          )}
        </Routes>
      </>
    </Suspense>
  );
}
