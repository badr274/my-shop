import { axiosApi } from "@/utils/api";
import { cookieService } from "@/utils/cookieService";
import axios from "axios";

export interface IShippingAddress {
  details: string;
  phone: string;
  city: string;
}
export interface IOrderPayload {
  shippingAddress: IShippingAddress;
  cartId: string;
}

export interface ICashOrderResponse {
  status: string;
  data: IOrderData;
}

export interface IOrderData {
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: string;
  cartItems: ICartItem[];
  shippingAddress: IShippingAddress;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface ICartItem {
  count: number;
  _id: string;
  product: string;
  price: number;
}

export interface ICheckoutSessionResponse {
  session: {
    url: string;
    success_url: string;
    cancel_url: string;
  };
}

async function handleCreateOrder(
  payload: IOrderPayload,
  url: string
): Promise<ICashOrderResponse | ICheckoutSessionResponse> {
  try {
    const res = await axiosApi.post<ICashOrderResponse>(
      `${url}`,
      { shippingAddress: payload.shippingAddress },
      {
        headers: { token: cookieService.get("token") },
      }
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error((err as Error)?.message);
  }
}

export async function createCashOrderApi(
  payload: IOrderPayload
): Promise<ICashOrderResponse> {
  return (await handleCreateOrder(
    payload,
    `/orders/${payload.cartId}`
  )) as ICashOrderResponse;
}
export async function createCheckoutSessionApi(
  payload: IOrderPayload
): Promise<ICheckoutSessionResponse> {
  return (await handleCreateOrder(
    payload,
    `/orders/checkout-session/${payload.cartId}?url=http://localhost:5173`
  )) as ICheckoutSessionResponse;
}
