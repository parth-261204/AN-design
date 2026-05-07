import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { pptImages } from "../data/pptImages.js";

export default function ProfilePPT() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = pptImages.length;
  const currentSlide = pptImages[currentSlideIndex];

  const slideCounterText = useMemo(
    () => `${String(currentSlideIndex + 1).padStart(2, "0")} / ${String(totalSlides).padStart(2, "0")}`,
    [currentSlideIndex, totalSlides],
  );

  const goToPrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlideIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#f7f4ee] px-6 py-10 text-[#1e1a14] md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#8a6d3b]" style={{ fontFamily: "'Cinzel',serif" }}>
              Company Profile
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl" style={{ fontFamily: "'Playfair Display',serif" }}>
              AN Designs Profile PPT
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/production-hub"
              className="rounded-full border border-[#2b2419] px-6 py-2 text-sm font-semibold text-[#2b2419] transition-colors hover:bg-[#2b2419] hover:text-white"
              style={{ fontFamily: "'Cinzel',serif", letterSpacing: "0.08em" }}
            >
              Back to Production Hub
            </Link>
          </div>
        </div>

        <section className="mb-8 rounded-2xl border border-[#e2d8c6] bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8a6d3b]" style={{ fontFamily: "'Cinzel',serif" }}>
              PPT Preview
            </p>
            <p className="text-xs text-[#6f624e]">{slideCounterText}</p>
          </div>
          <div className="overflow-hidden rounded-xl border border-[#eadfcd] bg-[#fbf8f1] p-3">
            {currentSlide ? (
              <img
                src={currentSlide}
                alt={`AN Designs slide ${currentSlideIndex + 1}`}
                className="h-[520px] w-full rounded-lg object-contain"
                loading="eager"
                draggable="false"
                onContextMenu={(event) => event.preventDefault()}
              />
            ) : (
              <div className="flex h-[220px] items-center justify-center text-sm text-[#6f624e]">Preview not available.</div>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goToPrev}
              className="rounded-full border border-[#2b2419] px-5 py-2 text-sm text-[#2b2419] transition-colors hover:bg-[#2b2419] hover:text-white"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="rounded-full border border-[#2b2419] px-5 py-2 text-sm text-[#2b2419] transition-colors hover:bg-[#2b2419] hover:text-white"
            >
              Next
            </button>
          </div>
          <p className="mt-3 text-sm text-[#6f624e]">
            Profile is shown as in-page slide previews. Direct PPT download option has been removed from the website UI.
          </p>
        </section>

        <section>
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#8a6d3b]" style={{ fontFamily: "'Cinzel',serif" }}>
            Slide Images Extracted From PPT
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {pptImages.map((src, index) => (
              <article key={src} className="overflow-hidden rounded-xl border border-[#eadfcd] bg-white shadow-sm">
                <img
                  src={src}
                  alt={`PPT slide asset ${index + 1}`}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                  draggable="false"
                  onContextMenu={(event) => event.preventDefault()}
                />
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
