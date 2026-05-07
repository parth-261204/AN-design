import { Link } from "react-router-dom";
import { pptImages } from "../data/pptImages.js";

export default function CandleStickGallery() {
  return (
    <div className="min-h-screen bg-[#f7f4ee] px-6 py-10 text-[#1e1a14] md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em] text-[#8a6d3b]"
              style={{ fontFamily: "'Cinzel',serif" }}
            >
              Candle Stick Collection
            </p>
            <h1
              className="mt-2 text-4xl md:text-5xl"
              style={{ fontFamily: "'Playfair Display',serif" }}
            >
              Candle Stick Image Library
            </h1>
            <p className="mt-3 max-w-3xl text-base text-[#4f4637]">
              All provided reference images are listed here for quick viewing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/product/candle-sticks"
              className="rounded-full border border-[#2b2419] px-6 py-2 text-sm font-semibold text-[#2b2419] transition-colors hover:bg-[#2b2419] hover:text-white"
              style={{ fontFamily: "'Cinzel',serif", letterSpacing: "0.08em" }}
            >
              Back to Candle Sticks
            </Link>
            <Link
              to="/"
              className="rounded-full border border-[#c8922a] bg-[#c8922a] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#b17c19]"
              style={{ fontFamily: "'Cinzel',serif", letterSpacing: "0.08em" }}
            >
              Back to Home
            </Link>
          </div>
        </div>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <p
              className="text-xs uppercase tracking-[0.2em] text-[#8a6d3b]"
              style={{ fontFamily: "'Cinzel',serif" }}
            >
              All Provided Images
            </p>
            <p className="text-xs text-[#6f624e]">{pptImages.length} images</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {pptImages.map((src, index) => (
              <article
                key={src}
                className="overflow-hidden rounded-xl border border-[#eadfcd] bg-white shadow-sm"
              >
                <img
                  src={src}
                  alt={`Candle stick reference ${index + 1}`}
                  className="h-48 w-full object-cover"
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
