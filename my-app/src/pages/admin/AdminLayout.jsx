import { NavLink, Outlet } from 'react-router-dom'

const ADMIN_LINKS = [
  { to: '/admin',            label: '📊 Статистика', end: true },
  { to: '/admin/products',   label: '📦 Товары'    },
  { to: '/admin/orders',     label: '🧾 Заказы'    },
  { to: '/admin/categories', label: '🗂️ Категории' },
]

function AdminLayout() {
  return (
    <div className="admin-layout container">
      <nav className="admin-nav">
        {ADMIN_LINKS.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
