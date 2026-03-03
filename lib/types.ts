/* ── Core types for the e-commerce store ── */

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: CategorySlug
  subcategory: string
  sizes?: string[]
  colors?: string[]
  inStock: boolean
  featured?: boolean
  newArrival?: boolean
  rating: number
  reviewCount: number
}

export type CategorySlug = "men" | "women" | "boys" | "girls" | "kids"

export interface Category {
  slug: CategorySlug
  name: string
  description: string
  image: string
  subcategories: string[]
}

export interface CartItem {
  product: Product
  quantity: number
  size?: string
  color?: string
}

export interface WishlistItem {
  productId: string
  addedAt: string
}

export interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  customer: CustomerInfo
  paymentMethod: "cod" | "bank_transfer" | "online"
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
  notes?: string
}

export interface User {
  id: string
  email: string
  name: string
  role: "customer" | "admin"
}
