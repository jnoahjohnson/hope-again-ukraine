import { Link } from "remix";
import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  return (
    <main className="relative">
      <div className="relative h-[400px] w-full bg-gray-200">
        <img
          src="https://images.unsplash.com/photo-1565711561500-49678a10a63f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          className="absolute inset-0 h-full w-full object-cover"
          alt="Ukraine Flag"
        />
        <div className="relative mx-auto h-full w-full max-w-6xl">
          <div className="absolute bottom-6 left-0">
            <h1 className="text-7xl text-white">
              <span className="text-4xl">Discover</span>
              <br />
              Stories
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
}
