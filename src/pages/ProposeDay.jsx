import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './ProposeDay.css'

const slideGroups = [
  {
    caption: 'First chats, copied what you said lol',
    images: ['IMG_5730.jpg', 'IMG_5729.PNG', 'IMG_5738.jpg']
  },
  {
    caption: "First dates in Sister's Thai restaurant and Georgetown",
    images: ['564207264_2494041114302379_4354728786534093223_n.jpg']
  },
  {
    caption: 'First visit to your dance celebration event in Georgetown',
    images: ['38F4EA7D-6333-479D-B35B-F2F8332655BF.jpeg']
  },
  {
    caption: 'Honour to have you in Hunsa event (first since I met you)',
    images: ['IMG_1616.JPG']
  },
  {
    caption: 'First joyful day with you in cat cafe',
    images: ['IMG_3367.jpg']
  },
  {
    caption: 'First Richmond town walk around',
    images: ['IMG_2981.JPG', 'IMG_3805.jpg']
  },
  {
    caption: 'First times gym with you and fulfilling protein at Jinya',
    images: ['IMG_3947.jpg']
  },
  {
    caption: 'Me trying your beautiful cloth choice',
    images: ['2a46f9d417260d72e74bfc1f0bf361c0.JPEG']
  },
  {
    caption: 'First grand party with your music and first salsa with you',
    images: ['104_3443.JPEG', 'IMG_6456.JPEG']
  },
  {
    caption: 'First cooking together, painting, and mehendi: creative and quality time',
    images: ['IMG_4384.jpg', 'IMG_4030.JPG', 'IMG_4357.jpg', 'IMG_4369.jpg']
  },
  {
    caption: 'Holding your first expressive letter with a new year',
    images: ['104_3593.jpeg']
  },
  {
    caption: 'First walking around DC and first time me holding your hand',
    images: ['104_3692.JPEG', 'IMG_4948.JPG']
  },
  {
    caption: 'First NYC trip and me proposing you hoping to hear "YES". So happy that you said "YESSS"',
    images: ['IMG_5201.JPG', 'IMG_5159.JPG']
  },
  {
    caption: 'Unforgettable NYC trip with surprises, chocolates, and cold weather inspiring us to stay warm',
    images: ['IMG_5308.JPG', 'IMG_5317.JPG', 'IMG_5578.jpg', 'IMG_5616.jpg', 'IMG_5628.jpg', 'IMG_5668.jpg']
  },
  {
    caption: 'First Richmond experience, TikTok, delicious home made food, carrying you, hair styling',
    images: ['1C3EA156-2027-4D73-B737-B051B0DA2229.jpeg', 'IMG_5802.jpg', 'IMG_5741.PNG', 'IMG_5740.PNG']
  },
  {
    caption: 'Happy Rose Day',
    images: ['IMG_5979.jpg']
  }
]

const optionImages = [
  { id: 'option-1', file: '01DD37EC-A61B-4A16-9EB7-2D7E891550AD.jpg' },
  { id: 'option-2', file: 'IMG_5250.JPG' },
  { id: 'option-3', file: 'B024FC4C-9BE1-47A9-8825-BB76A2882FB8.jpeg' }
]

