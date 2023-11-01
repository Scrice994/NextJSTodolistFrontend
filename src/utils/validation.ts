import * as yup from "yup";

export const requiredStringSchema = yup.string().required("Required");

export const usernameSchema = yup.string()
    .max(20, "Username must be 20 characters or less")
    .matches(/^[a-zA-Z0-9_]*$/, "Username accept only letters, numbers, and underscores are allowed"); //regex

export const emailSchema = yup.string().email("Please enter a valid email address");

export const passwordSchema = yup.string()
    .matches(/^(?!.* )/, "Password must not contain any whitespaces")
    .min(6, "Password must be at least 6 characters long");