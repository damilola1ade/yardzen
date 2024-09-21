/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, IconButton, TextField } from "@mui/material";
import Link from "next/link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useUserStore } from "@/store/store";
import { SignUpFormValues, signUpSchema } from "@/types/types";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { signUp } from "@/api/api";
import { toast } from "sonner";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const { isSubmitting, setIsSubmitting } = useUserStore();

  const mutation = useMutation(signUp, {
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: (data: any) => {
      setIsSubmitting(false);
      console.log("Form submitted:", data);
      router.push("/login");
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

  const onSubmit = (data: SignUpFormValues) => {
    mutation.mutate(data);
    console.log(data);
  };

  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-4xl tracking-tighter">
          Welcome! Sign up to Yardzen
        </h1>
        <div className="flex flex-col items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-96 flex flex-col gap-5"
          >
            <TextField
              label="First name"
              variant="standard"
              type="text"
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              label="Last name"
              variant="standard"
              type="text"
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
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
              {isSubmitting ? "..." : "Sign up"}
            </Button>
            <Link href="/login" className="text-center">
              Already have an account? Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
