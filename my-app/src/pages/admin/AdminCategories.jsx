import useStore from '../../store/useStore'
import { formatPrice } from '../../utils/formatters'
import { CATEGORY_NAMES } from '../../assets/products'

const CATEGORIES = ['phones', 'laptops', 'accessories']

function AdminCategories() {
  const products = useStore(s => s.products)

  return (
    <div>
      <h2>🗂️ Товары по категориям</h2>
      {CATEGORIES.map(cat => {
        const list = products.filter(p => p.category === cat)
        return (
          <section key={cat} style={{ marginBottom: '2rem' }}>
            <h3>{CATEGORY_NAMES[cat]} ({list.length} товаров)</h3>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr><th>ID</th><th>Иконка</th><th>Название</th><th>Цена</th><th>Склад</th></tr>
                </thead>
                <tbody>
                  {list.map(p => (
                    <tr key={p.id} className={p.stock === 0 ? 'row-danger' : p.stock < 10 ? 'row-warn' : ''}>
                      <td>{p.id}</td>
                      <td style={{ fontSize: '1.3rem' }}>{p.image}</td>
                      <td>{p.name}</td>
                      <td>{formatPrice(p.price)}</td>
                      <td className={p.stock === 0 ? 'text-danger' : p.stock < 10 ? 'text-warn' : ''}>
                        {p.stock === 0 ? '❌ Нет' : p.stock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default AdminCategories
