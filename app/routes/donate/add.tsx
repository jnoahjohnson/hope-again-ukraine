import { ActionFunction, json, LoaderFunction } from "remix";
import { addItem } from "~/utils/stripe.server";

export const loader: LoaderFunction = async ({ request }) => {
  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const itemId = formData.get("itemId");
  const redirectTo = formData.get("redirectTo");

  if (typeof itemId !== "string" || typeof redirectTo !== "string") {
    throw Error("There was an issue with the itemId");
  }

  return addItem(request, itemId, redirectTo);
};

export default function AddItemPage() {
  return (
    <main className="">
      <h1>Add Donation Page</h1>
    </main>
  );
}
