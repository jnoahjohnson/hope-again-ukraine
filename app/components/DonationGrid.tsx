import { Donation } from "@prisma/client";
import DonationCard from "./donations/DonationCard";

export default function DonationGrid({ donations }: { donations: Donation[] }) {
  return (
    <div className="grid w-full grid-cols-4 gap-4">
      {donations.map((donation) => (
        <DonationCard donation={donation} key={donation.id} />
      ))}
    </div>
  );
}
