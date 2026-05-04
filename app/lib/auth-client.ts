"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});

export const signInWithEmail = async (email: string, password: string) => {
  return await authClient.signIn.email({
    email,
    password,
  });
};

export const signUpWithEmail = async (
  name: string,
  email: string,
  password: string,
) => {
  return await authClient.signUp.email({
    email,
    name,
    password,
  });
};

export const signOut = async () => {
  return await authClient.signOut();
};

export const useSession = () => {
  return authClient.useSession();
};
