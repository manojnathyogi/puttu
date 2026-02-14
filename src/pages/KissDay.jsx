import React, { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './KissDay.css'

function KissDay() {
  const assetUrl = (fileName) => `${import.meta.env.BASE_URL}kiss-day/${fileName}`
  const kissSoundUrl = `${import.meta.env.BASE_URL}sound/Kiss (Tarkan).mp3`
  const sadSoundUrl = `${import.meta.env.BASE_URL}sound/sad.mp3`
  const reactionsLayerRef = useRef(null)
  const soundRef = useRef(null)
  const sadSoundRef = useRef(null)

  const kissImages = useMemo(
    () => [
      { src: 'IMG_5310.JPG', text: 'your fav' },
      { src: 'IMG_5592.JPG', text: 'my fav' },
      { src: 'IMG_5603.JPG', text: 'kisses chocolates' }
    ],
    []
  )
  const [flippedImage, setFlippedImage] = useState(null)
  const flipTimeoutRef = useRef(null)

  const playKissSound = () => {
    if (!soundRef.current) {
      soundRef.current = new Audio(kissSoundUrl)
    }
    soundRef.current.currentTime = 0
    soundRef.current.play().catch(() => {})
  }

  const playSadSound = () => {
    if (!sadSoundRef.current) {
      sadSoundRef.current = new Audio(sadSoundUrl)
    }
    sadSoundRef.current.currentTime = 0
    sadSoundRef.current.play().catch(() => {})
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

  const handleClick = (image) => {
    playKissSound()
    launchKisses()
    setFlippedImage(image)
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current)
    }
    flipTimeoutRef.current = setTimeout(() => {
      setFlippedImage(null)
    }, 1400)
  }

  const handleNone = () => {
    playSadSound()
    const layer = reactionsLayerRef.current
    if (!layer) return
    const emojis = ['😔', '☹️', '😢', '😞', '😭']
    const count = 10

    for (let i = 0; i < count; i += 1) {
      const emoji = document.createElement('span')
      emoji.className = 'kiss-float sad'
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]
      emoji.style.left = `${5 + Math.random() * 90}%`
      emoji.style.animationDuration = `${3 + Math.random() * 2.5}s`
      emoji.style.transform = `rotate(${Math.random() * 360}deg)`
      layer.appendChild(emoji)

      setTimeout(() => {
        emoji.remove()
      }, 6500)
    }
  }

  return (
    <div className="kiss-container">
      <Link to="/valentine" className="back-button">← Back</Link>
      <div className="kiss-card">
        <h1>Kiss Day 💋</h1>
        <p className="kiss-subtitle">Shower of chocolates!!</p>

        <div className="kiss-gallery">
          {kissImages.map((image) => (
            <button
              key={image.src}
              type="button"
              className={`kiss-image-button ${flippedImage === image.src ? 'flipped' : ''}`}
              onClick={() => handleClick(image.src)}
            >
              <span className="kiss-card-inner">
                <span className="kiss-card-face kiss-card-front">
                  <img src={assetUrl(image.src)} alt="Kiss day memory" />
                </span>
                <span className="kiss-card-face kiss-card-back">
                  {image.text}
                </span>
              </span>
            </button>
          ))}
        </div>

        <h2 className="kiss-question">What&apos;s your favorite???</h2>
        <button type="button" className="kiss-none" onClick={handleNone}>None</button>
        <Link to="/" className="nav-link">Back to Portal 🏠</Link>
      </div>
      <div className="kiss-reactions" ref={reactionsLayerRef}></div>
    </div>
  )
}

export default KissDay
