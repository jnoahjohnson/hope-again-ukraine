import { redirect } from "remix";
import Stripe from "stripe";
import { checkoutCookie } from "~/cookies";

export type LineItem = {
  id: string;
  quantity: number;
};

const stripe = new Stripe(
  "sk_test_51KO2HAIPVMv6OICVB9vwpEPo7IGXH7pl3zWq8E3uUEnARRPovJjOzCLxNN8el9jJUAe5QnoD6VmSvw1lGN6yYiZG00ZqY9m7Dy",
  {
    apiVersion: "2020-08-27",
  }
);

export const getCheckout = async (lineItems: LineItem[]) => {
  const checkout = await stripe.checkout.sessions.create({
    line_items: lineItems.map((item) => ({
      price: item.id,
      quantity: item.quantity,
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 10,
      },
    })),
    cancel_url: "http://ukraine.hopeagain.today/",
    success_url: "http://ukraine.hopeagain.today/thank-you",
    mode: "payment",
  });

  return checkout.url ?? "";
};

export const addItem = async (
  request: Request,
  itemId: string,
  redirectTo: string
) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await checkoutCookie.parse(cookieHeader)) || {};

  console.log("cookie", cookie);
  let lineItems = cookie.lineItems || [];

  lineItems.map((item: LineItem) =>
    item.id === itemId ? item.quantity++ : item
  );

  const hasLineItem = lineItems.some((item: LineItem) => item.id === itemId);

  if (!hasLineItem) {
    lineItems = [...lineItems, { id: itemId, quantity: 1 }];
  }

  cookie.lineItems = lineItems;

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await checkoutCookie.serialize(cookie),
    },
  });
};

export const getItems = async (request: Request) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await checkoutCookie.parse(cookieHeader)) || {};

  return cookie.lineItems || [];
};
