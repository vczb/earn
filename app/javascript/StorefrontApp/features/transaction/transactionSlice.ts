import { useCallback } from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { RootState } from "store";
import transactionService, { TransactionRequest } from "services/transaction";

export type TransactionState = {
  requestStatus: "idle" | "pending" | "fulfilled" | "rejected";
  errorMessage?: string;
  id?: string | number;
};

const initialState = {
  requestStatus: "idle",
  errorMessage: "",
  id: "",
};

type PurchaseProps = Pick<TransactionRequest, "value">;

type WithdrawalProps = {
  productId: string | number;
};

const purchase = createAsyncThunk(
  "transaction/purchase",
  async ({ value }: PurchaseProps, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const token = state.company.jwt as string;
    const userId = state.company.id as string;
    const customerId = state.customer.id as string;

    const data = await transactionService.purchase({
      token,
      userId,
      customerId,
      value,
    });

    if (data?.error) {
      return thunkAPI.rejectWithValue({
        error: data.error.message,
      });
    }

    await thunkAPI.dispatch(setTransaction(data));

    return data;
  }
);

const withdrawal = createAsyncThunk(
  "transaction/withdrawal",
  async ({ productId }: WithdrawalProps, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const token = state.company.jwt as string;
    const userId = state.company.id as string;
    const customerId = state.customer.id as string;

    const data = await transactionService.withdrawal({
      token,
      userId,
      customerId,
      productId,
    });

    if (data?.error) {
      return thunkAPI.rejectWithValue({
        error: data.error.message,
      });
    }

    await thunkAPI.dispatch(setTransaction(data));

    return data;
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransaction: (state, action) => {
      state.requestStatus = "fulfilled";
      state.errorMessage = "";
      state.id = action.payload.transaction.id;
      return state;
    },
    resetRequestStatus: (state) => {
      state.requestStatus = "idle";
      state.errorMessage = "";
      state.id = "";
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(purchase.pending, (state) => {
      state.requestStatus = "pending";
    });
    builder.addCase(purchase.fulfilled, (state) => {
      state.requestStatus = "fulfilled";
      state.errorMessage = "";
    });
    builder.addCase(purchase.rejected, (state, action) => {
      state.requestStatus = "rejected";
      const error = action?.error?.message || "Something went wrong";
      state.errorMessage = error as string;
    });
    builder.addCase(withdrawal.pending, (state) => {
      state.requestStatus = "pending";
    });
    builder.addCase(withdrawal.fulfilled, (state) => {
      state.requestStatus = "fulfilled";
      state.errorMessage = "";
    });
    builder.addCase(withdrawal.rejected, (state, action) => {
      state.requestStatus = "rejected";
      const error = action?.error?.message || "Something went wrong";
      state.errorMessage = error as string;
    });
  },
});

export const { setTransaction, resetRequestStatus } = transactionSlice.actions;

export function useTransaction() {
  const dispatch = useAppDispatch();
  const transaction = useAppSelector((state) => state.transaction);
  const company = useAppSelector((state) => state.company);
  const onResetRequestStatus = () => dispatch(resetRequestStatus());
  const onPurchase = (data: PurchaseProps) => dispatch(purchase(data));
  const onWithdrawal = (data: WithdrawalProps) => dispatch(withdrawal(data));

  const calcDiamonds = useCallback(
    (diamonds: number) => {
      const price = company.diamondPriceInCents / 100;
      return Math.floor(diamonds / price);
    },
    [company.diamondPriceInCents]
  );

  return {
    dispatch,
    transaction,
    calcDiamonds,
    onPurchase,
    onWithdrawal,
    onResetRequestStatus,
  };
}

const { reducer } = transactionSlice;
export default reducer;
