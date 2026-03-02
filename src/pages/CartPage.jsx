import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCart from '../hooks/useCart'
import { formatPrice } from '../utils/formatters'
import CheckoutModal from '../components/ui/CheckoutModal'

function CartPage() {
  const navigate = useNavigate()
  const { cart, products, cartTotal, removeFromCart, updateCartQty, handleCheckout } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  const rows = cart.map(item => {
    const p = products.find(x => x.id === item.id)
    return p ? { ...item, product: p, sum: p.price * item.quantity } : null
  }).filter(Boolean)

  const onConfirm = () => {
    const order = handleCheckout()
    setShowCheckout(false)
    if (order) navigate('/profile')
  }

  if (rows.length === 0) {
    return (
      <main className="container page-content">
        <h1>🛒 Корзина</h1>
        <p className="empty-msg">Корзина пуста. <a href="/">Перейти в каталог</a></p>
      </main>
    )
  }

  return (
    <>
    {showCheckout && (
      <CheckoutModal
        total={cartTotal()}
        onConfirm={onConfirm}
        onClose={() => setShowCheckout(false)}
      />
    )}
    <main className="container page-content">
      <h1>🛒 Корзина</h1>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Товар</th>
              <th>Цена</th>
              <th>Количество</th>
              <th>Сумма</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id}>
                <td>{i + 1}</td>
                <td>{row.product.image} {row.product.name}</td>
                <td>{formatPrice(row.product.price)}</td>
                <td>
                  <div className="quantity-controls">
                    <button onClick={() => updateCartQty(row.id, -1)}>−</button>
                    <span>{row.quantity}</span>
                    <button onClick={() => updateCartQty(row.id, +1)}>+</button>
                  </div>
                </td>
                <td>{formatPrice(row.sum)}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(row.id)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cart-total">
        <strong>Итого: {formatPrice(cartTotal())}</strong>
        <button className="btn btn-primary btn-lg" onClick={() => setShowCheckout(true)}>
          Оформить заказ
        </button>
      </div>
    </main>
    </>
  )
}

export default CartPage
