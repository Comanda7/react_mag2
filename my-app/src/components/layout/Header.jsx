import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useStore from '../../store/useStore'
import AuthModal from '../ui/AuthModal'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const favCount  = useStore(s => s.favorites.length)
  const cartCount = useStore(s => s.cart.reduce((sum, i) => sum + i.quantity, 0))
  const user      = useStore(s => s.user)
  const logout    = useStore(s => s.logout)

  const navLinks = [
    { to: '/',          label: 'Каталог'  },
    { to: '/profile',   label: 'Кабинет'  },
    { to: '/about',     label: 'О нас'    },
    { to: '/contacts',  label: 'Контакты' },
  ]

  return (
    <header className="header">
      <div className="header-inner container">
        <Link to="/" className="logo">🛒 TechStore</Link>

        {/* desktop nav */}
        <nav className={`nav${menuOpen ? ' nav-open' : ''}`}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          {user?.role === 'admin' && (
          <NavLink to="/admin" className={({ isActive }) => `nav-link nav-link--admin${isActive ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>
            ⚙️
          </NavLink>
          )}
        </nav>

        <div className="header-actions">
          <NavLink to="/favorites" className={({ isActive }) => `icon-btn${isActive ? ' icon-btn--active' : ''}`} title="Избранное">
            <span className="icon-btn-emoji">{favCount > 0 ? '❤️' : '🤍'}</span>
            {favCount > 0 && <span className="icon-badge">{favCount}</span>}
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => `icon-btn${isActive ? ' icon-btn--active' : ''}`} title="Корзина">
            <span className="icon-btn-emoji">🛒</span>
            {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
          </NavLink>

          {/* &#1040;&#1074;&#1090;&#1086;&#1088;&#1080;&#1079;&#1072;&#1094;&#1080;&#1103; */}
          {user ? (
            <div className="auth-user-wrap">
              <span className="auth-user-name">{user.role === 'admin' ? '👑' : '👤'} {user.name}</span>
              <button className="btn btn-ghost btn-sm auth-logout-btn" onClick={logout}>Выйти</button>
            </div>
          ) : (
            <button className="btn btn-outline btn-sm auth-open-btn" onClick={() => setAuthOpen(true)}>
              🔒 Войти
            </button>
          )}
        </div>

        <button className="burger" onClick={() => setMenuOpen(o => !o)} aria-label="Меню">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  )
}

export default Header
