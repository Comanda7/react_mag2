function AboutPage() {
  return (
    <main className="container page-content">
      <h1>📋 О нас</h1>
      <div className="content-card">
        <h2>TechStore — ваш надёжный магазин электроники</h2>
        <p>Мы предлагаем широкий выбор смартфонов, ноутбуков и аксессуаров ведущих мировых производителей. Все товары сертифицированы и имеют официальную гарантию.</p>
        <h3>Наши преимущества:</h3>
        <ul>
          <li>✅ Более 60 товаров в каталоге</li>
          <li>✅ Гарантия на всю продукцию</li>
          <li>✅ Быстрая доставка по всей России</li>
          <li>✅ Удобная система заказов</li>
          <li>✅ Лояльная программа лояльности</li>
        </ul>
        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <div className="stat-card"><span className="stat-value">60+</span><span className="stat-label">Товаров</span></div>
          <div className="stat-card"><span className="stat-value">3</span><span className="stat-label">Категории</span></div>
          <div className="stat-card"><span className="stat-value">5★</span><span className="stat-label">Рейтинг</span></div>
        </div>
      </div>
    </main>
  )
}

export default AboutPage
