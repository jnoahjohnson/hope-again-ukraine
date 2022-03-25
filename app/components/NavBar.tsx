import { Link } from "remix";

export default function NavBar() {
  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between ">
      <Link to="/">
        <img src="images/logo.png" className="h-14 w-14" alt="Hope Again" />
      </Link>
      <ul className="flex items-center justify-center space-x-4 py-6 text-lg font-light">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/stories">Stories</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          <Link
            to="/"
            className="rounded bg-primary-blue px-4 py-2 font-medium text-white shadow"
          >
            Donate
          </Link>
        </li>
      </ul>
    </nav>
  );
}
