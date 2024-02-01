import { Box, Button, Grid, Typography } from "@mui/material";

import { Elevation, GridContainer, Wrapper } from "components";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "./customerSlice";

const Welcome = () => {
  const navigate = useNavigate();

  const { customer, onResetCustomer } = useCustomer();

  const handleEdit = () => {
    navigate("/customer/edit");
  };

  const handleDiamonds = () => {
    navigate("/transaction/diamonds");
  };

  const handleProducts = () => {
    navigate("/product/list");
  };

  const handleBlack = () => {
    onResetCustomer();
    navigate("/");
  };

  return (
    <Wrapper fullVH>
      <GridContainer>
        <Elevation>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography variant="h5">
              {`Olá ${customer.name}, que bom que você voltou!`}
            </Typography>
            <Typography
              sx={{ mt: 2 }}
              variant="body1"
            >{`O que você quer fazer ?`}</Typography>
          </Box>
          <Grid container sx={{ my: 2 }} gap={2} justifyContent="space-between">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => handleDiamonds()}
            >
              ADICIONAR PONTOS
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => handleProducts()}
            >
              RESGATAR PRÊMIOS
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => handleEdit()}
            >
              EDITAR DADOS
            </Button>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              onClick={() => handleBlack()}
            >
              SAIR
            </Button>
          </Grid>
        </Elevation>
      </GridContainer>
    </Wrapper>
  );
};

export default Welcome;
