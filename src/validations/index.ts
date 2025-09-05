import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const signupSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .test(
      "password-uppercase",
      "Password must contain at least one uppercase letter",
      (value) => /[A-Z]/.test(value || "")
    )
    .test(
      "password-lowercase",
      "Password must contain at least one lowercase letter",
      (value) => /[a-z]/.test(value || "")
    )
    .test(
      "password-number",
      "Password must contain at least one number",
      (value) => /\d/.test(value || "")
    )
    .test(
      "password-special",
      "Password must contain at least one special character",
      (value) => /[@$!%*?&]/.test(value || "")
    ),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required("This Field is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .test(
      "password-uppercase",
      "Password must contain at least one uppercase letter",
      (value) => /[A-Z]/.test(value || "")
    )
    .test(
      "password-lowercase",
      "Password must contain at least one lowercase letter",
      (value) => /[a-z]/.test(value || "")
    )
    .test(
      "password-number",
      "Password must contain at least one number",
      (value) => /\d/.test(value || "")
    )
    .test(
      "password-special",
      "Password must contain at least one special character",
      (value) => /[@$!%*?&]/.test(value || "")
    ),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const forgotPassSchema = yup.object({
  forgotEmail: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
});

export const resetPasswordSchema = yup.object({
  resetEmail: yup.string().email("Invalid email").required("Email is required"),
  resetPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .test(
      "password-uppercase",
      "Password must contain at least one uppercase letter",
      (value) => /[A-Z]/.test(value || "")
    )
    .test(
      "password-lowercase",
      "Password must contain at least one lowercase letter",
      (value) => /[a-z]/.test(value || "")
    )
    .test(
      "password-number",
      "Password must contain at least one number",
      (value) => /\d/.test(value || "")
    )
    .test(
      "password-special",
      "Password must contain at least one special character",
      (value) => /[@$!%*?&]/.test(value || "")
    ),
});

export const updateProfileSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});
