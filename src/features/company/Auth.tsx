import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  FormControl,
  Button,
  TextField,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useCompany } from "./companySlice";
import { useOnDestroy } from "hooks";
import { Elevation, GridContainer, Wrapper } from "components";

export default function Auth() {
  const navigate = useNavigate();

  const { company, onLogin, onResetRequestStatus } = useCompany();

  const { requestStatus, jwt } = company;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const email = data?.get("email")?.toString() || "";
    const password = data?.get("password")?.toString() || "";

    if (!email.length || !password.length) {
      return;
    }

    onLogin({ email, password });
  };

  useEffect(() => {
    if (requestStatus === "fulfilled" && jwt?.length) {
      navigate("/");
    }
  }, [requestStatus, jwt, navigate]);

  useOnDestroy(() => {
    onResetRequestStatus();
  });

  return (
    <Wrapper fullVH bgColor="primary.white">
      <GridContainer maxWidth="xs">
        <Elevation>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h2" color={"primary.dark"}>
              PONTUEI
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "primary.dark" }}>
              <LockOutlinedIcon />
            </Avatar>
          </Box>
          <FormControl
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={requestStatus === "rejected"}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              error={requestStatus === "rejected"}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={requestStatus === "pending"}
            >
              ENTRAR
            </Button>
          </FormControl>
        </Elevation>
      </GridContainer>
    </Wrapper>
  );
}
