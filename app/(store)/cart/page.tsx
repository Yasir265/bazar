"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/providers/cart-provider"
import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount, clearCart } = useCart()

  const shipping = subtotal >= 5000 ? 0 : 250
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <ShoppingBag className="size-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="font-serif text-3xl font-bold text-foreground">Your Cart is Empty</h1>
        <p className="text-muted-foreground mt-2">Add some products to get started.</p>
        <Link href="/">
          <Button className="mt-6">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-foreground mb-8">
        Shopping Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 p-4 rounded-lg border border-border bg-card"
            >
              <Link href={`/product/${item.product.id}`} className="relative w-24 h-32 shrink-0 rounded-md overflow-hidden bg-muted">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </Link>
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <Link href={`/product/${item.product.id}`} className="hover:underline underline-offset-2">
                    <h3 className="text-sm font-medium text-foreground line-clamp-2">{item.product.name}</h3>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5 capitalize">{item.product.category}</p>
                  {item.size && (
                    <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                  )}
                  {item.color && (
                    <p className="text-xs text-muted-foreground">Color: {item.color}</p>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-0 border border-border rounded-md">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-1.5 hover:bg-muted transition-colors disabled:opacity-30"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="px-3 py-1.5 text-xs font-medium border-x border-border">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-muted transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-foreground">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-fit" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-border bg-card p-6 sticky top-24">
            <h2 className="font-semibold text-foreground text-lg mb-4">Order Summary</h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground font-medium">
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  Free delivery on orders over Rs. 5,000
                </p>
              )}
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-foreground text-lg">{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout" className="block mt-6">
              <Button className="w-full" size="lg">
                Proceed to Checkout
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
            <Link href="/" className="block mt-3">
              <Button variant="outline" className="w-full" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
