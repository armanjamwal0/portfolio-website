import { Reveal, SectionLabel } from '../components/Reveal'
import { education } from '../data'

export default function Education() {
  return (
    <section id="education" className="bg-[#F5F0E1]">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
        <SectionLabel index="03" title="Education" />
        <Reveal>
          <div className="border-2 border-[#161616] rounded-2xl bg-[#F5F0E1] overflow-hidden">
            <div className="bg-[#161616] text-[#F5F0E1] px-6 md:px-10 py-4 flex items-center justify-between">
              <span className="font-mono2 text-xs uppercase tracking-[0.2em]">education.log</span>
              <span className="flex gap-1.5">
                <i className="h-2.5 w-2.5 rounded-full bg-[#FF4E4E]" />
                <i className="h-2.5 w-2.5 rounded-full bg-[#E9C46A]" />
                <i className="h-2.5 w-2.5 rounded-full bg-[#62D282]" />
              </span>
            </div>
            <div className="px-6 md:px-10 py-8 md:py-12 grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <h3 className="font-display font-bold text-2xl md:text-4xl tracking-tight">{education.school}</h3>
                <p className="mt-2 font-mono2 text-sm text-[#264653]">{education.degree}</p>
                <p className="mt-1 font-mono2 text-xs uppercase tracking-[0.15em] text-[#161616]/55">
                  {education.place}
                </p>
              </div>
              <div className="flex gap-10 md:gap-14 font-mono2">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#161616]/50">cgpa</p>
                  <p className="font-display font-bold text-3xl md:text-5xl mt-1 text-[#F4A261]">{education.cgpa}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#161616]/50">period</p>
                  <p className="text-sm md:text-base mt-2 md:mt-3 leading-snug max-w-[180px]">{education.period}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
