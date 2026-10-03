import { Link } from "@tanstack/react-router";
import { Ayi } from "@/components/Ayi";

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center">
        <Link to="/" className="flex items-center gap-2.5">
          <Ayi size={40} />
          <span className="font-display font-black text-2xl tracking-tight text-primary">
            KWABO
          </span>
        </Link>
      </div>
    </header>
  );
}
