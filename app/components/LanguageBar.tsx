import MaxWidthContainer from "./layout/MaxWidthContainer";

export default function LanguageBar() {
  return (
    <div className="w-full bg-slate-100">
      <MaxWidthContainer py="2">
        <div className="flex w-full items-center justify-end space-x-1">
          <button className="font-bold">English</button>
          <span>|</span>
          <button>Ukrainian</button>
        </div>
      </MaxWidthContainer>
    </div>
  );
}
