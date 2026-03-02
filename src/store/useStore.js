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
} from '../services/storageService'

/** Zustand-стор — единый источник состояния для всего приложения */
const useStore = create((set, get) => ({
  // ── начальное состояние ───────────────────────────────────
  products:  getProducts(),
  favorites: getFavorites(),
  cart:      getCart(),
  orders:    getOrderHistory(),
  stats:     getProductStats(),

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
  placeOrder() {
    const order = svcPlaceOrder()
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
