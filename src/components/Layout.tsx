import { Link, Outlet } from 'react-router-dom'
import { siteConfig } from '../content/siteCopy'

function Layout() {
  return (
    <div className="layout-wrapper">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src="/assets/snack-wine-logo-horizontal.svg" alt="Snack Wine" className="logo-image" />
          </Link>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/spritzers" className="nav-link">Spritzers</Link>
            </li>
            <li className="nav-item">
              <Link to="/trade" className="nav-link">Trade</Link>
            </li>
            <li className="nav-item">
              <Link to="/waitlist" className="nav-link">Waitlist</Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-content">
          {siteConfig.disclaimers.map((disclaimer, idx) => (
            <p key={idx} className="disclaimer">{disclaimer}</p>
          ))}
          <p className="copyright">© 2026 Snack Wine. All rights reserved.</p>
          <p className="footer-social">
            <a href="https://www.instagram.com/snack.wine.pdx" target="_blank" rel="noopener noreferrer" className="social-link">
              Instagram
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
