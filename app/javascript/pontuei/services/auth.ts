import { CompanyState } from "features/company/companySlice";
import { FechResponse } from "./fetch";

type LoginResponse = {
  jwt: string;
  user?: CompanyState;
};

export type LoginRequest = {
  email: string;
  password: string;
};

async function login({
  email,
  password,
}: LoginRequest): Promise<FechResponse & LoginResponse> {
  const url = process.env.REACT_APP_BASE_API_URL + "auth/login";

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}

const authService = {
  login,
};

export default authService;
