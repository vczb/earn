import React, { useEffect } from "react";

import { Elevation, MaskField, Wrapper } from "components";
import { Button, Divider, FormControl, Grid, Typography } from "@mui/material";
import { useCustomer } from "./customerSlice";
import { useCompany } from "features/company/companySlice";
import { useNavigate } from "react-router-dom";
import { useOnDestroy } from "hooks";

export default function Onboarding() {
  const { company } = useCompany();
  const { customer, validateCPF, onResetRequestStatus } = useCustomer();
  const { onFindByCPF } = useCustomer();
  const navigate = useNavigate();

  const { id, requestStatus } = customer;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const dni = data?.get("dni")?.toString() || "";

    const isValid = validateCPF(dni);

    if (!isValid) {
      return;
    }

    onFindByCPF(dni);
  };

  useEffect(() => {
    if (requestStatus !== "fulfilled") {
      return;
    }

    if (id?.length) {
      navigate("/customer/welcome");
    } else {
      navigate("/customer/new");
    }
  }, [id, requestStatus, navigate, onResetRequestStatus]);

  useOnDestroy(() => {
    onResetRequestStatus();
  });

  return (
    <Wrapper fullVH showLogout>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
          <Elevation sx={{ p: 4 }}>
            <Typography sx={{ mb: 3 }} variant="h6">
              É muito bom ter você aqui conosco!
            </Typography>
            <Typography sx={{ mb: 3 }} variant="body1">
              Digite seu CPF para continuar
            </Typography>

            <FormControl
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ width: "100%", mb: 5 }}
            >
              <MaskField
                sx={{ mb: 3 }}
                fullWidth
                error={customer.requestStatus === "rejected"}
                helperText={customer.errorMessage}
                label="CPF"
                placeholder="CPF"
                name="dni"
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={customer.requestStatus === "pending"}
              >
                CONTINUAR
              </Button>
            </FormControl>

            <Divider sx={{ mb: 1 }} />
            <Typography
              sx={{ color: "text.secondary" }}
              align={"center"}
              variant="body1"
            >
              {company.name}
            </Typography>
          </Elevation>
      </Grid>
    </Wrapper>
  );
}
