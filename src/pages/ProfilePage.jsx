import { useState } from 'react'
import useStore from '../store/useStore'
import { formatPrice, orderStatusColor } from '../utils/formatters'

function ProfilePage() {
  const orders   = useStore(s => s.orders)
  const products = useStore(s => s.products)
  const favorites= useStore(s => s.favorites)
  const cart     = useStore(s => s.cart)

  const [openOrder, setOpenOrder] = useState(null)

  const favProducts  = products.filter(p => favorites.includes(p.id))
  const cartProducts = cart.map(i => ({ ...i, product: products.find(x => x.id === i.id) })).filter(i => i.product)

  return (
    <main className="container page-content">
      <h1>👤 Личный кабинет</h1>

      {/* Сводка */}
      <div className="stats-grid">
        <div className="stat-card"><span className="stat-value">{orders.length}</span><span className="stat-label">Заказов</span></div>
        <div className="stat-card"><span className="stat-value">{favProducts.length}</span><span className="stat-label">В избранном</span></div>
        <div className="stat-card"><span className="stat-value">{cart.reduce((s, i) => s + i.quantity, 0)}</span><span className="stat-label">В корзине</span></div>
      </div>

      {/* История заказов */}
      <section className="profile-section">
        <h2>📦 История заказов</h2>
        {orders.length === 0 ? (
          <p className="empty-msg">Заказов пока нет.</p>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr><th>ID</th><th>Дата</th><th>Статус</th><th>Сумма</th><th></th></tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <>
                    <tr key={o.id}>
                      <td>#{o.id}</td>
                      <td>{o.date}</td>
                      <td>
                        <span className="status-badge" style={{ background: orderStatusColor(o.status) }}>
                          {o.status}
                        </span>
                      </td>
                      <td>{formatPrice(o.total)}</td>
                      <td>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => setOpenOrder(openOrder === o.id ? null : o.id)}
                        >
                          {openOrder === o.id ? 'Скрыть' : 'Детали'}
                        </button>
                      </td>
                    </tr>
                    {openOrder === o.id && (
                      <tr key={`${o.id}-details`}>
                        <td colSpan={5}>
                          <table className="data-table inner-table">
                            <thead><tr><th>Товар</th><th>Цена</th><th>Кол.</th><th>Сумма</th></tr></thead>
                            <tbody>
                              {o.items.map(item => (
                                <tr key={item.id}>
                                  <td>{item.name}</td>
                                  <td>{formatPrice(item.price)}</td>
                                  <td>{item.quantity}</td>
                                  <td>{formatPrice(item.sum)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Избранное */}
      <section className="profile-section">
        <h2>❤️ Избранное ({favProducts.length})</h2>
        {favProducts.length === 0 ? <p className="empty-msg">Пусто.</p> : (
          <ul className="profile-list">
            {favProducts.map(p => (
              <li key={p.id}>{p.image} {p.name} — {formatPrice(p.price)}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Корзина */}
      <section className="profile-section">
        <h2>🛒 Текущая корзина ({cartProducts.length})</h2>
        {cartProducts.length === 0 ? <p className="empty-msg">Пусто.</p> : (
          <ul className="profile-list">
            {cartProducts.map(i => (
              <li key={i.id}>{i.product.image} {i.product.name} × {i.quantity} = {formatPrice(i.product.price * i.quantity)}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default ProfilePage
