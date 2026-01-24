import { useState } from 'react'
import { home } from '../content/siteCopy'
import heroMobile from '../assets/snack_wine_mockups_600.webp'
import heroTablet from '../assets/snack_wine_mockups_1200.webp'
import heroDesktop from '../assets/snack_wine_mockups_2400.webp'

function Home() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('https://bwvhm6jpjd.execute-api.us-west-2.amazonaws.com/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubmitted(true)
        setEmail('')
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Error subscribing. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <picture>
        <source media="(min-width: 1921px)" srcSet={heroDesktop} />
        <source media="(min-width: 769px)" srcSet={heroTablet} />
        <img src={heroMobile} alt="Snack Wine canned spritzers mockup" className="hero-image" />
      </picture>

      <div className="content">
        <p className="tagline">{home.tagline}</p>
        <p className="subtitle">{home.subhead}</p>
        <p className="description">{home.support}</p>

        <ul className="bullets-list">
          {home.bullets.map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>

        {submitted ? (
          <div className="success-message" role="status" aria-live="polite">
            ✓ {home.h1 === 'Snack Wine' ? 'Thanks — you\'re on the list.' : 'Thank you!'}
          </div>
        ) : (
          <form className="email-form" onSubmit={handleSubmit} aria-label="Waitlist signup">
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-input"
              aria-label="Email address"
            />
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Join the list'}
            </button>
            {error && <p className="error-message" role="alert">{error}</p>}
          </form>
        )}

        <h2 className="section-title">{home.storyHeading}</h2>
        {home.story.map((paragraph, idx) => (
          <p key={idx} className="description">{paragraph}</p>
        ))}

        <h2 className="section-title">{home.previewHeading}</h2>
        <p className="description">{home.previewIntro}</p>
        <ul className="preview-list">
          {home.previewItems.map((item, idx) => (
            <li key={idx}>
              <strong>{item.name}</strong> — {item.description}
            </li>
          ))}
        </ul>

        <div className="trade-band">
          <h3 className="trade-heading">{home.tradeBandHeading}</h3>
          <p className="description">{home.tradeBandCopy}</p>
          <a href="mailto:info@snack.wine" className="trade-link">Get in touch</a>
        </div>

        <p className="home-disclaimer">{home.disclaimer}</p>
      </div>
    </div>
  )
}

export default Home
