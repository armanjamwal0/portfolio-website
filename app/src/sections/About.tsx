import { Reveal, SectionLabel } from '../components/Reveal'
import { profile, skillGroups } from '../data'

export function Wave({ fill, flip = false }: { fill: string; flip?: boolean }) {
  return (
    <div aria-hidden className={`overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
      <div className="wave-slide w-[400%]">
        <svg viewBox="0 0 2880 60" preserveAspectRatio="none" className="h-[42px] md:h-[60px] w-full block">
          <path
            d="M0,32 C120,58 240,58 360,32 C480,6 600,6 720,32 C840,58 960,58 1080,32 C1200,6 1320,6 1440,32 C1560,58 1680,58 1800,32 C1920,6 2040,6 2160,32 C2280,58 2400,58 2520,32 C2640,6 2760,6 2880,32 L2880,60 L0,60 Z"
            fill={fill}
          />
        </svg>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative bg-[#E8DCC4]">
      <Wave fill="#E8DCC4" flip />
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
        <SectionLabel index="01" title="About" />
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <Reveal>
              <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.02] tracking-tight">
                From raw data to{' '}
                <span className="text-[#264653] underline decoration-[#F4A261] decoration-4 underline-offset-8">
                  deployed models
                </span>
                .
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 text-[15px] md:text-lg leading-relaxed text-[#161616]/75 max-w-xl">
                {profile.summary}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 text-[15px] md:text-lg leading-relaxed text-[#161616]/75 max-w-xl">
                I care about the unglamorous parts — clean preprocessing, honest metrics, and knowing{' '}
                <em className="not-italic font-semibold text-[#264653]">why</em> a model behaves the way it does —
                because that's what survives contact with the real world.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-9 grid grid-cols-3 gap-4 max-w-md">
                {[
                  { v: '3+', l: 'ML projects shipped' },
                  { v: '1', l: 'live web app' },
                  { v: '10M+', l: 'rows processed' },
                ].map((s) => (
                  <div key={s.l} className="border-t-2 border-[#161616] pt-3">
                    <p className="font-display font-bold text-2xl md:text-3xl">{s.v}</p>
                    <p className="font-mono2 text-[10px] md:text-[11px] uppercase tracking-[0.12em] text-[#161616]/60 mt-1">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* skills — spec-sheet style */}
          <div className="font-mono2">
            {skillGroups.map((g, gi) => (
              <Reveal key={g.label} delay={gi * 0.07}>
                <div className="border-t border-dashed border-[#161616]/30 py-5 first:border-t-2 first:border-solid first:border-[#161616]">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#264653] mb-3">
                    <span className="text-[#161616]/40 mr-2">{String(gi + 1).padStart(2, '0')}</span>
                    {g.label}
                  </p>
                  <p className="text-sm md:text-[15px] leading-loose text-[#161616]/85">{g.items.join('  ·  ')}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <p className="caret border-t border-dashed border-[#161616]/30 pt-5 text-xs text-[#161616]/50 uppercase tracking-[0.15em]">
                currently_learning: LLMs &amp; deep RL
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
