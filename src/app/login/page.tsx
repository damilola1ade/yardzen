/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, IconButton, TextField } from "@mui/material";
import Link from "next/link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useUserStore } from "@/store/store";
import { SignInValues } from "@/types/types";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { login } from "@/api/api";
import { toast } from "sonner";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const { isSubmitting, setIsSubmitting, setUser } = useUserStore();

  const mutation = useMutation(login, {
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: (data: any) => {
      setIsSubmitting(false);
      console.log("Form submitted:", data);
      router.push("/dashboard");
      setUser(data.user);
    },
    onError: (error: any) => {
      setIsSubmitting(false);
      console.error("Error submitting form:", error);
      toast.error(error.response.data.message);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: SignInValues) => {
    mutation.mutate(data);
    console.log(data);
  };

  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-4xl tracking-tighter">
          Welcome! Sign in to Yardzen
        </h1>
        <div className="flex flex-col items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-96 flex flex-col gap-5"
          >
            <TextField
              label="Email address"
              variant="standard"
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <div className="relative w-full flex flex-row">
              <TextField
                label="Password"
                variant="standard"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                type={showPassword ? "text" : "password"}
                className="w-full"
              />
              <div className="absolute right-4 top-2">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="success"
              className="p-3 rounded-3xl"
            >
              {isSubmitting ? "..." : "Sign in"}
            </Button>
            <Link href="/signup" className="text-center">
              Don't have an account? Sign up
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
