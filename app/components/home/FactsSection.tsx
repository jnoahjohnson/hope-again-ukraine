import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";

const facts = [
  {
    text: "factOne",
    imgUrl:
      "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648335173/HopeAgainUkraine/fact1_n2ujoj.jpg",
  },
  {
    text: "factTwo",
    imgUrl:
      "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648335176/HopeAgainUkraine/fact2_jolam1.jpg",
  },
  {
    text: "factThree",
    imgUrl:
      "https://res.cloudinary.com/pineapple-solutions/image/upload/v1648335174/HopeAgainUkraine/fact3_ffysul.jpg",
  },
];

export default function FactsSection({
  cascade = true,
}: {
  cascade?: boolean;
}) {
  const [t] = useTranslation();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Fade direction="up" cascade={cascade} duration={500} triggerOnce>
        {facts.map((fact) => (
          <div
            key={fact.text}
            className="relative flex h-[350px] w-full items-center justify-center overflow-hidden rounded p-4 shadow"
          >
            <img
              src={fact.imgUrl}
              alt={fact.text}
              className="absolute inset-0 h-full w-full object-cover bg-blend-multiply"
            />
            <div className="absolute inset-0 bg-black opacity-50" />
            <h2 className="relative text-center text-3xl font-bold text-white">
              {t(fact.text)}
            </h2>
          </div>
        ))}
      </Fade>
    </div>
  );
}
