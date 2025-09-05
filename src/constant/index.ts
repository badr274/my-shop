import type { IInput } from "../interfaces";

export const loginInputs: IInput[] = [
  {
    name: "email",
    placeholder: "Enter your email",
    type: "text",
    label: "Email",
  },
  {
    name: "password",
    placeholder: "Enter your password",
    type: "password",
    label: "Password",
  },
];

export const signupInputs: IInput[] = [
  {
    name: "name",
    placeholder: "Enter your username",
    type: "text",
    label: "Username",
  },
  ...loginInputs,
  {
    name: "rePassword",
    placeholder: "Re-enter your password",
    type: "password",
    label: "Re-Password",
  },
  {
    name: "phone",
    placeholder: "Enter your phone number",
    type: "text",
    label: "Phone",
  },
];

export const shippingAddressInputs: IInput[] = [
  {
    name: "phone",
    placeholder: "Enter your phone number",
    type: "text",
    label: "Phone",
  },
  {
    name: "city",
    placeholder: "Enter your city",
    type: "text",
    label: "City",
  },
];

export const editInputs: IInput[] = [
  {
    name: "currentPassword",
    placeholder: "Enter your password",
    type: "password",
    label: "Current Password",
  },
  {
    name: "password",
    placeholder: "Enter your new password",
    type: "password",
    label: "Password",
  },
  {
    name: "rePassword",
    placeholder: "Reenter your password",
    type: "password",
    label: "RePassword",
  },
];

export const inputData: IInput = {
  name: "forgotEmail",
  placeholder: "Enter your email",
  type: "text",
  label: "Email",
};

export const resetInputs: IInput[] = [
  {
    name: "resetEmail",
    placeholder: "Enter your email",
    type: "text",
    label: "Email",
  },
  {
    name: "resetPassword",
    placeholder: "Enter new password",
    type: "password",
    label: "New Password",
  },
];
export const updateProfileInputs: IInput[] = [
  {
    name: "name",
    placeholder: "Enter your username",
    type: "text",
    label: "Username",
  },
  {
    name: "email",
    placeholder: "Enter your email",
    type: "text",
    label: "Email",
  },
  {
    name: "phone",
    placeholder: "Enter your phone number",
    type: "text",
    label: "Phone",
  },
];
