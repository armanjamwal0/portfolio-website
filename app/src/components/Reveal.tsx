import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionLabel({ index, title, dark = false }: { index: string; title: string; dark?: boolean }) {
  return (
    <Reveal>
      <p
        className={`font-mono2 text-[11px] md:text-xs uppercase tracking-[0.25em] mb-4 ${
          dark ? 'text-[#E9C46A]' : 'text-[#264653]'
        }`}
      >
        {index} / {title}
      </p>
    </Reveal>
  )
}
