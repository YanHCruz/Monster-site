import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

interface ParticlesProps {
  tema: string;
}

export function ParticlesBackground({ tema }: ParticlesProps) {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  let corParticula = "#56e546"; 
  if (tema === "tema-branco") corParticula = "#33889d";
  if (tema === "tema-rosa") corParticula = "#d11269";

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
      options={{
        background: {
          color: { value: "transparent" },
        },
        fpsLimit: 60,
        particles: {
          color: { value: corParticula },
          move: {
            direction: "top",
            enable: true,
            speed: 1.5,
            outModes: { default: "out" },
          },
          number: {
            density: { enable: true, area: 800 },
            value: 40,
          },
          opacity: {
            value: { min: 0.1, max: 0.6 },
            animation: { enable: true, speed: 1, sync: false },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}