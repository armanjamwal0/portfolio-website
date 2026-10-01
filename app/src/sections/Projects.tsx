import { Reveal, SectionLabel } from '../components/Reveal'
import { Wave } from './About'
import { projects } from '../data'

export default function Projects() {
  return (
    <section id="projects" className="relative bg-[#264653] text-[#F5F0E1]">
      <Wave fill="#264653" flip />
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
        <SectionLabel index="02" title="Projects" dark />
        <Reveal>
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.02] tracking-tight max-w-3xl">
            Three models. <span className="text-[#E9C46A]">Three real problems.</span>
          </h2>
        </Reveal>

        <div className="mt-14 md:mt-20 space-y-16 md:space-y-24">
          {projects.map((p, pi) => (
            <Reveal key={p.id} delay={0.05}>
              <article
                className={`grid lg:grid-cols-12 gap-8 lg:gap-12 ${
                  pi % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* title side */}
                <div className="lg:col-span-5">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono2 text-[#F4A261] text-sm">{p.id}</span>
                    <span className="font-mono2 text-[11px] uppercase tracking-[0.18em] text-[#F5F0E1]/50">
                      {p.date}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display font-bold text-3xl md:text-[2.6rem] leading-[1.05] tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 font-mono2 text-sm text-[#A8DADC]">{p.tagline}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono2 text-[10px] md:text-[11px] uppercase tracking-[0.12em] border border-[#F5F0E1]/25 rounded-full px-3 py-1.5 text-[#F5F0E1]/80"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex items-center gap-5">
                    <a
                      href={p.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-mono2 text-xs uppercase tracking-[0.15em] underline underline-offset-8 decoration-[#F4A261] decoration-2 hover:text-[#F4A261] transition-colors min-h-[44px]"
                    >
                      {p.link.label} ↗
                    </a>
                    {p.badge && (
                      <span className="font-mono2 text-[10px] uppercase tracking-[0.14em] bg-[#62D282]/15 text-[#62D282] border border-[#62D282]/40 rounded-full px-3 py-1.5">
                        ● {p.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* details side */}
                <div className="lg:col-span-7">
                  <div className="grid grid-cols-3 gap-3 md:gap-4">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="border-t-2 border-[#E9C46A] pt-3">
                        <p className="font-display font-bold text-2xl md:text-4xl text-[#E9C46A]">{m.value}</p>
                        <p className="font-mono2 text-[9px] md:text-[11px] uppercase tracking-[0.12em] text-[#F5F0E1]/60 mt-1.5 leading-snug">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <ul className="mt-7 space-y-3.5">
                    {p.points.map((pt, i) => (
                      <li key={i} className="flex gap-3 text-[13.5px] md:text-[15px] leading-relaxed text-[#F5F0E1]/78">
                        <span aria-hidden className="text-[#F4A261] mt-0.5 shrink-0">▸</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-16 md:mt-24 text-center font-mono2 text-xs uppercase tracking-[0.2em] text-[#F5F0E1]/50">
            more on{' '}
            <a
              href="https://github.com/armanjamwal0"
              target="_blank"
              rel="noreferrer"
              className="text-[#E9C46A] underline underline-offset-4 hover:text-[#F4A261] transition-colors"
            >
              github.com/armanjamwal0 ↗
            </a>
          </p>
        </Reveal>
      </div>
      <Wave fill="#264653" />
    </section>
  )
}
