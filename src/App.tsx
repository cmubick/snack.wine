import './App.css'

function App() {
  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Snack Wine</h1>
        <p className="subtitle">Coming Soon</p>
        <p className="description">Something delicious is on the way</p>
        
        <form className="email-form" onSubmit={(e) => {
          e.preventDefault()
          alert('Thank you! We\'ll notify you when we launch.')
        }}>
          <input 
            type="email" 
            placeholder="Enter your email"
            required
            className="email-input"
          />
          <button type="submit" className="submit-btn">
            Notify Me
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
