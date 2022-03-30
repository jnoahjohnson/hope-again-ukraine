import { Link } from "remix";
import MaxWidthContainer from "./layout/MaxWidthContainer";

export default function LanguageBar() {
  return (
    <div className="w-full bg-slate-100">
      <MaxWidthContainer classes="py-2">
        <div className="flex w-full items-center justify-start space-x-1">
          <Link
            to="/stories/add"
            className="mr-auto text-gray-600 hover:text-gray-800"
          >
            Contribute a Story
          </Link>
          <button className="font-bold">English</button>
          <span>|</span>
          <button>Ukrainian</button>
        </div>
      </MaxWidthContainer>
    </div>
  );
}
