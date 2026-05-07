import { Menu, Search } from 'lucide-react'

const navItems = ['Home', 'About us', 'Products', 'Reviews', 'Contact us']

export default function Header() {
  return (
    <header className="rounded-[28px] border border-black/45 bg-white/22 px-3 py-3 shadow-xl backdrop-blur-md sm:px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#86691e]/60 bg-black/35 text-[#dab14a] sm:h-16 sm:w-16">
          <div className="text-center">
            <p className="text-[11px] font-semibold leading-none sm:text-xs">AN</p>
            <p className="mt-1 text-[9px] leading-none sm:text-[10px]">DESIGNS</p>
          </div>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-3 xl:flex">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className="rounded-2xl border border-black/60 bg-white/80 px-6 py-2 text-base font-medium text-black shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              {item}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="ml-auto hidden items-center gap-2 rounded-2xl border border-black/60 bg-white/80 px-4 py-2 text-black shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white lg:flex"
        >
          <Search className="h-5 w-5" strokeWidth={2.25} />
          <span className="text-xl font-medium leading-none">search our products</span>
        </button>

        <button
          type="button"
          className="ml-auto inline-flex rounded-xl border border-black/60 bg-white/80 p-2 text-black transition-all duration-300 hover:bg-white xl:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" strokeWidth={2.25} />
        </button>
      </div>
    </header>
  )
}
