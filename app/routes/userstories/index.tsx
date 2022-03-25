import { Link } from "remix";

export default function UserStoryIndexPage() {
  return (
    <p>
      No story selected. Select a story on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new story.
      </Link>
    </p>
  );
}
