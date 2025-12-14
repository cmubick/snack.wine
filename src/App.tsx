import { useState } from 'react'
import './App.css'
import heroMobile from './assets/snack-wine-spritzers-600.webp'
import heroTablet from './assets/snack-wine-spritzers-1200.webp'
import heroDesktop from './assets/snack-wine-spritzers-2400.webp'

function App() {
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
        <img src={heroMobile} alt="Snack Wine Spritzers - Premium Low-ABV Wine Drinks" className="hero-image" />
      </picture>
      
      <header className="content">
        <h1 className="title">Snack Wine</h1>
        <p className="subtitle">Coming Soon</p>
        <p className="description">Premium, low-ABV wine spritzers designed for everyday enjoyment. Portable, refreshing, and thoughtfully made.</p>
        
        {submitted ? (
          <div className="success-message" role="status" aria-live="polite">
            ✓ Thank you! We'll notify you when we launch.
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
              {isLoading ? 'Sending...' : 'Notify Me'}
            </button>
            {error && <p className="error-message" role="alert">{error}</p>}
          </form>
        )}
        
        <a href="https://www.instagram.com/snack.wine.co" target="_blank" rel="noopener noreferrer" className="instagram-link" aria-label="Follow Snack Wine on Instagram">
          Follow us on Instagram
        </a>
      </header>
    </div>
  )
}

export default App
