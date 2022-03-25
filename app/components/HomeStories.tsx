import { Story } from "@prisma/client";
import StoryCard from "./stories/StoryCard";

export default function HomeStories({ stories }: { stories: Story[] }) {
  return (
    <div className="grid h-64 grid-cols-4 grid-rows-1 gap-2">
      {stories.map((story, index) => (
        <StoryCard
          story={story}
          key={story.id}
          classes={`${index === 0 ? "col-span-2" : null}`}
        />
      ))}
    </div>
  );
}
