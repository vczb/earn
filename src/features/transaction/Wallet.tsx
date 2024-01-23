import { useEffect, useMemo } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";

import { Elevation, GridContainer, Wrapper } from "components";
import { useCustomer } from "features/customer/customerSlice";
import { Diamond } from "icons";
import { useNavigate } from "react-router-dom";

import styles from "./Diamonds.module.css";

export default function Wallet() {
  const { onResetCustomer, onGetWallet, customer } = useCustomer();

  const navigate = useNavigate();

  const customerFirstName = useMemo(() => {
    if (customer?.name) {
      return customer.name.split(" ")[0];
    }
  }, [customer?.name]);

  const onFinish = () => {
    onResetCustomer();
  };

  const onContinue = () => {
    navigate("/customer/welcome");
  };

  useEffect(() => {
    onGetWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper fullVH>
      <GridContainer>
        <Elevation>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              width: "100%",
            }}
          >
            <Typography variant="h5">Olá {customerFirstName}</Typography>
          </Box>
          <Box sx={{ mt: 1, p: 1, width: "100%" }}>
            <Grid
              container
              sx={{ my: 2 }}
              justifyContent="space-between"
              alignItems="center"
              position="relative"
            >
              <Grid
                item
                container
                xs={5}
                flexDirection="column"
                justifyContent="center"
                textAlign="start"
                color={"primary.dark"}
              >
                <Diamond />
              </Grid>
              <Box color={"grey.300"} className={styles.divider} />
              <Grid
                item
                container
                xs={5}
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
              >
                <Typography
                  variant="body1"
                  color={"grey.500"}
                  sx={{
                    fontWeight: "500",
                  }}
                >
                  Você possui
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "500",
                  }}
                  color={"primary.dark"}
                >
                  {(!!customer?.wallet && customer.wallet.diamonds) || 0}
                </Typography>
                <Typography variant="caption" color={"grey.800"}>
                  Diamantes
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ my: 2 }} justifyContent="space-between">
              <Grid item xs={4}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  onClick={() => onFinish()}
                >
                  CONCLUIR
                </Button>
              </Grid>
              <Grid item xs={7}>
                <Button
                  type="button"
                  onClick={() => onContinue()}
                  fullWidth
                  variant="contained"
                >
                  MEU PERFIL
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Elevation>
      </GridContainer>
    </Wrapper>
  );
}
