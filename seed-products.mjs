import { drizzle } from "drizzle-orm/mysql2";
import { products } from "./drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

const sampleProducts = [
  {
    name: "Air Jordan 1 Retro High OG Chicago",
    description: "The iconic Air Jordan 1 in the legendary Chicago colorway. A must-have for any sneaker collection.",
    brand: "Nike",
    category: "Air Jordan 1",
    basePrice: 1299900, // ₱12,999.00
    salePrice: null,
    images: JSON.stringify(["/products/jordan1-chicago.jpg"]),
    sizes: JSON.stringify(["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"]),
    stock: 15,
    featured: 1,
  },
  {
    name: "Air Jordan 1 Low White",
    description: "Clean and versatile Air Jordan 1 Low in all-white colorway. Perfect for everyday wear.",
    brand: "Nike",
    category: "Air Jordan 1",
    basePrice: 699900, // ₱6,999.00
    salePrice: 549900, // ₱5,499.00 (on sale)
    images: JSON.stringify(["/products/jordan1-low-white.png"]),
    sizes: JSON.stringify(["US 7", "US 8", "US 9", "US 10", "US 11"]),
    stock: 25,
    featured: 1,
  },
  {
    name: "Air Jordan 1 Retro High OG Black and Gold",
    description: "Premium Air Jordan 1 featuring luxurious black and gold colorway.",
    brand: "Nike",
    category: "Air Jordan 1",
    basePrice: 1499900, // ₱14,999.00
    salePrice: null,
    images: JSON.stringify(["/products/jordan1-black-gold.png"]),
    sizes: JSON.stringify(["US 8", "US 9", "US 10", "US 11", "US 12"]),
    stock: 8,
    featured: 1,
  },
  {
    name: "Yeezy Boost 350 V2 Beluga",
    description: "The highly sought-after Yeezy Boost 350 V2 in the original Beluga colorway.",
    brand: "Adidas",
    category: "Yeezy Boost",
    basePrice: 1799900, // ₱17,999.00
    salePrice: 1599900, // ₱15,999.00
    images: JSON.stringify(["/products/yeezy-beluga.jpg"]),
    sizes: JSON.stringify(["US 7", "US 8", "US 9", "US 10", "US 11"]),
    stock: 5,
    featured: 1,
  },
  {
    name: "Yeezy Boost 350 V2 Black",
    description: "Sleek all-black Yeezy Boost 350 V2. A versatile addition to any rotation.",
    brand: "Adidas",
    category: "Yeezy Boost",
    basePrice: 1699900, // ₱16,999.00
    salePrice: null,
    images: JSON.stringify(["/products/yeezy-black.jpg"]),
    sizes: JSON.stringify(["US 7", "US 8", "US 9", "US 10", "US 11"]),
    stock: 10,
    featured: 0,
  },
  {
    name: "Nike Dunk Low Brown",
    description: "Classic Nike Dunk Low in rich brown and cream colorway.",
    brand: "Nike",
    category: "Nike Dunk Low",
    basePrice: 899900, // ₱8,999.00
    salePrice: 699900, // ₱6,999.00
    images: JSON.stringify(["/products/dunk-low-brown.png"]),
    sizes: JSON.stringify(["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"]),
    stock: 20,
    featured: 0,
  },
  {
    name: "Nike Dunk Low White",
    description: "Clean all-white Nike Dunk Low. A timeless classic.",
    brand: "Nike",
    category: "Nike Dunk Low",
    basePrice: 799900, // ₱7,999.00
    salePrice: null,
    images: JSON.stringify(["/products/dunk-low-white.png"]),
    sizes: JSON.stringify(["US 7", "US 8", "US 9", "US 10", "US 11"]),
    stock: 30,
    featured: 0,
  },
];

async function seed() {
  console.log("Seeding products...");
  
  for (const product of sampleProducts) {
    await db.insert(products).values(product);
    console.log(`Added: ${product.name}`);
  }
  
  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
