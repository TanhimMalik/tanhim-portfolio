import { useHorizontalScroll } from './hooks/useHorizontalScroll'
import { Nav } from './components/Nav'
import { NextButton } from './components/NextButton'
import { Hero } from './components/panels/Hero'
import { About } from './components/panels/About'
import { ExperienceItem } from './components/panels/ExperienceItem'
import { Projects } from './components/panels/Projects'
import { Skills } from './components/panels/Skills'
import { Contact } from './components/panels/Contact'
import type { PhysicsShapeSpec } from './components/Shapes'
import { experience, panelThemes } from './data'

const PANEL_COUNT = 7

const TRIPADVISOR_SHAPES: PhysicsShapeSpec[] = [
  { id: 'exp1-1', kind: 'circle', size: 150, color: panelThemes[2].accent, opacity: 0.95 },
  { id: 'exp1-2', kind: 'triangle', size: 60, color: '#ffffff', opacity: 0.2 },
  { id: 'exp1-3', kind: 'ring', size: 80, color: '#ffffff', opacity: 0.3 },
  { id: 'exp1-4', kind: 'circle', size: 40, color: panelThemes[2].accent, opacity: 0.6 },
  { id: 'exp1-5', kind: 'square', size: 50, color: '#ffffff', opacity: 0.15 },
  { id: 'exp1-6', kind: 'circle', size: 26, color: panelThemes[2].accent, opacity: 0.8 },
  { id: 'exp1-7', kind: 'star', size: 70, color: '#ffffff', opacity: 0.15 },
]

const JEFFERIES_SHAPES: PhysicsShapeSpec[] = [
  { id: 'exp2-1', kind: 'square', size: 110, color: panelThemes[3].accent, opacity: 0.85 },
  { id: 'exp2-2', kind: 'circle', size: 50, color: panelThemes[3].accent, opacity: 0.7 },
  { id: 'exp2-3', kind: 'ring', size: 90, color: '#101010', opacity: 0.2 },
  { id: 'exp2-4', kind: 'triangle', size: 55, color: panelThemes[3].accent, opacity: 0.6 },
  { id: 'exp2-5', kind: 'circle', size: 30, color: '#101010', opacity: 0.15 },
  { id: 'exp2-6', kind: 'square', size: 34, color: panelThemes[3].accent, opacity: 0.5 },
]

function App() {
  const { containerRef, trackRef, activeIndex, scrollToIndex, isScrolling } = useHorizontalScroll(PANEL_COUNT)

  return (
    <>
      <Nav activeIndex={activeIndex} onNavigate={scrollToIndex} theme={panelThemes[activeIndex]} isScrolling={isScrolling} />
      <div ref={containerRef} className="relative md:h-screen md:overflow-hidden">
        <div ref={trackRef} className="flex w-max flex-col md:h-screen md:flex-row">
          <Hero active={activeIndex === 0} />
          <About active={activeIndex === 1} />
          <ExperienceItem
            id="panel-2"
            index="03"
            job={experience[0]}
            theme={panelThemes[2]}
            active={activeIndex === 2}
            shapes={TRIPADVISOR_SHAPES}
          />
          <ExperienceItem
            id="panel-3"
            index="04"
            job={experience[1]}
            theme={panelThemes[3]}
            active={activeIndex === 3}
            shapes={JEFFERIES_SHAPES}
          />
          <Projects active={activeIndex === 4} />
          <Skills active={activeIndex === 5} />
          <Contact active={activeIndex === 6} />
        </div>
      </div>
      <NextButton
        activeIndex={activeIndex}
        panelCount={PANEL_COUNT}
        theme={panelThemes[activeIndex]}
        onClick={() => scrollToIndex(Math.min(activeIndex + 1, PANEL_COUNT - 1))}
      />
    </>
  )
}

export default App
