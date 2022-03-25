import { Donation } from "@prisma/client";
import DonationCard from "./donations/DonationCard";

export default function DonationGrid({ donations }: { donations: Donation[] }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {donations.map((donation) => (
        <DonationCard donation={donation} key={donation.id} />
      ))}
    </div>
  );
}
