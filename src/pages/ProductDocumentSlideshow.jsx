import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productDocumentSlides } from "../data/productDocumentSlides.js";

export default function ProductDocumentSlideshow() {
  const { slug } = useParams();
  const documentData = productDocumentSlides[slug];
  const slides = documentData?.slides ?? [];
  const pdf = documentData?.pdf;
  const sourceHref = documentData?.sourceHref;
  const sourceLinks = documentData?.sourceLinks ?? (sourceHref ? [{ href: sourceHref, label: "Open PDF" }] : []);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = slides[currentSlideIndex];

  const slideCounterText = useMemo(
    () =>
      `${String(currentSlideIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`,
    [currentSlideIndex, slides.length],
  );

  const goToPrevious = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  if (!documentData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ee] px-6 text-[#1e1a14]">
        <h1 className="text-4xl" style={{ fontFamily: "'Playfair Display',serif" }}>
          Document not found
        </h1>
        <Link
          to="/"
          className="mt-6 rounded-full border border-[#2b2419] px-6 py-2 text-sm font-semibold text-[#2b2419] transition-colors hover:bg-[#2b2419] hover:text-white"
          style={{ fontFamily: "'Cinzel',serif", letterSpacing: "0.08em" }}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ee] px-6 py-10 text-[#1e1a14] md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em] text-[#8a6d3b]"
              style={{ fontFamily: "'Cinzel',serif" }}
            >
              {documentData.label}
            </p>
            <h1
              className="mt-2 text-4xl md:text-5xl"
              style={{ fontFamily: "'Playfair Display',serif" }}
            >
              {documentData.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-[#4f4637]">
              {pdf
                ? "Browse the product catalogue PDF directly in the site."
                : "Slideshow of all extracted document images."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="rounded-full border border-[#2b2419] px-6 py-2 text-sm font-semibold text-[#2b2419] transition-colors hover:bg-[#2b2419] hover:text-white"
              style={{ fontFamily: "'Cinzel',serif", letterSpacing: "0.08em" }}
            >
              Back to Home
            </Link>
            {sourceLinks.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#c8922a] px-6 py-2 text-sm font-semibold text-[#a8751d] transition-colors hover:bg-[#c8922a] hover:text-white"
                style={{ fontFamily: "'Cinzel',serif", letterSpacing: "0.08em" }}
              >
                {source.label}
              </a>
            ))}
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
            {!pdf ? <p className="text-xs text-[#6f624e]">{slideCounterText}</p> : null}
          </div>

          <div className="overflow-hidden rounded-xl border border-[#eadfcd] bg-[#fbf8f1] p-3">
            {pdf ? (
              <iframe
                src={pdf}
                title={`${documentData.label} catalogue PDF`}
                className="h-[720px] w-full rounded-lg bg-white"
              />
            ) : currentSlide ? (
              <img
                src={currentSlide}
                alt={`${documentData.label} slide ${currentSlideIndex + 1}`}
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

        {!pdf ? (
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <p
              className="text-xs uppercase tracking-[0.2em] text-[#8a6d3b]"
              style={{ fontFamily: "'Cinzel',serif" }}
            >
              All Images
            </p>
            <p className="text-xs text-[#6f624e]">{slides.length} images</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {slides.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setCurrentSlideIndex(index)}
                className={`overflow-hidden rounded-xl border bg-white shadow-sm transition ${
                  currentSlideIndex === index ? "border-[#c8922a] ring-2 ring-[#c8922a]/30" : "border-[#eadfcd]"
                }`}
              >
                <img
                  src={src}
                  alt={`${documentData.label} thumbnail ${index + 1}`}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                  draggable="false"
                  onContextMenu={(event) => event.preventDefault()}
                />
              </button>
            ))}
          </div>
        </section>
        ) : null}
      </div>
    </div>
  );
}
