import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { Elevation, GridContainer, Wrapper } from "components";
import { useCustomer } from "./customerSlice";

import Form from "./Form";
import { useEffect } from "react";

export default function Register() {
  const { customer, onResetCustomer, onRegister } = useCustomer();
  const { requestStatus } = customer;

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const email = data?.get("email")?.toString() || "";
    const name = data?.get("name")?.toString() || "";
    const phone = data?.get("phone")?.toString() || "";

    onRegister({
      email,
      name,
      phone,
    });
  };

  useEffect(() => {
    if (requestStatus === "fulfilled" && customer.id?.length) {
      navigate("/customer/welcome");
    }
  }, [requestStatus, customer.id, navigate]);

  const handleBack = () => {
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
              alignItems: "center",
            }}
          >
            <Typography variant="h5">
              Bem vindo(a) ! Vamos fazer seu cadastro
            </Typography>
          </Box>
          <Form onSubmit={handleSubmit} onCancel={() => handleBack()} />
        </Elevation>
      </GridContainer>
    </Wrapper>
  );
}
