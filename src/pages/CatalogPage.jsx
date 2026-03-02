import { useState, useMemo } from 'react'
import useStore from '../store/useStore'
import Sidebar from '../components/layout/Sidebar'
import ProductCard from '../components/ui/ProductCard'
import Pagination from '../components/ui/Pagination'
import Input from '../components/ui/Input'
import { ITEMS_PER_PAGE } from '../assets/products'

function CatalogPage() {
  const products = useStore(s => s.products)

  const [category, setCategory] = useState('all')
  const [search,   setSearch]   = useState('')
  const [sort,     setSort]     = useState('')
  const [page,     setPage]     = useState(1)

  const filtered = useMemo(() => {
    let list = [...products]
    if (category !== 'all') list = list.filter(p => p.category === category)
    if (search.trim())      list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'asc')     list.sort((a, b) => a.price - b.price)
    if (sort === 'desc')    list.sort((a, b) => b.price - a.price)
    return list
  }, [products, category, search, sort])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const pageItems  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleCategory = (cat) => { setCategory(cat); setPage(1) }
  const handleSearch   = (e)   => { setSearch(e.target.value); setPage(1) }
  const handleSort     = (e)   => { setSort(e.target.value);   setPage(1) }

  return (
    <div className="page-layout">
      <Sidebar active={category} onSelect={handleCategory} />

      <main className="catalog-main">
        <div className="catalog-toolbar">
          <Input
            placeholder="🔍 Поиск по названию…"
            value={search}
            onChange={handleSearch}
          />
          <select className="select-sort" value={sort} onChange={handleSort}>
            <option value="">Без сортировки</option>
            <option value="asc">Цена ↑</option>
            <option value="desc">Цена ↓</option>
          </select>
        </div>

        {pageItems.length === 0 ? (
          <p className="empty-msg">Товары не найдены 😔</p>
        ) : (
          <div className="products-grid">
            {pageItems.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        <Pagination currentPage={page} totalPages={totalPages} onPage={setPage} />
      </main>
    </div>
  )
}

export default CatalogPage
