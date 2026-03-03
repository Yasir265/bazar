"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

interface WishlistContextType {
  items: string[]
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  toggleItem: (productId: string) => void
  isWishlisted: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("bazaar_wishlist")
    if (stored) {
      try { setItems(JSON.parse(stored)) } catch { /* ignore */ }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("bazaar_wishlist", JSON.stringify(items))
  }, [items])

  const addItem = useCallback((id: string) => {
    setItems((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i !== id))
  }, [])

  const toggleItem = useCallback((id: string) => {
    setItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }, [])

  const isWishlisted = useCallback((id: string) => items.includes(id), [items])

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, toggleItem, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be inside WishlistProvider")
  return ctx
}
