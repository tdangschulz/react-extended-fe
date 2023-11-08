import axios from "axios";
import { Invoice, Product } from "../models";

export const getProducts = async () => {
  const response = await axios.get("/products");
  return response.data;
};

export const createProduct = async (product: unknown) => {
  const response = await axios.post<Product>("/products", product);
  return response.data;
};

export const deleteProduct = async (product: Product) => {
  const response = await axios.delete<Product>("/products/" + product.id);
  return response.data;
};

export const getProduct = async (productId: number) => {
  const response = await axios.delete<Product>("/products/" + productId);
  return response.data;
};

export const getInvoices = async () => {
  const response = await axios.get<Invoice[]>("/invoices");
  return response.data.filter((d) => isNaN(Number(d)));
};

export const saveInvoice = async (invoice: Invoice) => {
  const response = await axios.post<Invoice>("/invoices", invoice);
  return response.data;
};
