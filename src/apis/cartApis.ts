import type { ICartResponse } from "@/interfaces";
import { axiosApi } from "@/utils/api";
import { cookieService } from "@/utils/cookieService";
import axios, { type AxiosResponse } from "axios";

export interface ICartPayload {
  productId: string;
}

export interface IUpdateCartPayload {
  productId: string;
  count: number;
}

interface ApiResponseBase {
  message?: string;
}

interface IHandleRequest {
  url: string;
  method: "get" | "post" | "delete" | "put";
  data?: Record<string, any>;
}

async function handleRequest<T extends ApiResponseBase>({
  url,
  method,
  data,
}: IHandleRequest): Promise<T> {
  try {
    let res: AxiosResponse<T>;
    switch (method) {
      case "get":
        res = await axiosApi.get(url, {
          headers: { token: cookieService.get("token") },
        });
        break;
      case "post":
        res = await axiosApi.post(url, data, {
          headers: { token: cookieService.get("token") },
        });
        break;
      case "delete":
        res = await axiosApi.delete(url, {
          headers: { token: cookieService.get("token") },
        });
        break;
      case "put":
        res = await axiosApi.put(url, data, {
          headers: { token: cookieService.get("token") },
        });
        break;

      default:
        throw new Error("Unsupported method");
    }
    if (res.status !== 200) {
      throw new Error(res.data?.["message"] ?? "Unexpected error");
    }
    return res.data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        (err.response?.data as ApiResponseBase)?.message || err.message
      );
    }
    throw new Error(err?.message || "Unknown error");
  }
}

// **📦 Get current cart
export function getCartApi(): Promise<ICartResponse> {
  return handleRequest({ url: "/cart", method: "get" });
}

// **🛒 Add product to cart
export function addToCartApi({
  productId,
}: ICartPayload): Promise<ICartResponse> {
  return handleRequest({
    url: `/cart`,
    data: { productId: productId },
    method: "post",
  });
}

// **✏️ Update product quantity
export function updateCartQuantityApi({
  productId,
  count,
}: IUpdateCartPayload): Promise<ICartResponse> {
  return handleRequest({
    url: `/cart/${productId}`,
    data: { count },
    method: "put",
  });
}

// **🗑️ Remove product from cart
export function removeFromCartApi({
  productId,
}: ICartPayload): Promise<ICartResponse> {
  return handleRequest({ url: `/cart/${productId}`, method: "delete" });
}

// **🧹 Clear all cart
export function clearCartApi(): Promise<ICartResponse> {
  return handleRequest({ url: "/cart", method: "delete" });
}