function ProposeDay() {
  const [index, setIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [timedOut, setTimedOut] = useState(false)
  const reactionLayerRef = useRef(null)

  const total = slideGroups.length
  const group = slideGroups[index]
  const isLastSlide = index === total - 1

  const assetUrl = (fileName) => `${import.meta.env.BASE_URL}propose-day/${fileName}`

  const goNext = () => {
    setIndex((current) => (current + 1) % total)
  }

  const goPrev = () => {
    setIndex((current) => (current - 1 + total) % total)
  }

  useEffect(() => {
    if (selectedOptions.length > 0) return
    setTimedOut(false)
    const timer = setTimeout(() => setTimedOut(true), 60000)
    return () => clearTimeout(timer)
  }, [selectedOptions.length])

  const launchEmojis = (emojis) => {
    const layer = reactionLayerRef.current
    if (!layer) return

    const totalBursts = 18
    for (let i = 0; i < totalBursts; i += 1) {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)]
      const particle = document.createElement('span')
      particle.className = 'proposal-float'
      particle.textContent = emoji
      particle.style.left = `${Math.random() * 90 + 5}%`
      particle.style.setProperty('--x-shift', `${Math.random() * 80 - 40}px`)
      particle.style.animationDuration = `${Math.random() * 1.8 + 3.5}s`
      particle.style.animationDelay = `${Math.random() * 0.6}s`
      layer.appendChild(particle)

      setTimeout(() => {
        particle.remove()
      }, 6000)
    }
  }

  useEffect(() => {
    if (selectedOptions.length === 1) {
      launchEmojis(['💖', '💘', '💝', '💞'])
    } else if (selectedOptions.length === 2) {
      launchEmojis(['💖', '😍', '💘', '💞'])
    } else if (selectedOptions.length === 3) {
      launchEmojis(['💖', '😘', '😍', '💘', '💞'])
    }
  }, [selectedOptions.length])

  useEffect(() => {
    if (timedOut && selectedOptions.length === 0) {
      launchEmojis(['😔', '☹️', '😢'])
    }
  }, [timedOut, selectedOptions.length])

  const toggleOption = (id) => {
    setSelectedOptions((current) => {
      if (current.includes(id)) {
        return current.filter((option) => option !== id)
      }
      return [...current, id]
    })
    setTimedOut(false)
  }

  return (
    <div className="propose-container">
      <div className="propose-background"></div>
      <div className="proposal-reactions" ref={reactionLayerRef}></div>
      <Link to="/valentine" className="back-button">← Back</Link>

      <div className="propose-card">
        <h1>Propose Day 💍</h1>
        <p className="subtitle">A journey of our beautiful moments</p>

        <div className="slideshow">
          <button className="slide-arrow left" type="button" onClick={goPrev}>
            ‹
          </button>

          <div className="slide-content">
            <div className="slide-grid">
              {group.images.map((image) => (
                <div key={image} className="slide-tile">
                  <img src={assetUrl(image)} alt="Memory" />
                </div>
              ))}
            </div>
            <div className="slide-caption">{group.caption}</div>
            <div className="slide-count">
              {index + 1} / {total}
            </div>
          </div>

          <button className="slide-arrow right" type="button" onClick={goNext}>
            ›
          </button>
        </div>

        {isLastSlide && (
          <>
            <div className="question-card">
              <h2>Would you like to be my Valentine? 💖</h2>
              <p className="question-hint">Choose any option(s) you like</p>

              <div className="options-grid">
                {optionImages.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`option-card ${selectedOptions.includes(option.id) ? 'selected' : ''}`}
                    onClick={() => toggleOption(option.id)}
                  >
                    <img src={assetUrl(option.file)} alt="Valentine option" />
                    <span className="option-check">✓</span>
                  </button>
                ))}
              </div>

              {selectedOptions.length === 1 && (
                <div className="celebration">
                  <div className="celebration-text">yes!!</div>
                  <div className="celebration-hearts">
                    <span>💖</span>
                    <span>💘</span>
                    <span>💝</span>
                    <span>💞</span>
                  </div>
                </div>
              )}

              {selectedOptions.length === 2 && (
                <div className="celebration">
                  <div className="celebration-text">yes!! yes yess!!</div>
                  <div className="celebration-hearts">
                    <span>💖</span>
                    <span>😍</span>
                    <span>💘</span>
                    <span>💞</span>
                  </div>
                </div>
              )}

              {selectedOptions.length === 3 && (
                <div className="celebration">
                  <div className="celebration-text">yes!! yes yess!! yes yess yesss!!</div>
                  <div className="celebration-hearts">
                    <span>💖</span>
                    <span>😘</span>
                    <span>😍</span>
                    <span>💘</span>
                  </div>
                </div>
              )}

              {selectedOptions.length === 0 && timedOut && (
                <div className="timeout-message">No response in time 😢</div>
              )}
            </div>

            <Link to="/" className="nav-link">Back to Portal 🏠</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default ProposeDay
