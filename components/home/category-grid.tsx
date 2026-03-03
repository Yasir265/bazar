import Image from "next/image"
import Link from "next/link"
import { categories } from "@/lib/data"

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Browse</p>
        <h2 className="font-serif text-3xl font-bold text-foreground">Shop by Category</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group relative aspect-[3/4] overflow-hidden rounded-lg"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-4">
              <h3 className="font-serif text-xl font-semibold text-background">{cat.name}</h3>
              <p className="text-xs text-background/70 mt-0.5 group-hover:underline">
                Shop Now
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
