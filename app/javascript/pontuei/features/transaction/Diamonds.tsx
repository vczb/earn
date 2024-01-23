import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  FormControl,
  Button,
  TextField,
  Grid,
} from "@mui/material";

import { useOnDestroy } from "hooks";

import { Elevation, GridContainer, Wrapper } from "components";

import { useTransaction } from "./transactionSlice";

import styles from "./Diamonds.module.css";

export default function Diamonds() {
  const { transaction, calcDiamonds, onPurchase, onResetRequestStatus } =
    useTransaction();

  const { requestStatus } = transaction;

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState<string>("");

  const countDiamonds = useMemo(() => {
    const value = parseFloat(inputValue);

    return calcDiamonds(value ? value : 0);
  }, [inputValue, calcDiamonds]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue) {
      const value = parseFloat(inputValue);
      onPurchase({ value });
    }
  };

  const handleInputChange = (value: string) => {
    if (parseFloat(value) > 0) {
      setInputValue(value);
    } else {
      setInputValue("");
    }
  };

  const onCancel = () => {
    navigate("/customer/welcome");
  };

  useOnDestroy(() => {
    onResetRequestStatus();
  });

  useEffect(() => {
    if (requestStatus === "fulfilled" && transaction?.id) {
      navigate("/product/list");
    }
  }, [requestStatus, transaction?.id, navigate]);

  return (
    <Wrapper fullVH>
      <GridContainer>
        <Elevation>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Adicione o valor do pedido</Typography>
          </Box>
          <FormControl
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, p: 1, width: "100%" }}
          >
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
              >
                <TextField
                  name="value"
                  label="Valor"
                  type="number"
                  required
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <span style={{ marginRight: 4 }}>{`R$`}</span>
                    ),
                  }}
                />
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
                  sx={{
                    fontWeight: "500",
                  }}
                >
                  Você vai ganhar
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "500",
                  }}
                  color={"primary.dark"}
                >
                  {countDiamonds}
                </Typography>
                <Typography variant="caption" color={"grey.800"}>
                  {countDiamonds > 1 ? "Diamantes" : "Diamante"}
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ my: 2 }} justifyContent="space-between">
              <Grid item xs={3}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  onClick={() => onCancel()}
                >
                  VOLTAR
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Button
                  type="submit"
                  disabled={requestStatus === "pending"}
                  fullWidth
                  variant="contained"
                >
                  CONTINUAR
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Elevation>
      </GridContainer>
    </Wrapper>
  );
}
