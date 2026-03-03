// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
// import Link from "next/link"
// import { useCart } from "@/components/providers/cart-provider"
// import { useOrders } from "@/components/providers/order-provider"
// import { useAuth } from "@/components/providers/auth-provider"
// import { formatPrice, generateOrderId, getWhatsAppUrl } from "@/lib/format"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { ShoppingBag, ArrowLeft, CheckCircle2 } from "lucide-react"
// import type { CustomerInfo, Order } from "@/lib/types"
// import { toast } from "sonner"

// const PAKISTAN_PROVINCES = [
//   "Punjab",
//   "Sindh",
//   "Khyber Pakhtunkhwa",
//   "Balochistan",
//   "Islamabad Capital Territory",
//   "Azad Kashmir",
//   "Gilgit-Baltistan",
// ]

// const STORE_WHATSAPP = "923001234567"

// export default function CheckoutPage() {
//   const router = useRouter()
//   const { items, subtotal, clearCart } = useCart()
//   const { addOrder } = useOrders()
//   const { user } = useAuth()
//   const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank_transfer" | "online">("cod")
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [errors, setErrors] = useState<Record<string, string>>({})

//   const [form, setForm] = useState<CustomerInfo>({
//     firstName: user?.name.split(" ")[0] ?? "",
//     lastName: user?.name.split(" ").slice(1).join(" ") ?? "",
//     email: user?.email ?? "",
//     phone: "",
//     address: "",
//     city: "",
//     province: "Punjab",
//     postalCode: "",
//     notes: "",
//   })

//   const shipping = subtotal >= 5000 ? 0 : 250
//   const total = subtotal + shipping

//   function updateField(field: keyof CustomerInfo, value: string) {
//     setForm((prev) => ({ ...prev, [field]: value }))
//     if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
//   }

//   function validate(): boolean {
//     const errs: Record<string, string> = {}
//     if (!form.firstName.trim()) errs.firstName = "First name is required"
//     if (!form.lastName.trim()) errs.lastName = "Last name is required"
//     if (!form.email.trim()) errs.email = "Email is required"
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email"
//     if (!form.phone.trim()) errs.phone = "Phone number is required"
//     else if (!/^(0|\+?92)?3\d{9}$/.test(form.phone.replace(/[\s-]/g, "")))
//       errs.phone = "Enter a valid Pakistani phone number"
//     if (!form.address.trim()) errs.address = "Address is required"
//     if (!form.city.trim()) errs.city = "City is required"
//     if (!form.province.trim()) errs.province = "Province is required"
//     setErrors(errs)
//     return Object.keys(errs).length === 0
//   }

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault()
//     if (!validate()) {
//       toast.error("Please fix the errors below")
//       return
//     }
//     setIsSubmitting(true)

//     const order: Order = {
//       id: generateOrderId(),
//       items,
//       subtotal,
//       shipping,
//       total,
//       customer: form,
//       paymentMethod,
//       status: "pending",
//       createdAt: new Date().toISOString(),
//     }

//     addOrder(order)

//     /* Build WhatsApp messages */
//     const itemsList = items
//       .map((i) => `- ${i.product.name} x${i.quantity} = ${formatPrice(i.product.price * i.quantity)}`)
//       .join("\n")

//     const ownerMsg = `NEW ORDER ${order.id}\n\nCustomer: ${form.firstName} ${form.lastName}\nPhone: ${form.phone}\nCity: ${form.city}\nAddress: ${form.address}\nPayment: ${paymentMethod.toUpperCase()}\n\nItems:\n${itemsList}\n\nSubtotal: ${formatPrice(subtotal)}\nShipping: ${shipping === 0 ? "FREE" : formatPrice(shipping)}\nTotal: ${formatPrice(total)}`

//     const customerMsg = `Thank you for your order at Bazaar!\n\nOrder ID: ${order.id}\nTotal: ${formatPrice(total)}\nPayment: ${paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "bank_transfer" ? "Bank Transfer" : "Online Payment"}\n\nWe will process your order shortly. Track your order with ID: ${order.id}`

//     /* Open WhatsApp for store owner */
//     window.open(getWhatsAppUrl(STORE_WHATSAPP, ownerMsg), "_blank")

//     /* Also prepare customer WhatsApp link (open after a delay) */
//     if (form.phone) {
//       setTimeout(() => {
//         window.open(getWhatsAppUrl(form.phone, customerMsg), "_blank")
//       }, 1500)
//     }

