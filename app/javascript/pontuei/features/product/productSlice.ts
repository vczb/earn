import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { RootState } from "store";
import productService from "services/product";
import { snakeToCamel } from "utils";

export type Product = {
  id: number | string;
  name: string;
  priceInDiamonds: number;
  image: string;
  shortDescription: string;
  description: string;
  userId: number;
};

export type ProductState = {
  requestStatus: "idle" | "pending" | "fulfilled" | "rejected";
  errorMessage?: string;
  products: Array<Product>;
};

const initialState = {
  requestStatus: "idle",
  errorMessage: "",
  products: [],
};

const list = createAsyncThunk("product/list", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;

  const token = state.company.jwt as string;
  const userId = state.company.id as string;

  const data = await productService.list({
    token,
    userId,
  });

  if (data?.error) {
    return thunkAPI.rejectWithValue({
      error: data.error.message,
    });
  }

  await thunkAPI.dispatch(setProduct(data));

  return data;
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.requestStatus = "fulfilled";
      state.errorMessage = "";

      const products = action.payload.products.map((product: Product) => {
        const prod = Object.entries(product).reduce((acc, obj) => {
          const [key, value] = obj;
          return {
            ...acc,
            [snakeToCamel(key)]: value,
          };
        }, {});

        return prod || [];
      });

      state.products = products;
      return state;
    },
    resetProduct: (state) => {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(list.pending, (state) => {
      state.requestStatus = "pending";
    });
    builder.addCase(list.fulfilled, (state) => {
      state.requestStatus = "fulfilled";
      state.errorMessage = "";
    });
    builder.addCase(list.rejected, (state, action) => {
      state.requestStatus = "rejected";
      const error = action?.error?.message || "Something went wrong";
      state.errorMessage = error as string;
    });
  },
});

export const { setProduct, resetProduct } = productSlice.actions;

export function useProduct() {
  const product = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const onList = () => dispatch(list());
  const onResetProduct = () => dispatch(resetProduct());
  return {
    product,
    onList,
    onResetProduct,
  };
}

const { reducer } = productSlice;
export default reducer;
