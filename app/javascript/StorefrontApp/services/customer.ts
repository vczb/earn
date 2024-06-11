import { CustomerState, Wallet } from "features/customer/customerSlice";
import { FechResponse } from "./fetch";
import { APP_BASE_API_URL } from "utils/constants";

export type FindByCPFRequest = {
  dni: string;
  userId: string;
  token: string;
};

export type GetWalletRequest = {
  customerId: string;
  userId: string;
  token: string;
};

export type RegisterOrEditRequest = {
  name: string;
  email: string;
  phone: string;
} & FindByCPFRequest;

type CustomerResponse = Omit<CustomerState, "requestStatus" | "errorMessage">;

type WalletResponse = Wallet;

async function findByCPF({
  dni,
  userId,
  token = "",
}: FindByCPFRequest): Promise<FechResponse & CustomerResponse> {
  const url = APP_BASE_API_URL + `customer/onboarding`;

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ dni, user_id: userId }),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}

async function register({
  token,
  dni,
  name,
  email,
  userId,
  phone,
}: RegisterOrEditRequest): Promise<FechResponse & CustomerResponse> {
  const url = APP_BASE_API_URL + `customer/register`;

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user_id: userId, dni, name, phone, email }),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}

async function edit({
  token,
  dni,
  name,
  email,
  userId,
  phone,
}: RegisterOrEditRequest): Promise<FechResponse & CustomerResponse> {
  const url = APP_BASE_API_URL + `customer/edit`;

  return await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user_id: userId, dni, name, phone, email }),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}

async function getWallet({
  token,
  userId,
  customerId,
}: GetWalletRequest): Promise<FechResponse & WalletResponse> {
  const url = APP_BASE_API_URL + `customer/wallet`;

  const query = `?user_id=${userId}&customer_id=${customerId}`;

  return await fetch(url + query, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}

const customerService = {
  findByCPF,
  getWallet,
  register,
  edit,
};

export default customerService;
