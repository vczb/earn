import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useCustomer } from "features/customer/customerSlice";
import { Diamond } from "icons";

const Info = () => {
  const { customer } = useCustomer();
  const theme = useTheme();
  const greaterThanMD = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 1,
      }}
    >
      <Typography
        variant={greaterThanMD ? "h2" : "h4"}
        sx={{
          fontWeight: "400",
        }}
        color={"primary.dark"}
      >
        Produtos
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant={greaterThanMD ? "h4" : "h6"}>Saldo</Typography>
        <Box
          sx={{
            marginLeft: "auto",
            minWidth: "10rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          color={"primary.dark"}
        >
          <Box
            sx={{
              height: 20,
              width: 20,
            }}
          >
            <Diamond />
          </Box>
          <Typography
            variant={greaterThanMD ? "h4" : "h6"}
            sx={{
              fontWeight: "500",
            }}
            color={"primary.dark"}
          >
            {(!!customer?.wallet && customer.wallet.diamonds) || 0}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Info;
