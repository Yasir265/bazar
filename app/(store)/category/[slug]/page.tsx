"use client"

import { useParams } from "next/navigation"
import { useState, useMemo } from "react"
import { getCategoryBySlug, getProductsByCategory } from "@/lib/data"
import { ProductGrid } from "@/components/product/product-grid"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const category = getCategoryBySlug(slug)
  const allProducts = getProductsByCategory(slug)

  const [selectedSub, setSelectedSub] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("featured")

  const filtered = useMemo(() => {
    let result = selectedSub === "all"
      ? allProducts
      : allProducts.filter((p) => p.subcategory === selectedSub)

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case "newest":
        result = [...result].sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0))
        break
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    return result
  }, [allProducts, selectedSub, sortBy])

  if (!category) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-foreground">Category Not Found</h1>
        <p className="text-muted-foreground mt-2">The category you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/">
          <Button className="mt-6">Back to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Category Hero */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold text-background sm:text-5xl">{category.name}</h1>
            <p className="text-sm text-background/70 mt-2">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <SlidersHorizontal className="size-4 text-muted-foreground flex-shrink-0" />
            <Button
              variant={selectedSub === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSub("all")}
            >
              All
            </Button>
            {category.subcategories.map((sub) => (
              <Button
                key={sub}
                variant={selectedSub === sub ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSub(sub)}
                className="whitespace-nowrap"
              >
                {sub}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{filtered.length} products</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 h-8 text-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No products found in this subcategory.</p>
            <Button variant="outline" className="mt-4" onClick={() => setSelectedSub("all")}>
              View All {category.name}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
