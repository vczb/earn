import { Paper, PaperProps } from "@mui/material";

type ElevationProps = {
  children: React.ReactNode;
} & PaperProps;
const Elevation = ({ children, ...props }: ElevationProps) => (
  <Paper
    elevation={3}
    {...props}
    sx={{
      padding: "1rem 2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      my: 2,
      ...props.sx,
    }}
  >
    {children}
  </Paper>
);

export default Elevation;
