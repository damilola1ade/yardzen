import { SignInValues, SignUpFormValues } from "@/types/types";
import axios from "axios";

export const signUp = async (data: SignUpFormValues) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`,
    data
  );
  return response.data;
};

export const login = async (data: SignInValues) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    data
  );
  return response.data;
};

export const uploadAvatar = async (formData: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/upload-avatar`,
    formData
  );
  return response.data;
};
