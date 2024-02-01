import { Box, Divider, Typography } from "@mui/material";
import { Elevation, GridContainer, Wrapper } from "components";
import Form from "./Form";

import { useNavigate } from "react-router-dom";
import { useCompany } from "features/company/companySlice";
import { useCustomer } from "./customerSlice";

import { useCallback, useEffect } from "react";

const Edit = () => {
  const navigate = useNavigate();
  const { company } = useCompany();
  const { onEdit, customer } = useCustomer();
  const { requestStatus } = customer;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const email = data?.get("email")?.toString() || "";
    const name = data?.get("name")?.toString() || "";
    const phone = data?.get("phone")?.toString() || "";

    onEdit({
      email,
      name,
      phone,
    });
  };

  const handleBack = useCallback(() => {
    navigate("/customer/welcome");
  }, [navigate]);

  useEffect(() => {
    if (requestStatus === "fulfilled") {
      handleBack();
    }
  }, [handleBack, requestStatus]);

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
            <Typography variant="h5">Editar dados</Typography>
          </Box>
          <Form onSubmit={handleSubmit} onCancel={() => handleBack()} />
          <Divider sx={{ mb: 1 }} />
          <Typography
            sx={{ color: "text.secondary" }}
            align={"center"}
            variant="body1"
          >
            {company.name}
          </Typography>
        </Elevation>
      </GridContainer>
    </Wrapper>
  );
};

export default Edit;
