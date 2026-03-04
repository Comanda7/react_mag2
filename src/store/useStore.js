import { create } from 'zustand'
import {
  getFavorites, getCart, getOrderHistory, getProducts, getProductStats,
  saveFavorites, saveCart,
  toggleFavorite as svcToggleFav,
  addToCart      as svcAddToCart,
  removeFromCart as svcRemoveFromCart,
  updateCartQty  as svcUpdateCartQty,
  placeOrder     as svcPlaceOrder,
  updateOrderStatus as svcUpdateOrderStatus,
  updateProductStock as svcUpdateProductStock,
  updateProductImage as svcUpdateProductImage,
} from '../services/storageService'

/** Zustand-стор — единый источник состояния для всего приложения */
const useStore = create((set, get) => ({
  // ── начальное состояние ───────────────────────────────────
  products:  getProducts(),
  favorites: getFavorites(),
  cart:      getCart(),
  orders:    getOrderHistory(),
  stats:     getProductStats(),
  user:      JSON.parse(localStorage.getItem('auth_user') || 'null'),

  // ── Авторизация ───────────────────────────────────────────
  login(email, password) {
    const users = JSON.parse(localStorage.getItem('auth_users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return '\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 email \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c'
    localStorage.setItem('auth_user', JSON.stringify(found))
    set({ user: found })
    return null
  },

  logout() {
    localStorage.removeItem('auth_user')
    set({ user: null })
  },

  register(name, email, password) {
    const users = JSON.parse(localStorage.getItem('auth_users') || '[]')
    if (users.find(u => u.email === email))
      return '\u042d\u0442\u043e\u0442 email \u0443\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d'
    const newUser = { id: Date.now(), name, email, password }
    users.push(newUser)
    localStorage.setItem('auth_users', JSON.stringify(users))
    localStorage.setItem('auth_user', JSON.stringify(newUser))
    set({ user: newUser })
    return null
  },

  // ── Избранное ─────────────────────────────────────────────
  toggleFavorite(productId) {
    const favorites = svcToggleFav(productId)
    set({ favorites, stats: getProductStats() })
  },

  // ── Корзина ───────────────────────────────────────────────
  addToCart(productId) {
    const cart = svcAddToCart(productId)
    set({ cart, stats: getProductStats() })
  },

  removeFromCart(productId) {
    const cart = svcRemoveFromCart(productId)
    set({ cart, stats: getProductStats() })
  },

  updateCartQty(productId, delta) {
    const cart = svcUpdateCartQty(productId, delta)
    set({ cart })
  },

  clearCart() {
    saveCart([])
    set({ cart: [] })
  },

  // ── Заказы ────────────────────────────────────────────────
  placeOrder(fields) {
    const order = svcPlaceOrder(fields)
    if (order) {
      set({
        cart:     getCart(),
        orders:   getOrderHistory(),
        products: getProducts(),
        stats:    getProductStats(),
      })
    }
    return order
  },

  updateOrderStatus(orderId, status) {
    const orders = svcUpdateOrderStatus(orderId, status)
    set({ orders, stats: getProductStats() })
  },

  // ── Товары (Админ) ────────────────────────────────────────
  updateProductStock(productId, newStock) {
    const products = svcUpdateProductStock(productId, newStock)
    set({ products })
  },

  updateProductImage(productId, imageUrl) {
    const products = svcUpdateProductImage(productId, imageUrl)
    set({ products })
  },

  // ── Вспомогательные селекторы ─────────────────────────────
  cartTotal() {
    const { cart, products } = get()
    return cart.reduce((sum, item) => {
      const p = products.find(x => x.id === item.id)
      return sum + (p ? p.price * item.quantity : 0)
    }, 0)
  },

  cartCount() {
    return get().cart.reduce((s, i) => s + i.quantity, 0)
  },
}))

export default useStore
