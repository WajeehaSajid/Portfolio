import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a,button,[data-cursor='hover']"));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        className="pointer-events-none fixed z-[100] h-2 w-2 rounded-full bg-[color:var(--neon-cyan)] mix-blend-difference transition-transform duration-75"
        style={{ transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)` }}
      />
      <div
        className="pointer-events-none fixed z-[100] rounded-full border border-[color:var(--neon-cyan)]/60 transition-[width,height,transform,opacity] duration-200 ease-out"
        style={{
          width: hover ? 56 : 32,
          height: hover ? 56 : 32,
          transform: `translate(${pos.x - (hover ? 28 : 16)}px, ${pos.y - (hover ? 28 : 16)}px)`,
          opacity: hover ? 1 : 0.6,
          boxShadow: "0 0 24px oklch(0.85 0.18 200 / 0.4)",
        }}
      />
    </>
  );
}
