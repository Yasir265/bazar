"use client"

import Link from "next/link"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { getProductById } from "@/lib/data"
import { ProductGrid } from "@/components/product/product-grid"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export default function WishlistPage() {
  const { items } = useWishlist()
  const products = items
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <Heart className="size-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="font-serif text-3xl font-bold text-foreground">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mt-2">Save products you love for later.</p>
        <Link href="/">
          <Button className="mt-6">Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-foreground mb-8">
        Wishlist ({products.length} {products.length === 1 ? "item" : "items"})
      </h1>
      <ProductGrid products={products} />
    </div>
  )
}
