import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NewYear.css'

function NewYear() {
  const [letterVisible, setLetterVisible] = useState(false)

  useEffect(() => {
    const heartsContainer = document.getElementById('hearts')
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '💜']
    
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

  const revealLetter = () => {
    if (letterVisible) return
    setLetterVisible(true)
    createConfetti()
  }

  const createConfetti = () => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe']
    const confettiCount = 50
    
    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div')
        confetti.style.position = 'fixed'
        confetti.style.width = '10px'
        confetti.style.height = '10px'
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.left = Math.random() * 100 + '%'
        confetti.style.top = '-10px'
        confetti.style.borderRadius = '50%'
        confetti.style.pointerEvents = 'none'
        confetti.style.zIndex = '9999'
        confetti.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`
        
        document.body.appendChild(confetti)
        
        setTimeout(() => {
          confetti.remove()
        }, 4000)
      }, i * 50)
    }
  }

  return (
    <div className="newyear-container">
      <div className="hearts" id="hearts"></div>
      
      <div className="container">
        <div className="card">
          <h1>Happy New Year! 🎉</h1>
          <div className="year">2026</div>
          <p className="subtitle">A reply from the heart...</p>
          
          <div className="button-container">
            {!letterVisible && (
              <button className="reveal-button" onClick={revealLetter}>
                Click to Open Your Letter 💌
              </button>
            )}
          </div>
          
          {letterVisible && (
            <div className="letter-container show">
              <div className="letter">
                <div className="letter-content">
                  <p>I am so glad to receive the beautifully crafted card by your hand, filled with your thoughts about me. It makes sense to feel that we left something out in the letter you gave to me. But I felt so happy to get the card from you. This is the second card from you. Just as the previous, it is no less.</p>
                  
                  <p>As always, you love to write, very expressive. I could not express my happiness well at the restaurant when I received the card, but I was very happy to go through it and read it twice. This is the First card I have received with so much expression, memory, and feeling. Very grateful and happy to receive such a card from you, the special person.</p>
                  
                  <p>Finally, I liked the way you talked about the words and action statements. I feel like "I like to do things for close people around me, whether that is my mom, my sister, my family, my friends, and now YOU too. This gives me happiness and satisfaction, too. It holds a lasting memory, and to think about it later is a calm and pleasing feeling." Very happy to know that you felt the same.</p>
                  
                  <p>Friends tell me it is a honeymoon time and will deplete with time, but hopefully I will be able to maintain the constant feelings always. So, I always feel very excited to meet you and try to have the same feeling of excitement and happiness as if I am meeting you the first time - like at Amtrak, chat in the car, and dinner at Sister Thai.</p>
                  
                  <p>Thank you so much for your time that you could make to meet me despite your busy schedule. For instance, I was extremely happy that you came to howard event and performed while your class was ongoing.</p>
                  
                  <p>Most of the plans that you have made were new to me, such that I had a wide exposure. I enjoyed all of the moments to chitchat with you. Especially when you break the silence, ask, and share day-to-day things or memories.</p>
                  
                  <p>The book you gave and a ton of questions you asked are helping me to become an "Emotion scientist" - hopefully, if I could practice the RULER strategy properly. I feel emotionally vulnerable and supported when I am with you.</p>
                  
                  <p>One of the important things, you ways to care always makes me feel ashamed that I care less. But I love to learn from you the dietary plans and gym techniques. I also enjoy getting scolded with your soft voice. All your care matters, and I am grateful.</p>
                  
                  <p>Year 2025 was one of the memorable years - it became more special since I met you. Thankful that I was not very late. Excited for the year 2026 and for more things to hear from you, as you mentioned at the end of the letter.</p>
                  
                  <p>May this year and the coming years be the happiest ones for you, with your dreams coming true!!</p>
                  
                  <p style={{ textAlign: 'right', marginTop: '30px', fontWeight: 'bold', fontStyle: 'italic' }}>
                    To Puttu!<br />
                    <span style={{ marginLeft: '20px' }}>From Manoj! ❤️</span>
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <Link to="/" className="nav-link">Back to Portal 🏠</Link>
        </div>
      </div>
    </div>
  )
}

export default NewYear
