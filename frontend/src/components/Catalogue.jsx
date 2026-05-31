import { motion } from 'framer-motion'

const defects = [
  { name: 'Scratches', severity: 'medium', desc: 'Linear surface marks from abrasive contact during handling or processing.', icon: '╱' },
  { name: 'Patches', severity: 'medium', desc: 'Discolored areas caused by oxidation, contamination, or uneven rolling.', icon: '▪' },
  { name: 'Slivers', severity: 'high', desc: 'Thin steel flakes partially attached to the surface from inclusions in rolling.', icon: '⌇' },
  { name: 'Rolled-in Scale', severity: 'high', desc: 'Iron oxide scale pressed into the surface during hot rolling process.', icon: '▒' },
  { name: 'Pits / Pitting', severity: 'medium', desc: 'Small cavities from scale removal, corrosion, or hydrogen embrittlement.', icon: '⁙' },
  { name: 'Cracks', severity: 'high', desc: 'Fracture lines from thermal stress or excessive deformation in processing.', icon: '⚡' },
  { name: 'Inclusion', severity: 'high', desc: 'Non-metallic particles trapped in the steel during steelmaking.', icon: '◈' }
]

const sevConfig = {
  high: { label: 'CRITICAL', bg: '#fef2f2', color: '#dc2626', border: '#fecaca', glow: 'rgba(220,38,38,0.08)' },
  medium: { label: 'WARNING', bg: '#fffbeb', color: '#d97706', border: '#fde68a', glow: 'rgba(217,119,6,0.08)' }
}

export default function Catalogue() {
  return (
    <section id="catalogue" style={{
      padding: '7rem 2rem',
      background: 'white',
      borderTop: '1px solid var(--border)'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div className="section-tag">Reference</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-1.5px' }}>
            Defect Catalogue
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: '16px', marginTop: '1rem' }}>
            7 classified categories the AI is trained to detect
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          {defects.map((defect, i) => {
            const sc = sevConfig[defect.severity]
            return (
              <motion.div
                key={defect.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  rotateX: 3,
                  rotateY: 3,
                  boxShadow: `0 24px 60px ${sc.glow}`
                }}
                style={{
                  background: 'white',
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  padding: '2rem',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '3px',
                  background: defect.severity === 'high'
                    ? 'linear-gradient(90deg, #ef4444, #f97316)'
                    : 'linear-gradient(90deg, #f59e0b, #eab308)'
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '48px', height: '48px',
                    background: sc.bg,
                    border: `1px solid ${sc.border}`,
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', color: sc.color
                  }}>{defect.icon}</div>
                  <span style={{
                    fontSize: '10px',
                    fontFamily: 'DM Mono, monospace',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: sc.bg,
                    color: sc.color,
                    border: `1px solid ${sc.border}`
                  }}>{sc.label}</span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.2px' }}>{defect.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>{defect.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}