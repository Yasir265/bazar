"use client"

import { categories } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function AdminCategoriesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground">Categories</h1>
        <Badge variant="outline" className="text-sm">{categories.length} total</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.slug} className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="flex gap-4 p-4">
              <div className="relative w-20 h-24 rounded-md bg-muted overflow-hidden flex-shrink-0">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{cat.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cat.subcategories.map((sub) => (
                    <Badge key={sub} variant="secondary" className="text-xs font-normal">
                      {sub}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
