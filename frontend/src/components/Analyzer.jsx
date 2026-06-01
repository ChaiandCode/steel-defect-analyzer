import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const sevConfig = {
  high: { label: 'CRITICAL', bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  medium: { label: 'WARNING', bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
  low: { label: 'MINOR', bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' }
}

function ScanLine() {
  return (
    <motion.div
      style={{
        position: 'absolute', left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
        zIndex: 10,
        boxShadow: '0 0 12px var(--accent)'
      }}
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
    />
  )
}

function PulseRing() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ position: 'relative', width: '12px', height: '12px' }}>
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0.3
          }}
          animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <div style={{
          position: 'absolute', inset: '2px',
          borderRadius: '50%',
          background: 'var(--accent)'
        }} />
      </div>
      <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500, fontFamily: 'DM Mono, monospace' }}>Analyzing surface patterns…</span>
    </div>
  )
}

export default function Analyzer() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef()

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setResult(null)
    setError(null)
  }

  const analyze = async () => {
    if (!image) return
    setLoading(true)
    setError(null)
    const formData = new FormData()
    formData.append('file', image)
    try {
      const res = await axios.post('https://steelscan-backend.onrender.com/analyze', formData)
      setResult(res.data)
    } catch {
      setError('Analysis failed. Please try again in a moment.')
    }
    setLoading(false)
  }

  const reset = () => { setImage(null); setPreview(null); setResult(null); setError(null) }

  const sc = sevConfig[result?.details?.severity] || sevConfig.low

  return (
    <section id="analyzer" style={{
      padding: '7rem 2rem',
      background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
      borderTop: '1px solid var(--border)'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div className="section-tag">Live Tool</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-1.5px' }}>
            Surface Analyzer
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: '16px', marginTop: '1rem' }}>
            Upload a steel surface image and get instant AI-powered defect analysis
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: result ? '1fr 1fr' : '1fr',
          gap: '1.5rem',
          alignItems: 'start',
          maxWidth: result ? '100%' : '600px',
          margin: '0 auto',
          transition: 'all 0.4s ease'
        }}>
          {/* Upload Panel */}
          <motion.div layout className="glass-card" style={{ overflow: 'hidden' }}>
            {!preview ? (
              <div
                onClick={() => fileRef.current.click()}
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
                style={{
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: dragging ? 'rgba(99,102,241,0.06)' : 'transparent',
                  border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--border2)'}`,
                  borderRadius: '18px',
                  transition: 'all 0.2s',
                  margin: '1.5rem'
                }}
              >
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
                <motion.div
                  animate={{ y: dragging ? -8 : 0 }}
                  style={{
                    width: '64px', height: '64px',
                    background: 'var(--accent-glow)',
                    border: '1px solid var(--accent3)',
                    borderRadius: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: 'var(--accent)'
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </motion.div>
                <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>
                  {dragging ? 'Drop it here!' : 'Drop image or click to upload'}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text3)', fontFamily: 'DM Mono, monospace' }}>PNG · JPG · WEBP supported</p>
              </div>
            ) : (
              <div>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '18px 18px 0 0' }}>
                  <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '320px', objectFit: 'cover', display: 'block' }} />
                  {loading && <ScanLine />}
                  <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 12px', borderRadius: '100px',
                    fontSize: '11px', fontFamily: 'DM Mono, monospace',
                    color: 'var(--accent)', fontWeight: 500,
                    border: '1px solid var(--accent3)'
                  }}>{loading ? '⟳ SCANNING' : '✓ READY'}</div>
                </div>
                <div style={{ padding: '1.25rem', display: 'flex', gap: '10px' }}>
                  <button onClick={analyze} disabled={loading} style={{
                    flex: 1, padding: '13px',
                    background: loading ? 'var(--bg3)' : 'linear-gradient(135deg, var(--accent), #4f46e5)',
                    color: loading ? 'var(--text3)' : 'white',
                    border: 'none', borderRadius: '12px',
                    fontSize: '14px', fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: loading ? 'none' : '0 4px 16px rgba(99,102,241,0.35)',
                    transition: 'all 0.2s'
                  }}>
                    {loading ? '⟳ Analyzing...' : '⚡ Analyze Surface'}
                  </button>
                  <button onClick={reset} style={{
                    padding: '13px 16px',
                    background: 'var(--bg2)',
                    color: 'var(--text2)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}>↺</button>
                </div>
                {loading && (
                  <div style={{ padding: '0 1.25rem 1.25rem' }}>
                    <PulseRing />
                  </div>
                )}
              </div>
            )}

            {error && (
              <div style={{
                margin: '0 1.25rem 1.25rem',
                padding: '12px 16px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '10px',
                color: '#dc2626',
                fontSize: '13px'
              }}>{error}</div>
            )}
          </motion.div>

          {/* Result Panel */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="glass-card"
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  padding: '1.5rem',
                  borderBottom: '1px solid var(--border)',
                  background: 'white'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'DM Mono, monospace', marginBottom: '4px' }}>DETECTED DEFECT</div>
                      <div style={{
                        fontSize: '24px', fontWeight: 800,
                        letterSpacing: '-0.5px',
                        background: result.defect === 'No Defect Detected'
                          ? 'linear-gradient(135deg, #16a34a, #14b8a6)'
                          : 'linear-gradient(135deg, var(--accent), var(--teal))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>{result.defect}</div>
                    </div>
                    <div style={{
                      padding: '5px 12px',
                      borderRadius: '8px',
                      background: sc.bg,
                      color: sc.color,
                      border: `1px solid ${sc.border}`,
                      fontSize: '11px',
                      fontFamily: 'DM Mono, monospace',
                      fontWeight: 600,
                      whiteSpace: 'nowrap'
                    }}>{sc.label}</div>
                  </div>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'DM Mono, monospace', fontWeight: 600 }}>CONFIDENCE SCORE</span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent)' }}>{result.confidence}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--bg3)', borderRadius: '100px', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, var(--accent), var(--teal))',
                          borderRadius: '100px'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ padding: '1rem', background: 'var(--bg2)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'DM Mono, monospace', marginBottom: '6px', fontWeight: 600 }}>DESCRIPTION</div>
                    <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>{result.details?.description}</p>
                  </div>

                  <div style={{
                    padding: '1rem',
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(20,184,166,0.05))',
                    borderRadius: '12px',
                    border: '1px solid var(--accent3)',
                    borderLeft: '4px solid var(--accent)'
                  }}>
                    <div style={{ fontSize: '11px', color: 'var(--accent)', fontFamily: 'DM Mono, monospace', marginBottom: '6px', fontWeight: 600 }}>RECOMMENDATION</div>
                    <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{result.details?.recommendation}</p>
                  </div>

                  {result.alternatives?.length > 0 && (
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'DM Mono, monospace', marginBottom: '10px', fontWeight: 600 }}>OTHER POSSIBILITIES</div>
                      {result.alternatives.map(alt => (
                        <div key={alt.defect} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '7px' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text2)', width: '120px', flexShrink: 0 }}>{alt.defect}</span>
                          <div style={{ flex: 1, height: '4px', background: 'var(--bg3)', borderRadius: '100px', overflow: 'hidden' }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${alt.confidence}%` }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              style={{ height: '100%', background: 'var(--accent3)', borderRadius: '100px' }}
                            />
                          </div>
                          <span style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'DM Mono, monospace', minWidth: '32px', textAlign: 'right' }}>{alt.confidence}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}