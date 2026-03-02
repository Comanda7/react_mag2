import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useStore from '../../store/useStore'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const favCount  = useStore(s => s.favorites.length)
  const cartCount = useStore(s => s.cart.reduce((sum, i) => sum + i.quantity, 0))

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
          <NavLink to="/admin" className={({ isActive }) => `nav-link nav-link--admin${isActive ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>
            ⚙️
          </NavLink>
        </nav>

        {/* Иконки избранного и корзины — всегда видны */}
        <div className="header-actions">
          <NavLink to="/favorites" className={({ isActive }) => `icon-btn${isActive ? ' icon-btn--active' : ''}`} title="Избранное">
            <span className="icon-btn-emoji">{favCount > 0 ? '❤️' : '🤍'}</span>
            {favCount > 0 && <span className="icon-badge">{favCount}</span>}
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => `icon-btn${isActive ? ' icon-btn--active' : ''}`} title="Корзина">
            <span className="icon-btn-emoji">🛒</span>
            {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
          </NavLink>
        </div>

        {/* mobile toggle */}
        <button className="burger" onClick={() => setMenuOpen(o => !o)} aria-label="Меню">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}

export default Header
