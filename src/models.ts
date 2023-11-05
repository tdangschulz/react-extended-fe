export type Product = {
  name: string;
  price: number;
  id: number;
  description?: string;
  category: Category;
  vatRate: number;
};

export type ShoppingItem = {
  amount: number;
  product: Product;
};

export enum Category {
  SWEET = "Auto",
  ACCESSORIES = "Zubehoer",
  NON = "Keine Kategorie",
}

export type User = {
  id?: number;
  firstName: string;
  houseNo: number;
  lastName?: string;
  numberOfInstances?: number;
  password?: string;
  residence: string;
  street: string;
  zipCode: string;
};

export type Invoice = {
  id?: number;
  product: Product;
  customer: User;
  quantity: number;
  totalPrice: number;
  priceWithoutVat: number;
  isPremiumCustomer: boolean;
};

export type Profile = {
  auth?: string;
  id?: number;
  password?: string;
  firstName: string;
  lastName?: string;
  isAdmin: boolean;
  isPremium?: boolean;
  address: {
    street: string;
    zipCode: string;
    city: string;
    houseNo: number;
    residence: string;
  };
};
