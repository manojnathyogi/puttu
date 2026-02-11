import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './TeddyDay.css'

function TeddyDay() {
  const assetUrl = (fileName) => `${import.meta.env.BASE_URL}teddy-day/${fileName}`
  const teddySoundUrl = `${import.meta.env.BASE_URL}sound/teddy.mp3`
  const sadSoundUrl = `${import.meta.env.BASE_URL}sound/sad.mp3`
  const awwwSoundUrl = `${import.meta.env.BASE_URL}sound/awww.mp3`
  const [isSpinning, setIsSpinning] = useState(false)

  const teddyParticles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: `teddy-${index}`,
        left: Math.random() * 90 + 5,
        delay: Math.random() * 3,
        duration: Math.random() * 4 + 6,
        size: Math.random() * 12 + 18
      })),
    []
  )

  const playSound = (url) => {
    try {
      const audio = new Audio(url)
      audio.volume = 0.85
      audio.play().catch(() => {
        // Ignore autoplay errors if blocked.
      })
    } catch (error) {
      // Ignore audio errors silently
    }
  }

  return (
    <div className="teddy-container">
      <div className="teddy-float-layer">
        {teddyParticles.map((particle) => (
          <span
            key={particle.id}
            className="teddy-float"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              fontSize: `${particle.size}px`
            }}
          >
            🧸
          </span>
        ))}
      </div>

      <Link to="/valentine" className="back-button">← Back</Link>

      <div className="teddy-card">
        <h1>Happy Teddy Day!!</h1>
        <p className="teddy-comment">cutie puttu muttu and her new collection</p>

        <div className="teddy-content">
          <div className="teddy-rotate-wrap">
            <img
              src={assetUrl('teddy.png')}
              alt="Teddy"
              className={`teddy-rotate ${isSpinning ? 'spin-once' : ''}`}
              onClick={() => {
                if (isSpinning) return
                setIsSpinning(true)
                try {
                  const audio = new Audio(teddySoundUrl)
                  audio.volume = 0.85
                  audio.play().catch(() => {
                    // Ignore autoplay errors if blocked.
                  })
                } catch (error) {
                  // Ignore audio errors silently
                }
                setTimeout(() => {
                  setIsSpinning(false)
                }, 1100)
              }}
            />
          </div>
          <div className="teddy-photo-wrap">
            <img
              src={assetUrl('IMG_4234.jpg')}
              alt="Teddy day memory"
              className="teddy-photo"
            />
          </div>
        </div>

        <div className="teddy-question">
          <h2>Do you love peddy or Mannu?</h2>
          <div className="teddy-options">
            <button type="button" className="teddy-option-button" onClick={() => playSound(sadSoundUrl)}>
              peddy
            </button>
            <button type="button" className="teddy-option-button" onClick={() => playSound(awwwSoundUrl)}>
              Mannu
            </button>
          </div>
        </div>

        <Link to="/" className="nav-link">Back to Portal 🏠</Link>
      </div>
    </div>
  )
}

export default TeddyDay
