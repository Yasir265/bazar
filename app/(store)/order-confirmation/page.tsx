"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { useOrders } from "@/components/providers/order-provider"
import { formatPrice, formatDate } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package, ArrowRight } from "lucide-react"

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("id")
  const { getOrderById } = useOrders()
  const order = orderId ? getOrderById(orderId) : undefined

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <Package className="size-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="font-serif text-3xl font-bold text-foreground">Order Not Found</h1>
        <p className="text-muted-foreground mt-2">We couldn&apos;t find this order.</p>
        <Link href="/">
          <Button className="mt-6">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center mb-8">
        <CheckCircle2 className="size-16 text-green-600 mx-auto mb-4" />
        <h1 className="font-serif text-3xl font-bold text-foreground">Order Confirmed!</h1>
        <p className="text-muted-foreground mt-2">
          Thank you for your order. A confirmation has been sent via WhatsApp.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground">Order ID</p>
            <p className="font-mono text-sm font-semibold text-foreground">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="text-sm text-foreground">{formatDate(order.createdAt)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          {order.items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span className="text-foreground">
                {item.product.name} x{item.quantity}
              </span>
              <span className="font-medium text-foreground">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-3 flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between font-bold text-foreground pt-2 border-t border-border">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Delivery To</p>
            <p className="text-foreground">{order.customer.firstName} {order.customer.lastName}</p>
            <p className="text-muted-foreground">{order.customer.address}</p>
            <p className="text-muted-foreground">{order.customer.city}, {order.customer.province}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Payment</p>
            <p className="text-foreground capitalize">
              {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod === "bank_transfer" ? "Bank Transfer" : "Online Payment"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Status: {order.status}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/">
          <Button size="lg">
            Continue Shopping
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
