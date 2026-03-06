import { useState, useEffect, useRef } from 'react'
import { Link, Outlet } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/spritzers', label: 'Spritzers' },
  { to: '/waitlist', label: 'Waitlist' },
]

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setMenuOpen(prev => !prev)
  const closeMenu = () => setMenuOpen(false)

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Focus first element on open; trap focus within drawer
  useEffect(() => {
    if (!menuOpen) return
    const drawer = drawerRef.current
    if (!drawer) return

    const focusable = drawer.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    first?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeMenu(); return }
      if (e.key !== 'Tab' || focusable.length === 0) return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <div className="layout-wrapper">
      <header className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src="/assets/snack-wine-logo-horizontal.svg" alt="Snack Wine" className="logo-image" />
          </Link>

          {/* Desktop nav links */}
          <ul className="nav-menu">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to} className="nav-item">
                <Link to={to} className="nav-link">{label}</Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="hamburger-btn"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`drawer-backdrop${menuOpen ? ' drawer-backdrop--open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Slide-in drawer */}
      <div
        ref={drawerRef}
        className={`drawer${menuOpen ? ' drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          className="drawer-close"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          ✕
        </button>
        <ul className="drawer-menu">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className="drawer-link" onClick={closeMenu}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-content">
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
