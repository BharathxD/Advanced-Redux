import { ThunkAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { RootState } from "../store";

export interface ICartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ICartNotifcationPayload {
  status: string;
  title: string;
  message: string;
}

export interface ICartItemState {
  items: Array<ICartItem> | Array<any>;
  showCart: boolean;
  notification: ICartNotifcationPayload | null;
  changed: boolean;
}

export interface ICartItemPayload {
  items?: ICartItem;
  itemID?: number;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
