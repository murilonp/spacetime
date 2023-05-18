import { Github } from "lucide-react";

export const Copyright = () => {
  return (
    <div className="flex gap-2 text-sm leading-relaxed text-gray-200">
      <a href="https://github.com/murilonp" target="_blank" rel="noreferrer">
        <Github className="flex items-center justify-center" />
      </a>
      MuriloNP ⚛️{" "}
    </div>
  );
};
