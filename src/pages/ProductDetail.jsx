import { Link, useParams } from "react-router-dom";
import { productCards } from "../data/products.js";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = productCards.find((p) => p.slug === slug);
  const documentViewSlugs = ["basket", "cake-stand", "candle-holders", "candle-sticks", "chopping-board", "napkin-rings", "vase", "xmas-deco", "pots", "cakedoms", "bowls", "furniture", "sculptures", "trays", "stool", "zinc-pots"];
  const getProductPdfHref = (item) =>
    item.pdfViewHref ?? (documentViewSlugs.includes(item.slug) ? `/product/${item.slug}/document-view` : null);

  if (!product) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-6"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        <h1
          className="text-4xl mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Product not found
        </h1>
        <p className="text-gray-600 mb-8">
          We couldn't find the product you were looking for.
        </p>
        <Link
          to="/"
          className="rounded-full px-6 py-2 bg-gray-900 text-white hover:bg-[#c8922a] transition-colors"
          style={{ fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: "0.08em" }}
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
        <Link to="/" className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center border-2"
            style={{
              background: "radial-gradient(circle,#2a1800,#1a0e00)",
              borderColor: "#c8922a",
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 16,
                fontWeight: 900,
                color: "#c8922a",
              }}
            >
              AN
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: 11,
                color: "#c8922a",
                letterSpacing: "0.12em",
              }}
            >
              A.N. DESIGNS
            </span>
            <span
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: 7,
                color: "#a07d20",
                letterSpacing: "0.08em",
              }}
            >
              YOUR EXPECTATION OUR VISION
            </span>
          </div>
        </Link>
        <Link
          to="/"
          className="rounded-full px-5 py-2 border border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white transition-colors"
          style={{
            fontFamily: "'Cinzel',serif",
            fontSize: 12,
            letterSpacing: "0.08em",
          }}
        >
          ← Back to Home
        </Link>
      </nav>

      <section className="max-w-6xl mx-auto px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="rounded-3xl overflow-hidden bg-[#f4f3f0] border border-gray-200">
            <img
              src={product.image}
              alt={product.alt}
              className="block w-full h-[520px] object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span
              className="text-[12px] uppercase tracking-[0.18em] text-gray-500 mb-3"
              style={{ fontFamily: "'Cinzel',serif" }}
            >
              A.N. Designs Collection
            </span>
            <h1
              className="mb-5"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 5vw, 56px)",
                lineHeight: 1.1,
                fontWeight: 700,
              }}
            >
              {product.label}
            </h1>
            <p className="text-lg leading-[1.7] text-gray-700 mb-8">
              Handcrafted in Moradabad, India, the {product.label.toLowerCase()}{" "}
              from A.N. Designs blends timeless artistry with modern utility.
              Each piece is finished with care, making it a graceful addition to
              any home or curated retail space.
            </p>

            <ul className="space-y-3 mb-10 text-gray-800 text-base">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#c8922a]" />
                Premium handcrafted quality, made in India.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#c8922a]" />
                Suitable for retail, hospitality, and home interiors.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#c8922a]" />
                Available for international wholesale orders.
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              {product.slug === "candle-sticks" ? (
                <Link
                  to="/product/candle-sticks/gallery"
                  className="rounded-full px-7 py-3 bg-gray-900 text-white hover:bg-[#c8922a] transition-colors"
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 12,
                    letterSpacing: "0.12em",
                  }}
                >
                  View All Images
                </Link>
              ) : null}
              <Link
                to="/"
                className="rounded-full px-7 py-3 border border-gray-300 text-gray-800 hover:bg-gray-100 transition-colors"
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 12,
                  letterSpacing: "0.12em",
                }}
              >
                Continue Browsing
              </Link>
              {getProductPdfHref(product) ? (
                <Link
                  to={getProductPdfHref(product)}
                  className="rounded-full px-7 py-3 border border-[#c8922a] text-[#a8751d] hover:bg-[#c8922a] hover:text-white transition-colors"
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 12,
                    letterSpacing: "0.12em",
                  }}
                >
                  Open PDF
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
