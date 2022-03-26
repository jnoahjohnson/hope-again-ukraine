import { Story } from "@prisma/client";
import { Link } from "remix";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1561542320-9a18cd340469?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

export default function StoryCard({
  story,
  classes,
  large,
}: {
  story: Story;
  classes?: String;
  large?: Boolean;
}) {
  return (
    <Link
      className={`relative block h-64 w-full overflow-hidden rounded bg-blue-100 shadow ${
        large ? "col-span-2" : "col-span-1"
      }${classes ?? ""}`}
      to={`/stories/${story.id}`}
    >
      <img
        src={story.imageUrl ?? DEFAULT_IMAGE}
        alt={story.title}
        className="absolute inset-0 h-full w-full rounded object-cover shadow"
      />
      <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-gray-700 to-transparent" />
      <h1 className="absolute left-3 bottom-3 text-4xl font-bold text-white">
        {story.title}
      </h1>
    </Link>
  );
}
