import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { categories } from "@/lib/data"

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-widest mb-4">BAZAAR</h2>
            <p className="text-background/70 text-sm leading-relaxed">
              Pakistan&apos;s premier online fashion destination. Discover curated collections
              of traditional and contemporary styles for the entire family.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Shop</h3>
            <ul className="flex flex-col gap-2.5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Support</h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/cart" className="text-sm text-background/70 hover:text-background transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-sm text-background/70 hover:text-background transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <span className="text-sm text-background/70">Shipping & Returns</span>
              </li>
              <li>
                <span className="text-sm text-background/70">Privacy Policy</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 mt-0.5 flex-shrink-0 text-background/50" />
                <span className="text-sm text-background/70">
                  Lahore, Punjab, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 flex-shrink-0 text-background/50" />
                <span className="text-sm text-background/70">+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 flex-shrink-0 text-background/50" />
                <span className="text-sm text-background/70">hello@bazaar.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50">
            &copy; {new Date().getFullYear()} Bazaar. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-background/50">
            <span>Cash on Delivery</span>
            <span>|</span>
            <span>Bank Transfer</span>
            <span>|</span>
            <span>Online Payment</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
