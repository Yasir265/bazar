"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedProducts } from "@/lib/data"
import { ProductGrid } from "@/components/product/product-grid"

export function FeaturedProducts() {
  const featured = getFeaturedProducts()

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 border-t border-border">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Curated For You</p>
          <h2 className="font-serif text-3xl font-bold text-foreground">Featured Products</h2>
        </div>
        <Link
          href="/search?q="
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-foreground hover:underline underline-offset-4"
        >
          View All <ArrowRight className="size-4" />
        </Link>
      </div>
      <ProductGrid products={featured} />
    </section>
  )
}
