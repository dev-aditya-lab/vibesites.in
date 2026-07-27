import * as Icons from "lucide-react";
import { HelpCircle } from "lucide-react";

/** Renders a lucide-react icon by its string name (as stored in data files). */
export default function DynamicIcon({ name, className, strokeWidth = 1.75 }) {
  const IconComponent = Icons[name] || HelpCircle;
  return <IconComponent className={className} strokeWidth={strokeWidth} />;
}
