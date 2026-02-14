import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import './HugDay.css'

function HugDay() {
  const assetUrl = (fileName) => `${import.meta.env.BASE_URL}hug-day/${fileName}`
  const awwwSoundUrl = `${import.meta.env.BASE_URL}sound/awww.mp3`
  const sliderMin = -100
  const sliderMax = 100
  const [cozyChoice, setCozyChoice] = useState(null)
  const [cozyLevel, setCozyLevel] = useState('0')
  const suppressSaveRef = useRef(false)
  const lastSavedRef = useRef({ cozyChoice: null, cozyLevel: '0' })
  const currentRef = useRef({ cozyChoice: null, cozyLevel: '0' })
  const soundRef = useRef(null)

  const playAwww = () => {
    if (!awwwSoundUrl) return
    if (!soundRef.current) {
      soundRef.current = new Audio(awwwSoundUrl)
    }
    soundRef.current.currentTime = 0
    soundRef.current.play().catch(() => {})
  }

  const normalizeIncomingLevel = (value) => {
    if (value === '+∞') return String(sliderMax)
    if (value === '-∞') return String(sliderMin)
    return value ?? '0'
  }

  const serializeLevel = (value) => {
    if (value === String(sliderMax)) return '+∞'
    if (value === String(sliderMin)) return '-∞'
    return value
  }

  useEffect(() => {
    const cozyDocRef = doc(db, 'hug-day', 'cozy')
    const unsubscribe = onSnapshot(cozyDocRef, (snapshot) => {
      if (!snapshot.exists()) return
      const data = snapshot.data()
      const nextChoice = data.cozyChoice ?? null
      const rawLevel = data.cozyLevel ?? '0'
      const nextLevel = normalizeIncomingLevel(rawLevel)
      const serializedLevel = serializeLevel(nextLevel)
      if (nextChoice === currentRef.current.cozyChoice && nextLevel === currentRef.current.cozyLevel) {
        return
      }
      suppressSaveRef.current = true
      lastSavedRef.current = { cozyChoice: nextChoice, cozyLevel: serializedLevel }
      currentRef.current = { cozyChoice: nextChoice, cozyLevel: nextLevel }
      setCozyChoice(nextChoice)
      setCozyLevel(nextLevel)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (suppressSaveRef.current) {
      suppressSaveRef.current = false
      return
    }
    const payload = { cozyChoice, cozyLevel: serializeLevel(cozyLevel) }
    const lastSaved = lastSavedRef.current
    if (payload.cozyChoice === lastSaved.cozyChoice && payload.cozyLevel === lastSaved.cozyLevel) return
    lastSavedRef.current = payload
    currentRef.current = { cozyChoice, cozyLevel }
    const cozyDocRef = doc(db, 'hug-day', 'cozy')
    setDoc(cozyDocRef, { ...payload, updatedAt: serverTimestamp() }, { merge: true }).catch(() => {
      // Ignore save errors silently
    })
  }, [cozyChoice, cozyLevel])

  return (
    <div className="hug-container">
      <Link to="/valentine" className="back-button">← Back</Link>

      <div className="hug-card">
        <h1>Hug Day 🤗</h1>
        <p className="hug-subtitle">Promise to keep you and us cozy</p>

        <div className="hug-image">
          <img src={assetUrl('104_3478.jpg')} alt="Hug day memory" />
        </div>

        <div className="hug-questions">
          <div className="hug-question">
            <h2>Do you want to be cozy?</h2>
            <div className="hug-options">
              <button
                type="button"
                className={`hug-option ${cozyChoice === 'Yes' ? 'active' : ''}`}
                onClick={() => setCozyChoice('Yes')}
              >
                Yes
              </button>
              <button
                type="button"
                className={`hug-option ${cozyChoice === 'No' ? 'active' : ''}`}
                onClick={() => setCozyChoice('No')}
              >
                No
              </button>
            </div>
          </div>

          <div className="hug-question">
            <h2>how much cozy do you feel with me?</h2>
            <div className="hug-scale">
              <span className="hug-scale-label">-∞</span>
              <input
                type="range"
                min={sliderMin}
                max={sliderMax}
                step="1"
                value={cozyLevel}
                onChange={(event) => setCozyLevel(event.target.value)}
                onMouseUp={playAwww}
                onTouchEnd={playAwww}
                onKeyUp={(event) => {
                  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                    playAwww()
                  }
                }}
                className="hug-input"
              />
              <span className="hug-value">
                {cozyLevel === String(sliderMin) ? '-∞' : cozyLevel === String(sliderMax) ? '+∞' : cozyLevel}
              </span>
              <span className="hug-scale-label">+∞</span>
            </div>
          </div>
        </div>

        <Link to="/" className="nav-link">Back to Portal 🏠</Link>
      </div>
    </div>
  )
}

export default HugDay
