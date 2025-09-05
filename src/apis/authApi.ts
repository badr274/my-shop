import { axiosApi } from "@/utils/api";
import { cookieService } from "@/utils/cookieService";
import axios from "axios";

export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
export interface ILoginPayload {
  email: string;
  password: string;
}
export interface IForgotPassPayload {
  email: string;
}
export interface IVerifyResetCodePayload {
  resetCode: string;
}
export interface IResetPasswordPayload {
  email: string;
  newPassword: string;
}
export interface IEditProfilePayload {
  name: string;
  email: string;
  phone: string;
}
export interface IChangePasswordPayload {
  currentPassword: string;
  password: string;
  rePassword: string;
}
export interface IResponseData {
  message?: string;
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
}
export interface IAuthResponse {
  status: number;
  data: IResponseData;
}
export interface IForgotPassResponse {
  statusMsg: string;
  message: string;
}
export interface IVerifyResetCodeResponse {
  statusMsg?: string;
  message?: string;
  status?: string;
}
export interface IResetPasswordResponse {
  statusMsg?: string;
  message?: string;
  token?: string;
}
export interface IEditProfileResponse {
  message: "fail" | "success";
  user?: IAuthResponse["data"]["user"];
}
export interface IChangePasswordResponse {
  message: "fail" | "success";
  user: IAuthResponse["data"]["user"];
  token: string;
}
interface ApiResponseBase {
  message?: string;
}

export async function signupApi(
  payload: ISignupPayload
): Promise<IAuthResponse> {
  try {
    const res = await axiosApi.post("/auth/signup", payload);
    if (res.status !== 201) {
      throw new Error(res.data?.message || "Signup Faild");
    }
    return { status: res.status, data: res.data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error((err as Error)?.message);
  }
}
export async function loginApi(payload: ILoginPayload): Promise<IAuthResponse> {
  try {
    const res = await axiosApi.post("/auth/signin", payload);
    if (res.status !== 200) {
      throw new Error(res.data?.message);
    }
    return { status: res.status, data: res.data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error((err as Error)?.message);
  }
}

async function helperAuthApi<TPayload, TResponse>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  payload?: TPayload,
  tokenRequired?: boolean
): Promise<TResponse> {
  try {
    const res = await axiosApi.request<TResponse>({
      method,
      url,
      data: payload,
      headers: tokenRequired
        ? { token: cookieService.get("token") }
        : undefined,
    });

    if (res.status !== 200) {
      throw new Error((res.data as ApiResponseBase)?.message);
    }

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error((err as Error)?.message);
  }
}

export function forgotPassApi(
  payload: IForgotPassPayload
): Promise<IForgotPassResponse> {
  return helperAuthApi("post", "/auth/forgotPasswords", payload);
}

export function verifyResetCodeApi(
  payload: IVerifyResetCodePayload
): Promise<IVerifyResetCodeResponse> {
  return helperAuthApi("post", "/auth/verifyResetCode", payload);
}

export function resetPasswordApi(
  payload: IResetPasswordPayload
): Promise<IResetPasswordResponse> {
  return helperAuthApi("put", "/auth/resetPassword", payload);
}

export function editProfileApi(
  payload: IEditProfilePayload
): Promise<IEditProfileResponse> {
  return helperAuthApi("put", "/users/updateMe/", payload, true);
}

export function changePasswordApi(
  payload: IChangePasswordPayload
): Promise<IChangePasswordResponse> {
  return helperAuthApi("put", "/users/changeMyPassword", payload, true);
}
