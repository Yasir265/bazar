/* ── Formatting helpers for PKR currency & dates ── */

export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString("en-PK")}`
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function generateOrderId(): string {
  const prefix = "ORD"
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "")
  const pkPhone = cleanPhone.startsWith("0")
    ? `92${cleanPhone.slice(1)}`
    : cleanPhone.startsWith("92")
      ? cleanPhone
      : `92${cleanPhone}`
  return `https://wa.me/${pkPhone}?text=${encodeURIComponent(message)}`
}

export function ordersToCSV(orders: Array<Record<string, unknown>>): string {
  if (orders.length === 0) return ""
  const headers = [
    "Order ID",
    "Date",
    "Customer",
    "Email",
    "Phone",
    "City",
    "Items",
    "Subtotal",
    "Shipping",
    "Total",
    "Payment",
    "Status",
  ]
  const rows = orders.map((o: Record<string, unknown>) => {
    const customer = o.customer as Record<string, string>
    const items = o.items as Array<{ product: { name: string }; quantity: number }>
    return [
      o.id,
      o.createdAt,
      `${customer.firstName} ${customer.lastName}`,
      customer.email,
      customer.phone,
      customer.city,
      items.map((i) => `${i.product.name} x${i.quantity}`).join("; "),
      o.subtotal,
      o.shipping,
      o.total,
      o.paymentMethod,
      o.status,
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",")
  })
  return [headers.join(","), ...rows].join("\n")
}
