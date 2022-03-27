import { Story } from "@prisma/client";
import StoryCard from "./stories/StoryCard";
import { Fade } from "react-awesome-reveal";

export default function StoryGrid({
  stories,
  cascade = false,
}: {
  stories: Story[];
  cascade?: boolean;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-3">
      <Fade direction="up" cascade={cascade} duration={500} triggerOnce>
        {stories.map((story, index) => (
          <StoryCard story={story} key={story.id} />
        ))}
      </Fade>
    </div>
  );
}
