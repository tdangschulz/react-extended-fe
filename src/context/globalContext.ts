import * as React from "react";
import { Product, Profile, ShoppingItem } from "../models";
import { Action } from "./reducer";

export type DefaultGlobalState = {
  userInfo?: Profile;
  shoppingCart: {
    total: number;
    priceWithoutVat: number;
    products: ShoppingItem[];
    premium: number;
  };
  products: Product[];
};

export const defaultGlobalState = {
  products: [],
  shoppingCart: {
    total: 0,
    priceWithoutVat: 0,
    products: [],
    premium: 0,
  },
} as DefaultGlobalState;
export const GlobalStateContext = React.createContext(defaultGlobalState);

export const DispatchStateContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined);

export const useGlobalState = () => ({
  state: React.useContext(GlobalStateContext),
  dispatch: React.useContext(DispatchStateContext)!,
});
