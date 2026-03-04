import { useState } from 'react'
import useStore from '../../store/useStore'
import { formatPrice, orderStatusColor } from '../../utils/formatters'

const STATUSES = ['Новый', 'В обработке', 'Подтверждён', 'Отправлен', 'Доставлен', 'Отменён']

function AdminOrders() {
  const orders            = useStore(s => s.orders)
  const updateOrderStatus = useStore(s => s.updateOrderStatus)
  const [open, setOpen]   = useState(null)

  return (
    <div>
      <h2>🧾 Заказы ({orders.length})</h2>
      {orders.length === 0 ? (
        <p className="empty-msg">Заказов пока нет.</p>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>Дата</th><th>Статус</th><th>Сумма</th><th>Товаров</th><th>Детали</th></tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <>
                  <tr key={o.id}>
                    <td>#{o.id}</td>
                    <td>{o.date}</td>
                    <td>
                      <select
                        className="status-select"
                        value={o.status}
                        style={{ borderColor: orderStatusColor(o.status) }}
                        onChange={e => updateOrderStatus(o.id, e.target.value)}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>{formatPrice(o.total)}</td>
                    <td>{o.items.reduce((s, i) => s + i.quantity, 0)}</td>
                    <td>
                      <button className="btn btn-ghost btn-sm" onClick={() => setOpen(open === o.id ? null : o.id)}>
                        {open === o.id ? 'Скрыть' : 'Детали'}
                      </button>
                    </td>
                  </tr>
                  {open === o.id && (
                    <tr key={`${o.id}-d`}>
                      <td colSpan={6}>
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
    </div>
  )
}

export default AdminOrders
