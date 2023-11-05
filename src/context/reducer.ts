import { DefaultGlobalState } from "./globalContext";

export type ACTIONS =
  | "ADD_ITEM"
  | "DELETE_ITEM"
  | "ADD_USER"
  | "CREATE_ITEM"
  | "AVAILABLE_PRODUCTS"
  | "UPSERT_PRODUCT"
  | "DELETE_PRODUCT";

export type Action = {
  type: ACTIONS;
  payload: any;
};

export const reducer = (state: DefaultGlobalState, action: Action) => {
  switch (action.type) {
    case "DELETE_PRODUCT": {
      const product = action.payload;
      const index = state.products.findIndex((p) => p.id === product.id);
      delete state.products[index];
      return {
        ...state,
      };
    }
    case "UPSERT_PRODUCT": {
      const product = action.payload;
      const index = state.products.findIndex((p) => p.id === product.id);
      if (index > 0) {
        state.products[index] = product;
      } else {
        state.products.push(product);
      }

      return {
        ...state,
      };
    }
    case "AVAILABLE_PRODUCTS": {
      const products = action.payload;
      state.products = products;
      return {
        ...state,
      };
    }
    case "ADD_USER": {
      state.userInfo = action.payload;
      return {
        ...state,
      };
    }
    case "ADD_ITEM": {
      const product = action.payload;
      state.shoppingCart.premium += product.price * 0.03;

      const price = product.price - product.price * 0.03;
      state.shoppingCart.priceWithoutVat += price - price * product.vatRate;

      state.shoppingCart.total += price;

      const cartItem = state.shoppingCart.products.find(
        (p) => p.product.id === product.id
      );

      if (cartItem) {
        cartItem.amount += 1;
      } else {
        state.shoppingCart.products.push({ amount: 1, product });
      }

      return {
        ...state,
      };
    }
    case "DELETE_ITEM": {
      const item = action.payload;

      state.shoppingCart.premium -= item.product.price * 0.03;

      const price = item.product.price - item.product.price * 0.03;
      state.shoppingCart.priceWithoutVat -=
        price - price * item.product.vatRate;

      state.shoppingCart.total -= price;
      const cartItem = state.shoppingCart.products
        .filter(Boolean)
        .find((p) => p.product.id === item.product.id);

      if (cartItem) {
        cartItem.amount -= 1;

        if (cartItem.amount <= 0) {
          const index = state.shoppingCart.products.indexOf(cartItem);
          delete state.shoppingCart.products[index];
          state.shoppingCart.products =
            state.shoppingCart.products.filter(Boolean);
        }
      }

      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
