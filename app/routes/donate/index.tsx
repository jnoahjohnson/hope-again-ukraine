import { Donation } from "@prisma/client";
import { json, LoaderFunction, useLoaderData } from "remix";
import DonationGrid from "~/components/DonationGrid";
import MaxWidthContainer from "~/components/layout/MaxWidthContainer";
import { prisma } from "~/db.server";

type LoaderData = {
  donations: Donation[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const donations = await prisma.donation.findMany();

  return json<LoaderData>({ donations });
};

export default function DonateIndex() {
  const { donations } = useLoaderData() as LoaderData;

  return (
    <MaxWidthContainer>
      <DonationGrid donations={donations} />
    </MaxWidthContainer>
  );
}
