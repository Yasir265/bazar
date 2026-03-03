import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Bazaar Fashion Collection"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-background/70 mb-3">
            New Season Collection
          </p>
          <h2 className="font-serif text-4xl font-bold leading-tight text-background sm:text-5xl lg:text-6xl text-balance">
            Redefining Pakistani Fashion
          </h2>
          <p className="mt-4 text-base text-background/80 leading-relaxed max-w-md">
            Discover our curated collection of traditional and contemporary styles.
            Premium quality, nationwide delivery.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/category/women">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 font-medium">
                Shop Women
                <ArrowRight className="size-4 ml-1" />
              </Button>
            </Link>
            <Link href="/category/men">
              <Button size="lg" variant="outline" className="border-background/40 text-background hover:bg-background/10 hover:text-background font-medium">
                Shop Men
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
