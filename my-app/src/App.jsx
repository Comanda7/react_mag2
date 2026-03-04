import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { NotifyProvider } from './context/NotifyContext'
import useStore from './store/useStore'
import Header       from './components/layout/Header'
import Footer       from './components/layout/Footer'
import CatalogPage  from './pages/CatalogPage'
import CartPage     from './pages/CartPage'
import FavoritesPage from './pages/FavoritesPage'
import ProfilePage  from './pages/ProfilePage'
import AboutPage    from './pages/AboutPage'
import ContactsPage from './pages/ContactsPage'
import AdminLayout      from './pages/admin/AdminLayout'
import AdminDashboard   from './pages/admin/AdminDashboard'
import AdminProducts    from './pages/admin/AdminProducts'
import AdminOrders      from './pages/admin/AdminOrders'
import AdminCategories  from './pages/admin/AdminCategories'
import './App.css'

/** Только для админа */
function ProtectedRoute({ children }) {
  const user = useStore(s => s.user)
  if (user?.role !== 'admin') return <Navigate to="/" replace />
  return children
}

/** Только для авторизованных */
function AuthRoute({ children }) {
  const user = useStore(s => s.user)
  if (!user) return <Navigate to="/" replace />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <NotifyProvider>
        <div className="app-shell">
          <Header />
          <div className="app-body">
            <Routes>
              <Route path="/"          element={<CatalogPage  />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/cart"      element={<CartPage     />} />
              <Route path="/profile"   element={<AuthRoute><ProfilePage  /></AuthRoute>} />
              <Route path="/about"     element={<AboutPage    />} />
              <Route path="/contacts"  element={<ContactsPage />} />
              <Route path="/admin"     element={<ProtectedRoute><AdminLayout  /></ProtectedRoute>}>
                <Route index            element={<AdminDashboard  />} />
                <Route path="products"  element={<AdminProducts   />} />
                <Route path="orders"    element={<AdminOrders     />} />
                <Route path="categories" element={<AdminCategories />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </NotifyProvider>
    </BrowserRouter>
  )
}

export default App
