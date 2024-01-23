import { FechResponse } from "./fetch";

type Product = {
  id: number | string;
  name: string;
  price_in_diamonds: number;
  image: string;
  short_description: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
};

type ProductResponse = {
  products: Product[];
};

export type ProductRequest = {
  userId: string;
  token: string;
};

async function list({
  userId,
  token,
}: ProductRequest): Promise<FechResponse & ProductResponse> {
  const url = process.env.REACT_APP_BASE_API_URL + "product/list";

  const query = `?user_id=${userId}`;

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

const productService = {
  list,
};

export default productService;
