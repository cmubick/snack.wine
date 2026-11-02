import { useState } from 'react'
import { home, findUs, waitlist } from '../content/siteCopy'
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
        <p className="tagline">{home.headline}</p>
        <p className="subtitle">{home.subhead}</p>
        <p className="description">{home.status}</p>

        <h2 className="section-title">{waitlist.heading}</h2>
        <p className="description">{waitlist.intro}</p>

        {submitted ? (
          <div className="success-message" role="status" aria-live="polite">
            ✓ {waitlist.success}
          </div>
        ) : (
          <form className="email-form" onSubmit={handleSubmit} aria-label={waitlist.formAriaLabel}>
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
              {isLoading ? 'Sending...' : waitlist.button}
            </button>
            {error && <p className="error-message" role="alert">{error}</p>}
          </form>
        )}

        <div className="trade-band">
          <h2 className="section-title">{findUs.heading}</h2>
          {findUs.regions.map((region) => (
            <div key={region.name}>
              <h3 className="trade-heading">{region.name}</h3>
              <div className="trade-list">
                {region.stockists.map((stockist) => (
                  <div key={stockist.name} className="trade-list-item">
                    <a href={stockist.url} target="_blank" rel="noopener noreferrer" className="social-link">
                      {stockist.name}
                    </a>
                    , {stockist.city}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="description">{findUs.comingSoon}</p>
          <p className="description">
            {findUs.contactPrompt}{' '}
            <a href={`mailto:${findUs.contactEmail}`} className="social-link">{findUs.contactLink}</a>.
          </p>
        </div>

        <p className="home-disclaimer">{home.disclaimer}</p>
      </div>
    </div>
  )
}

export default Home
