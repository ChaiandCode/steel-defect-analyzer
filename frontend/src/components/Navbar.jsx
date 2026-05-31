import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 1000,
      padding: '0 2rem',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'rgba(248,250,252,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
        <span style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.3px' }}>SteelScan<span style={{ color: 'var(--accent)' }}>.ai</span></span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {['How It Works', 'Analyzer', 'Catalogue'].map(item => (
          <a key={item}
            href={`#${item.toLowerCase().replace(/ /g, '')}`}
            style={{
              fontSize: '13px', fontWeight: 500,
              color: 'var(--text2)',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
            onMouseLeave={e => e.target.style.color = 'var(--text2)'}
          >{item}</a>
        ))}
        <a href="#analyzer" style={{
          background: 'var(--accent)',
          color: 'white',
          padding: '8px 20px',
          borderRadius: '100px',
          fontSize: '13px',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'opacity 0.2s'
        }}>Try Free</a>
      </div>
    </nav>
  )
}