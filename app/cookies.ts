import { createCookie } from "remix";

export const checkoutCookie = createCookie("checkout", {
  maxAge: 604_800,
});
