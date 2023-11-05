import axios from "axios";
import { User } from "../models";
import { Profile } from "../context/globalContext";

export const getUserInfo = async (userId: string) => {
  const response = await axios.get<User>("customers/" + userId);
  return { ...response.data, id: Number(userId) };
};

export const getAdminInfo = async (userId: string) => {
  const response = await axios.get<User>("administrators/" + userId);
  return response.data;
};

export const saveAdminProfile = async (profile: any) => {
  const response = await axios.post<Profile>("administrators", profile);
  return response.data;
};

export const registerCustomer = async (profile: any) => {
  const response = await axios.post<Profile>("customers", profile);
  return response.data;
};

export const getCustomers = async () => {
  const response = await axios.get<Profile[]>("customers");
  return response.data.filter((data) => data.id !== 0);
};

export const deleteCustomer = async (customerId: number) => {
  await axios.delete("customers/" + customerId);
};