//     clearCart()
//     toast.success("Order placed successfully!")

//     setTimeout(() => {
//       router.push(`/order-confirmation?id=${order.id}`)
//       setIsSubmitting(false)
//     }, 500)
//   }

//   if (items.length === 0) {
//     return (
//       <div className="mx-auto max-w-7xl px-4 py-20 text-center">
//         <ShoppingBag className="size-16 text-muted-foreground/30 mx-auto mb-4" />
//         <h1 className="font-serif text-3xl font-bold text-foreground">Nothing to Checkout</h1>
//         <p className="text-muted-foreground mt-2">Your cart is empty.</p>
//         <Link href="/">
//           <Button className="mt-6">Continue Shopping</Button>
//         </Link>
//       </div>
//     )
//   }

//   return (
//     <div className="mx-auto max-w-7xl px-4 py-8">
//       <Link href="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
//         <ArrowLeft className="size-4" />
//         Back to Cart
//       </Link>

//       <h1 className="font-serif text-3xl font-bold text-foreground mb-8">Checkout</h1>

//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Customer Details */}
//           <div className="lg:col-span-2 flex flex-col gap-6">
//             {/* Contact Information */}
//             <div className="rounded-lg border border-border bg-card p-6">
//               <h2 className="font-semibold text-foreground text-lg mb-4">Contact Information</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="firstName">First Name *</Label>
//                   <Input
//                     id="firstName"
//                     value={form.firstName}
//                     onChange={(e) => updateField("firstName", e.target.value)}
//                     className={errors.firstName ? "border-destructive" : ""}
//                   />
//                   {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="lastName">Last Name *</Label>
//                   <Input
//                     id="lastName"
//                     value={form.lastName}
//                     onChange={(e) => updateField("lastName", e.target.value)}
//                     className={errors.lastName ? "border-destructive" : ""}
//                   />
//                   {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="email">Email *</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={form.email}
//                     onChange={(e) => updateField("email", e.target.value)}
//                     className={errors.email ? "border-destructive" : ""}
//                   />
//                   {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="phone">Phone (WhatsApp) *</Label>
//                   <Input
//                     id="phone"
//                     placeholder="03001234567"
//                     value={form.phone}
//                     onChange={(e) => updateField("phone", e.target.value)}
//                     className={errors.phone ? "border-destructive" : ""}
//                   />
//                   {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
//                 </div>
//               </div>
//             </div>

