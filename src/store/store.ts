import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  avatar?: string;
};

type AuthState = {
  isSubmitting: boolean;
  user: User | null;
  setIsSubmitting: (value: boolean) => void;
  setUser: (user: User | null) => void;
};

export const useUserStore = create(
  persist<AuthState>(
    (set) => ({
      isSubmitting: false,
      user: null,
      setIsSubmitting: (value: boolean) => set({ isSubmitting: value }),
      setUser: (user: User | null) => set({ user }),
    }),
    {
      name: "user",
    }
  )
);
