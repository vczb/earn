/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from ".";

import { Action, AnyAction } from "@reduxjs/toolkit";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
}

export interface RejectedAction<ThunkArg> extends Action {
  type: string;
  payload: any;
  error: SerializedError | any;
  meta: {
    requestId: string;
    arg: ThunkArg;
    aborted: boolean;
    condition: boolean;
  };
}

export function isRejectedAction(
  action: AnyAction
): action is RejectedAction<unknown> {
  return action.type.endsWith("rejected");
}
