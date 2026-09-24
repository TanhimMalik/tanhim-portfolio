import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Impact } from './components/Impact'
import { Work } from './components/Work'

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Impact />
        <Work />
      </main>
    </>
  )
}

export default App
