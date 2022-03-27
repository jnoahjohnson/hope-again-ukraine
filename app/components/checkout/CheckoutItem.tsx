import { XIcon } from "@heroicons/react/outline";
import { Form, useLocation } from "remix";
import { LineItemData } from "~/types/checkout";

export default function CheckoutItem({
  checkoutItem,
}: {
  checkoutItem: LineItemData;
}) {
  const { pathname } = useLocation();
  return (
    <div className="relative h-16 w-16">
      <img
        src={checkoutItem.imageUrl}
        className="absolute inset-0 h-full w-full rounded object-cover shadow"
        alt={checkoutItem.title}
      />
      <div className="group">
        <Form action="/donate/remove" method="post">
          <input type="hidden" name="itemId" value={checkoutItem.stripeId} />
          <input type="hidden" name="redirectTo" value={pathname} />
          <button className="text-md absolute -top-2 -right-2 flex aspect-square h-5 w-5 items-center justify-center rounded-full bg-red-600  text-white">
            <XIcon className="h-4 w-4" />
          </button>
        </Form>
        <div className="text-md absolute -top-2 -right-2 flex aspect-square h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-primary-blue  text-white group-hover:hidden">
          {checkoutItem.quantity}
        </div>
      </div>
    </div>
  );
}
