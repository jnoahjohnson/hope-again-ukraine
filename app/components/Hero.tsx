export default function Hero({
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
      <div className="absolute inset-0 h-full w-full bg-black opacity-10" />
      <div className="relative mx-auto h-full w-full max-w-6xl">
        <div className="absolute bottom-6 left-0 px-4">
          <h1 className="text-7xl text-white">
            <span className="text-4xl">{title.split(" ").at(0)}</span>
            <br />
            {title.split(" ").at(1)}
          </h1>
        </div>
      </div>
    </div>
  );
}
