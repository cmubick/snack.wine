import { useState } from 'react'
import './App.css'

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
      // Call your backend endpoint
      const response = await fetch('https://ok381cvmol.execute-api.us-west-2.amazonaws.com/subscribe', {
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
        setError('Error subscribing. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('Error submitting email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Snack Wine</h1>
        <p className="subtitle">Coming Soon</p>
        <p className="description">Something delicious is on the way</p>
        
        {submitted ? (
          <div className="success-message">
            ✓ Thank you! We'll notify you when we launch.
          </div>
        ) : (
          <form className="email-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-input"
            />
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Notify Me'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        )}
      </div>
    </div>
  )
}

export default App
