import { useEffect, useRef } from 'react'
import Hero from './components/Hero'
import Analyzer from './components/Analyzer'
import HowItWorks from './components/HowItWorks'
import Catalogue from './components/Catalogue'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './index.css'

export default function App() {
  const cursorRef = useRef()
  const ringRef = useRef()

  useEffect(() => {
    const move = e => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      if (ringRef.current) {
        setTimeout(() => {
          ringRef.current.style.left = e.clientX + 'px'
          ringRef.current.style.top = e.clientY + 'px'
        }, 60)
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Analyzer />
      <Catalogue />
      <Footer />
    </>
  )
}