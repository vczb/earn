import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import customerService, { RegisterOrEditRequest } from "services/customer";

import { RootState } from "store";

import { useAppDispatch, useAppSelector } from "store/hooks";

export type Wallet = {
  diamonds: number;
};

export type CustomerState = {
  requestStatus?: "idle" | "pending" | "fulfilled" | "rejected";
  id: string;
  email: string;
  cpf: string;
  name: string;
  phone: string;
  errorMessage?: string;
  wallet?: Wallet;
};

const initialState: CustomerState = {
  id: "",
  email: "",
  cpf: "",
  name: "",
  phone: "",
  errorMessage: "",
  requestStatus: "idle",
};

type CustomerRequestProps = Pick<
  RegisterOrEditRequest,
  "name" | "phone" | "email"
>;

const register = createAsyncThunk(
  "customer/new",
  async ({ name, email, phone }: CustomerRequestProps, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const token = state.company.jwt as string;
    const userId = state.company.id;
    const cpf = state.customer.cpf;

    const data = await customerService.register({
      token,
      email,
      cpf,
      userId,
      name,
      phone,
    });

    if (data?.error) {
      return thunkAPI.rejectWithValue({
        error: data.error.message,
      });
    }

    await thunkAPI.dispatch(setCustomer(data));

    return data;
  }
);

const edit = createAsyncThunk(
  "customer/edit",
  async ({ name, email, phone }: CustomerRequestProps, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const token = state.company.jwt as string;
    const userId = state.company.id;
    const cpf = state.customer.cpf;

    console.log("editing");

    const data = await customerService.edit({
      token,
      email,
      cpf,
      userId,
      name,
      phone,
    });

    if (data?.error) {
      return thunkAPI.rejectWithValue({
        error: data.error.message,
      });
    }

    await thunkAPI.dispatch(setCustomer(data));

    return data;
  }
);

const getWallet = createAsyncThunk("customer/wallet", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  console.log("wallet", state);

  const token = state.company.jwt as string;
  const userId = state.company.id;
  const customerId = state.customer.id;

  const data = await customerService.getWallet({
    token,
    userId,
    customerId,
  });

  if (data?.error) {
    return thunkAPI.rejectWithValue({
      error: data.error.message,
    });
  }

  await thunkAPI.dispatch(setWallet(data));

  return data;
});

const findByCPF = createAsyncThunk(
  "customer/onboarding",
  async (cpf: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const token = state.company.jwt as string;

    const userId = state.company.id;

    if (state.customer.id.length) {
      await thunkAPI.dispatch(resetCustomer());
    }

    const payload = {
      cpf,
      userId: userId.padStart(2, "0"),
    };

    const data = await customerService.findByCPF({ ...payload, token });

    if (data?.error) {
      return thunkAPI.rejectWithValue({
        error: data.error.message,
      });
    }

    if (!data?.id && data?.cpf) {
      return await thunkAPI.dispatch(setNewCustomer(data));
    }

    await thunkAPI.dispatch(setCustomer(data));

    return data;
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.id = String(action.payload.id);
      state.email = action.payload.email;
      state.cpf = action.payload.cpf;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
    },
    setWallet: (state, action) => {
      console.log("wallet", action.payload);
      state.wallet = action.payload;
    },
    setNewCustomer: (state, action) => {
      state.cpf = action.payload.cpf;
      return state;
    },
    resetCustomer: (state) => {
      state = initialState;
      return state;
    },
    resetRequestStatus: (state) => {
      state.requestStatus = "idle";
      state.errorMessage = "";
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findByCPF.pending, (state: CustomerState) => {
      state.requestStatus = "pending";
    });
    builder.addCase(findByCPF.fulfilled, (state: CustomerState) => {
      state.requestStatus = "fulfilled";
      state.errorMessage = "";
    });
    builder.addCase(findByCPF.rejected, (state, action) => {
      state.requestStatus = "rejected";
      const error = action?.error?.message || "Something went wrong";
      state.errorMessage = error as string;
    });
    builder.addCase(register.pending, (state: CustomerState) => {
      state.requestStatus = "pending";
    });
    builder.addCase(register.fulfilled, (state: CustomerState) => {
      state.requestStatus = "fulfilled";
      state.errorMessage = "";
    });
    builder.addCase(register.rejected, (state, action) => {
      state.requestStatus = "rejected";
      const error = action?.error?.message || "Something went wrong";
      state.errorMessage = error as string;
    });
    builder.addCase(edit.pending, (state: CustomerState) => {
      state.requestStatus = "pending";
    });
    builder.addCase(edit.fulfilled, (state: CustomerState) => {
      state.requestStatus = "fulfilled";
      state.errorMessage = "";
    });
    builder.addCase(edit.rejected, (state, action) => {
      state.requestStatus = "rejected";
      const error = action?.error?.message || "Something went wrong";
      state.errorMessage = error as string;
    });
    builder.addCase(getWallet.pending, (state: CustomerState) => {
      state.requestStatus = "pending";
    });
    builder.addCase(getWallet.fulfilled, (state: CustomerState) => {
      state.requestStatus = "fulfilled";
      state.errorMessage = "";
    });
    builder.addCase(getWallet.rejected, (state, action) => {
      state.requestStatus = "rejected";
      const error = action?.error?.message || "Something went wrong";
      state.errorMessage = error as string;
    });
  },
});

export const {
  setCustomer,
  setWallet,
  resetCustomer,
  setNewCustomer,
  resetRequestStatus,
} = customerSlice.actions;

export function useCustomer() {
  const dispatch = useAppDispatch();
  const customer = useAppSelector((state) => state.customer);

  const validateCPF = (cpf: string) =>
    // eslint-disable-next-line no-useless-escape
    new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).test(cpf);

  const onFindByCPF = (cpf: string) => dispatch(findByCPF(cpf));
  const onResetCustomer = () => dispatch(resetCustomer());
  const onRegister = (data: CustomerRequestProps) => dispatch(register(data));
  const onGetWallet = () => dispatch(getWallet());
  const onEdit = (data: CustomerRequestProps) => dispatch(edit(data));
  const onResetRequestStatus = () => dispatch(resetRequestStatus());

  return {
    customer,
    onFindByCPF,
    validateCPF,
    onRegister,
    onGetWallet,
    onEdit,
    onResetCustomer,
    onResetRequestStatus,
  };
}

const { reducer } = customerSlice;
export default reducer;
