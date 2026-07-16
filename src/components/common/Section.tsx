import type { ReactNode } from "react";
import Container from "./Container";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export default function Section({
  id,
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`
        py-15
        md:py-20
        ${className}
      `}
    >
      <Container>
        {children}
      </Container>
    </section>
  );
}