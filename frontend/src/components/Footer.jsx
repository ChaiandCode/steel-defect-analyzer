export default function Footer() {
  return (
    <footer style={{
      padding: '4rem 2rem 2rem',
      background: 'var(--dark)',
      borderTop: '1px solid var(--border)'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{
                width: '32px', height: '32px',
                background: 'linear-gradient(135deg, var(--accent), var(--teal))',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: '16px', color: 'white', letterSpacing: '-0.3px' }}>
                SteelScan<span style={{ color: 'var(--accent2)' }}>.ai</span>
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', maxWidth: '260px', lineHeight: 1.6 }}>
              AI-powered steel surface defect detection for industrial quality control.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            {[
              { title: 'Product', links: ['Analyzer', 'Catalogue', 'How It Works'] },
              { title: 'Tech Stack', links: ['React + Vite', 'Python FastAPI', 'Groq Vision AI'] }
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'DM Mono, monospace', letterSpacing: '1.5px', marginBottom: '1rem', textTransform: 'uppercase' }}>{col.title}</div>
                {col.links.map(link => (
                  <div key={link} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>{link}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', fontFamily: 'DM Mono, monospace' }}>
            © 2026 SteelScan.ai · All rights reserved
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', fontFamily: 'DM Mono, monospace' }}>
            Made with ♥ by <span style={{ color: 'var(--accent2)' }}>Satyam Anand</span>
          </p>
        </div>
      </div>
    </footer>
  )
}