import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import './PromiseDay.css'

function PromiseDay() {
  const assetUrl = (fileName) => `${import.meta.env.BASE_URL}promise-day/${fileName}`
  const [promises, setPromises] = useState([])
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('Puttu ko Muttu')

  useEffect(() => {
    const promisesQuery = query(collection(db, 'promises'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(promisesQuery, (snapshot) => {
      const updated = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setPromises(updated)
    })

    return () => unsubscribe()
  }, [])

  const handleAddPromise = async (event) => {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    try {
      await addDoc(collection(db, 'promises'), {
        author,
        text: trimmed,
        createdAt: serverTimestamp()
      })
      setText('')
    } catch (error) {
      // Ignore save errors silently
    }
  }

  return (
    <div className="promise-container">
      <Link to="/valentine" className="back-button">← Back</Link>

      <div className="promise-card">
        <h1>Promise Day 🤝</h1>
        <p className="promise-subtitle">Write your promises and keep them forever.</p>

        <div className="promise-image">
          <img src={assetUrl('IMG_5228.JPG')} alt="Promise day memory" />
        </div>

        <form className="promise-form" onSubmit={handleAddPromise}>
          <h2>Add promises</h2>
          <div className="promise-buttons">
            <button
              type="button"
              className={`promise-author ${author === 'Puttu ko Muttu' ? 'active' : ''}`}
              onClick={() => setAuthor('Puttu ko Muttu')}
            >
              Puttu ko Muttu
            </button>
            <button
              type="button"
              className={`promise-author ${author === 'Manoj ko Muttu (puttu)' ? 'active' : ''}`}
              onClick={() => setAuthor('Manoj ko Muttu (puttu)')}
            >
              Manoj ko Muttu (puttu)
            </button>
          </div>

          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type your promise..."
            rows={3}
          />
          <button type="submit" className="promise-submit">Save promise</button>
        </form>

        <div className="promise-list">
          {promises.length === 0 ? (
            <div className="promise-empty">No promises yet. Add your first one!</div>
          ) : (
            promises.map((promise) => (
              <div key={promise.id} className="promise-item">
                <div className="promise-author-name">{promise.author}</div>
                <div className="promise-text">{promise.text}</div>
              </div>
            ))
          )}
        </div>

        <Link to="/" className="nav-link">Back to Portal 🏠</Link>
      </div>
    </div>
  )
}

export default PromiseDay
