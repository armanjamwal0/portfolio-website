import { useEffect, useState } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* desktop / tablet top bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#F5F0E1]/90 backdrop-blur-md border-b border-[#161616]/10' : ''
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="font-mono2 font-bold text-sm tracking-tight">
            arman<span className="text-[#F4A261]">✦</span>jamwal
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono2 text-xs uppercase tracking-[0.15em] text-[#161616]/70 hover:text-[#161616] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:armanjamwal129@gmail.com"
              className="font-mono2 text-xs uppercase tracking-[0.15em] bg-[#161616] text-[#F5F0E1] px-5 py-2.5 rounded-full hover:bg-[#264653] transition-colors"
            >
              Hire me
            </a>
          </nav>
          {/* mobile: just the badge up top */}
          <span className="md:hidden inline-flex items-center gap-2 font-mono2 text-[10px] uppercase tracking-[0.12em] text-[#264653]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#62D282] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3d9e5f]" />
            </span>
            open to work
          </span>
        </div>
      </header>

      {/* mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-bottom">
        <div className="mx-3 mb-3 rounded-2xl bg-[#161616] text-[#F5F0E1] shadow-[0_8px_30px_rgba(22,22,22,0.35)] flex justify-around px-2 py-1.5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono2 text-[10px] uppercase tracking-[0.12em] px-3 py-3 min-h-[44px] flex items-center text-[#F5F0E1]/80 active:text-[#F4A261]"
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
