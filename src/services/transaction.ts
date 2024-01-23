import { FechResponse } from "./fetch";

type TransactionResponse = {
  id: string;
};

export type TransactionRequest = {
  userId: string;
  customerId: string;
  token: string;
  value: number;
};

type PurchaseProps = TransactionRequest;

type withdrawalProps = Omit<TransactionRequest, "value"> & {
  productId: string | number;
};

async function purchase({
  userId,
  customerId,
  value,
  token,
}: PurchaseProps): Promise<FechResponse & TransactionResponse> {
  const url = process.env.REACT_APP_BASE_API_URL + "transaction/purchase";

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      value,
      customer_id: customerId,
      user_id: userId,
    }),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}

async function withdrawal({
  userId,
  customerId,
  productId,
  token,
}: withdrawalProps): Promise<FechResponse & TransactionResponse> {
  const url = process.env.REACT_APP_BASE_API_URL + "transaction/withdrawal";

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      customer_id: customerId,
      user_id: userId,
      product_id: productId,
    }),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}

const transactionService = {
  purchase,
  withdrawal,
};

export default transactionService;
