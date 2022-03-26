import { Donation } from "@prisma/client";
import { Form } from "remix";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1561542320-9a18cd340469?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

export default function DonationCard({
  donation,
  classes,
}: {
  donation: Donation;
  classes?: String;
}) {
  console.log(donation);
  return (
    <div className="relative flex h-full w-full flex-col  overflow-hidden rounded bg-slate-50 shadow">
      <div className={`relative min-h-[312px] w-full  ${classes ?? ""}`}>
        <img
          src={donation.imageUrl ?? DEFAULT_IMAGE}
          alt={donation.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex h-full w-full flex-col p-4">
        <h1 className=" text-2xl font-bold capitalize text-gray-800">
          {donation.title}
        </h1>
        <p className="mb-4 text-xl text-gray-600">${donation.amount}</p>
        <div className="mt-auto">
          <Form method="post">
            <button
              type="submit"
              className="w-full rounded bg-primary-blue py-2 font-bold text-white"
            >
              Donate
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
