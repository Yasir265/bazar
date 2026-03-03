"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useMemo, useState } from "react"
import { searchProducts, products } from "@/lib/data"
import { ProductGrid } from "@/components/product/product-grid"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search as SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") ?? ""
  const [localQuery, setLocalQuery] = useState(query)
  const [sortBy, setSortBy] = useState("featured")

  const results = useMemo(() => {
    const base = query ? searchProducts(query) : products
    switch (sortBy) {
      case "price-asc": return [...base].sort((a, b) => a.price - b.price)
      case "price-desc": return [...base].sort((a, b) => b.price - a.price)
      case "rating": return [...base].sort((a, b) => b.rating - a.rating)
      default: return base
    }
  }, [query, sortBy])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(localQuery.trim())}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-foreground mb-6">
        {query ? `Results for "${query}"` : "All Products"}
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search products..."
              className="pl-10"
            />
          </div>
        </form>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">{results.length} products</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-44 h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {results.length > 0 ? (
        <ProductGrid products={results} />
      ) : (
        <div className="text-center py-20">
          <SearchIcon className="size-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No products found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
