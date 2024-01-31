import { Container } from "@mui/material";

type GridContainerProps = {
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg";
};

const GridContainer = ({ children, maxWidth = "sm" }: GridContainerProps) => (
  <Container
    maxWidth={maxWidth}
    sx={{
      height: "100%",
      display: "grid",
      placeItems: "center",
    }}
  >
    {children}
  </Container>
);

export default GridContainer;
