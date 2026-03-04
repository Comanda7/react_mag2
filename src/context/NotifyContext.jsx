import { createContext, useContext, useState, useCallback } from 'react'

const NotifyContext = createContext(null)

/**
 * Провайдер всплывающих уведомлений (toast)
 */
export function NotifyProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const push = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 2500)
  }, [])

  return (
    <NotifyContext.Provider value={{ push }}>
      {children}
      {/* Toast-контейнер */}
      <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {toasts.map(t => (
          <div
            key={t.id}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '0.5rem',
              background: t.type === 'error' ? '#ef4444' : t.type === 'info' ? '#3b82f6' : '#10b981',
              color: '#fff',
              fontWeight: 500,
              boxShadow: '0 4px 12px rgba(0,0,0,.15)',
              animation: 'slideIn 0.25s ease',
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </NotifyContext.Provider>
  )
}

/** Хук для отправки уведомлений */
export function useNotify() {
  return useContext(NotifyContext)
}
