/**
 * Переиспользуемая кнопка
 * @param {'primary'|'secondary'|'danger'|'ghost'} variant
 * @param {'sm'|'md'|'lg'} size
 */
function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'btn'
  const v    = `btn-${variant}`
  const s    = `btn-${size}`
  return (
    <button className={`${base} ${v} ${s} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
