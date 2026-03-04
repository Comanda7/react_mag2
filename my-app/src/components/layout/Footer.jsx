import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} TechStore — Интернет-магазин электроники</span>
        <nav className="footer-nav">
          <Link to="/about">О нас</Link>
          <Link to="/contacts">Контакты</Link>
          <Link to="/admin">Админ</Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
