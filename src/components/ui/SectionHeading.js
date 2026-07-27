import { cn } from "@/lib/utils";
import RevealText from "./RevealText";
import Badge from "./Badge";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  size = "md",
  tone = "light",
  className,
  titleClassName,
}) {
  const sizes = {
    sm: "text-display-sm",
    md: "text-display-md",
    lg: "text-display-lg",
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && <Badge tone={tone === "dark" ? "outline" : "teal"}>{eyebrow}</Badge>}
      <h2
        className={cn(
          sizes[size],
          "text-balance font-medium",
          tone === "dark" ? "text-cream-50" : "text-ink-900",
          titleClassName
        )}
      >
        <RevealText text={title} />
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed",
            tone === "dark" ? "text-cream-300" : "text-ink-600",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