//             {/* Shipping Address */}
//             <div className="rounded-lg border border-border bg-card p-6">
//               <h2 className="font-semibold text-foreground text-lg mb-4">Shipping Address</h2>
//               <div className="flex flex-col gap-4">
//                 <div>
//                   <Label htmlFor="address">Street Address *</Label>
//                   <Input
//                     id="address"
//                     value={form.address}
//                     onChange={(e) => updateField("address", e.target.value)}
//                     className={errors.address ? "border-destructive" : ""}
//                   />
//                   {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                   <div>
//                     <Label htmlFor="city">City *</Label>
//                     <Input
//                       id="city"
//                       value={form.city}
//                       onChange={(e) => updateField("city", e.target.value)}
//                       className={errors.city ? "border-destructive" : ""}
//                     />
//                     {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
//                   </div>
//                   <div>
//                     <Label htmlFor="province">Province *</Label>
//                     <select
//                       id="province"
//                       value={form.province}
//                       onChange={(e) => updateField("province", e.target.value)}
//                       className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
//                     >
//                       {PAKISTAN_PROVINCES.map((p) => (
//                         <option key={p} value={p}>{p}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <Label htmlFor="postalCode">Postal Code</Label>
//                     <Input
//                       id="postalCode"
//                       value={form.postalCode}
//                       onChange={(e) => updateField("postalCode", e.target.value)}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label htmlFor="notes">Order Notes (optional)</Label>
//                   <Textarea
//                     id="notes"
//                     placeholder="Any special instructions..."
//                     value={form.notes}
//                     onChange={(e) => updateField("notes", e.target.value)}
//                     rows={3}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Payment Method */}
//             <div className="rounded-lg border border-border bg-card p-6">
//               <h2 className="font-semibold text-foreground text-lg mb-4">Payment Method</h2>
//               <RadioGroup
//                 value={paymentMethod}
//                 onValueChange={(val) => setPaymentMethod(val as typeof paymentMethod)}
//                 className="flex flex-col gap-3"
//               >
//                 <label className="flex items-center gap-3 p-4 rounded-md border border-border cursor-pointer hover:bg-muted/50 transition-colors has-data-[state=checked]:border-foreground has-data-[state=checked]:bg-muted/30">
//                   <RadioGroupItem value="cod" />
//                   <div>
//                     <p className="text-sm font-medium text-foreground">Cash on Delivery (COD)</p>
//                     <p className="text-xs text-muted-foreground">Pay when your order arrives</p>
//                   </div>
//                 </label>
//                 <label className="flex items-center gap-3 p-4 rounded-md border border-border cursor-pointer hover:bg-muted/50 transition-colors has-data-[state=checked]:border-foreground has-data-[state=checked]:bg-muted/30">
//                   <RadioGroupItem value="bank_transfer" />
//                   <div>
//                     <p className="text-sm font-medium text-foreground">Bank Transfer</p>
//                     <p className="text-xs text-muted-foreground">Transfer to our bank account (details shared via WhatsApp)</p>
//                   </div>
//                 </label>
//                 <label className="flex items-center gap-3 p-4 rounded-md border border-border cursor-pointer hover:bg-muted/50 transition-colors has-data-[state=checked]:border-foreground has-data-[state=checked]:bg-muted/30">
//                   <RadioGroupItem value="online" />
//                   <div>
//                     <p className="text-sm font-medium text-foreground">Online Payment</p>
//                     <p className="text-xs text-muted-foreground">Pay via card or mobile wallet (coming soon)</p>
//                   </div>
//                 </label>
//               </RadioGroup>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="rounded-lg border border-border bg-card p-6 sticky top-24">
//               <h2 className="font-semibold text-foreground text-lg mb-4">
//                 Order Summary ({items.length} {items.length === 1 ? "item" : "items"})
//               </h2>
//               <div className="flex flex-col gap-3 mb-4">
//                 {items.map((item) => (
//                   <div key={item.product.id} className="flex gap-3">
//                     <div className="relative w-12 h-16 rounded bg-muted overflow-hidden shrink-0">
//                       <Image
//                         src={item.product.images[0]}
//                         alt={item.product.name}
//                         fill
//                         className="object-cover"
//                         sizes="48px"
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-xs text-foreground font-medium line-clamp-1">{item.product.name}</p>
//                       <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
//                     </div>
//                     <span className="text-xs font-medium text-foreground shrink-0">
//                       {formatPrice(item.product.price * item.quantity)}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <div className="border-t border-border pt-3 flex flex-col gap-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Subtotal</span>
//                   <span className="text-foreground font-medium">{formatPrice(subtotal)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Shipping</span>
//                   <span className="text-foreground font-medium">
//                     {shipping === 0 ? "FREE" : formatPrice(shipping)}
//                   </span>
//                 </div>
//                 <div className="border-t border-border pt-2 flex justify-between">
//                   <span className="font-semibold text-foreground">Total</span>
//                   <span className="font-bold text-foreground text-lg">{formatPrice(total)}</span>
//                 </div>
//               </div>
//               <Button
//                 type="submit"
//                 className="w-full mt-6"
//                 size="lg"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? "Processing..." : (
//                   <>
//                     <CheckCircle2 className="size-4 mr-2" />
//                     Place Order - {formatPrice(total)}
//                   </>
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

"use client"

import { v4 as uuidv4 } from 'uuid';
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/providers/cart-provider"
import { useOrders } from "@/components/providers/order-provider"
import { useAuth } from "@/components/providers/auth-provider"
import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ShoppingBag, ArrowLeft, CheckCircle2 } from "lucide-react"
import type { CustomerInfo, Order } from "@/lib/types"
import { toast } from "sonner"

