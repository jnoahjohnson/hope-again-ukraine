import { Donation } from "@prisma/client";
import DonationCard from "./donations/DonationCard";
import { Fade } from "react-awesome-reveal";

export default function DonationGrid({
  donations,
  cascade = false,
  columns = 4,
}: {
  donations: Donation[];
  cascade?: boolean;
  columns?: number;
}) {
  const colClass = "md:grid-cols-" + columns;

  return (
    <div className={`grid w-full gap-4 sm:grid-cols-2 ${colClass}`}>
      <Fade cascade={cascade} direction="up" duration={750} triggerOnce>
        {donations.map((donation) => (
          <DonationCard donation={donation} key={donation.id} />
        ))}
      </Fade>
    </div>
  );
}
