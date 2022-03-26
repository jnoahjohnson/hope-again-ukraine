import { ActionFunction, redirect } from "remix";
import { checkoutCookie } from "~/cookies";
import { getCheckout } from "~/utils/stripe.server";

export const action: ActionFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie");
  const cookie = (await checkoutCookie.parse(cookieHeader)) || {};

  if (!cookie.lineItems) {
    return redirect("/");
  }

  const checkoutUrl = await getCheckout(cookie.lineItems);

  return redirect(checkoutUrl);
};
