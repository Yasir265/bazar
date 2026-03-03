"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { getProductById, getProductsByCategory } from "@/lib/data"
import { useCart } from "@/components/providers/cart-provider"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductGrid } from "@/components/product/product-grid"
import { Heart, ShoppingBag, Star, Minus, Plus, Truck, Shield, RefreshCw, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function ProductDetailPage() {
  const params = useParams()
  const product = getProductById(params.id as string)
  const { addItem } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined)
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined)

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-foreground">Product Not Found</h1>
        <p className="text-muted-foreground mt-2">This product no longer exists.</p>
        <Link href="/">
          <Button className="mt-6">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  const wishlisted = isWishlisted(product.id)
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  function handleAddToCart() {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size")
      return
    }
    addItem(product, quantity, selectedSize, selectedColor)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="size-3" />
        <Link
          href={`/category/${product.category}`}
          className="hover:text-foreground transition-colors capitalize"
        >
          {product.category}
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-foreground line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {product.originalPrice && (
            <Badge variant="destructive" className="absolute top-4 left-4 bg-red-600 text-white">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Badge>
          )}
          {product.newArrival && (
            <Badge className="absolute top-4 right-4 bg-foreground text-background">NEW</Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {product.subcategory}
          </p>
          <h1 className="font-serif text-3xl font-bold text-foreground mt-2 text-pretty">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "size-4",
                    i < Math.round(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30",
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            {product.description}
          </p>

          <div className="my-6 border-t border-border" />

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-5">
              <p className="text-sm font-medium text-foreground mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-10 px-3 py-2 rounded-md border text-sm font-medium transition-colors",
                      selectedSize === size
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border hover:border-foreground/50",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-5">
              <p className="text-sm font-medium text-foreground mb-2">
                Color{selectedColor ? `: ${selectedColor}` : ""}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "px-3 py-2 rounded-md border text-sm font-medium transition-colors",
                      selectedColor === color
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border hover:border-foreground/50",
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-sm font-medium text-foreground mb-2">Quantity</p>
            <div className="flex items-center gap-0 border border-border rounded-md w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 hover:bg-muted transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <span className="px-5 py-2.5 text-sm font-medium border-x border-border min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2.5 hover:bg-muted transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingBag className="size-4 mr-2" />
              Add to Cart - {formatPrice(product.price * quantity)}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                toggleItem(product.id)
                toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist")
              }}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("size-5", wishlisted && "fill-red-500 text-red-500")} />
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="flex flex-col items-center text-center gap-1.5">
              <Truck className="size-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Free Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <Shield className="size-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <RefreshCw className="size-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16 pt-12 border-t border-border">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">You May Also Like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}
