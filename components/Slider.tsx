import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const slides = [
  { title: "Sea",    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop" },
  { title: "Bloom",  image: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=1600&auto=format&fit=crop" },
  { title: "Pink",   image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1600&auto=format&fit=crop" },
  { title: "Cherry", image: "https://images.unsplash.com/photo-1520975922323-4d8ec6a2c5a0?q=80&w=1600&auto=format&fit=crop" },
  { title: "Night",  image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1600&auto=format&fit=crop" },
  { title: "Bottle", image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1600&auto=format&fit=crop" },
];

export default function TopDownCurvedCarousel() {
  const [rot, setRot] = useState(0);

  // === Тохируулгууд ===
  const RADIUS = 520;       // цилиндрийн радиус
  const STEP   = 360 / slides.length; // нэг слайдын өнцөг
  const TILT_X = -18;       // камерыг дээрээс тонгуулах өнцөг (rotateX)
  const LIFT   = 40;        // картуудыг тайзнаас өргөх өндөр (translateY -LIFT)
  const SENS   = 0.35;      // drag мэдрэмж

  const current = useMemo(() => {
    const idx = Math.round((-rot) / STEP);
    return ((idx % slides.length) + slides.length) % slides.length;
  }, [rot]);

  const onDrag = (_e: any, info: any) => setRot(r => r - info.delta.x * SENS);
  const onDragEnd = () => {
    const snapIdx = Math.round((-rot) / STEP);
    setRot(-snapIdx * STEP);
  };

  return (
    <section className="relative w-full h-[520px] overflow-visible">
      {/* Арын градиент — screenshot шиг мэдрэмж */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1bff] via-[#4021a6] to-[#a7016b]" />

      {/* Тайзны зөөлөн сүүдэр эллипс */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1200px] h-40 rounded-full bg-black/40 blur-3xl opacity-30 pointer-events-none" />

      {/* 3D тайз (камераа дээшээс тонгуулж харна) */}
      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: 1600 }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          className="relative w-[1150px] h-[340px] cursor-grab active:cursor-grabbing select-none"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${TILT_X}deg)`, // ← дээшээс харж буй камер
          }}
          animate={{ rotateY: rot }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          {slides.map((s, i) => {
            const angle = i * STEP;

            // Давхарлал зөв харагдуулахын тулд урд талд байгаа слайдад өндөр zIndex
            const weight = Math.cos(((i * STEP + rot) * Math.PI) / 180);
            const zIndex = Math.round(500 + weight * 500);

            // Бүгд тод — багахан scale ялгаа л давхцах багасгана
            const scale = 0.92 + 0.08 * Math.max(0, weight);

            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ transformStyle: "preserve-3d", zIndex }}
              >
                {/* Карт (дээд талаасаа харагдах ирмэгтэй мэт харагдуулах border + shadow) */}
                <div
                  className="w-[360px] h-[230px] rounded-xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.45)] ring-1 ring-white/20 bg-black"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) translateY(-${LIFT}px) scale(${scale})`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  {/* Дээд ирмэгийг тодруулах нарийн цагаан шугам */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-white/60 mix-blend-screen opacity-70" />
                  {/* Доод жижиг тень — карт бүрийн доор */}
                  <div className="absolute left-1/2 bottom-[-22px] -translate-x-1/2 w-[70%] h-6 rounded-full bg-black/60 blur-xl" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Доод индикаторууд (товшоод эргэнэ) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setRot(-i * STEP)}
            aria-label={`Слайд ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === current ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
