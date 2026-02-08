import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Portal.css'

function Portal() {
  useEffect(() => {
    const heartsContainer = document.getElementById('hearts')
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '💜', '🌹', '💋', '🎉']
    
    const interval = setInterval(() => {
      const heart = document.createElement('div')
      heart.className = 'heart'
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
      heart.style.left = Math.random() * 100 + '%'
      heart.style.animationDelay = Math.random() * 2 + 's'
      heart.style.animationDuration = (Math.random() * 3 + 4) + 's'
      heartsContainer.appendChild(heart)
      
      setTimeout(() => {
        heart.remove()
      }, 7000)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="portal-container">
      <div className="hearts" id="hearts"></div>
      
      <div className="main-container">
        <div className="side-nav">
          <Link to="/newyear" className="nav-button new-year">
            🎉<br />New Year<br />Letter
          </Link>
        </div>

        <div className="center-content">
          <h1 className="portal-title">Portal to Connect Virtually</h1>
          <p className="portal-subtitle">A gateway to our shared memories and moments 💕</p>
          
          <div className="images-container">
            <div className="image-placeholder">
              <img
                src={`${import.meta.env.BASE_URL}homepage/104_3443.JPEG`}
                alt="Homepage memory 1"
              />
            </div>
            <div className="image-placeholder">
              <img
                src={`${import.meta.env.BASE_URL}homepage/IMG_3682.jpg`}
                alt="Homepage memory 2"
              />
            </div>
            <div className="image-placeholder">
              <img
                src={`${import.meta.env.BASE_URL}homepage/IMG_3805.jpg`}
                alt="Homepage memory 3"
              />
            </div>
          </div>
        </div>

        <div className="side-nav">
          <Link to="/valentine" className="nav-button valentine">
            💕<br />Valentine's<br />Day
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Portal
