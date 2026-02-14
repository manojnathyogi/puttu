import React, { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import './KissDay.css'

function KissDay() {
  const assetUrl = (fileName) => `${import.meta.env.BASE_URL}kiss-day/${fileName}`
  const kissSoundUrl = `${import.meta.env.BASE_URL}sound/Kiss (Tarkan).mp3`
  const reactionsLayerRef = useRef(null)
  const soundRef = useRef(null)

  const kissImages = useMemo(
    () => ['IMG_5310.JPG', 'IMG_5592.JPG', 'IMG_5603.JPG'],
    []
  )

  const playKissSound = () => {
    if (!soundRef.current) {
      soundRef.current = new Audio(kissSoundUrl)
    }
    soundRef.current.currentTime = 0
    soundRef.current.play().catch(() => {})
  }

  const launchKisses = () => {
    const layer = reactionsLayerRef.current
    if (!layer) return
    const emojis = ['💋', '😘', '😚', '😗', '😙', '💖']
    const count = 6

    for (let i = 0; i < count; i += 1) {
      const emoji = document.createElement('span')
      emoji.className = 'kiss-float'
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]
      emoji.style.left = `${10 + Math.random() * 80}%`
      emoji.style.animationDuration = `${3 + Math.random() * 2}s`
      emoji.style.transform = `rotate(${Math.random() * 360}deg)`
      layer.appendChild(emoji)

      setTimeout(() => {
        emoji.remove()
      }, 6000)
    }
  }

  const handleClick = () => {
    playKissSound()
    launchKisses()
  }

  return (
    <div className="kiss-container">
      <Link to="/valentine" className="back-button">← Back</Link>
      <div className="kiss-card">
        <h1>Kiss Day 💋</h1>
        <p className="kiss-subtitle">Shower of chocolates!!</p>

        <div className="kiss-gallery">
          {kissImages.map((image) => (
            <button key={image} type="button" className="kiss-image-button" onClick={handleClick}>
              <img src={assetUrl(image)} alt="Kiss day memory" />
            </button>
          ))}
        </div>

        <h2 className="kiss-question">What&apos;s your favorite???</h2>
        <p className="kiss-hint">Click on an image above 💖</p>
        <Link to="/" className="nav-link">Back to Portal 🏠</Link>
      </div>
      <div className="kiss-reactions" ref={reactionsLayerRef}></div>
    </div>
  )
}

export default KissDay
