export type ShapeKind = 'circle' | 'square' | 'triangle' | 'ring' | 'star'

export type PhysicsShapeSpec = {
  id: string
  kind: ShapeKind
  size: number
  color: string
  opacity?: number
}

function StarPolygon({ size, color }: { size: number; color: string }) {
  const points = 10
  const outer = size / 2
  const inner = outer * 0.45
  const coords = Array.from({ length: points * 2 }, (_, i) => {
    const radius = i % 2 === 0 ? outer : inner
    const angle = (Math.PI / points) * i - Math.PI / 2
    return `${outer + radius * Math.cos(angle)},${outer + radius * Math.sin(angle)}`
  }).join(' ')

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <polygon points={coords} fill={color} />
    </svg>
  )
}

export function ShapeVisual({ kind, size, color, opacity = 1 }: { kind: ShapeKind; size: number; color: string; opacity?: number }) {
  switch (kind) {
    case 'circle':
      return <div style={{ width: size, height: size, borderRadius: '9999px', backgroundColor: color, opacity }} />
    case 'square':
      return <div style={{ width: size, height: size, backgroundColor: color, opacity }} />
    case 'ring':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: '9999px',
            border: `${Math.max(3, size * 0.07)}px solid ${color}`,
            opacity,
          }}
        />
      )
    case 'triangle':
      return (
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
            opacity,
          }}
        />
      )
    case 'star':
      return (
        <div style={{ opacity }}>
          <StarPolygon size={size} color={color} />
        </div>
      )
  }
}
