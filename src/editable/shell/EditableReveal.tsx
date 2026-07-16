'use client'

import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type ElementType } from 'react'

type EditableRevealProps = {
  children: ReactNode
  index?: number
  className?: string
  as?: ElementType
}

export function EditableReveal({ children, index = 0, className = '', as: As = 'div' }: EditableRevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const style: CSSProperties = { animationDelay: `${index * 70}ms` }
  const Component = As as ElementType
  return (
    <Component ref={ref as never} className={`${mounted ? 'editable-reveal' : ''} ${className}`.trim()} style={style}>
      {children}
    </Component>
  )
}
