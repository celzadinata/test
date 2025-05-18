import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  headline: ReactNode;
}

export default function Layout({ children, headline }: Props) {
  return (
    <div className="mt-15">
      {children}
      {headline}
    </div>
  );
}
