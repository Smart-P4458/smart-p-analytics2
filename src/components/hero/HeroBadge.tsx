import { Sparkles } from "lucide-react";

export default function HeroBadge() {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-blue-500/30
        bg-blue-500/10
        px-4
        py-2
        text-sm
        font-medium
        text-blue-300
        backdrop-blur-sm
      "
    >
      <Sparkles size={16} />

      <span>Data • AI • Business Intelligence</span>
    </div>
  );
}