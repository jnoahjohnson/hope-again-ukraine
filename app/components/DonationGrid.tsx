import { Donation } from "@prisma/client";
import DonationCard from "./donations/DonationCard";
import { Fade } from "react-awesome-reveal";

export default function DonationGrid({
  donations,
  cascade = false,
}: {
  donations: Donation[];
  cascade?: boolean;
}) {
  return (
    <div className="grid w-full grid-cols-4 gap-4">
      <Fade cascade={cascade} direction="up" duration={750} triggerOnce>
        {donations.map((donation) => (
          <DonationCard donation={donation} key={donation.id} />
        ))}
      </Fade>
    </div>
  );
}
