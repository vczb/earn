import { HTMLAttributes, ReactNode } from "react";
import { Box } from "@mui/system";

type HTMLDIVElementTypes = HTMLAttributes<HTMLDivElement>;

type WrapperTypes = {
  children: ReactNode | string | null;
  fullVH?: boolean;
  bgColor?: "primary.main" | "primary.white";
} & HTMLDIVElementTypes;

const Wrapper = ({
  children,
  fullVH = false,
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
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
