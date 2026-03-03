/* ── Mock product data for all categories ── */
import type { Product, Category } from "./types"

export const categories: Category[] = [
  {
    slug: "men",
    name: "Men",
    description: "Premium menswear collection featuring traditional and modern styles",
    image: "/images/categories/men.jpg",
    subcategories: [
      "Shalwar Kameez",
      "Shirts",
      "Pants & Trousers",
      "Belts",
      "Shoes & Slippers",
      "Undergarments",
      "Perfumes",
    ],
  },
  {
    slug: "women",
    name: "Women",
    description: "Elegant women's fashion from casual to bridal couture",
    image: "/images/categories/women.jpg",
    subcategories: [
      "Dresses & Clothing",
      "Skirts & Trousers",
      "Cosmetics & Beauty",
      "Undergarments",
      "Shoes & Sandals",
      "Handbags & Purses",
    ],
  },
  {
    slug: "boys",
    name: "Boys",
    description: "Trendy and comfortable clothing for boys of all ages",
    image: "/images/categories/boys.jpg",
    subcategories: [
      "Shalwar Kameez",
      "Shirts",
      "Pants & Trousers",
      "Shoes & Slippers",
      "Belts",
      "Undergarments",
      "Perfumes",
    ],
  },
  {
    slug: "girls",
    name: "Girls",
    description: "Beautiful and stylish outfits for girls",
    image: "/images/categories/girls.jpg",
    subcategories: [
      "Dresses & Clothing",
      "Skirts & Trousers",
      "Cosmetics & Beauty",
      "Shoes & Sandals",
      "Handbags & Purses",
      "Undergarments",
    ],
  },
  {
    slug: "kids",
    name: "Kids",
    description: "Fun and colorful clothing and accessories for little ones",
    image: "/images/categories/kids.jpg",
    subcategories: [
      "Clothing",
      "Shoes",
      "Accessories",
    ],
  },
]

/* Helper to quickly look up a category */
export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug)
}

/* ── Products ── */
const p = (
  id: string,
  name: string,
  price: number,
  originalPrice: number | undefined,
  category: Product["category"],
  subcategory: string,
  opts?: Partial<Product>,
): Product => ({
  id,
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  description: `Premium quality ${name.toLowerCase()} crafted with the finest materials. Perfect for any occasion, this piece combines comfort with style.`,
  price,
  originalPrice,
  images: [`/images/products/${id}.jpg`],
  category,
  subcategory,
  sizes: opts?.sizes ?? ["S", "M", "L", "XL"],
  colors: opts?.colors ?? [],
  inStock: opts?.inStock ?? true,
  featured: opts?.featured ?? false,
  newArrival: opts?.newArrival ?? false,
  rating: opts?.rating ?? 4.2 + Math.random() * 0.7,
  reviewCount: opts?.reviewCount ?? Math.floor(20 + Math.random() * 180),
})

