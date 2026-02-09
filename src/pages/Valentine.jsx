import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Valentine.css'

const roadmapDays = [
  { emoji: '🌹', date: 'February 7 (Saturday)', day: 'Rose Day', description: 'Gifting roses to express love or admiration.', active: true, link: '/rose-day' },
  { emoji: '❤️', date: 'February 8 (Sunday)', day: 'Propose Day', description: 'A day to express feelings or propose to a partner.', active: true, link: '/propose-day' },
  { emoji: '🍫', date: 'February 9 (Monday)', day: 'Chocolate Day', description: 'Sharing chocolates to sweeten the relationship.', active: true, link: '/chocolate-day' },
  { emoji: '🧸', date: 'February 10 (Tuesday)', day: 'Teddy Day', description: 'Gifting teddy bears or soft toys.', active: false },
  { emoji: '🤝', date: 'February 11 (Wednesday)', day: 'Promise Day', description: 'Making lasting commitments to each other.', active: false },
  { emoji: '🤗', date: 'February 12 (Thursday)', day: 'Hug Day', description: 'Offering comfort and affection.', active: false },
  { emoji: '💋', date: 'February 13 (Friday)', day: 'Kiss Day', description: 'Sealing love with a kiss.', active: false },
  { emoji: '❤️', date: 'February 14 (Saturday)', day: "Valentine's Day", description: 'The main day for romantic dates and celebrations.', active: false },
]

function Valentine() {
  useEffect(() => {
    const heartsContainer = document.getElementById('hearts')
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '💜', '🌹', '💋']
    
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
    <div className="valentine-container">
      <div className="hearts" id="hearts"></div>
      
      <div className="container">
        <Link to="/" className="back-button">← Back to Home</Link>
        <div className="valentine-card">
          <h1 className="valentine-title">Valentine Week 2026 💕</h1>
          <p className="valentine-subtitle">A Journey of Love & Affection</p>
          
          <div className="roadmap">
            <div className="roadmap-line"></div>
            
            {roadmapDays.map((day, index) => {
              const content = (
                <>
                  <div className="roadmap-dot"></div>
                  <div className="roadmap-content">
                    <div className="roadmap-date">
                      <span className="day-emoji">{day.emoji}</span>
                      {day.date}
                    </div>
                    <div className="roadmap-day">{day.day}</div>
                    <div className="roadmap-description">{day.description}</div>
                  </div>
                </>
              )

              if (day.active) {
                return (
                  <Link 
                    key={index} 
                    to={day.link} 
                    className="roadmap-item active"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {content}
                  </Link>
                )
              }

              return (
                <div key={index} className="roadmap-item blurred">
                  {content}
                </div>
              )
            })}
          </div>

          <Link to="/" className="nav-link">Back to Portal 🏠</Link>
        </div>
      </div>
    </div>
  )
}

export default Valentine
