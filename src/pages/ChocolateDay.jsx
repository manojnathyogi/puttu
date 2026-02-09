import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './ChocolateDay.css'

function ChocolateDay() {
  const [doorOpen, setDoorOpen] = useState(false)
  const [selected, setSelected] = useState([])
  const [showResult, setShowResult] = useState(false)
  const reactionLayerRef = useRef(null)

  const assetUrl = (fileName) => `${import.meta.env.BASE_URL}chocolate-day/${fileName}`
  const awwwUrl = `${import.meta.env.BASE_URL}sound/awww.mp3`

  const toggleChoice = (id) => {
    if (showResult) return
    setSelected((current) => {
      if (current.includes(id)) {
        return current.filter((option) => option !== id)
      }
      return [...current, id]
    })
  }

  const handleDone = () => {
    if (showResult) return
    setShowResult(true)
    playAwww()
    launchReactions()
  }

  const playAwww = () => {
    try {
      const audio = new Audio(awwwUrl)
      audio.volume = 0.8
      audio.play().catch(() => {
        // Ignore autoplay errors if blocked.
      })
    } catch (error) {
      // Ignore audio errors silently
    }
  }

  const launchReactions = () => {
    const layer = reactionLayerRef.current
    if (!layer) return
    const emojis = ['🍫', '🍬', '🍩', '🍪', '😍', '🥰', '😘', '💖', '✨']
    const totalBursts = 18
    for (let i = 0; i < totalBursts; i += 1) {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)]
      const particle = document.createElement('span')
      particle.className = 'chocolate-float'
      particle.textContent = emoji
      particle.style.left = `${Math.random() * 90 + 5}%`
      particle.style.setProperty('--x-shift', `${Math.random() * 80 - 40}px`)
      particle.style.animationDuration = `${Math.random() * 1.8 + 3.5}s`
      particle.style.animationDelay = `${Math.random() * 0.6}s`
      layer.appendChild(particle)

      setTimeout(() => {
        particle.remove()
      }, 6000)
    }
  }

  return (
    <div className="chocolate-container">
      <div className="chocolate-reactions" ref={reactionLayerRef}></div>
      <Link to="/valentine" className="back-button">← Back</Link>

      <div className="chocolate-card">
        <h1>Chocolate Day 🍫</h1>
        <p className="subtitle">
          even the sweetest chocolate cannot match your sweetness, still its Chocolate Day!!
        </p>

        {!doorOpen ? (
          <div className="door-stage">
            <div className="door-frame">
              <div className="door" onClick={() => setDoorOpen(true)}>
                <div className="door-knob"></div>
                <div className="door-text">Open the door</div>
              </div>
            </div>
            <p className="door-hint">Tap the door to open</p>
          </div>
        ) : (
          <div className="door-open">
            <img
              src={assetUrl('chocolate_hero1-d62e5444a8734f8d8fe91f5631d51ca5.jpg')}
              alt="Chocolate surprise"
            />
            <div className="door-message">
              <h2>Happy Chocolate Day!!</h2>
              <p>Chocolate is waiting for you at the door!</p>
            </div>
          </div>
        )}

        {doorOpen && (
          <div className="chocolate-question">
            <h3>Do you want more chocolates?</h3>
            <div className="choice-grid">
              {[
                { id: 'choice-1', file: 'IMG_5671.jpg' },
                { id: 'choice-2', file: 'chocolate_hero1-d62e5444a8734f8d8fe91f5631d51ca5.jpg' }
              ].map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  className={`choice-card ${selected.includes(choice.id) ? 'selected' : ''}`}
                  onClick={() => toggleChoice(choice.id)}
                  disabled={showResult}
                >
                  <img src={assetUrl(choice.file)} alt="Chocolate choice" />
                  <span className="choice-check">✓</span>
                </button>
              ))}
            </div>
            <button type="button" className="done-button" onClick={handleDone} disabled={showResult}>
              Done!!
            </button>

            {showResult && (
              <div className="result-message">Would have to wait until Saturday!!</div>
            )}
          </div>
        )}

        <Link to="/" className="nav-link">Back to Portal 🏠</Link>
      </div>
    </div>
  )
}

export default ChocolateDay
