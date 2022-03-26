import { ReactNode } from "react";

export default function MaxWidthContainer({
  children,
  classes = "py-8",
}: {
  children: ReactNode;
  classes?: string;
}) {
  return (
    <div className={`mx-auto max-w-6xl px-4 md:px-0 ${classes}`}>
      {children}
    </div>
  );
}
