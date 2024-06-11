import { HTMLAttributes, ReactNode } from "react";
import { Box } from "@mui/system";
import LogoutButton from "features/company/LogoutButton";

type HTMLDIVElementTypes = HTMLAttributes<HTMLDivElement>;

type WrapperTypes = {
  children: ReactNode | string | null;
  fullVH?: boolean;
  bgColor?: "primary.main" | "primary.white";
  showLogout?: boolean
} & HTMLDIVElementTypes;

const Wrapper = ({
  children,
  fullVH = false,
  showLogout = false,
  bgColor = "primary.main",
  ...props
}: WrapperTypes) => {
  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        height: fullVH ? "100vh" : "100%",
        overflowX: "hidden",
        backgroundColor: bgColor,
        position: "relative",
      }}
      {...props}
    >
      {children}
      {showLogout ? <LogoutButton /> : <></>}
    </Box>
  );
};

export default Wrapper
