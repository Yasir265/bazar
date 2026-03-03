"use client"

import { useOrders } from "@/components/providers/order-provider"
import { formatPrice, formatDate, ordersToCSV } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, ShoppingCart } from "lucide-react"
import type { Order } from "@/lib/types"

const STATUS_COLORS: Record<Order["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-indigo-100 text-indigo-800",
  shipped: "bg-cyan-100 text-cyan-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrders()

  function handleExportCSV() {
    const csv = ordersToCSV(orders as unknown as Array<Record<string, unknown>>)
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `bazaar-orders-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground">Orders</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">{orders.length} total</Badge>
          {orders.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <Download className="size-4 mr-1" />
              Export CSV
            </Button>
          )}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <ShoppingCart className="size-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No orders yet. Orders will appear here when customers place them.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border border-border bg-card p-4 lg:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <p className="font-mono text-sm font-semibold text-foreground">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                  <Select
                    value={order.status}
                    onValueChange={(val) => updateOrderStatus(order.id, val as Order["status"])}
                  >
                    <SelectTrigger className="w-36 h-8 text-xs">
                      <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm mb-3 pb-3 border-b border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Customer</p>
                  <p className="text-foreground">{order.customer.firstName} {order.customer.lastName}</p>
                  <p className="text-xs text-muted-foreground">{order.customer.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Delivery</p>
                  <p className="text-foreground">{order.customer.city}, {order.customer.province}</p>
                  <p className="text-xs text-muted-foreground">{order.customer.address}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Payment</p>
                  <p className="text-foreground capitalize">
                    {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod === "bank_transfer" ? "Bank Transfer" : "Online"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="text-foreground font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between text-sm pt-2 border-t border-border font-bold text-foreground">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
