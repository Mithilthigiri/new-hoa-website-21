import { Container } from "./Container";

type PagePlaceholderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PagePlaceholder({
  eyebrow,
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <Container as="section" className="py-section md:py-section-lg">
      {eyebrow ? <p className="type-label text-rust-deep">{eyebrow}</p> : null}
      <h1 className="type-h1 mt-5">{title}</h1>
      <div className="rule-gold mt-8 w-24" />
      {description ? (
        <p className="type-sub mt-6 max-w-xl text-muted-foreground">
          {description}
        </p>
      ) : null}
    </Container>
  );
}
