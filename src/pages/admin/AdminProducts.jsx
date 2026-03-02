import { useRef, useState } from 'react'
import useStore from '../../store/useStore'
import { formatPrice } from '../../utils/formatters'
import { CATEGORY_NAMES } from '../../assets/products'

function AdminProducts() {
  const products           = useStore(s => s.products)
  const updateProductStock = useStore(s => s.updateProductStock)
  const updateProductImage = useStore(s => s.updateProductImage)

  const [editId,  setEditId]  = useState(null)
  const [editVal, setEditVal] = useState('')
  const [urlId,   setUrlId]   = useState(null)
  const [urlVal,  setUrlVal]  = useState('')
  const fileRefs = useRef({})

  const startEdit = (p) => { setEditId(p.id); setEditVal(String(p.stock)) }
  const saveEdit  = (id) => {
    const val = parseInt(editVal, 10)
    if (!isNaN(val) && val >= 0) updateProductStock(id, val)
    setEditId(null)
  }

  const handleFileChange = (id, e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => updateProductImage(id, ev.target.result)
    reader.readAsDataURL(file)
  }

  const saveUrl = (id) => {
    const val = urlVal.trim()
    if (val) updateProductImage(id, val)
    setUrlId(null); setUrlVal('')
  }

  return (
    <div>
      <h2> Все товары ({products.length})</h2>
      <p className="admin-hint">
        Загрузите изображение из файла (любое расширение) или укажите путь вида /images/product-1.jpg.
        Файлы размещайте в папке public/images/ проекта.
      </p>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th><th>Картинка</th><th>Название</th><th>Категория</th>
              <th>Цена</th><th>Склад</th><th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className={p.stock === 0 ? 'row-danger' : p.stock < 10 ? 'row-warn' : ''}>
                <td>{p.id}</td>

                <td className="td-image">
                  <div className="admin-img-wrap">
                    {p.imageUrl
                      ? <img src={p.imageUrl} alt={p.name} className="admin-thumb" />
                      : <span className="admin-thumb-emoji">{p.image}</span>
                    }
                    <div className="admin-img-actions">
                      <input
                        type="file" accept="image/*"
                        style={{ display: 'none' }}
                        ref={el => (fileRefs.current[p.id] = el)}
                        onChange={e => handleFileChange(p.id, e)}
                      />
                      <button className="btn btn-sm btn-secondary" title="Загрузить файл" onClick={() => fileRefs.current[p.id]?.click()}></button>
                      {urlId === p.id ? (
                        <>
                          <input
                            className="input-field input-inline"
                            placeholder="/images/product.jpg"
                            value={urlVal}
                            onChange={e => setUrlVal(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') saveUrl(p.id); if (e.key === 'Escape') { setUrlId(null); setUrlVal('') } }}
                            autoFocus style={{ width: '140px' }}
                          />
                          <button className="btn btn-sm btn-primary" onClick={() => saveUrl(p.id)}></button>
                          <button className="btn btn-sm btn-ghost" onClick={() => { setUrlId(null); setUrlVal('') }}></button>
                        </>
                      ) : (
                        <button className="btn btn-sm btn-ghost" title="Ввести URL" onClick={() => { setUrlId(p.id); setUrlVal(p.imageUrl || '') }}></button>
                      )}
                      {p.imageUrl && (
                        <button className="btn btn-sm btn-danger" title="Удалить изображение" onClick={() => updateProductImage(p.id, null)}></button>
                      )}
                    </div>
                  </div>
                </td>

                <td>{p.name}</td>
                <td>{CATEGORY_NAMES[p.category]}</td>
                <td>{formatPrice(p.price)}</td>
                <td>
                  {editId === p.id ? (
                    <input className="input-field input-inline" type="number" min="0" value={editVal}
                      onChange={e => setEditVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveEdit(p.id)} autoFocus />
                  ) : (
                    <span className={p.stock === 0 ? 'text-danger' : p.stock < 10 ? 'text-warn' : ''}>{p.stock}</span>
                  )}
                </td>
                <td>
                  {editId === p.id ? (
                    <>
                      <button className="btn btn-primary btn-sm" onClick={() => saveEdit(p.id)}>Сохранить</button>{' '}
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