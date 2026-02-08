import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import './RoseDay.css'

function RoseDay() {
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const reactionsLayerRef = useRef(null)

  useEffect(() => {
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

  useEffect(() => {
    const commentsRef = collection(db, 'roseDayComments')
    const commentsQuery = query(commentsRef, orderBy('createdAt', 'asc'))
    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const nextComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setComments(nextComments)
    })

    return () => unsubscribe()
  }, [])

  const addComment = (author) => {
    const text = commentText.trim()

    if (!text) {
      alert('Please write a wish!')
      return
    }

    saveComment(author, text)
  }

  const saveComment = async (author, text) => {
    try {
      await addDoc(collection(db, 'roseDayComments'), {
        author,
        text,
        createdAt: serverTimestamp()
      })
      setCommentText('')
    } catch (error) {
      console.error('Failed to save comment', error)
      alert('Sorry, your comment could not be saved. Please try again.')
    }
  }

  const triggerReaction = (emoji) => {
    const layer = reactionsLayerRef.current
    if (!layer) return

    for (let i = 0; i < 5; i += 1) {
      const reaction = document.createElement('span')
      reaction.className = 'reaction-float'
      reaction.textContent = emoji
      reaction.style.left = `${Math.random() * 80 + 10}%`
      reaction.style.setProperty('--x-shift', `${Math.random() * 60 - 30}px`)
      reaction.style.animationDuration = `${Math.random() * 1.8 + 3.2}s`
      layer.appendChild(reaction)

      setTimeout(() => {
        reaction.remove()
      }, 5500)
    }
  }

  return (
    <div className="roseday-container">
      <Link to="/valentine" className="back-button">← Back</Link>

      <div className="hearts" id="hearts"></div>
      <div className="petals" id="petals"></div>
      <div className="reactions-layer" ref={reactionsLayerRef}></div>

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
            comments.map((comment) => (
              <div key={comment.id} className={`comment-item ${comment.author}-comment`}>
                <div className="comment-author">
                  {comment.author === 'manoj' ? 'Manoj 💙' : 'Puttu 💕'}
                </div>
                {comment.text && (
                  <div className="comment-text">{comment.text}</div>
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

      <div className="reaction-bar">
        <button type="button" onClick={() => triggerReaction('😍')}>😍</button>
        <button type="button" onClick={() => triggerReaction('😘')}>😘</button>
        <button type="button" onClick={() => triggerReaction('💑')}>💑</button>
        <button type="button" onClick={() => triggerReaction('🌹')}>🌹</button>
        <button type="button" onClick={() => triggerReaction('😔')}>😔</button>
        <button type="button" onClick={() => triggerReaction('☹️')}>☹️</button>
        <button type="button" onClick={() => triggerReaction('😢')}>😢</button>
      </div>
    </div>
  )
}

export default RoseDay
