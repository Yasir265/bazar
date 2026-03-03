"use client"

import { useOrders } from "@/components/providers/order-provider"
import { products, categories } from "@/lib/data"
import { formatPrice } from "@/lib/format"
import { Package, ShoppingCart, FolderOpen, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const { orders } = useOrders()

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
  const pendingOrders = orders.filter((o) => o.status === "pending").length

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "bg-blue-50 text-blue-600" },
    { label: "Total Orders", value: orders.length, icon: ShoppingCart, color: "bg-green-50 text-green-600" },
    { label: "Categories", value: categories.length, icon: FolderOpen, color: "bg-amber-50 text-amber-600" },
    { label: "Revenue", value: formatPrice(totalRevenue), icon: TrendingUp, color: "bg-rose-50 text-rose-600" },
  ]

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-foreground mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className={`rounded-lg p-2.5 ${stat.color}`}>
                <stat.icon className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-lg border border-border bg-card">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Recent Orders</h2>
          {pendingOrders > 0 && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {pendingOrders} order{pendingOrders !== 1 ? "s" : ""} pending
            </p>
          )}
        </div>
        {orders.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">No orders yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground">Order ID</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Customer</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Total</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Payment</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-mono text-xs text-foreground">{order.id}</td>
                    <td className="px-4 py-3 text-foreground">
                      {order.customer.firstName} {order.customer.lastName}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize bg-muted text-muted-foreground">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground capitalize text-xs">
                      {order.paymentMethod === "cod" ? "COD" : order.paymentMethod === "bank_transfer" ? "Bank" : "Online"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
