# react_mag2 — TechStore React SPA

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite)](https://vitejs.dev)
[![Zustand](https://img.shields.io/badge/Zustand-4-orange)](https://zustand-demo.pmnd.rs)
[![React Router](https://img.shields.io/badge/React_Router-6-ca4245?logo=react-router)](https://reactrouter.com)

> Полноценный SPA-магазин на **React 18 + Vite + Zustand + React Router v6**.  
> Переработанная версия [Inter_mag1](../Inter_mag1/) — с компонентной архитектурой, Zustand-стором и React-роутингом.
>
> **GitHub:** https://github.com/Comanda7/react_mag2

---

## Стек технологий

| Слой            | Технология                          |
|-----------------|-------------------------------------|
| UI-библиотека   | React 18 (JSX)                      |
| Сборщик         | Vite 5                              |
| Роутинг         | React Router DOM v6                 |
| Стор / стейт    | Zustand v4                          |
| Хранилище данных| localStorage (через `storageService`) |
| Стили           | Vanilla CSS (один `App.css`)        |
| Линтер          | ESLint + eslint-plugin-react-hooks  |

---

## Структура проекта

```
my-app/
├── public/
│   └── favicon.svg                        # SVG-иконка
├── src/
│   ├── assets/
│   │   └── products.js                    # 60 товаров + константы
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx                 # Переиспользуемая кнопка
│   │   │   ├── Input.jsx                  # Переиспользуемый input
│   │   │   ├── ProductCard.jsx            # Карточка товара
│   │   │   ├── Pagination.jsx             # Пагинация
│   │   │   ├── AuthModal.jsx              # Модал авторизации/регистрации
│   │   │   ├── CheckoutModal.jsx          # Модал оформления заказа
│   │   │   └── ProductModal.jsx           # Модал просмотра товара
│   │   └── layout/
│   │       ├── Header.jsx                 # Шапка + навигация + badges
│   │       ├── Footer.jsx                 # Подвал
│   │       └── Sidebar.jsx                # Фильтр по категориям
│   ├── pages/
│   │   ├── CatalogPage.jsx                # Главная — каталог
│   │   ├── CartPage.jsx                   # Корзина
│   │   ├── FavoritesPage.jsx              # Избранное
│   │   ├── ProfilePage.jsx                # Личный кабинет
│   │   ├── AboutPage.jsx                  # О нас
│   │   ├── ContactsPage.jsx               # Контакты
│   │   └── admin/
│   │       ├── AdminLayout.jsx            # Обёртка + навигация
│   │       ├── AdminDashboard.jsx         # Статистика
│   │       ├── AdminProducts.jsx          # Управление товарами
│   │       ├── AdminOrders.jsx            # Управление заказами
│   │       └── AdminCategories.jsx        # По категориям
│   ├── hooks/
│   │   ├── useLocalStorage.js             # Синхронизация со storage
│   │   ├── useCart.js                     # Хук корзины
│   │   └── useFavorites.js                # Хук избранного
│   ├── context/
│   │   └── NotifyContext.jsx              # Toast-уведомления
│   ├── store/
│   │   └── useStore.js                    # Zustand — единый стор
│   ├── services/
│   │   └── storageService.js              # CRUD для localStorage
│   ├── utils/
│   │   └── formatters.js                  # Форматирование цен, pluralize
│   ├── types/
│   │   └── index.js                       # JSDoc-типы
│   ├── App.jsx                            # Роутер + провайдеры
│   ├── App.css                            # Все стили
│   └── main.jsx                           # Точка входа
├── index.html
├── vite.config.js
└── package.json
```

> Кликайте на имя файла ниже чтобы увидеть его описание и код ↓

---

## 📖 Описание файлов

<details>
<summary><a name="products-js"></a><b>📦 products.js</b> — 60 товаров + константы</summary>

---

Центральный массив данных. Содержит **60 товаров** трёх категорий: `phones` (20), `laptops` (20), `accessories` (20). Каждый товар аннотирован JSDoc-типом `Product`.

```js
export const PRODUCTS = [
  { id: 1,  name: 'iPhone 15 Pro',      category: 'phones',  price: 129990, image: '📱', stock: 15 },
  { id: 2,  name: 'Samsung Galaxy S24', category: 'phones',  price:  89990, image: '📱', stock: 20 },
  // ...
  { id: 21, name: 'MacBook Pro 16"',    category: 'laptops', price: 249990, image: '💻', stock:  8 },
  // ...60 позиций
]
```

> Импортируется в `storageService.js` как дефолтные данные и в `types/index.js` для аннотации.

---
</details>

<details>
<summary><a name="button-jsx"></a><b>🔘 Button.jsx</b> — переиспользуемая кнопка</summary>

---

Универсальная кнопка с поддержкой пропов `variant` (`primary` / `outline` / `ghost`), `size` (`sm` / `md` / `lg`), `disabled`, `onClick`. Применяется по всему приложению через CSS-классы `btn btn-primary` и т.д.

```jsx
function Button({ children, variant = 'primary', size = 'md', ...props }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`} {...props}>
      {children}
    </button>
  )
}
export default Button
```

---
</details>

<details>
<summary><a name="input-jsx"></a><b>🔤 Input.jsx</b> — переиспользуемый input</summary>

---

Обёртка над `<input>` с лейблом и пропросом всех стандартных атрибутов. Используется в формах авторизации и поиска.

```jsx
function Input({ label, id, ...props }) {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} className="input" {...props} />
    </div>
  )
}
export default Input
```

---
</details>

<details>
<summary><a name="productcard-jsx"></a><b>🃏 ProductCard.jsx</b> — карточка товара</summary>

---

Отображает один товар: эмодзи-изображение, название, цену, кнопки «В избранное» и «В корзину». Использует `useStore` для экшенов и `useNotify` для тостов.

```jsx
function ProductCard({ product }) {
  const addToCart     = useStore(s => s.addToCart)
  const toggleFav     = useStore(s => s.toggleFavorite)
  const favorites     = useStore(s => s.favorites)
  const isFav         = favorites.includes(product.id)
  const { push }      = useNotify()

  return (
    <div className="product-card">
      <span className="product-emoji">{product.image}</span>
      <h3>{product.name}</h3>
      <p>{formatPrice(product.price)}</p>
      <button onClick={() => { toggleFav(product.id); push(isFav ? 'Удалено' : 'В избранное') }}>
        {isFav ? '❤️' : '🤍'}
      </button>
      <button onClick={() => { addToCart(product.id); push('Добавлено в корзину') }}>
        🛒 Купить
      </button>
    </div>
  )
}
```

---
</details>

<details>
<summary><a name="pagination-jsx"></a><b>📄 Pagination.jsx</b> — пагинация</summary>

---

Компонент пагинации. Принимает `page`, `totalPages`, `onChange`. Отображает кнопки предыдущей/следующей страницы и номера страниц.

```jsx
function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>‹</button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i+1} className={page === i+1 ? 'active' : ''} onClick={() => onChange(i+1)}>
          {i + 1}
        </button>
      ))}
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}>›</button>
    </div>
  )
}
```

---
</details>

<details>
<summary><a name="header-jsx"></a><b>🏠 Header.jsx</b> — шапка + навигация + badges</summary>

---

Шапка приложения. Содержит логотип, навигацию (`NavLink`), бейджи корзины/избранного, кнопку входа/выхода и `AuthModal`. На мобильном — бургер-меню.

```jsx
function Header() {
  const favCount  = useStore(s => s.favorites.length)
  const cartCount = useStore(s => s.cart.reduce((sum, i) => sum + i.quantity, 0))
  const user      = useStore(s => s.user)
  // ...
  return (
    <header className="header">
      <Link to="/" className="logo">🛒 TechStore</Link>
      <nav>
        <NavLink to="/">Каталог</NavLink>
        <NavLink to="/about">О нас</NavLink>
      </nav>
      <NavLink to="/favorites">🤍 {favCount > 0 && <span>{favCount}</span>}</NavLink>
      <NavLink to="/cart">🛒 {cartCount > 0 && <span>{cartCount}</span>}</NavLink>
      {user ? <button onClick={logout}>Выйти</button> : <button onClick={openAuth}>🔒 Войти</button>}
    </header>
  )
}
```

---
</details>

<details>
<summary><a name="footer-jsx"></a><b>⬇️ Footer.jsx</b> — подвал</summary>

---

Подвал с названием магазина, копирайтом и навигационными ссылками на «О нас» и «Контакты».

```jsx
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>🛒 TechStore © {new Date().getFullYear()}</span>
        <nav>
          <Link to="/about">О нас</Link>
          <Link to="/contacts">Контакты</Link>
        </nav>
      </div>
    </footer>
  )
}
```

---
</details>

<details>
<summary><a name="sidebar-jsx"></a><b>🗂️ Sidebar.jsx</b> — фильтр по категориям</summary>

---

Боковая панель фильтрации. Принимает `activeCategory` и `onSelect`. Рендерит кнопки «Все», «📱 Телефоны», «💻 Ноутбуки», «🎧 Аксессуары».

```jsx
const CATS = [
  { value: 'all',         label: 'Все'        },
  { value: 'phones',      label: '📱 Телефоны' },
  { value: 'laptops',     label: '💻 Ноутбуки' },
  { value: 'accessories', label: '🎧 Аксессуары'},
]
function Sidebar({ activeCategory, onSelect }) {
  return (
    <aside className="sidebar">
      {CATS.map(c => (
        <button key={c.value}
          className={`sidebar-btn${activeCategory === c.value ? ' active' : ''}`}
          onClick={() => onSelect(c.value)}>
          {c.label}
        </button>
      ))}
    </aside>
  )
}
```

---
</details>

<details>
<summary><a name="catalogpage-jsx"></a><b>🛍️ CatalogPage.jsx</b> — главная страница каталога</summary>

---

Главная страница. Отображает `Sidebar`, строку поиска, сортировку, сетку `ProductCard`-ов и `Pagination`. Состояние фильтров — локальное `useState`.

```jsx
function CatalogPage() {
  const products    = useStore(s => s.products)
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort]         = useState('default')
  const [page, setPage]         = useState(1)
  const PER_PAGE = 12

  const filtered = products
    .filter(p => category === 'all' || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort(/* по цене/названию */)

  return (
    <div className="catalog-layout">
      <Sidebar activeCategory={category} onSelect={setCategory} />
      <main>
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск..." />
        <div className="product-grid">
          {filtered.slice((page-1)*PER_PAGE, page*PER_PAGE).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <Pagination page={page} totalPages={Math.ceil(filtered.length / PER_PAGE)} onChange={setPage} />
      </main>
    </div>
  )
}
```

---
</details>

<details>
<summary><a name="cartpage-jsx"></a><b>🛒 CartPage.jsx</b> — страница корзины</summary>

---

Отображает список товаров в корзине с количеством, ценой за единицу, итогом. Кнопки `+`/`−` меняют `qty` через `updateCartQty`. Кнопка «Оформить» открывает `CheckoutModal`.

```jsx
function CartPage() {
  const cart          = useStore(s => s.cart)
  const products      = useStore(s => s.products)
  const removeFromCart = useStore(s => s.removeFromCart)
  const updateCartQty  = useStore(s => s.updateCartQty)
  const [checkout, setCheckout] = useState(false)

  const items = cart.map(c => ({ ...products.find(p => p.id === c.id), quantity: c.quantity }))
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <div className="cart-page">
      {items.map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.image} {item.name}</span>
          <button onClick={() => updateCartQty(item.id, -1)}>−</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateCartQty(item.id, +1)}>+</button>
          <span>{formatPrice(item.price * item.quantity)}</span>
          <button onClick={() => removeFromCart(item.id)}>🗑️</button>
        </div>
      ))}
      <p>Итого: {formatPrice(total)}</p>
      <Button onClick={() => setCheckout(true)}>Оформить заказ</Button>
      <CheckoutModal open={checkout} onClose={() => setCheckout(false)} />
    </div>
  )
}
```

---
</details>

<details>
<summary><a name="favoritespage-jsx"></a><b>❤️ FavoritesPage.jsx</b> — избранное</summary>

---

Отображает товары, добавленные в избранное. Сетка `ProductCard`. При пустом списке — заглушка с CTA.

```jsx
function FavoritesPage() {
  const favorites = useStore(s => s.favorites)
  const products  = useStore(s => s.products)
  const items     = products.filter(p => favorites.includes(p.id))

  if (!items.length) return <div className="empty-state">💔 Список избранного пуст</div>

  return (
    <div className="favorites-page">
      <h1>Избранное ({items.length})</h1>
      <div className="product-grid">
        {items.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
```

---
</details>

<details>
<summary><a name="profilepage-jsx"></a><b>👤 ProfilePage.jsx</b> — личный кабинет</summary>

---

Доступна только авторизованным (`AuthRoute`). Показывает данные пользователя и историю его заказов со статусами.

```jsx
function ProfilePage() {
  const user   = useStore(s => s.user)
  const orders = useStore(s => s.orders).filter(o => o.userId === user?.id)

  return (
    <div className="profile-page">
      <h1>👤 {user.name}</h1>
      <p>{user.email}</p>
      <h2>История заказов</h2>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <span>#{order.id} — {order.date}</span>
          <span style={{ color: orderStatusColor(order.status) }}>{order.status}</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      ))}
    </div>
  )
}
```

---
</details>

<details>
<summary><a name="aboutpage-jsx"></a><b>ℹ️ AboutPage.jsx</b> — страница «О нас»</summary>

---

Статичная информационная страница с описанием магазина, преимуществами и командой.

```jsx
function AboutPage() {
  return (
    <div className="static-page">
      <h1>О нас</h1>
      <p>TechStore — интернет-магазин электроники. Мы работаем с 2024 года.</p>
      <ul>
        <li>✅ Быстрая доставка</li>
        <li>✅ Гарантия качества</li>
        <li>✅ Поддержка 24/7</li>
      </ul>
    </div>
  )
}
```

---
</details>

<details>
<summary><a name="contactspage-jsx"></a><b>📞 ContactsPage.jsx</b> — страница контактов</summary>

---

Статичная страница с адресом, email, телефоном и формой обратной связи.

```jsx
function ContactsPage() {
  return (
    <div className="static-page">
      <h1>Контакты</h1>
      <p>📧 info@techstore.ru</p>
      <p>📞 +7 (800) 555-35-35</p>
      <p>📍 Москва, ул. Технологическая, 1</p>
    </div>
  )
}
```

---
</details>

<details>
<summary><a name="adminlayout-jsx"></a><b>⚙️ AdminLayout.jsx</b> — обёртка админ-панели</summary>

---

Обёртка всех admin-страниц. Содержит боковую навигацию по разделам («Дашборд», «Товары», «Заказы», «Категории»). Вкладывает дочерние маршруты через `<Outlet />`.

```jsx
function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="admin-nav">
        <NavLink to="/admin">📊 Дашборд</NavLink>
        <NavLink to="/admin/products">📦 Товары</NavLink>
        <NavLink to="/admin/orders">📋 Заказы</NavLink>
        <NavLink to="/admin/categories">🗂️ Категории</NavLink>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  )
}
```

---
</details>

<details>
<summary><a name="admindashboard-jsx"></a><b>📊 AdminDashboard.jsx</b> — статистика</summary>

---

Главная страница админки. Показывает сводку: кол-во товаров, заказов, пользователей, выручка. Использует `productStats` из стора.

```jsx
function AdminDashboard() {
  const products = useStore(s => s.products)
  const orders   = useStore(s => s.orders)
  const revenue  = orders.reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="admin-dashboard">
      <div className="stat-card">📦 Товаров: {products.length}</div>
      <div className="stat-card">📋 Заказов: {orders.length}</div>
      <div className="stat-card">💰 Выручка: {formatPrice(revenue)}</div>
    </div>
  )
}
```

---
</details>

<details>
<summary><a name="adminproducts-jsx"></a><b>📦 AdminProducts.jsx</b> — управление товарами</summary>

---

Таблица всех товаров с возможностью редактировать эмодзи-изображение и остаток на складе (`stock`). Изменения сохраняются через `updateProductStock` / `updateProductImage` в storageService.

```jsx
function AdminProducts() {
  const products = useStore(s => s.products)
  const updateStock = useStore(s => s.updateProductStock)
  const updateImage = useStore(s => s.updateProductImage)

  return (
    <table className="admin-table">
      <thead><tr><th>Товар</th><th>Цена</th><th>Склад</th><th>Фото</th></tr></thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{formatPrice(p.price)}</td>
            <td><input type="number" value={p.stock} onChange={e => updateStock(p.id, +e.target.value)} /></td>
            <td><input value={p.image} onChange={e => updateImage(p.id, e.target.value)} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

---
</details>

<details>
<summary><a name="adminorders-jsx"></a><b>📋 AdminOrders.jsx</b> — управление заказами</summary>

---

Список всех заказов. Можно менять статус через `<select>` — «Новый» → «В обработке» → «Доставлен» и т.д.

```jsx
function AdminOrders() {
  const orders      = useStore(s => s.orders)
  const updateStatus = useStore(s => s.updateOrderStatus)
  const STATUSES = ['Новый','В обработке','Подтверждён','Отправлен','Доставлен','Отменён']

  return (
    <div>
      {orders.map(o => (
        <div key={o.id} className="order-row">
          <span>#{o.id} — {o.date} — {formatPrice(o.total)}</span>
          <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      ))}
    </div>
  )
}
```

---
</details>

<details>
<summary><a name="admincategories-jsx"></a><b>🗂️ AdminCategories.jsx</b> — статистика по категориям</summary>

---

Показывает количество товаров, заказов и выручку по каждой категории (`phones`, `laptops`, `accessories`).

```jsx
function AdminCategories() {
  const products = useStore(s => s.products)
  const orders   = useStore(s => s.orders)
  const cats = ['phones','laptops','accessories']

  return (
    <div className="admin-categories">
      {cats.map(cat => {
        const catProducts = products.filter(p => p.category === cat)
        return (
          <div key={cat} className="cat-card">
            <h3>{cat}</h3>
            <p>Товаров: {catProducts.length}</p>
          </div>
        )
      })}
    </div>
  )
}
```

---
</details>

<details>
<summary><a name="uselocalstorage-js"></a><b>💾 useLocalStorage.js</b> — синхронизация со storage</summary>

---

Хук-обёртка над `localStorage`. Возвращает `[value, setValue]` как `useState`, но персистит значение в `localStorage` под переданным ключом.

```js
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    setStoredValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}
```

---
</details>

<details>
<summary><a name="usecart-js"></a><b>🛒 useCart.js</b> — хук корзины</summary>

---

Хук, инкапсулирующий логику корзины: добавление, удаление, изменение количества. Используется как более высокоуровневая обёртка над стором для компонент, которым не нужен прямой Zustand.

```js
function useCart() {
  const cart        = useStore(s => s.cart)
  const addToCart   = useStore(s => s.addToCart)
  const removeFromCart = useStore(s => s.removeFromCart)
  const updateCartQty  = useStore(s => s.updateCartQty)
  const products    = useStore(s => s.products)

  const items = cart.map(c => ({ ...products.find(p => p.id === c.id), quantity: c.quantity }))
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return { items, total, addToCart, removeFromCart, updateCartQty }
}
```

---
</details>

<details>
<summary><a name="usefavorites-js"></a><b>❤️ useFavorites.js</b> — хук избранного</summary>

---

Хук для работы с избранным. Предоставляет `favorites`, `toggleFavorite`, `isFavorite(id)`.

```js
function useFavorites() {
  const favorites      = useStore(s => s.favorites)
  const toggleFavorite = useStore(s => s.toggleFavorite)
  const isFavorite     = (id) => favorites.includes(id)
  return { favorites, toggleFavorite, isFavorite }
}
```

---
</details>

<details>
<summary><a name="notifycontext-jsx"></a><b>🔔 NotifyContext.jsx</b> — toast-уведомления</summary>

---

React-контекст для глобальных всплывающих уведомлений. `push(message, type)` добавляет тост на 2.5 сек. Типы: `success` (зелёный), `error` (красный), `info` (синий).

```jsx
export function NotifyProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const push = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2500)
  }, [])

  return (
    <NotifyContext.Provider value={{ push }}>
      {children}
      <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem' }}>
        {toasts.map(t => <div key={t.id} style={{ background: t.type === 'error' ? '#ef4444' : '#10b981' }}>{t.message}</div>)}
      </div>
    </NotifyContext.Provider>
  )
}

export const useNotify = () => useContext(NotifyContext)
```

---
</details>

<details>
<summary><a name="usestore-js"></a><b>🗄️ useStore.js</b> — Zustand единый стор</summary>

---

Центральное хранилище состояния на **Zustand**. Содержит: `products`, `cart`, `favorites`, `orders`, `stats`, `user`. Предоставляет все экшены: авторизация, корзина, избранное, заказы, обновление товаров.

```js
const useStore = create((set, get) => ({
  products:  getProducts(),
  favorites: getFavorites(),
  cart:      getCart(),
  orders:    getOrderHistory(),
  user:      JSON.parse(localStorage.getItem('auth_user') || 'null'),

  // Авторизация
  login(email, password) { /* ... */ },
  logout()               { /* ... */ },
  register(name, email, password) { /* ... */ },

  // Корзина
  addToCart(id)          { const cart = svcAddToCart(id);    set({ cart }) },
  removeFromCart(id)     { const cart = svcRemoveFromCart(id); set({ cart }) },
  updateCartQty(id, d)   { const cart = svcUpdateCartQty(id, d); set({ cart }) },

  // Избранное
  toggleFavorite(id)     { const favorites = svcToggleFav(id); set({ favorites }) },

  // Заказы
  placeOrder(items)      { /* ... */ },
}))
```

> Засев администратора (`admin@techstore.ru` / `admin123`) — происходит при первом запуске в IIFE.

---
</details>

<details>
<summary><a name="storageservice-js"></a><b>🗃️ storageService.js</b> — CRUD для localStorage</summary>

---

Сервисный слой. Изолирует работу с `localStorage` от компонентов. Предоставляет геттеры (`getFavorites`, `getCart`, …) и бизнес-логику (`toggleFavorite`, `addToCart`, `placeOrder`, …).

```js
// ─── getters ─────────────────────────────────────────────────
export const getFavorites    = () => parse('favorites',    [])
export const getCart         = () => parse('cart',         [])
export const getOrderHistory = () => parse('orderHistory', [])
export const getProducts     = () => parse('products',     PRODUCTS)

// ─── business logic ──────────────────────────────────────────
export function toggleFavorite(productId) {
  const favorites = getFavorites()
  const idx = favorites.indexOf(productId)
  idx > -1 ? favorites.splice(idx, 1) : favorites.push(productId)
  saveFavorites(favorites)
  return favorites
}

export function addToCart(productId) {
  const cart = getCart()
  if (!cart.find(i => i.id === productId)) cart.push({ id: productId, quantity: 1 })
  saveCart(cart)
  return cart
}
```

---
</details>

<details>
<summary><a name="formatters-js"></a><b>🔢 formatters.js</b> — форматирование цен и pluralize</summary>

---

Утилиты форматирования. `formatPrice(n)` — «89 990 ₽». `pluralize(n, forms)` — склонение числительных. `orderStatusColor(status)` — цвет бейджа статуса.

```js
export const formatPrice = (price) => price.toLocaleString('ru-RU') + ' ₽'

export function pluralize(n, forms) {
  // forms = ['товар', 'товара', 'товаров']
  const mod10 = Math.abs(n) % 10
  const mod100 = Math.abs(n) % 100
  if (mod100 >= 11 && mod100 <= 19) return `${n} ${forms[2]}`
  if (mod10 === 1)                   return `${n} ${forms[0]}`
  if (mod10 >= 2 && mod10 <= 4)      return `${n} ${forms[1]}`
  return `${n} ${forms[2]}`
}

export function orderStatusColor(status) {
  const map = { 'Новый':'#3b82f6', 'Доставлен':'#10b981', 'Отменён':'#ef4444' /* ... */ }
  return map[status] ?? '#6b7280'
}
```

---
</details>

<details>
<summary><a name="index-js-types"></a><b>📝 types/index.js</b> — JSDoc-типы</summary>

---

Файл с JSDoc-аннотациями всех сущностей проекта. Не содержит runtime-кода — только `export {}` для превращения в модуль.

```js
/**
 * @typedef {Object} Product
 * @property {number}          id
 * @property {string}          name
 * @property {ProductCategory} category  — 'phones' | 'laptops' | 'accessories'
 * @property {number}          price
 * @property {string}          image     — emoji-иконка
 * @property {number}          stock
 *
 * @typedef {Object} CartItem
 * @property {number} id
 * @property {number} quantity
 *
 * @typedef {Object} Order
 * @property {number}      id
 * @property {string}      date
 * @property {OrderItem[]} items
 * @property {number}      total
 * @property {OrderStatus} status
 */
export {}
```

---
</details>

<details>
<summary><a name="app-jsx"></a><b>⚡ App.jsx</b> — роутер + провайдеры</summary>

---

Корневой компонент. Оборачивает приложение в `BrowserRouter` и `NotifyProvider`. Определяет все маршруты через `<Routes>`. Содержит `ProtectedRoute` (только admin) и `AuthRoute` (только авторизованные).

```jsx
function App() {
  return (
    <BrowserRouter>
      <NotifyProvider>
        <div className="app-shell">
          <Header />
          <Routes>
            <Route path="/"          element={<CatalogPage />} />
            <Route path="/cart"      element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/profile"   element={<AuthRoute><ProfilePage /></AuthRoute>} />
            <Route path="/admin"     element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index           element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders"   element={<AdminOrders />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </NotifyProvider>
    </BrowserRouter>
  )
}
```

---
</details>

<details>
<summary><a name="app-css"></a><b>🎨 App.css</b> — все стили</summary>

---

Единый CSS-файл проекта. Содержит переменные CSS (`--primary`, `--bg`, `--text`), стили для всех компонентов, адаптивную вёрстку (`@media`) и анимацию тостов (`@keyframes slideIn`).

```css
:root {
  --primary:    #3b82f6;
  --bg:         #f9fafb;
  --text:       #111827;
  --card-bg:    #ffffff;
  --border:     #e5e7eb;
}

.app-shell   { display: flex; flex-direction: column; min-height: 100vh; }
.app-body    { display: flex; flex: 1; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap: 1rem; }

@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0);    }
}
```

---
</details>

<details>
<summary><a name="main-jsx"></a><b>🚪 main.jsx</b> — точка входа</summary>

---

Точка входа Vite. Монтирует `<App />` в `#root`. Включает `React.StrictMode`.

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---
</details>

<details>
<summary><a name="index-html"></a><b>🌐 index.html</b> — HTML-шаблон Vite</summary>

---

HTML-шаблон Vite. Подключает шрифт, задаёт `#root`-контейнер и подтягивает `main.jsx` через `type="module"`.

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TechStore</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---
</details>

<details>
<summary><a name="vite-config-js"></a><b>⚙️ vite.config.js</b> — конфигурация Vite</summary>

---

Конфигурация сборщика. Подключает плагин `@vitejs/plugin-react` для поддержки JSX и Fast Refresh.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---
</details>

<details>
<summary><a name="package-json"></a><b>📋 package.json</b> — зависимости и скрипты</summary>

---

Манифест проекта. Ключевые зависимости и скрипты.

```json
{
  "name": "tech-store",
  "scripts": {
    "dev":     "vite",
    "build":   "vite build",
    "preview": "vite preview",
    "lint":    "eslint . --ext js,jsx"
  },
  "dependencies": {
    "react":            "^18.3.1",
    "react-dom":        "^18.3.1",
    "react-router-dom": "^6.26.0",
    "zustand":          "^4.5.4"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite":                 "^5.4.1",
    "eslint":               "^9.9.0"
  }
}
```

---
</details>

---

## Быстрый старт (с нуля в VS Code)

### 1. Установите Node.js ≥ 18

Скачать: https://nodejs.org/  
Проверить после установки:
```bash
node -v   # v18.x.x или выше
npm -v    # 9.x.x или выше
```

### 2. Откройте терминал в VS Code

**Terminal → New Terminal** или <kbd>Ctrl</kbd>+<kbd>`</kbd>

### 3. Перейдите в папку проекта

```bash
cd D:\OpenServer\domains\POSGRASSQL2\Inter_mag2\my-app
```

### 4. Установите зависимости

```bash
npm install
```

Установятся: `react`, `react-dom`, `react-router-dom`, `zustand`, `vite`, плагины ESLint.

### 5. Запустите dev-сервер

```bash
npm run dev
```

Браузер откроется автоматически на `http://localhost:5173`

---

## Команды npm

| Команда           | Что делает                                    |
|-------------------|-----------------------------------------------|
| `npm install`     | Скачать и установить все зависимости          |
| `npm run dev`     | Запустить dev-сервер с HMR на :5173           |
| `npm run build`   | Собрать production-бандл в папку `dist/`      |
| `npm run preview` | Превью production-сборки на :4173             |
| `npm run lint`    | Проверить код ESLint                          |

---

## Создать проект с нуля (scaffold)

Если хотите создать новый Vite + React проект руками:

```bash
# 1. Создать проект
npm create vite@latest my-app -- --template react

# 2. Войти в папку
cd my-app

# 3. Установить зависимости по умолчанию
npm install

# 4. Установить доп. пакеты (роутинг + стор)
npm install react-router-dom zustand

# 5. Запустить
npm run dev
```

---

## Функционал

### Каталог (`/`)
- Список 60 товаров: телефоны, ноутбуки, аксессуары
- Фильтрация по категории через Sidebar
- Поиск по названию в реальном времени
- Сортировка по цене (↑ / ↓)
- Пагинация (8 товаров / страница)
- Кнопки ❤️ Избранное и 🛒 Корзина с badge-счётчиками

### Корзина (`/cart`)
- Таблица товаров с управлением количеством (+/−)
- Удаление позиций
- Итоговая сумма
- Оформление заказа → перенаправление в Кабинет

### Избранное (`/favorites`)
- Сетка карточек избранных товаров

### Личный кабинет (`/profile`)
- Сводка (заказов / в избранном / в корзине)
- История заказов с деталями (разворачиваются по клику)
- Список избранного
- Текущая корзина

### Страницы (`/about`, `/contacts`)
- О компании + статистика
- Контакты + форма обратной связи

### Админ-панель (`/admin`)
| Путь                    | Описание                                    |
|-------------------------|---------------------------------------------|
| `/admin`                | Статистика: товары, корзины, избранное, склад |
| `/admin/products`       | Таблица всех товаров, редактирование склада  |
| `/admin/orders`         | История заказов со сменой статуса            |
| `/admin/categories`     | 3 отдельные таблицы по категориям            |

---

## Архитектурные решения

| Паттерн              | Реализация                          |
|----------------------|-------------------------------------|
| Единый стор          | Zustand (`useStore.js`)             |
| Персистентность      | localStorage через `storageService` |
| Уведомления          | React Context (`NotifyContext`)     |
| Переиспользование    | Хуки `useCart`, `useFavorites`      |
| Роутинг              | React Router v6 с nested routes     |
| Типы (без TS)        | JSDoc-аннотации в `types/index.js`  |

---

## Рабочий процесс в VS Code (рекомендованные расширения)

```
ES7+ React/Redux/React-Native snippets  — быстрые сниппеты
ESLint                                  — подсветка ошибок
Prettier - Code formatter               — форматирование
Auto Rename Tag                         — синхронное переименование тегов
GitLens                                 — история git
```

---

## Данные

- 60 товаров (20 телефонов, 20 ноутбуков, 20 аксессуаров)
- Все данные хранятся **только в localStorage** браузера
- Синхронизация через Zustand-стор между всеми страницами

---

## Как залить проект на GitHub

### 1. Первая загрузка (новый репозиторий)

```bash
# 1. Перейти в папку проекта
cd path/to/Inter_mag2/my-app

# 2. Инициализировать git-репозиторий
git init

# 3. Добавить все файлы в индекс
git add .

# 4. Сделать первый коммит
git commit -m "first commit"

# 5. Переименовать ветку в main
git branch -M main

# 6. Привязать удалённый репозиторий (создать его заранее на github.com)
git remote add origin https://github.com/ВашЛогин/react_mag2.git

# 7. Отправить на GitHub
git push -u origin main
```

### 2. Последующие обновления (после изменений в коде)

```bash
# Посмотреть изменённые файлы
git status

# Добавить все изменения
git add .

# Сделать коммит с описанием изменений
git commit -m "fix: описание что изменилось"

# Отправить на GitHub
git push
```

### 3. Полезные команды

```bash
git log --oneline        # история коммитов
git diff                 # что изменилось (до git add)
git diff --staged        # что изменилось (после git add)
git remote -v            # проверить привязанный репозиторий
git branch               # список веток
git pull                 # получить изменения с GitHub
```

### 4. Соглашение по коммит-сообщениям

```
feat: добавить новый компонент
fix: исправить баг в корзине
style: обновить стили хедера
refactor: переработать логику фильтрации
docs: обновить README
```

> **Совет:** репозиторий для этого проекта: https://github.com/Comanda7/react_mag2

---

## Лицензия

MIT — используйте свободно в учебных целях.

---

## Как выглядит репозиторий на GitHub и как этого добились

После пуша на GitHub страница репозитория 
eact_mag2 выглядит так:

`
RishatRita77 / react_mag2   (Public)

src/             first commit          XX min ago
.gitignore       first commit          XX min ago
README.md        docs: add GitHub...   1 min ago
index.html       first commit          XX min ago
package-lock.json first commit         XX min ago
package.json     first commit          XX min ago
vite.config.js   first commit          XX min ago
`

### Что значат колонки

| Колонка | Значение |
|---------|----------|
| Имя файла/папки | Файл или директория в корне проекта |
| Сообщение коммита | Последний коммит, который **изменял этот файл** |
| Время | Когда был тот коммит |

### Почему разные сообщения у одних файлов

Потому что было **два коммита**:

1. **irst commit**  добавили все файлы сразу:
`ash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Comanda7/react_mag2.git
git push -u origin main
`

2. **docs: add GitHub deployment guide to README**  изменили только README.md:
`ash
git add README.md
git commit -m "docs: add GitHub deployment guide to README"
git push
`

> Каждый git commit создаёт **снимок** (snapshot) состояния файлов.
> На GitHub в списке файлов отображается **последний коммит, который затронул этот файл**.
