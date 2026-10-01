import { marqueeItems } from '../data'

export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems]
  return (
    <section aria-label="Technologies" className="relative py-6 overflow-hidden">
      <div className="-rotate-1 bg-[#F4A261] border-y-2 border-[#161616] py-3 overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-8 pr-8">
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-mono2 font-bold text-sm md:text-base uppercase tracking-[0.18em] text-[#161616]">
                {item}
              </span>
              <span aria-hidden className="text-[#161616]/70">🐾</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
