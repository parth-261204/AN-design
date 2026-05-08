import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productCards } from "./data/products.js";

const SearchIcon = ({ size = 18, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2.5">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const useProductSuggestions = (query) => {
  const [suggestions, setSuggestions] = useState([]);
  const cleanedQuery = query.trim();

  useEffect(() => {
    if (!cleanedQuery) {
      return;
    }

    const controller = new AbortController();

    fetch(`/api/products?search=${encodeURIComponent(cleanedQuery)}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => setSuggestions(data.products ?? []))
      .catch((error) => {
        if (error.name !== "AbortError") {
          setSuggestions([]);
        }
      });

    return () => controller.abort();
  }, [cleanedQuery]);

  return cleanedQuery ? suggestions : [];
};

const ProductSearchSuggestions = ({ products, onSelect }) => {
  if (!products.length) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-[60] mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
      {products.map((product) => (
        <button
          key={product.slug}
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            onSelect(product);
          }}
          className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#f4f3f0]"
        >
          <img src={product.image} alt={product.alt} className="h-10 w-10 rounded-lg object-cover" />
          <span className="text-sm text-gray-800" style={{ fontFamily: "'Cinzel',serif", letterSpacing: "0.06em" }}>
            {product.label}
          </span>
        </button>
      ))}
    </div>
  );
};

const ANDesignsPage = () => {
  const [navSearch, setNavSearch] = useState("");
  const [heroSearch, setHeroSearch] = useState("");
  const [email, setEmail] = useState("");
  const [aboutIndex, setAboutIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const navSuggestions = useProductSuggestions(navSearch);
  const heroSuggestions = useProductSuggestions(heroSearch);
  const navigate = useNavigate();
  const productSliderRef = useRef(null);
  const homeSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const productsSectionRef = useRef(null);
  const reviewsSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const navLinks = ["Home", "About us", "Products", "Reviews", "Contact us"];
  const aboutCards = [
    {
      title: "Customer service",
      body: "We are dedicated to providing a seamless experience through expert, personalized support. Whether you are an industry master or an absolute beginner, our team offers in-depth guidance and troubleshooting to bring your vision to life. We prioritize active communication and treat every piece of feedback as a vital connection, ensuring you are never left without professional assistance.",
    },
    {
      title: "Legacy",
      body: "Our foundation is built upon four generations of unwavering commitment to craftsmanship. This deep-rooted history provides more than just expertise; it offers an \"above depth\" look that translates into products with unparalleled soul and character. From absolute beginners to master artisans, our journey has been defined by a constant evolution of features and a relentless pursuit of the \"unbreaking\" process-ensuring that every creation carries a bit of our history into your home.",
    },
    {
      title: "Novelty",
      body: "Our design philosophy prioritizes a striking aesthetic that makes an immediate impact. We distinguish our work through a specialized electroplating process followed by a meticulous transparent treatment. This signature finishing technique ensures that every piece achieves a high-end, long-lasting luster, blending innovative industrial processes with the timeless quality of artisan craftsmanship.",
    },
  ];
  const reviewSlides = [
    "Four generations of dedicated craftsmanship infuse every piece with unmatched soul and character. This deep history transforms industrial manufacturing into a timeless, unbreaking family tradition.",
    "From expert troubleshooting to personalized guidance, their team ensures a seamless experience for every designer. They treat every interaction as a vital connection to the brand.",
    "Their specialized electroplating and meticulous transparent treatments create a striking, long-lasting luster. These innovative finishing techniques redefine modern metal artware with a high-end, immediate impact.",
  ];
  const goToPreviousProduct = () => {
    if (!productSliderRef.current) return;
    productSliderRef.current.scrollBy({ left: -260, behavior: "smooth" });
  };

  const goToNextProduct = () => {
    if (!productSliderRef.current) return;
    productSliderRef.current.scrollBy({ left: 260, behavior: "smooth" });
  };

  const goToSection = (link) => {
    if (link === "Production Hub") {
      navigate("/production-hub");
      return;
    }

    const sectionMap = {
      Home: homeSectionRef,
      "About us": aboutSectionRef,
      Products: productsSectionRef,
      Reviews: reviewsSectionRef,
      "Contact us": contactSectionRef,
    };

    sectionMap[link]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const normalizeProductText = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

  const findProductByQuery = (query) => {
    const cleanedQuery = normalizeProductText(query.trim());
    if (!cleanedQuery) return null;

    const exactMatch = productCards.find((item) => normalizeProductText(item.label) === cleanedQuery);
    if (exactMatch) return exactMatch;

    return productCards.find((item) => normalizeProductText(item.label).includes(cleanedQuery));
  };

  const goToProductDetail = (query) => {
    const matchedProduct = findProductByQuery(query);
    if (!matchedProduct) return;
    window.location.href = `/product/${matchedProduct.slug}`;
  };

  const getProductDetailHref = (item) =>
    item.slug === "candle-sticks"
        ? "/product/candle-sticks/gallery"
        : `/product/${item.slug}`;
  const goToProductSuggestion = (item) => {
    window.location.href = getProductDetailHref(item);
  };
  const documentViewSlugs = ["basket", "cake-stand", "candle-holders", "candle-sticks", "chopping-board", "napkin-rings", "vase", "xmas-deco", "pots", "cakedoms", "bowls", "furniture", "sculptures", "trays", "stool", "zinc-pots"];
  const getProductPdfHref = (item) =>
    item.pdfViewHref ?? (documentViewSlugs.includes(item.slug) ? `/product/${item.slug}/document-view` : null);

  useEffect(() => {
    const timer = setInterval(() => {
      setAboutIndex((prev) => (prev + 1) % aboutCards.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [aboutCards.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % reviewSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviewSlides.length]);

  return (
    <div className="font-serif bg-white text-gray-900 min-h-screen" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      <section
        ref={homeSectionRef}
        className="min-h-screen flex flex-col pt-28"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1400&q=80') center/cover no-repeat`,
        }}
      >
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between flex-wrap gap-4 px-8 py-4 border-b border-white/20" style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center border-2" style={{ background: "radial-gradient(circle,#2a1800,#1a0e00)", borderColor: "#c8922a" }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 900, color: "#c8922a" }}>AN</span>
            </div>
            <span style={{ fontFamily: "'Cinzel',serif", fontSize: 9, color: "#c8922a", letterSpacing: "0.1em" }}>A.N. DESIGNS</span>
            <span style={{ fontFamily: "'Cinzel',serif", fontSize: 6, color: "#d4a94a", letterSpacing: "0.08em" }}>YOUR EXPECTATION OUR VISION</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            {navLinks.map((link) => (
              <button
                key={link}
                className="rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 hover:text-white"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(6px)",
                  fontFamily: "'Cinzel',serif",
                  fontSize: 13,
                  letterSpacing: "0.04em",
                  color: "#1a1a1a",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#c8922a";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.85)";
                  e.currentTarget.style.color = "#1a1a1a";
                }}
                onClick={() => goToSection(link)}
              >
                {link}
              </button>
            ))}
            <button
              className="rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200"
              style={{
                background: "#c8922a",
                backdropFilter: "blur(6px)",
                fontFamily: "'Cinzel',serif",
                fontSize: 13,
                letterSpacing: "0.04em",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ad7b1f";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#c8922a";
              }}
              onClick={() => navigate("/production-hub")}
            >
              Production Hub
            </button>
          </div>

          <div className="relative" style={{ minWidth: 240 }}>
            <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)" }}>
              <button
                type="button"
                onClick={() => goToProductDetail(navSearch)}
                className="flex items-center justify-center"
                aria-label="Search products"
              >
                <SearchIcon size={16} color="#888" />
              </button>
              <input
                type="text"
                placeholder="search our products"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    goToProductDetail(navSearch);
                  }
                }}
                className="bg-transparent outline-none border-none w-full"
                style={{ fontFamily: "'Cinzel',serif", fontSize: 12, color: "#555", letterSpacing: "0.06em" }}
              />
            </div>
            <ProductSearchSuggestions
              products={navSuggestions}
              onSelect={(product) => {
                setNavSearch(product.label);
                goToProductSuggestion(product);
              }}
            />
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="text-center w-full max-w-3xl rounded-2xl px-14 py-11" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(2px)", border: "1px solid rgba(255,255,255,0.35)" }}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.7),transparent)", maxWidth: 140 }} />
              <span style={{ fontFamily: "'Cinzel',serif", fontSize: 13, letterSpacing: "0.22em", color: "rgba(255,255,255,0.88)" }}>Moradabad &nbsp;·&nbsp; India &nbsp;·&nbsp; Est &nbsp;1958</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to left,transparent,rgba(255,255,255,0.7),transparent)", maxWidth: 140 }} />
            </div>
            <h1 className="text-white mb-5" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(42px,6vw,82px)", fontWeight: 900, lineHeight: 1.05 }}>
              Your Expectations
              <br />
              our Vision
            </h1>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(11px,1.4vw,14px)", letterSpacing: "0.22em", color: "rgba(255,255,255,0.82)" }}>
              Manufacturer &amp; Exporter &nbsp;·&nbsp; Fine Metal Artware &amp; Home Collection
            </p>
            <div className="relative mx-auto mt-9" style={{ maxWidth: 560 }}>
              <div className="flex items-center rounded-full" style={{ background: "rgba(255,255,255,0.92)", padding: "10px 10px 10px 24px", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
                <input
                  type="text"
                  placeholder="search our products"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      goToProductDetail(heroSearch);
                    }
                  }}
                  className="flex-1 bg-transparent outline-none border-none"
                  style={{ fontFamily: "'Cinzel',serif", fontSize: 13, color: "#555", letterSpacing: "0.08em" }}
                />
                <button
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                  style={{ background: "#1a1a1a", border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#c8922a")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1a1a")}
                  onClick={() => goToProductDetail(heroSearch)}
                >
                  <SearchIcon size={18} color="#fff" />
                </button>
              </div>
              <ProductSearchSuggestions
                products={heroSuggestions}
                onSelect={(product) => {
                  setHeroSearch(product.label);
                  goToProductSuggestion(product);
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section ref={aboutSectionRef} className="bg-white py-20 px-10">
        <h2 className="font-serif text-[clamp(40px,5vw,64px)] font-normal text-center tracking-tight mb-16">About us</h2>
        <div className="mx-auto max-w-6xl">
          <div className="relative hidden md:block h-[420px]">
            {aboutCards.map((card, idx) => {
              const slot = (idx - aboutIndex + aboutCards.length) % aboutCards.length;
              const leftPositions = ["0%", "34%", "68%"];
              const isCenter = slot === 1;

              return (
                <div
                  key={card.title}
                  className="absolute top-0 w-[32%] rounded-2xl border p-7 h-full transition-all duration-[1100ms] ease-linear"
                  style={{
                    left: leftPositions[slot],
                    background: isCenter ? "#f4f3f0" : "#f8f7f5",
                    borderColor: isCenter ? "#d8d8d6" : "#e0e0e0",
                    transform: `scale(${isCenter ? 1.02 : 0.96})`,
                    boxShadow: isCenter ? "0 12px 28px rgba(0,0,0,0.08)" : "none",
                    zIndex: isCenter ? 20 : 10,
                  }}
                >
                  <div className="text-[13px] tracking-[0.18em] text-gray-500 text-center mb-5 uppercase" style={{ fontFamily: "'Cinzel',serif" }}>
                    {card.title}
                  </div>
                  <p className="text-[17px] leading-[1.6] text-gray-800">{card.body}</p>
                </div>
              );
            })}
          </div>

          <div className="md:hidden grid grid-cols-1 gap-4">
            {aboutCards.map((card, idx) => (
              <div
                key={card.title}
                className="rounded-2xl border p-8 h-full transition-all duration-500"
                style={{
                  background: idx === aboutIndex ? "#f4f3f0" : "#f8f7f5",
                  borderColor: idx === aboutIndex ? "#d8d8d6" : "#e0e0e0",
                }}
              >
                <div className="text-[13px] tracking-[0.18em] text-gray-500 text-center mb-5 uppercase" style={{ fontFamily: "'Cinzel',serif" }}>
                  {card.title}
                </div>
                <p className="text-lg leading-[1.75] text-gray-800">{card.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-2.5">
            {aboutCards.map((card, idx) => (
              <button
                key={card.title}
                onClick={() => setAboutIndex(idx)}
                className="h-2.5 w-2.5 rounded-full transition-colors"
                style={{ background: idx === aboutIndex ? "#1a1a1a" : "#bdbdbd" }}
                aria-label={`Go to ${card.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section ref={productsSectionRef} className="bg-white pt-16 pb-20 px-10">
        <h2 className="font-serif text-[clamp(40px,5vw,64px)] font-normal text-center tracking-tight mb-16">Products</h2>
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 flex items-center justify-center gap-3">
            <button
              onClick={goToPreviousProduct}
              className="h-10 w-10 rounded-full border border-gray-300 bg-white text-xl text-gray-700 transition-colors hover:bg-gray-900 hover:text-white"
              aria-label="Previous product"
            >
              ←
            </button>
            <span className="text-[12px] uppercase tracking-[0.12em] text-gray-500" style={{ fontFamily: "'Cinzel',serif" }}>
              Slide products manually
            </span>
            <button
              onClick={goToNextProduct}
              className="h-10 w-10 rounded-full border border-gray-300 bg-white text-xl text-gray-700 transition-colors hover:bg-gray-900 hover:text-white"
              aria-label="Next product"
            >
              →
            </button>
          </div>

          <div
            ref={productSliderRef}
            className="flex gap-4 overflow-x-auto pb-3 scroll-smooth overscroll-x-contain"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {productCards.map((item) => (
              <div key={item.label} className="flex flex-col items-center shrink-0 w-[220px] md:w-[280px]">
                <div className="rounded-2xl overflow-hidden w-[220px] h-[300px] md:w-[280px] md:h-[380px]">
                  <img src={item.image} alt={item.alt} className="block w-full h-full object-cover" draggable="false" />
                </div>
                <span className="text-[11px] tracking-[0.12em] text-gray-700 text-center mt-3 border border-dashed border-gray-400 rounded-full px-4 py-1 uppercase" style={{ fontFamily: "'Cinzel',serif" }}>
                  {item.label}
                </span>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <a
                    href={getProductDetailHref(item)}
                    className="rounded-full px-4 py-2 bg-gray-900 text-white hover:bg-[#c8922a] transition-colors text-center"
                    style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.14em" }}
                  >
                    VIEW DETAILS
                  </a>
                  {getProductPdfHref(item) ? (
                    <a
                      href={getProductPdfHref(item)}
                      className="rounded-full px-4 py-2 bg-[#c8922a] text-white hover:bg-gray-900 transition-colors text-center shadow-sm"
                      style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.14em" }}
                    >
                      OPEN PDF
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={reviewsSectionRef} className="bg-white py-20 px-10">
        <div className="bg-[#f4f3f0] border border-gray-300 rounded-2xl p-10 md:px-12 max-w-3xl mx-auto mb-9 text-xl leading-[1.8] text-gray-800 text-center">
          {reviewSlides[reviewIndex]}
        </div>
        <div className="flex justify-center gap-2.5 mb-14">
          {reviewSlides.map((review, idx) => (
            <button
              key={review}
              onClick={() => setReviewIndex(idx)}
              className="w-2 h-2 rounded-full transition-colors"
              style={{ background: idx === reviewIndex ? "#111827" : "#9ca3af" }}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          <div>
            <div className="w-20 h-20 rounded-full bg-[#e8e8e6] flex items-center justify-center mx-auto mb-4 text-3xl">🚚</div>
            <div className="text-[11px] font-semibold tracking-[0.06em] text-gray-900 uppercase" style={{ fontFamily: "'Cinzel',serif" }}>Shipping within 48 hours</div>
          </div>
          <div>
            <div className="w-20 h-20 rounded-full bg-[#e8e8e6] flex items-center justify-center mx-auto mb-4 text-3xl">📦</div>
            <div className="text-[11px] font-semibold tracking-[0.06em] text-gray-900 uppercase" style={{ fontFamily: "'Cinzel',serif" }}>5% off on prepaid offers</div>
          </div>
          <div>
            <div className="w-20 h-20 rounded-full bg-[#e8e8e6] flex items-center justify-center mx-auto mb-4 text-3xl">🦁</div>
            <div className="text-[11px] font-semibold tracking-[0.06em] text-gray-900 uppercase" style={{ fontFamily: "'Cinzel',serif" }}>Make in India</div>
          </div>
          <div>
            <div className="w-20 h-20 rounded-full bg-[#e8e8e6] flex items-center justify-center mx-auto mb-4 text-3xl">🎧</div>
            <div className="text-[11px] font-semibold tracking-[0.06em] text-gray-900 uppercase" style={{ fontFamily: "'Cinzel',serif" }}>24Hr customer service</div>
          </div>
        </div>
      </section>

      <footer ref={contactSectionRef} className="bg-[#111] py-16 px-14 text-[#aaa]">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12 max-w-5xl">
          <div>
            <div className="w-[120px] h-[120px] rounded-full border-2 border-[#c8922a] bg-[#1a1000] flex items-center justify-center mb-3">
              <span className="font-serif text-4xl font-black text-[#c8922a]">AN</span>
            </div>
            <div className="text-xl font-semibold text-[#c8922a] tracking-[0.12em] mt-4 mb-1" style={{ fontFamily: "'Cinzel',serif" }}>A.N DESIGNS</div>
            <div className="text-[8px] tracking-[0.18em] text-gray-500 uppercase" style={{ fontFamily: "'Cinzel',serif" }}>YOUR EXPECTATION OUR VISION</div>

            <div className="flex gap-4 my-5">
              <div className="w-11 h-11 border-[1.5px] border-gray-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:border-[#c8922a]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="#ccc" stroke="none" />
                </svg>
              </div>
              <div className="w-11 h-11 border-[1.5px] border-gray-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:border-[#c8922a]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ccc">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </div>
              <div className="w-11 h-11 border-[1.5px] border-gray-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:border-[#c8922a]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ccc">
                  <path d="M12 0a12 12 0 0 1 3.794 23.395c-.599.111-.819-.26-.819-.578 0-.392.013-1.418.013-2.764 0-.937-.315-1.548-.676-1.858 2.228-.249 4.569-1.096 4.569-4.95 0-1.096-.39-1.99-1.029-2.693.103-.254.446-1.273-.099-2.655 0 0-.839-.27-2.749 1.027A9.57 9.57 0 0 0 12 8.27a9.57 9.57 0 0 0-2.504.338C7.58 7.454 6.742 7.724 6.742 7.724c-.545 1.382-.202 2.401-.099 2.655-.639.703-1.029 1.597-1.029 2.693 0 3.845 2.337 4.703 4.558 4.957-.286.252-.546.695-.637 1.345-.572.259-2.024.703-2.92-.837 0 0-.53-.964-1.536-1.035 0 0-.979-.013-.069.611 0 0 .657.309 1.113 1.466 0 0 .588 1.787 3.374 1.181.004.687.013 1.337.013 1.538 0 .316-.219.686-.82.579A12.002 12.002 0 0 1 12 0z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center bg-[#333] rounded-full p-2 pl-5 mt-6 max-w-[300px]">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="bg-transparent border-none outline-none text-[#ccc] text-xs flex-1 tracking-[0.06em] placeholder-gray-500"
                style={{ fontFamily: "'Cinzel',serif" }}
              />
              <button className="w-9 h-9 bg-gray-600 rounded-full border-none cursor-pointer flex items-center justify-center transition-colors hover:bg-[#c8922a] shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <div className="font-serif text-2xl text-[#c8922a] font-normal mb-5 italic">Product</div>
            <a className="block text-base text-[#bbb] mb-2.5 hover:text-[#c8922a] transition-colors cursor-pointer">christmas vases</a>
            <a className="block text-base text-[#bbb] mb-2.5 hover:text-[#c8922a] transition-colors cursor-pointer">candle holder</a>
            <a className="block text-base text-[#bbb] mb-2.5 hover:text-[#c8922a] transition-colors cursor-pointer">votive</a>
            <a className="block text-base text-[#bbb] mb-2.5 hover:text-[#c8922a] transition-colors cursor-pointer">Planter</a>
            <a className="block text-base text-[#bbb] mb-2.5 hover:text-[#c8922a] transition-colors cursor-pointer">Tray bowl</a>
            <a className="block text-base text-[#bbb] mb-2.5 hover:text-[#c8922a] transition-colors cursor-pointer">Cake Stand</a>
          </div>

          <div>
            <div className="font-serif text-2xl text-[#c8922a] font-normal mb-5 italic">info</div>
            <a className="block text-base text-[#bbb] mb-2.5 hover:text-[#c8922a] transition-colors cursor-pointer">Terms and Conditions</a>
            <a className="block text-base text-[#bbb] mb-2.5 hover:text-[#c8922a] transition-colors cursor-pointer">stores near me</a>
            <a className="block text-base text-[#bbb] mb-2.5 hover:text-[#c8922a] transition-colors cursor-pointer">Blogs</a>
            <a className="block text-base text-[#bbb] mb-2.5 hover:text-[#c8922a] transition-colors cursor-pointer">FAQ's</a>
            <a className="block text-base text-[#bbb] mb-2.5 hover:text-[#c8922a] transition-colors cursor-pointer">Contact</a>
            <a className="block text-base text-[#bbb] mb-2.5 hover:text-[#c8922a] transition-colors cursor-pointer">Privacy Policy</a>
            <a className="block text-base text-[#bbb] mb-2.5 hover:text-[#c8922a] transition-colors cursor-pointer">Return and Exchange Policy</a>
            <a className="block text-base text-[#bbb] mb-2.5 hover:text-[#c8922a] transition-colors cursor-pointer">Offers and Deals</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ANDesignsPage;
