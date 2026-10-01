import { Suspense, lazy, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data'

const Cat = lazy(() => import('../components/Cat'))

function ISTClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{time} IST</span>
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const word = {
  hidden: { opacity: 0, y: 60, rotate: 2 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-svh flex flex-col overflow-hidden bg-[#F5F0E1]">
      {/* background dots */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[
          { top: '18%', left: '6%', d: '0s', c: '#E9C46A' },
          { top: '70%', left: '10%', d: '1.2s', c: '#F4A261' },
          { top: '30%', left: '46%', d: '0.6s', c: '#A8DADC' },
          { top: '82%', left: '52%', d: '1.8s', c: '#E9C46A' },
          { top: '12%', left: '88%', d: '0.9s', c: '#F4A261' },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute h-2 w-2 rounded-full opacity-70"
            style={{ top: p.top, left: p.left, background: p.c, animation: `drift 5s ease-in-out ${p.d} infinite` }}
          />
        ))}
      </div>

      <div className="flex-1 mx-auto w-full max-w-7xl px-5 md:px-10 pt-20 md:pt-28 pb-10 grid lg:grid-cols-[1.15fr_1fr] gap-4 lg:gap-2 items-center">
        {/* text column */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10">
          <motion.p variants={word} className="font-mono2 text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#264653] mb-5">
            {'//'} {profile.name} — {profile.location}
          </motion.p>

          <h1 className="font-display font-bold leading-[0.92] tracking-tight text-[clamp(3.2rem,9vw,7.5rem)]">
            <motion.span variants={word} className="block">
              AI/ML
            </motion.span>
            <motion.span variants={word} className="block text-[#F4A261]">
              ENGINEER
            </motion.span>
            <motion.span variants={word} className="block text-[clamp(1.4rem,3.4vw,2.6rem)] font-medium text-[#161616]/80 mt-4 tracking-normal leading-tight">
              who ships models,
              <br />
              not just notebooks.
            </motion.span>
          </h1>

          <motion.p variants={word} className="mt-6 max-w-md text-[15px] md:text-base leading-relaxed text-[#161616]/70">
            {profile.summary}
          </motion.p>

          <motion.div variants={word} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-[#161616] text-[#F5F0E1] px-7 py-3.5 min-h-[44px] rounded-full font-mono2 text-xs uppercase tracking-[0.15em] hover:bg-[#264653] transition-colors"
            >
              see the work <span aria-hidden>↓</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-2 py-3.5 min-h-[44px] font-mono2 text-xs uppercase tracking-[0.15em] underline underline-offset-8 decoration-[#F4A261] decoration-2 hover:text-[#F4A261] transition-colors"
            >
              say hello ↗
            </a>
          </motion.div>

          <motion.div
            variants={word}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono2 text-[11px] uppercase tracking-[0.15em] text-[#161616]/55"
          >
            <span>{profile.location}</span>
            <ISTClock />
            <span className="inline-flex items-center gap-2 text-[#264653]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#62D282] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3d9e5f]" />
              </span>
              open to work
            </span>
          </motion.div>
        </motion.div>

        {/* cat column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-first lg:order-none h-[36vh] lg:h-[72vh] w-full"
        >
          {/* sun disc behind the cat */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E9C46A]/70"
            style={{ width: 'min(62%, 430px)', aspectRatio: '1' }}
          />
          <div className="absolute inset-0 cursor-pointer">
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-[#161616]/40 animate-pulse">
                    waking the cat…
                  </span>
                </div>
              }
            >
              <Cat />
            </Suspense>
          </div>
          <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono2 text-[11px] uppercase tracking-[0.2em] text-[#161616]/50">
            ( tap the cat )
          </p>
          <span aria-hidden className="absolute top-[12%] right-[8%] font-mono2 text-[#264653]/60 text-sm rotate-6">
            &gt; model.purr()
          </span>
        </motion.div>
      </div>

      {/* scroll hint */}
      <div className="relative z-10 pb-24 md:pb-8 flex justify-center">
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="font-mono2 text-[11px] uppercase tracking-[0.25em] text-[#161616]/40"
        >
          scroll ↓
        </motion.span>
      </div>
    </section>
  )
}
