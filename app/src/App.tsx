import Nav from './sections/Nav'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import About from './sections/About'
import Projects from './sections/Projects'
import Education from './sections/Education'
import Contact from './sections/Contact'

export default function App() {
  return (
    <main className="bg-[#F5F0E1] text-[#161616] min-h-svh">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Education />
      <Contact />
    </main>
  )
}
