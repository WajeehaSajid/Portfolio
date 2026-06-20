import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { ParticleBackground } from "@/components/portfolio/ParticleBackground";
import { CustomCursor } from "@/components/portfolio/CustomCursor";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="dark">
      <ParticleBackground />
      <CustomCursor />
      <Portfolio />
    </div>
  );
}