export const products: Product[] = [
  /* ─── MEN ─── */
  p("m01", "Classic White Shalwar Kameez", 4500, 5500, "men", "Shalwar Kameez", { featured: true, colors: ["White", "Cream"] }),
  p("m02", "Premium Lawn Shalwar Kameez", 3800, undefined, "men", "Shalwar Kameez", { colors: ["Blue", "Grey", "Beige"] }),
  p("m03", "Formal Oxford Shirt", 2800, 3200, "men", "Shirts", { newArrival: true, colors: ["White", "Light Blue", "Pink"] }),
  p("m04", "Casual Linen Shirt", 2200, undefined, "men", "Shirts", { colors: ["Olive", "Navy", "Beige"] }),
  p("m05", "Slim Fit Chinos", 3200, 3800, "men", "Pants & Trousers", { featured: true }),
  p("m06", "Cotton Dress Pants", 2900, undefined, "men", "Pants & Trousers"),
  p("m07", "Genuine Leather Belt", 1500, 1800, "men", "Belts", { sizes: ["32", "34", "36", "38", "40"], colors: ["Black", "Brown"] }),
  p("m08", "Leather Formal Shoes", 6500, 7800, "men", "Shoes & Slippers", { sizes: ["7", "8", "9", "10", "11"], colors: ["Black", "Tan"], featured: true }),
  p("m09", "Peshawari Chappal", 2800, undefined, "men", "Shoes & Slippers", { sizes: ["7", "8", "9", "10", "11"], colors: ["Brown", "Tan"] }),
  p("m10", "Cotton Vest Pack (3)", 1200, 1500, "men", "Undergarments", { sizes: ["S", "M", "L", "XL"] }),
  p("m11", "Oud Perfume 100ml", 4200, 5000, "men", "Perfumes", { sizes: [], newArrival: true }),
  p("m12", "Musk Attar Collection", 2500, undefined, "men", "Perfumes", { sizes: [] }),

  /* ─── WOMEN ─── */
  p("w01", "Embroidered Lawn 3-Piece", 6800, 8200, "women", "Dresses & Clothing", { featured: true, colors: ["Coral", "Teal", "Ivory"] }),
  p("w02", "Silk Formal Dress", 12500, 15000, "women", "Dresses & Clothing", { newArrival: true, colors: ["Burgundy", "Gold", "Emerald"] }),
  p("w03", "Cotton Kurti", 2200, undefined, "women", "Dresses & Clothing", { colors: ["White", "Yellow", "Sky Blue"] }),
  p("w04", "Palazzo Pants", 1800, 2200, "women", "Skirts & Trousers", { colors: ["Black", "Navy", "Maroon"] }),
  p("w05", "Printed Skirt", 1500, undefined, "women", "Skirts & Trousers", { colors: ["Floral", "Striped"] }),
  p("w06", "Matte Lipstick Set", 1800, 2200, "women", "Cosmetics & Beauty", { sizes: [], featured: true }),
  p("w07", "Skincare Essentials Kit", 3500, 4200, "women", "Cosmetics & Beauty", { sizes: [] }),
  p("w08", "Cotton Basics Pack (3)", 1400, 1800, "women", "Undergarments", { sizes: ["S", "M", "L", "XL"] }),
  p("w09", "Block Heel Sandals", 3200, 3800, "women", "Shoes & Sandals", { sizes: ["5", "6", "7", "8", "9"], colors: ["Black", "Nude", "Red"], newArrival: true }),
  p("w10", "Embroidered Khussa", 2500, undefined, "women", "Shoes & Sandals", { sizes: ["5", "6", "7", "8", "9"], colors: ["Gold", "Silver", "Multi"] }),
  p("w11", "Leather Crossbody Bag", 4500, 5500, "women", "Handbags & Purses", { sizes: [], colors: ["Black", "Tan", "Burgundy"], featured: true }),
  p("w12", "Embroidered Clutch", 2800, undefined, "women", "Handbags & Purses", { sizes: [], colors: ["Gold", "Silver", "Rose"] }),

  /* ─── BOYS ─── */
  p("b01", "Boys Festive Shalwar Kameez", 2800, 3200, "boys", "Shalwar Kameez", { sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"], featured: true }),
  p("b02", "Boys Casual Shalwar Kameez", 1800, undefined, "boys", "Shalwar Kameez", { sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"] }),
  p("b03", "Boys Polo Shirt", 1200, 1500, "boys", "Shirts", { sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"], colors: ["Blue", "Red", "Green"] }),
  p("b04", "Boys Denim Jeans", 1800, undefined, "boys", "Pants & Trousers", { sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"], colors: ["Blue", "Black"] }),
  p("b05", "Boys Sneakers", 2200, 2800, "boys", "Shoes & Slippers", { sizes: ["8", "9", "10", "11", "12", "13", "1", "2", "3"], colors: ["White", "Black"], newArrival: true }),
  p("b06", "Boys Leather Belt", 800, undefined, "boys", "Belts", { sizes: ["S", "M", "L"] }),
  p("b07", "Boys Cotton Vest Pack", 800, 1000, "boys", "Undergarments", { sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"] }),
  p("b08", "Boys Body Spray", 650, undefined, "boys", "Perfumes", { sizes: [] }),

  /* ─── GIRLS ─── */
  p("g01", "Girls Embroidered Frock", 3200, 3800, "girls", "Dresses & Clothing", { sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"], featured: true, colors: ["Pink", "Peach", "Lavender"] }),
  p("g02", "Girls Cotton Kurti", 1500, undefined, "girls", "Dresses & Clothing", { sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: ["White", "Yellow"] }),
  p("g03", "Girls Party Dress", 4500, 5200, "girls", "Dresses & Clothing", { sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"], newArrival: true }),
  p("g04", "Girls Printed Skirt", 1000, undefined, "girls", "Skirts & Trousers", { sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"] }),
  p("g05", "Girls Lip Gloss Set", 600, 800, "girls", "Cosmetics & Beauty", { sizes: [] }),
  p("g06", "Girls Ballet Shoes", 1800, 2200, "girls", "Shoes & Sandals", { sizes: ["8", "9", "10", "11", "12", "13"], colors: ["Pink", "White"] }),
  p("g07", "Girls Mini Purse", 1200, undefined, "girls", "Handbags & Purses", { sizes: [], colors: ["Pink", "Purple", "Red"] }),
  p("g08", "Girls Cotton Basics Pack", 700, 900, "girls", "Undergarments", { sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"] }),

  /* ─── KIDS ─── */
  p("k01", "Toddler Romper Set", 1500, 1800, "kids", "Clothing", { sizes: ["6-12M", "12-18M", "18-24M", "2-3Y"], featured: true, colors: ["Blue", "Pink", "Yellow"] }),
  p("k02", "Kids Winter Jacket", 3200, 3800, "kids", "Clothing", { sizes: ["2-3Y", "4-5Y", "6-7Y"], newArrival: true }),
  p("k03", "Kids Printed T-Shirt Pack (3)", 1800, 2200, "kids", "Clothing", { sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"] }),
  p("k04", "Kids Light-Up Sneakers", 2500, 3000, "kids", "Shoes", { sizes: ["5", "6", "7", "8", "9", "10"], colors: ["Blue", "Pink"], featured: true }),
  p("k05", "Kids Sandals", 1200, undefined, "kids", "Shoes", { sizes: ["5", "6", "7", "8", "9", "10"] }),
  p("k06", "Kids Backpack", 1800, 2200, "kids", "Accessories", { sizes: [], colors: ["Blue", "Pink", "Green"] }),
  p("k07", "Kids Cap & Sunglasses Set", 800, 1000, "kids", "Accessories", { sizes: [] }),
  p("k08", "Baby Blanket & Bib Set", 1500, undefined, "kids", "Accessories", { sizes: [] }),
]

export function getProductById(id: string) {
  return products.find((pr) => pr.id === id)
}

export function getProductsByCategory(slug: string) {
  return products.filter((pr) => pr.category === slug)
}

export function getFeaturedProducts() {
  return products.filter((pr) => pr.featured)
}

export function getNewArrivals() {
  return products.filter((pr) => pr.newArrival)
}

export function searchProducts(query: string) {
  const q = query.toLowerCase()
  return products.filter(
    (pr) =>
      pr.name.toLowerCase().includes(q) ||
      pr.subcategory.toLowerCase().includes(q) ||
      pr.category.toLowerCase().includes(q),
  )
}
