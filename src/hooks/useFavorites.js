import useStore from '../store/useStore'
import { useNotify } from '../context/NotifyContext'

/**
 * Хук работы с избранным
 */
export default function useFavorites() {
  const notify        = useNotify()
  const favorites     = useStore(s => s.favorites)
  const toggleFavorite= useStore(s => s.toggleFavorite)

  const handleToggle = (productId) => {
    const isFav = favorites.includes(productId)
    toggleFavorite(productId)
    notify?.push(isFav ? 'Удалено из избранного' : 'Добавлено в избранное ❤️', isFav ? 'info' : 'success')
  }

  return {
    favorites,
    isFavorite: (id) => favorites.includes(id),
    handleToggle,
  }
}
