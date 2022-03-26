export default function HomeHero({
  imgSrc = "https://images.unsplash.com/photo-1565711561500-49678a10a63f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  altText = "Ukraine Flag",
  title = "Discover Stories",
}: {
  imgSrc?: string;
  altText?: string;
  title?: string;
}) {
  return (
    <div className="relative h-[400px] w-full bg-gray-200">
      <img
        src={imgSrc}
        className="absolute inset-0 h-full w-full object-cover bg-blend-multiply"
        alt={altText}
      />
      <div className="absolute inset-0 h-full w-full bg-black opacity-60" />
      <div className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center">
        <h1 className="text-5xl font-extrabold text-white">
          Choose to <span className="text-primary-blue-light">Give</span>{" "}
          <span className="text-primary-yellow">Hope</span>
        </h1>
      </div>
    </div>
  );
}
