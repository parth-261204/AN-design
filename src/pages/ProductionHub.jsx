import { Link } from "react-router-dom";
import { pptImages } from "../data/pptImages.js";

const workshopImages = [
  {
    src: "/production-hub/forging.png",
    alt: "Molten metal shaping process",
    title: "Forging",
  },
  {
    src: "/production-hub/polishing.png",
    alt: "Polishing a hammered metal shade",
    title: "Polishing",
  },
  {
    src: "/production-hub/hand-finishing.png",
    alt: "Artisans hand-hammering products",
    title: "Hand Finishing",
  },
  {
    src: "/production-hub/quality-check.png",
    alt: "Hammering and quality shaping",
    title: "Quality Check",
  },
  {
    src: "/production-hub/batch-prep.png",
    alt: "Batch-ready base frames in workshop",
    title: "Batch Prep",
  },
  {
    src: "/production-hub/molding.png",
    alt: "Casting and mold setup area",
    title: "Molding",
  },
];

const productionSteps = [
  "Molding and base casting",
  "Controlled heating and forging",
  "Manual hammering and shaping",
  "Fine polishing and finishing",
  "Batch inspection and packing",
];

export default function ProductionHub() {
  const featuredPptImages = pptImages.slice(0, 12);

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#1e1a14] px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#8a6d3b]" style={{ fontFamily: "'Cinzel',serif" }}>
              A.N. Designs
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl" style={{ fontFamily: "'Playfair Display',serif" }}>
              Production Hub
            </h1>
            <p className="mt-3 max-w-2xl text-base text-[#4f4637]">
              A visual walkthrough of our workshop stages, arranged from raw processing to final hand-finishing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/profile-ppt"
              className="rounded-full border border-[#c8922a] bg-[#c8922a] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#b17c19]"
              style={{ fontFamily: "'Cinzel',serif", letterSpacing: "0.08em" }}
            >
              Open Profile PPT
            </Link>
            <Link
              to="/"
              className="rounded-full border border-[#2b2419] px-6 py-2 text-sm font-semibold text-[#2b2419] transition-colors hover:bg-[#2b2419] hover:text-white"
              style={{ fontFamily: "'Cinzel',serif", letterSpacing: "0.08em" }}
            >
              Back to Home
            </Link>
          </div>
        </div>

        <section className="mb-8 rounded-2xl border border-[#e2d8c6] bg-white p-5 md:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8a6d3b]" style={{ fontFamily: "'Cinzel',serif" }}>
            Production Flow
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {productionSteps.map((step) => (
              <div key={step} className="rounded-xl border border-[#eee2ce] bg-[#fcfaf5] px-3 py-4 text-center text-sm text-[#473d2f]">
                {step}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8a6d3b]" style={{ fontFamily: "'Cinzel',serif" }}>
              Extracted From PPT
            </p>
            <p className="text-xs text-[#6f624e]">Showing first 12 of {pptImages.length} images</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {featuredPptImages.map((src, index) => (
              <article key={src} className="overflow-hidden rounded-xl border border-[#eadfcd] bg-white shadow-sm">
                <img src={src} alt={`Featured PPT asset ${index + 1}`} className="h-48 w-full object-cover" loading="eager" />
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {workshopImages.map((image) => (
            <article key={image.src} className="overflow-hidden rounded-2xl border border-[#e2d8c6] bg-white shadow-sm">
              <img src={image.src} alt={image.alt} className="h-[350px] w-full object-cover" loading="lazy" />
              <div className="px-4 py-3">
                <p className="text-xs uppercase tracking-[0.14em] text-[#7a6a4f]" style={{ fontFamily: "'Cinzel',serif" }}>
                  {image.title}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8a6d3b]" style={{ fontFamily: "'Cinzel',serif" }}>
              PPT Image Library
            </p>
            <p className="text-xs text-[#6f624e]">{pptImages.length} images extracted</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {pptImages.map((src, index) => (
              <article key={src} className="overflow-hidden rounded-xl border border-[#eadfcd] bg-white shadow-sm">
                <img src={src} alt={`PPT asset ${index + 1}`} className="h-44 w-full object-cover" loading="lazy" />
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
