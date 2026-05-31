import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
    title: 'Upload Image',
    desc: 'Drag and drop or click to upload any steel surface photograph in JPG, PNG, or WEBP format.',
    color: 'var(--accent)',
    glow: 'rgba(99,102,241,0.12)'
  },
  {
    num: '02',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    title: 'AI Scans Surface',
    desc: 'Gemini Vision AI analyzes texture patterns and matches against our 7-category defect catalogue in real time.',
    color: 'var(--teal)',
    glow: 'rgba(20,184,166,0.12)'
  },
  {
    num: '03',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    title: 'Get Results',
    desc: 'Receive defect classification, confidence score, severity rating, and actionable recommendations instantly.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.12)'
  }
]

export default function HowItWorks() {
  return (
    <section id="howitworks" style={{
      padding: '7rem 2rem',
      background: 'white',
      borderTop: '1px solid var(--border)'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <div className="section-tag">Process</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1 }}>
            How it works
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: '16px', marginTop: '1rem', maxWidth: '440px', margin: '1rem auto 0' }}>
            From upload to insight in under 3 seconds
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, boxShadow: `0 20px 60px ${step.glow}` }}
              style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                padding: '2.5rem',
                cursor: 'default',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute', top: '-20px', right: '-10px',
                fontFamily: 'DM Mono, monospace',
                fontSize: '80px', fontWeight: 500,
                color: 'rgba(0,0,0,0.04)',
                lineHeight: 1, userSelect: 'none'
              }}>{step.num}</div>

              <div style={{
                width: '52px', height: '52px',
                background: step.glow,
                border: `1px solid ${step.color}30`,
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: step.color,
                marginBottom: '1.5rem'
              }}>{step.icon}</div>

              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', letterSpacing: '-0.3px' }}>{step.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.7 }}>{step.desc}</p>

              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${step.color}, transparent)`,
                borderRadius: '0 0 20px 20px'
              }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}