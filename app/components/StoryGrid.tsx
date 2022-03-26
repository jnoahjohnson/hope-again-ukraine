import { Story } from "@prisma/client";
import StoryCard from "./stories/StoryCard";

export default function StoryGrid({ stories }: { stories: Story[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {stories.map((story, index) => (
        <StoryCard story={story} key={story.id} />
      ))}
    </div>
  );
}
