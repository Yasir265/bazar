import { Truck, Shield, RefreshCw, Phone } from "lucide-react"

const perks = [
  { icon: Truck, label: "Free Delivery", desc: "On orders over Rs. 5,000" },
  { icon: Shield, label: "Secure Payments", desc: "COD & Online available" },
  { icon: RefreshCw, label: "Easy Returns", desc: "7-day return policy" },
  { icon: Phone, label: "WhatsApp Support", desc: "Quick response guaranteed" },
]

export function PromoStrip() {
  return (
    <section className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk) => (
            <div key={perk.label} className="flex items-start gap-3">
              <div className="rounded-full bg-background/10 p-2.5 flex-shrink-0">
                <perk.icon className="size-5 text-background/80" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{perk.label}</h3>
                <p className="text-xs text-background/60 mt-0.5">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
