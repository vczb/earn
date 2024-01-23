import { Navigate, Outlet, useLocation } from "react-router-dom";

type ProtectedProps = {
  isAllowed: boolean;
  redirectTo?: string;
  children?: React.ReactNode | null;
};

export function Protected({
  isAllowed,
  redirectTo = "/auth",
  children,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
ProtectedProps): any {
  const location = useLocation();

  if (!isAllowed) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
}
