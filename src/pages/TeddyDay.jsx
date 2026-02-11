import React, { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './TeddyDay.css'

function TeddyDay() {
  const assetUrl = (fileName) => `${import.meta.env.BASE_URL}teddy-day/${fileName}`
  const teddySoundUrl = `${import.meta.env.BASE_URL}sound/teddy.mp3`
  const sadSoundUrl = `${import.meta.env.BASE_URL}sound/sad.mp3`
  const awwwSoundUrl = `${import.meta.env.BASE_URL}sound/awww.mp3`
  const [isSpinning, setIsSpinning] = useState(false)
  const reactionsLayerRef = useRef(null)

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

  const launchReactions = (emojis) => {
    const layer = reactionsLayerRef.current
    if (!layer) return
    const totalBursts = 12
    for (let i = 0; i < totalBursts; i += 1) {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)]
      const particle = document.createElement('span')
      particle.className = 'teddy-reaction'
      particle.textContent = emoji
      particle.style.left = `${Math.random() * 90 + 5}%`
      particle.style.setProperty('--x-shift', `${Math.random() * 80 - 40}px`)
      particle.style.animationDuration = `${Math.random() * 1.6 + 3.2}s`
      particle.style.animationDelay = `${Math.random() * 0.4}s`
      layer.appendChild(particle)

      setTimeout(() => {
        particle.remove()
      }, 5200)
    }
  }

  return (
    <div className="teddy-container">
      <div className="teddy-reactions" ref={reactionsLayerRef}></div>
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
          <h2>Do you love peddy or Puttu ko Muttu?</h2>
          <div className="teddy-options">
            <button
              type="button"
              className="teddy-option-button"
              onClick={() => {
                playSound(sadSoundUrl)
                launchReactions(['🥺', '😔', '☹️', '😢', '🧸'])
              }}
            >
              peddy
            </button>
            <button
              type="button"
              className="teddy-option-button"
              onClick={() => {
                playSound(awwwSoundUrl)
                launchReactions(['🧸', '💖', '😍', '🥰', '✨'])
              }}
            >
              Puttu ko Muttu
            </button>
          </div>
        </div>

        <Link to="/" className="nav-link">Back to Portal 🏠</Link>
      </div>
    </div>
  )
}

export default TeddyDay
