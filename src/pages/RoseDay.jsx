import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './RoseDay.css'

const STORAGE_KEY = 'roseDayComments'

function RoseDay() {
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [commentImage, setCommentImage] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    loadComments()
    
    // Floating hearts
    const heartsContainer = document.getElementById('hearts')
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '💜']
    
    const heartsInterval = setInterval(() => {
      const heart = document.createElement('div')
      heart.className = 'heart'
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
      heart.style.left = Math.random() * 100 + '%'
      heart.style.animationDelay = Math.random() * 2 + 's'
      heart.style.animationDuration = (Math.random() * 3 + 4) + 's'
      heartsContainer.appendChild(heart)
      
      setTimeout(() => heart.remove(), 7000)
    }, 500)

    // Falling petals
    const petalsContainer = document.getElementById('petals')
    const petals = ['🌹', '🌺', '🌸', '🌷', '🌻']
    
    const petalsInterval = setInterval(() => {
      const petal = document.createElement('div')
      petal.className = 'petal'
      petal.textContent = petals[Math.floor(Math.random() * petals.length)]
      petal.style.left = Math.random() * 100 + '%'
      petal.style.animationDelay = Math.random() * 2 + 's'
      petal.style.animationDuration = (Math.random() * 3 + 5) + 's'
      petalsContainer.appendChild(petal)
      
      setTimeout(() => petal.remove(), 8000)
    }, 800)

    return () => {
      clearInterval(heartsInterval)
      clearInterval(petalsInterval)
    }
  }, [])

  const loadComments = () => {
    const savedComments = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    setComments(savedComments)
  }

  const addComment = (author) => {
    const text = commentText.trim()
    const file = commentImage

    if (!text && !file) {
      alert('Please write a wish or add an image!')
      return
    }

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        saveComment(author, text, reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      saveComment(author, text, null)
    }
  }

  const saveComment = (author, text, imageBase64) => {
    const newComments = [
      ...comments,
      {
        author,
        text,
        image: imageBase64,
        timestamp: new Date().toISOString()
      }
    ]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newComments))
    setComments(newComments)
    setCommentText('')
    setCommentImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="roseday-container">
      <Link to="/valentine" className="back-button">← Back</Link>

      <div className="hearts" id="hearts"></div>
      <div className="petals" id="petals"></div>

      <div className="title-section">
        <h1>Happy Rose Day! 🌹</h1>
      </div>

      <div className="comments-section">
        <div className="comment-input-box">
          <textarea
            id="commentInput"
            placeholder="Rose Day wishes..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />

          <input
            id="commentImage"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setCommentImage(e.target.files[0] || null)}
          />

          <div className="comment-buttons">
            <button className="comment-btn manoj" onClick={() => addComment('manoj')}>
              From Manoj 💙
            </button>
            <button className="comment-btn puttu" onClick={() => addComment('puttu')}>
              From Puttu 💕
            </button>
          </div>
        </div>

        <div className="comments-display">
          {comments.length === 0 ? (
            <div className="no-comments">No thoughts shared yet. Be the first to share! 💭</div>
          ) : (
            comments.map((comment, index) => (
              <div key={index} className={`comment-item ${comment.author}-comment`}>
                <div className="comment-author">
                  {comment.author === 'manoj' ? 'Manoj 💙' : 'Puttu 💕'}
                </div>
                {comment.text && (
                  <div className="comment-text">{comment.text}</div>
                )}
                {comment.image && (
                  <img className="comment-image" src={comment.image} alt="Comment" />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="container">
        <div className="person-background">
          <img src={`${import.meta.env.BASE_URL}rose-person.JPEG`} alt="Person" />
        </div>

        <div className="rose-bouquet">
          <img src={`${import.meta.env.BASE_URL}rose-day.png`} alt="Rose Bouquet" />
        </div>
      </div>
    </div>
  )
}

export default RoseDay
