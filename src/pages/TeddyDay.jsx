import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import './TeddyDay.css'

function TeddyDay() {
  const assetUrl = (fileName) => `${import.meta.env.BASE_URL}teddy-day/${fileName}`

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
            <img src={assetUrl('teddy.png')} alt="Teddy" className="teddy-rotate" />
          </div>
          <div className="teddy-photo-wrap">
            <img
              src={assetUrl('IMG_4234.jpg')}
              alt="Teddy day memory"
              className="teddy-photo"
            />
          </div>
        </div>

        <Link to="/" className="nav-link">Back to Portal 🏠</Link>
      </div>
    </div>
  )
}

export default TeddyDay
