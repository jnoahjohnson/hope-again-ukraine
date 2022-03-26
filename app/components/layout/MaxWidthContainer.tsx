import { ReactNode } from "react";

export default function MaxWidthContainer({
  children,
  py = "8",
}: {
  children: ReactNode;
  py?: string;
}) {
  return (
    <div className={`mx-auto max-w-6xl px-4 md:px-0 ${"py-" + py}`}>
      {children}
    </div>
  );
}
