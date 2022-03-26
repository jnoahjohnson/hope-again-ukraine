import { Donation } from "@prisma/client";

export interface LineItemData extends Donation {
  quantity: number;
}
