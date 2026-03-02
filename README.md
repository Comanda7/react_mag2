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
│   └── favicon.svg              # SVG-иконка
├── src/
│   ├── assets/
│   │   └── products.js          # 60 товаров + константы
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx       # Переиспользуемая кнопка
│   │   │   ├── Input.jsx        # Переиспользуемый input
│   │   │   ├── ProductCard.jsx  # Карточка товара
│   │   │   └── Pagination.jsx   # Пагинация
│   │   └── layout/
│   │       ├── Header.jsx       # Шапка + навигация + badges
│   │       ├── Footer.jsx       # Подвал
│   │       └── Sidebar.jsx      # Фильтр по категориям
│   ├── pages/
│   │   ├── CatalogPage.jsx      # Главная — каталог
│   │   ├── CartPage.jsx         # Корзина
│   │   ├── FavoritesPage.jsx    # Избранное
│   │   ├── ProfilePage.jsx      # Личный кабинет
│   │   ├── AboutPage.jsx        # О нас
│   │   ├── ContactsPage.jsx     # Контакты
│   │   └── admin/
│   │       ├── AdminLayout.jsx      # Обёртка + навигация
│   │       ├── AdminDashboard.jsx   # Статистика
│   │       ├── AdminProducts.jsx    # Управление товарами
│   │       ├── AdminOrders.jsx      # Управление заказами
│   │       └── AdminCategories.jsx  # По категориям
│   ├── hooks/
│   │   ├── useLocalStorage.js   # Синхронизация со storage
│   │   ├── useCart.js           # Хук корзины
│   │   └── useFavorites.js      # Хук избранного
│   ├── context/
│   │   └── NotifyContext.jsx    # Toast-уведомления
│   ├── store/
│   │   └── useStore.js          # Zustand — единый стор
│   ├── services/
│   │   └── storageService.js    # CRUD для localStorage
│   ├── utils/
│   │   └── formatters.js        # Форматирование цен, pluralize
│   ├── types/
│   │   └── index.js             # JSDoc-типы
│   ├── App.jsx                  # Роутер + провайдеры
│   ├── App.css                  # Все стили
│   └── main.jsx                 # Точка входа
├── index.html
├── vite.config.js
└── package.json
```

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

## Лицензия

MIT — используйте свободно в учебных целях.
