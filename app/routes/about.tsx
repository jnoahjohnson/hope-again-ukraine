import MaxWidthContainer from "~/components/layout/MaxWidthContainer";

export default function AboutPage() {
  return (
    <main>
      <MaxWidthContainer>
        <header className=" mb-4 text-center">
          <h1 className="text-4xl font-extrabold">About Us</h1>
        </header>
        <article className="mb-12">
          <p className="mx-auto max-w-prose text-center">
            We are passionate about creating technology solutions that will help
            those around us. Through technology, we are able to connect with
            people around the world, hear their stories, and use what we have
            been given to give back. HopeAgain is a wonderful foundation that we
            can build on for this initiave. While this platform initially is
            starting small, we can't wait to see the stories of those who we
            connect with and how those experiences can change the world.
          </p>
        </article>
        <article>
          <h1 className="mb-4 text-center text-4xl font-extrabold">
            Team Members
          </h1>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-10 md:grid-cols-3">
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/pineapple-solutions/image/upload/v1648769136/HopeAgainUkraine/noah_rygaas.jpg"
                alt="Noah"
                className="w-full"
              />
              <p className="text-2xl font-bold">Noah Johnson</p>
              <p className="text-lg text-gray-700">Lead Developer</p>
            </div>
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/pineapple-solutions/image/upload/v1648769136/HopeAgainUkraine/parker_s4of2q.jpg"
                alt="Noah"
                className="w-full"
              />
              <p className="text-2xl font-bold">Parker Mecham</p>
              <p className="text-lg text-gray-700">Project Manager</p>
            </div>
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/pineapple-solutions/image/upload/v1648769136/HopeAgainUkraine/benjamin_lpk9df.jpg"
                alt="Noah"
                className="w-full"
              />
              <p className="text-2xl font-bold">Benjamin Sierra</p>
              <p className="text-lg text-gray-700">Systems Architect</p>
            </div>
          </div>
          <p className="hidden">Hello World</p>
        </article>
      </MaxWidthContainer>
    </main>
  );
}
