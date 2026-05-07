import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { bowlsImages } from "../data/bowlsImages.js";

const bowlsPdf = "/planter-bowl.pdf";

export default function BowlsPdfView() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = bowlsImages[currentImageIndex];
  const slideCounterText = useMemo(
    () =>
      `${String(currentImageIndex + 1).padStart(2, "0")} / ${String(bowlsImages.length).padStart(2, "0")}`,
    [currentImageIndex],
  );

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? bowlsImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === bowlsImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#f7f4ee] px-6 py-10 text-[#1e1a14] md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em] text-[#8a6d3b]"
              style={{ fontFamily: "'Cinzel',serif" }}
            >
              Bowls
            </p>
            <h1
              className="mt-2 text-4xl md:text-5xl"
              style={{ fontFamily: "'Playfair Display',serif" }}
            >
              Bowls Slideshow
            </h1>
            <p className="mt-3 max-w-2xl text-base text-[#4f4637]">
              Slideshow of all extracted Bowls catalogue images. The source file is available separately.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/product/bowls"
              className="rounded-full border border-[#2b2419] px-6 py-2 text-sm font-semibold text-[#2b2419] transition-colors hover:bg-[#2b2419] hover:text-white"
              style={{ fontFamily: "'Cinzel',serif", letterSpacing: "0.08em" }}
            >
              Back to Bowls
            </Link>
            <a
              href={bowlsPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#c8922a] px-6 py-2 text-sm font-semibold text-[#a8751d] transition-colors hover:bg-[#c8922a] hover:text-white"
              style={{ fontFamily: "'Cinzel',serif", letterSpacing: "0.08em" }}
            >
              Open PDF
            </a>
          </div>
        </div>

        <section className="rounded-2xl border border-[#e2d8c6] bg-white p-4 md:p-5">
          <div className="mb-3 flex items-center justify-between">
            <p
              className="text-xs uppercase tracking-[0.2em] text-[#8a6d3b]"
              style={{ fontFamily: "'Cinzel',serif" }}
            >
              Slideshow
            </p>
            <p className="text-xs text-[#6f624e]">{slideCounterText}</p>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#eadfcd] bg-[#fbf8f1] p-3">
            {currentImage ? (
              <img
                src={currentImage}
                alt={`Bowls slide ${currentImageIndex + 1}`}
                className="h-[620px] w-full rounded-lg object-contain"
                loading="eager"
                draggable="false"
                onContextMenu={(event) => event.preventDefault()}
              />
            ) : (
              <div className="flex h-[320px] items-center justify-center text-sm text-[#6f624e]">
                Preview not available.
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goToPrevious}
              className="rounded-full border border-[#2b2419] px-6 py-2 text-sm text-[#2b2419] transition-colors hover:bg-[#2b2419] hover:text-white"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="rounded-full border border-[#2b2419] px-6 py-2 text-sm text-[#2b2419] transition-colors hover:bg-[#2b2419] hover:text-white"
            >
              Next
            </button>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <p
              className="text-xs uppercase tracking-[0.2em] text-[#8a6d3b]"
              style={{ fontFamily: "'Cinzel',serif" }}
            >
              All Images
            </p>
            <p className="text-xs text-[#6f624e]">{bowlsImages.length} images</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {bowlsImages.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setCurrentImageIndex(index)}
                className={`overflow-hidden rounded-xl border bg-white shadow-sm transition ${
                  currentImageIndex === index ? "border-[#c8922a] ring-2 ring-[#c8922a]/30" : "border-[#eadfcd]"
                }`}
              >
                <img
                  src={src}
                  alt={`Bowls thumbnail ${index + 1}`}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                  draggable="false"
                  onContextMenu={(event) => event.preventDefault()}
                />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
