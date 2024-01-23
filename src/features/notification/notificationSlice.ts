import { createSlice } from "@reduxjs/toolkit";
import { isRejectedAction, useAppDispatch, useAppSelector } from "store/hooks";

export type NotificationState = {
  type: "success" | "error";
  message?: string;
};

const initialState = {
  message: "",
  type: "success",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      return state;
    },
    resetNofication: (state) => {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isRejectedAction, (state, action) => {
      state.type = "error";
      const error =
        action?.error?.message ||
        action.payload?.error ||
        "Something went wrong";
      state.message = error;
    });
  },
});

export const { setNotification, resetNofication } = notificationSlice.actions;

export function useNotification() {
  const dispatch = useAppDispatch();
  const notification = useAppSelector((state) => state.notification);
  const onResetNofication = () => dispatch(resetNofication());
  const onShowNotification = (data: NotificationState) =>
    dispatch(setNotification(data));

  return {
    notification,
    onResetNofication,
    onShowNotification,
  };
}

const { reducer } = notificationSlice;
export default reducer;
