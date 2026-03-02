import { useState } from 'react'
import useStore from '../../store/useStore'
import { formatPrice } from '../../utils/formatters'
import { CATEGORY_NAMES } from '../../assets/products'

function AdminProducts() {
  const products           = useStore(s => s.products)
  const updateProductStock = useStore(s => s.updateProductStock)
  const [editId,  setEditId]  = useState(null)
  const [editVal, setEditVal] = useState('')

  const startEdit = (p) => { setEditId(p.id); setEditVal(String(p.stock)) }
  const saveEdit  = (id) => {
    const val = parseInt(editVal, 10)
    if (!isNaN(val) && val >= 0) updateProductStock(id, val)
    setEditId(null)
  }

  return (
    <div>
      <h2>📦 Все товары ({products.length})</h2>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th><th>Иконка</th><th>Название</th><th>Категория</th>
              <th>Цена</th><th>Склад</th><th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className={p.stock === 0 ? 'row-danger' : p.stock < 10 ? 'row-warn' : ''}>
                <td>{p.id}</td>
                <td style={{ fontSize: '1.4rem' }}>{p.image}</td>
                <td>{p.name}</td>
                <td>{CATEGORY_NAMES[p.category]}</td>
                <td>{formatPrice(p.price)}</td>
                <td>
                  {editId === p.id ? (
                    <input
                      className="input-field input-inline"
                      type="number" min="0"
                      value={editVal}
                      onChange={e => setEditVal(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && saveEdit(p.id)}
                      autoFocus
                    />
                  ) : (
                    <span className={p.stock === 0 ? 'text-danger' : p.stock < 10 ? 'text-warn' : ''}>
                      {p.stock}
                    </span>
                  )}
                </td>
                <td>
                  {editId === p.id ? (
                    <>
                      <button className="btn btn-primary btn-sm" onClick={() => saveEdit(p.id)}>Сохранить</button>
                      {' '}
                      <button className="btn btn-ghost btn-sm" onClick={() => setEditId(null)}>Отмена</button>
                    </>
                  ) : (
                    <button className="btn btn-secondary btn-sm" onClick={() => startEdit(p)}>Изменить склад</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminProducts
