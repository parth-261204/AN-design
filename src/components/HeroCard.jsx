export default function HeroCard() {
  return (
    <section className="mx-auto mt-14 max-w-4xl rounded-[30px] border-[3px] border-black/75 bg-white/12 px-4 py-6 text-center shadow-2xl backdrop-blur-[2px] sm:px-8 sm:py-8 lg:mt-16">
      <div className="mx-auto mb-3 flex max-w-2xl items-center gap-4 text-sm font-semibold tracking-[0.14em] text-black sm:mb-4 sm:text-lg">
        <span className="h-px flex-1 bg-black/65" />
        <span>Moradabad</span>
        <span>India</span>
        <span>Est 1958</span>
        <span className="h-px flex-1 bg-black/65" />
      </div>

      <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl">
        Your Expectations our Vision
      </h1>

      <p className="mx-auto mt-4 max-w-3xl text-base font-semibold tracking-wide text-black sm:mt-5 sm:text-2xl lg:text-[2rem]">
        Manufacturer &amp; Exporter . Fine Metal Artware &amp; Home Collection
      </p>
    </section>
  )
}
