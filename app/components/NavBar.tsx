import { Link } from "remix";
import MaxWidthContainer from "./layout/MaxWidthContainer";

export default function NavBar() {
  return (
    <nav className="shadow">
      <MaxWidthContainer classes="py-0">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/pineapple-solutions/image/upload/v1648255660/HopeAgainUkraine/logo_mk9ock.png"
              className="h-14 w-14"
              alt="Hope Again"
            />
          </Link>
          <ul className="flex items-center justify-center space-x-4 py-6 text-lg font-light">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stories">Stories</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link
                to="/donate"
                className="rounded bg-primary-blue px-4 py-2 font-medium text-white shadow"
              >
                Donate
              </Link>
            </li>
          </ul>
        </div>
      </MaxWidthContainer>
    </nav>
  );
}
