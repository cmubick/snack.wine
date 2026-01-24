import { useState } from 'react'
import { waitlist } from '../content/siteCopy'

function Waitlist() {
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
    <div className="container container-padded">
      <div className="content">
        <h1 className="title">{waitlist.heading}</h1>
        <p className="description">{waitlist.intro}</p>

        {submitted ? (
          <div className="success-message" role="status" aria-live="polite">
            ✓ {waitlist.success}
          </div>
        ) : (
          <form className="email-form" onSubmit={handleSubmit} aria-label="Waitlist signup">
            <input 
              type="email" 
              placeholder={waitlist.formLabel}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-input"
              aria-label={waitlist.formLabel}
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
      </div>
    </div>
  )
}

export default Waitlist
