import { useEffect, useRef } from 'react'
import Matter from 'matter-js'

export type PhysicsShapeConfig = {
  id: string
  size: number
}

const MOBILE_BREAKPOINT = 768
const WALL_THICKNESS = 120
const AVOID_MARGIN = 40
const REPEL_RADIUS = 140
const REPEL_STRENGTH = 0.55
const INTRO_GRAVITY = 1.1
const INTRO_MAX_MS = 3200
const INTRO_SETTLE_SPEED = 0.05

export function usePhysicsField(shapes: PhysicsShapeConfig[], options?: { gravityIntro?: boolean }) {
  const gravityIntro = options?.gravityIntro ?? false
  const containerRef = useRef<HTMLElement | null>(null)
  const avoidRef = useRef<HTMLDivElement | null>(null)
  const shapeElsRef = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const container = containerRef.current
    if (!container || shapes.length === 0) return
    if (window.innerWidth < MOBILE_BREAKPOINT) return

    const { Engine, World, Bodies, Body, Runner, Events } = Matter
    const width = container.clientWidth
    const height = container.clientHeight
    const engine = Engine.create({ gravity: { x: 0, y: gravityIntro ? INTRO_GRAVITY : 0 } })
    const world = engine.world

    const walls = [
      Bodies.rectangle(width / 2, height + WALL_THICKNESS / 2, width + WALL_THICKNESS * 2, WALL_THICKNESS, {
        isStatic: true,
      }),
      Bodies.rectangle(-WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height + WALL_THICKNESS * 2, {
        isStatic: true,
      }),
      Bodies.rectangle(width + WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height + WALL_THICKNESS * 2, {
        isStatic: true,
      }),
    ]
    if (!gravityIntro) {
      walls.push(
        Bodies.rectangle(width / 2, -WALL_THICKNESS / 2, width + WALL_THICKNESS * 2, WALL_THICKNESS, {
          isStatic: true,
        }),
      )
    }
    World.add(world, walls)

    let avoidBox: { x: number; y: number; w: number; h: number } | null = null
    const avoidEl = avoidRef.current
    if (avoidEl) {
      const rect = avoidEl.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      avoidBox = {
        x: rect.left - containerRect.left - AVOID_MARGIN,
        y: rect.top - containerRect.top - AVOID_MARGIN,
        w: rect.width + AVOID_MARGIN * 2,
        h: rect.height + AVOID_MARGIN * 2,
      }
      World.add(
        world,
        Bodies.rectangle(avoidBox.x + avoidBox.w / 2, avoidBox.y + avoidBox.h / 2, avoidBox.w, avoidBox.h, {
          isStatic: true,
        }),
      )
    }

    const bodies = shapes.map((s, i) => {
      let x = width / 2
      let y = height / 2
      if (gravityIntro) {
        x = s.size + Math.random() * Math.max(1, width - s.size * 2)
        y = -(s.size + Math.random() * 500 + i * 40)
      } else {
        for (let attempt = 0; attempt < 30; attempt++) {
          x = s.size + Math.random() * Math.max(1, width - s.size * 2)
          y = s.size + Math.random() * Math.max(1, height - s.size * 2)
          if (!avoidBox) break
          if (x < avoidBox.x || x > avoidBox.x + avoidBox.w || y < avoidBox.y || y > avoidBox.y + avoidBox.h) break
        }
      }
      const body = Bodies.circle(x, y, s.size / 2, {
        restitution: 0.85,
        friction: 0,
        frictionAir: 0.015,
        density: 0.0012,
      })
      if (gravityIntro) {
        Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.2, y: 0 })
      } else {
        Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.6, y: (Math.random() - 0.5) * 1.6 })
      }
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04)
      return { id: s.id, body, size: s.size }
    })
    World.add(
      world,
      bodies.map((b) => b.body),
    )

    const pointer = { x: -9999, y: -9999, active: false }

    const beforeUpdate = () => {
      if (!pointer.active) return
      for (const { body } of bodies) {
        const dx = body.position.x - pointer.x
        const dy = body.position.y - pointer.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.01
        if (dist < REPEL_RADIUS) {
          const push = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
          Body.setVelocity(body, {
            x: body.velocity.x + (dx / dist) * push,
            y: body.velocity.y + (dy / dist) * push,
          })
        }
      }
    }
    Events.on(engine, 'beforeUpdate', beforeUpdate)

    if (gravityIntro) {
      const checkSettle = () => {
        const elapsed = engine.timing.timestamp
        const avgSpeed = bodies.reduce((sum, { body }) => sum + Math.hypot(body.velocity.x, body.velocity.y), 0) / bodies.length
        if (elapsed > INTRO_MAX_MS || (elapsed > 1500 && avgSpeed < INTRO_SETTLE_SPEED)) {
          world.gravity.y = 0
          Events.off(engine, 'afterUpdate', checkSettle)
        }
      }
      Events.on(engine, 'afterUpdate', checkSettle)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const handleMouseLeave = () => {
      pointer.active = false
    }
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    const runner = Runner.create()
    let raf = 0

    const renderLoop = () => {
      for (const { id, body, size } of bodies) {
        const el = shapeElsRef.current[id]
        if (el) {
          el.style.transform = `translate(${body.position.x - size / 2}px, ${body.position.y - size / 2}px) rotate(${body.angle}rad)`
        }
      }
      raf = requestAnimationFrame(renderLoop)
    }
    renderLoop()
    Runner.run(runner, engine)

    return () => {
      cancelAnimationFrame(raf)
      Runner.stop(runner)
      Events.off(engine, 'beforeUpdate', beforeUpdate)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      World.clear(world, false)
      Engine.clear(engine)
    }
  }, [shapes])

  const setShapeRef = (id: string) => (el: HTMLDivElement | null) => {
    shapeElsRef.current[id] = el
  }

  return { containerRef, avoidRef, setShapeRef }
}
