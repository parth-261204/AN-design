import { Search } from 'lucide-react'

export default function ProductSearchBar() {
  return (
    <section className="mx-auto mt-10 w-full max-w-3xl sm:mt-12">
      <label
        htmlFor="product-search"
        className="flex items-center overflow-hidden rounded-3xl border border-black/70 bg-white/65 shadow-xl backdrop-blur-sm"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center border-r border-black/40 bg-white/75 text-black sm:h-16 sm:w-16">
          <Search className="h-6 w-6" strokeWidth={2.2} />
        </span>

        <input
          id="product-search"
          type="text"
          placeholder="search our products"
          className="h-14 w-full bg-transparent px-4 text-lg font-medium text-black placeholder:text-black/70 focus:outline-none sm:h-16 sm:px-5 sm:text-3xl"
        />
      </label>
    </section>
  )
}
