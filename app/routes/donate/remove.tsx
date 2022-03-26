import { ActionFunction, LoaderFunction, redirect } from "remix";
import { checkoutCookie } from "~/cookies";

import { LineItem } from "~/utils/stripe.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const itemId = formData.get("itemId");
  const redirectTo = formData.get("redirectTo");

  if (typeof itemId !== "string" || typeof redirectTo !== "string") {
    throw Error("There was an issue with the itemId");
  }

  const cookieHeader = request.headers.get("cookie");
  const cookie = (await checkoutCookie.parse(cookieHeader)) || {};

  if (!cookie.lineItems) {
    return redirect(redirectTo);
  }

  let lineItems = cookie.lineItems;

  console.log(itemId);
  console.log(lineItems);
  lineItems = lineItems.filter((item: LineItem) => item.id !== itemId);

  cookie.lineItems = lineItems;

  console.log(lineItems);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await checkoutCookie.serialize(cookie),
    },
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  return redirect("/");
};

export default function RemovePage() {
  return (
    <div>
      <h1>Remove Page</h1>
    </div>
  );
}