const PAKISTAN_PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Azad Kashmir",
  "Gilgit-Baltistan",
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const { addOrder } = useOrders()
  const { user } = useAuth()
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank_transfer" | "online">("cod")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [form, setForm] = useState<CustomerInfo>({
    firstName: user?.name.split(" ")[0] ?? "",
    lastName: user?.name.split(" ").slice(1).join(" ") ?? "",
    email: user?.email ?? "",
    phone: "",
    address: "",
    city: "",
    province: "Punjab",
    postalCode: "",
    notes: "",
  })

  const shipping = subtotal >= 5000 ? 0 : 250
  const total = subtotal + shipping

  function updateField(field: keyof CustomerInfo, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (!form.firstName.trim()) errs.firstName = "First name is required"
    if (!form.lastName.trim()) errs.lastName = "Last name is required"
    if (!form.email.trim()) errs.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email"
    if (!form.phone.trim()) errs.phone = "Phone number is required"
    else if (!/^(0|\+?92)?3\d{9}$/.test(form.phone.replace(/[\s-]/g, "")))
      errs.phone = "Enter a valid Pakistani phone number"
    if (!form.address.trim()) errs.address = "Address is required"
    if (!form.city.trim()) errs.city = "City is required"
    if (!form.province.trim()) errs.province = "Province is required"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) {
      toast.error("Please fix the errors below")
      return
    }

    setIsSubmitting(true)

    const order: Order = {
      id: generateOrderId(),           // ye function aapke lib/format mein hona chahiye
      items,
      subtotal,
      shipping,
      total,
      customer: form,
      paymentMethod,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    // Order save karo (context / localStorage / future mein backend)
    addOrder(order)

    // Cart empty kar do
    clearCart()

    // Success message
    toast.success("Order placed successfully! We'll contact you soon.")

    // Thodi der baad confirmation page pe redirect
    setTimeout(() => {
      router.push(`/order-confirmation?id=${order.id}`)
      setIsSubmitting(false)
    }, 800)
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <ShoppingBag className="size-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="font-serif text-3xl font-bold text-foreground">Nothing to Checkout</h1>
        <p className="text-muted-foreground mt-2">Your cart is empty.</p>
        <Link href="/">
          <Button className="mt-6">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link href="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="size-4" />
        Back to Cart
      </Link>

      <h1 className="font-serif text-3xl font-bold text-foreground mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Details */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Contact Information */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="font-semibold text-foreground text-lg mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                  {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className={errors.lastName ? "border-destructive" : ""}
                  />
                  {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone (WhatsApp) *</Label>
                  <Input
                    id="phone"
                    placeholder="03001234567"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="font-semibold text-foreground text-lg mb-4">Shipping Address</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <Label htmlFor="province">Province *</Label>
                    <select
                      id="province"
                      value={form.province}
                      onChange={(e) => updateField("province", e.target.value)}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                    >
                      {PAKISTAN_PROVINCES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={form.postalCode}
                      onChange={(e) => updateField("postalCode", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Order Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions..."
                    value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="font-semibold text-foreground text-lg mb-4">Payment Method</h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(val) => setPaymentMethod(val as typeof paymentMethod)}
                className="flex flex-col gap-3"
              >
                <label className="flex items-center gap-3 p-4 rounded-md border border-border cursor-pointer hover:bg-muted/50 transition-colors has-[[data-state=checked]]:border-foreground has-[[data-state=checked]]:bg-muted/30">
                  <RadioGroupItem value="cod" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Cash on Delivery (COD)</p>
                    <p className="text-xs text-muted-foreground">Pay when your order arrives</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-md border border-border cursor-pointer hover:bg-muted/50 transition-colors has-[[data-state=checked]]:border-foreground has-[[data-state=checked]]:bg-muted/30">
                  <RadioGroupItem value="bank_transfer" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Bank Transfer</p>
                    <p className="text-xs text-muted-foreground">Transfer to our bank account (details will be shared later)</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-md border border-border cursor-pointer hover:bg-muted/50 transition-colors has-[[data-state=checked]]:border-foreground has-[[data-state=checked]]:bg-muted/30">
                  <RadioGroupItem value="online" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Online Payment</p>
                    <p className="text-xs text-muted-foreground">Pay via card or mobile wallet (coming soon)</p>
                  </div>
                </label>
              </RadioGroup>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-border bg-card p-6 sticky top-24">
              <h2 className="font-semibold text-foreground text-lg mb-4">
                Order Summary ({items.length} {items.length === 1 ? "item" : "items"})
              </h2>
              <div className="flex flex-col gap-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-12 h-16 rounded bg-muted overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-medium text-foreground flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 flex flex-col gap-2 text-sm">
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
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-foreground text-lg">{formatPrice(total)}</span>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full mt-6"
                size="lg"
                disabled={isSubmitting || items.length === 0}
              >
                {isSubmitting ? "Processing..." : (
                  <>
                    <CheckCircle2 className="size-4 mr-2" />
                    Place Order - {formatPrice(total)}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

function generateOrderId(): string {
 const now = Date.now();                             // milliseconds since 1970
  const random = Math.floor(Math.random() * 1000000); // 6 digits
  return `ORD-${now}-${random}`;
}
