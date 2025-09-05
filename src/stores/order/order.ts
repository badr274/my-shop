import {
  createCashOrderApi,
  createCheckoutSessionApi,
  type ICheckoutSessionResponse,
  type IOrderPayload,
} from "@/apis/orderApi";
import { defineStore } from "pinia";

export const userOrderStore = defineStore("order", () => {
  async function createCashOrder(payload: IOrderPayload) {
    await createCashOrderApi(payload);
  }
  async function createCheckoutSession(
    payload: IOrderPayload
  ): Promise<ICheckoutSessionResponse> {
    return (await createCheckoutSessionApi(
      payload
    )) as ICheckoutSessionResponse;
  }

  return {
    createCashOrder,
    createCheckoutSession,
  };
});
