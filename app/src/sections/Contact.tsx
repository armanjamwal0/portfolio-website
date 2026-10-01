import { Reveal, SectionLabel } from '../components/Reveal'
import { profile } from '../data'

export default function Contact() {
  const rows = [
    { label: 'email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'github', value: 'github.com/armanjamwal0', href: profile.github },
    { label: 'linkedin', value: 'linkedin.com/in/armanjamwal', href: profile.linkedin },
    { label: 'phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  ]
  return (
    <section id="contact" className="bg-[#F5F0E1] pb-32 md:pb-0">
      <div className="mx-auto max-w-7xl px-5 md:px-10 pt-4 pb-16 md:pb-24">
        <SectionLabel index="04" title="Contact" />
        <Reveal>
          <h2 className="font-display font-bold text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.95] tracking-tight">
            LET'S BUILD
            <br />
            <span className="text-[#F4A261]">SOMETHING.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-md text-[15px] md:text-base text-[#161616]/70 leading-relaxed">
            Looking for an ML engineer who reads the confusion matrix before celebrating the accuracy? My inbox is open.
          </p>
        </Reveal>

        <div className="mt-12 border-t-2 border-[#161616]">
          {rows.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.06}>
              <a
                href={r.href}
                target={r.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group grid grid-cols-[90px_1fr_auto] md:grid-cols-[160px_1fr_auto] items-center gap-4 py-5 md:py-7 border-b border-dashed border-[#161616]/30 min-h-[44px]"
              >
                <span className="font-mono2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#161616]/50">
                  {r.label}
                </span>
                <span className="font-display font-medium text-lg md:text-3xl tracking-tight group-hover:text-[#F4A261] group-hover:translate-x-2 transition-all duration-300 break-all md:break-normal">
                  {r.value}
                </span>
                <span
                  aria-hidden
                  className="font-mono2 text-[#161616]/40 group-hover:text-[#F4A261] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300"
                >
                  ↗
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <footer className="border-t border-[#161616]/15">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between font-mono2 text-[11px] uppercase tracking-[0.15em] text-[#161616]/50">
          <span>© 2026 {profile.name}</span>
          <span>
            designed with <span className="text-[#F4A261]">one orange cat</span> · shimla, in
          </span>
        </div>
      </footer>
    </section>
  )
}
