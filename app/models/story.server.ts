import type { User, Story } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Story } from "@prisma/client";

export function getStory({
  id,
  userId,
}: Pick<Story, "id"> & {
  userId: User["id"];
}) {
  return prisma.story.findFirst({
    where: { id, userId },
  });
}

export function getStoryListItems({ userId }: { userId: User["id"] }) {
  return prisma.story.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createStory({
  body,
  title,
  userId,
}: Pick<Story, "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.story.create({
    data: {
      title,
      body,
      approved: true,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteStory({
  id,
  userId,
}: Pick<Story, "id"> & { userId: User["id"] }) {
  return prisma.story.deleteMany({
    where: { id, userId },
  });
}

export function getAllStories() {
  return prisma.story.findMany({
    where: { approved: true },
    select: { id: true, title: true, body: true },
    orderBy: { updatedAt: "desc" },
  });
}
