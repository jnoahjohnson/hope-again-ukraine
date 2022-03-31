import { Donation } from "@prisma/client";
import { useTranslation } from "react-i18next";
import { Form, useLocation } from "remix";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1561542320-9a18cd340469?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

export default function DonationCard({
  donation,
  classes,
}: {
  donation: Donation;
  classes?: String;
}) {
  const { pathname } = useLocation();
  const [t] = useTranslation();

  return (
    <div className="relative flex h-full w-full flex-col  overflow-hidden rounded bg-white shadow-lg">
      <div className={`relative min-h-[415px] w-full  ${classes ?? ""}`}>
        <img
          src={donation.imageUrl ?? DEFAULT_IMAGE}
          alt={donation.title}
          className="absolute -right-12 top-0 bottom-0 h-full w-full object-contain"
        />
      </div>

      <div className="absolute left-2 top-2 h-full w-full">
        <div className="flex h-full w-full flex-col items-stretch justify-between p-4">
          <h1 className=" text-3xl font-bold capitalize text-gray-800">
            {donation.title}
          </h1>
          <p className="mb-4 text-2xl text-gray-600">${donation.amount}</p>
          <div className="mt-auto">
            <Form method="post" action="/donate/add">
              <input type="hidden" name="itemId" value={donation.stripeId} />
              <input type="hidden" name="redirectTo" value={pathname} />
              <button
                type="submit"
                className="w-full rounded bg-primary-blue py-2 font-bold text-white"
              >
                {t("donate")}
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
