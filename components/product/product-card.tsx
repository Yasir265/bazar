"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/providers/cart-provider"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { formatPrice } from "@/lib/format"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(product.id)

  return (
    <div className="group relative flex flex-col">
      {/* Image wrapper */}
      <Link href={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.newArrival && (
            <Badge className="bg-foreground text-background text-[10px] tracking-wider">NEW</Badge>
          )}
          {product.originalPrice && (
            <Badge variant="destructive" className="text-[10px] tracking-wider bg-red-600 text-white">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleItem(product.id)
            toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist")
          }}
          className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("size-4", wishlisted && "fill-red-500 text-red-500")} />
        </button>

        {/* Quick add to cart */}
        <div className="absolute bottom-0 inset-x-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            className="w-full bg-foreground text-background hover:bg-foreground/90 text-xs h-9"
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
              toast.success(`${product.name} added to cart`)
            }}
          >
            <ShoppingBag className="size-3.5 mr-1.5" />
            Add to Cart
          </Button>
        </div>
      </Link>

      {/* Details */}
      <div className="mt-3 flex flex-col gap-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.subcategory}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-foreground leading-tight line-clamp-2 hover:underline underline-offset-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="flex items-center gap-0.5">
            <Star className="size-3 fill-amber-400 text-amber-400" />
            <span className="text-xs text-muted-foreground">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
