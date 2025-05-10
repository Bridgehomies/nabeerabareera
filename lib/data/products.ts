// Central product data store for the entire application
// lib/data/products.ts

export type Product = {
    id: number
    name: string
    price: number
    salePrice?: number
    discount?: number
    category: string
    subcategory?: string
    description?: string
    features?: string[]
    image: string
    images?: string[]
    colors?: string[]
    sizes?: string[]
    inStock: boolean
    dateAdded: string
    isNew?: boolean
    isSale?: boolean
    isFeatured?: boolean
    rating: number
    reviews: number
    tags?: string[]
  }
  
  // Calculate if a product is new (added within the last 14 days)
  const isProductNew = (dateString: string): boolean => {
    const productDate = new Date(dateString)
    const currentDate = new Date()
    const diffTime = currentDate.getTime() - productDate.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    return diffDays <= 14
  }
  
  // Helper to calculate discount percentage
  const calculateDiscount = (originalPrice: number, salePrice: number): number => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
  }
  
  // Central product data
  export const products: Product[] = [
    {
      id: 1,
      name: "Crystal Pendant Necklace",
      price: 49.99,
      salePrice: 39.99,
      category: "jewelry",
      subcategory: "necklaces",
      description: "This elegant crystal pendant necklace features a stunning design that catches the light beautifully.",
      features: [
        "High-quality crystal pendant",
        "Adjustable chain length",
        "Hypoallergenic materials",
        "Tarnish-resistant finish",
      ],
      image: "https://images.unsplash.com/photo-1724931652176-1a2af5f5069d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Silver", "Gold", "Rose Gold"],
      inStock: true,
      dateAdded: "2025-05-01",
      isFeatured: true,
      rating: 4.5,
      reviews: 128,
      tags: ["crystal", "pendant", "elegant", "gift"],
    },
    {
      id: 2,
      name: "Wool Blend Overcoat",
      price: 129.99,
      salePrice: 89.99,
      category: "mens-coats",
      subcategory: "overcoats",
      description: "Stay warm and stylish with this premium wool blend overcoat, perfect for cold weather.",
      features: [
        "70% wool, 30% polyester blend",
        "Full lining",
        "Double-breasted design",
        "Two side pockets",
        "Inner pocket",
      ],
      image: "https://images.unsplash.com/photo-1649937408746-4d2f603f91c8?q=80&w=1526&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Black", "Navy", "Camel"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      inStock: true,
      dateAdded: "2025-05-02",
      isFeatured: false,
      rating: 4.8,
      reviews: 86,
      tags: ["wool", "winter", "coat", "formal"],
    },
    {
      id: 3,
      name: "Kids Denim Jacket",
      price: 59.99,
      salePrice: 44.99,
      category: "kids-clothing",
      subcategory: "jackets",
      description: "A durable and stylish denim jacket for kids that's perfect for all seasons.",
      features: ["100% cotton denim", "Button-up front", "Two chest pockets", "Adjustable cuffs", "Machine washable"],
      image: "https://images.unsplash.com/photo-1632539965485-d90e8cbca5d3?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Blue", "Light Blue"],
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
      inStock: true,
      dateAdded: "2025-05-03",
      isFeatured: false,
      rating: 4.2,
      reviews: 42,
      tags: ["denim", "jacket", "kids", "casual"],
    },
    {
      id: 4,
      name: "Pearl Drop Earrings",
      price: 39.99,
      salePrice: 29.99,
      category: "jewelry",
      subcategory: "earrings",
      description: "Elegant pearl drop earrings that add a touch of sophistication to any outfit.",
      features: ["Freshwater pearl drops", "Sterling silver posts", "Hypoallergenic", "Comes in a gift box"],
      image: "https://images.unsplash.com/photo-1665198134143-8c4434d3578b?q=80&w=1535&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["White Pearl", "Cream Pearl"],
      inStock: true,
      dateAdded: "2025-05-04",
      isFeatured: false,
      rating: 4.7,
      reviews: 63,
      tags: ["pearl", "earrings", "elegant", "gift"],
    },
    {
      id: 5,
      name: "Trench Coat",
      price: 149.99,
      salePrice: 99.99,
      category: "mens-coats",
      subcategory: "trench-coats",
      description: "A classic trench coat that never goes out of style. Perfect for rainy days and formal occasions.",
      features: ["Water-resistant fabric", "Double-breasted design", "Belted waist", "Storm flaps", "Inner lining"],
      image: "https://images.unsplash.com/photo-1619469899761-02f63fd58620?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Beige", "Black", "Navy"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      inStock: true,
      dateAdded: "2025-05-05",
      isFeatured: true,
      rating: 4.9,
      reviews: 112,
      tags: ["trench", "coat", "classic", "rain"],
    },
    {
      id: 6,
      name: "Kids Floral Dress",
      price: 45.99,
      salePrice: 34.99,
      category: "kids-clothing",
      subcategory: "dresses",
      description: "A beautiful floral dress for special occasions or everyday wear.",
      features: ["100% cotton", "Floral print", "Peter Pan collar", "Button-back closure", "Machine washable"],
      image: "https://images.unsplash.com/photo-1513791149369-f88da26c8e93?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Pink Floral", "Blue Floral"],
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
      inStock: true,
      dateAdded: "2025-05-06",
      isFeatured: false,
      rating: 4.4,
      reviews: 38,
      tags: ["dress", "floral", "kids", "cotton"],
    },
    {
      id: 7,
      name: "Statement Bracelet",
      price: 29.99,
      salePrice: 19.99,
      category: "jewelry",
      subcategory: "bracelets",
      description: "A bold statement bracelet that adds a touch of glamour to any outfit.",
      features: ["Gold-plated metal", "Adjustable size", "Lobster clasp closure", "Hypoallergenic"],
      image: "https://images.unsplash.com/photo-1687757660310-f7cff1449fb9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Gold", "Silver"],
      inStock: true,
      dateAdded: "2025-05-07",
      isFeatured: false,
      rating: 4.3,
      reviews: 51,
      tags: ["bracelet", "statement", "gold", "gift"],
    },
    {
      id: 8,
      name: "Puffer Jacket",
      price: 119.99,
      salePrice: 79.99,
      category: "mens-coats",
      subcategory: "puffer-jackets",
      description: "A warm and lightweight puffer jacket, perfect for cold winter days.",
      features: [
        "Down-alternative filling",
        "Water-resistant outer shell",
        "Zippered pockets",
        "Elasticated cuffs",
        "Machine washable",
      ],
      image: "https://images.unsplash.com/photo-1711527088900-f7ebabda4e3f?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Black", "Navy", "Red"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      inStock: true,
      dateAdded: "2025-05-08",
      isFeatured: true,
      rating: 4.6,
      reviews: 78,
      tags: ["puffer", "jacket", "winter", "warm"],
    },
    {
      id: 9,
      name: "Gemstone Ring",
      price: 79.99,
      salePrice: 59.99,
      category: "jewelry",
      subcategory: "rings",
      description: "A stunning gemstone ring that adds a pop of color to your jewelry collection.",
      features: ["Sterling silver band", "Genuine gemstone", "Prong setting", "Available in multiple sizes"],
      image: "https://images.unsplash.com/photo-1654450234558-c3c01b464d58?q=80&w=1410&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Sapphire", "Emerald", "Ruby"],
      sizes: ["5", "6", "7", "8", "9"],
      inStock: true,
      dateAdded: "2025-05-09",
      isFeatured: false,
      rating: 4.8,
      reviews: 45,
      tags: ["ring", "gemstone", "silver", "gift"],
    },
    {
      id: 10,
      name: "Kids Striped Sweater",
      price: 34.99,
      salePrice: 24.99,
      category: "kids-clothing",
      subcategory: "sweaters",
      description: "A cozy striped sweater for kids, perfect for cooler days.",
      features: ["Cotton-blend knit", "Striped pattern", "Ribbed cuffs and hem", "Machine washable"],
      image: "https://images.unsplash.com/photo-1562772211-c412895b04d6?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Blue/White", "Red/Navy"],
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
      inStock: true,
      dateAdded: "2025-05-10",
      isFeatured: false,
      rating: 4.5,
      reviews: 32,
      tags: ["sweater", "striped", "kids", "winter"],
    },
    {
      id: 11,
      name: "Leather Jacket",
      price: 199.99,
      salePrice: 149.99,
      category: "mens-coats",
      subcategory: "leather-jackets",
      description: "A classic leather jacket that adds an edge to any outfit.",
      features: ["Genuine leather", "Quilted lining", "Multiple pockets", "Snap collar", "Zippered cuffs"],
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Black", "Brown"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      inStock: true,
      dateAdded: "2025-05-11",
      isFeatured: false,
      rating: 4.9,
      reviews: 95,
      tags: ["leather", "jacket", "classic", "biker"],
    },
    {
      id: 12,
      name: "Layered Necklace Set",
      price: 59.99,
      salePrice: 39.99,
      category: "jewelry",
      subcategory: "necklaces",
      description: "A trendy layered necklace set that adds dimension to any neckline.",
      features: ["Set of 3 necklaces", "Adjustable lengths", "Mixed metal finishes", "Delicate pendants"],
      image: "https://images.unsplash.com/photo-1714734071000-5546c90735cd?q=80&w=1386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Gold", "Silver", "Mixed"],
      inStock: true,
      dateAdded: "2025-05-12",
      isFeatured: false,
      rating: 4.7,
      reviews: 67,
      tags: ["necklace", "layered", "set", "gift"],
    },
    {
      id: 13,
      name: "Kids Raincoat",
      price: 39.99,
      category: "kids-clothing",
      subcategory: "outerwear",
      description: "A colorful and waterproof raincoat to keep kids dry on rainy days.",
      features: [
        "Waterproof material",
        "Hood with drawstring",
        "Reflective details",
        "Front pockets",
        "Machine washable",
      ],
      image: "https://images.unsplash.com/photo-1558140275-6b7b7bf2cfa1?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Yellow", "Blue", "Pink"],
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
      inStock: true,
      dateAdded: "2025-05-13",
      isFeatured: false,
      rating: 4.6,
      reviews: 41,
      tags: ["raincoat", "waterproof", "kids", "rain"],
    },
    {
      id: 14,
      name: "Hoop Earrings",
      price: 24.99,
      category: "jewelry",
      subcategory: "earrings",
      description: "Classic hoop earrings that complement any outfit.",
      features: ["Gold-plated brass", "Hinged closure", "Lightweight design", "Available in multiple sizes"],
      image: "https://images.unsplash.com/photo-1699894717166-2ddfd929c996?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Gold", "Silver", "Rose Gold"],
      inStock: true,
      dateAdded: "2025-05-14",
      isFeatured: false,
      rating: 4.5,
      reviews: 58,
      tags: ["earrings", "hoops", "classic", "everyday"],
    },
    {
      id: 15,
      name: "Peacoat",
      price: 159.99,
      category: "mens-coats",
      subcategory: "peacoats",
      description: "A timeless peacoat that combines warmth and style.",
      features: ["Wool-blend fabric", "Double-breasted design", "Notched lapel", "Side pockets", "Inner pocket"],
      image: "https://images.unsplash.com/photo-1608236159447-2d27116777f3?q=80&w=1340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Navy", "Black", "Charcoal"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      inStock: true,
      dateAdded: "2025-05-15",
      isFeatured: false,
      rating: 4.8,
      reviews: 72,
      tags: ["peacoat", "wool", "winter", "classic"],
    },
    {
      id: 16,
      name: "Kids Pajama Set",
      price: 29.99,
      category: "kids-clothing",
      subcategory: "sleepwear",
      description: "A comfortable and cute pajama set for kids.",
      features: ["100% cotton", "Long-sleeved top", "Elastic waist pants", "Fun print design", "Machine washable"],
      image: "https://plus.unsplash.com/premium_photo-1693242804122-d55db921f0f4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Space Print", "Dinosaur Print", "Unicorn Print"],
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
      inStock: true,
      dateAdded: "2025-05-16",
      isFeatured: false,
      rating: 4.7,
      reviews: 49,
      tags: ["pajamas", "sleepwear", "kids", "cotton"],
    },
    {
      id: 17,
      name: "Charm Bracelet",
      price: 34.99,
      category: "jewelry",
      subcategory: "bracelets",
      description: "A delicate charm bracelet with meaningful pendants.",
      features: ["Sterling silver chain", "Multiple charms", "Adjustable length", "Lobster clasp closure"],
      image: "https://images.unsplash.com/photo-1740819912729-be39f2d13fd8?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Silver", "Gold"],
      inStock: true,
      dateAdded: "2025-05-17",
      isFeatured: false,
      rating: 4.6,
      reviews: 53,
      tags: ["bracelet", "charm", "silver", "gift"],
    },
    {
      id: 18,
      name: "Bomber Jacket",
      price: 89.99,
      category: "mens-coats",
      subcategory: "bomber-jackets",
      description: "A stylish bomber jacket for casual everyday wear.",
      features: [
        "Polyester shell",
        "Ribbed collar, cuffs, and hem",
        "Zippered front",
        "Multiple pockets",
        "Lightweight design",
      ],
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Olive", "Black", "Navy"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      inStock: true,
      dateAdded: "2025-05-18",
      isFeatured: false,
      rating: 4.5,
      reviews: 64,
      tags: ["bomber", "jacket", "casual", "lightweight"],
    },
    {
      id: 19,
      name: "Kids Beanie Hat",
      price: 19.99,
      category: "kids-clothing",
      subcategory: "accessories",
      description: "A warm and cute beanie hat for kids during cold weather.",
      features: ["Soft knit material", "Fleece lining", "Pom-pom detail", "Stretchable fit", "Machine washable"],
      image: "https://images.unsplash.com/photo-1609031247215-82c91d49a4f8?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Red", "Blue", "Pink", "Gray"],
      sizes: ["S (3-6Y)", "M (7-10Y)", "L (11-14Y)"],
      inStock: true,
      dateAdded: "2025-05-19",
      isFeatured: false,
      rating: 4.4,
      reviews: 37,
      tags: ["beanie", "hat", "kids", "winter"],
    },
    {
      id: 20,
      name: "Anklet",
      price: 19.99,
      category: "jewelry",
      subcategory: "anklets",
      description: "A delicate anklet perfect for summer days.",
      features: ["Sterling silver chain", "Small charm details", "Adjustable length", "Lobster clasp closure"],
      image: "https://images.unsplash.com/photo-1548790176-f46bb4d5ef7f?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      colors: ["Silver", "Gold"],
      inStock: true,
      dateAdded: "2025-05-20",
      isFeatured: false,
      rating: 4.3,
      reviews: 42,
      tags: ["anklet", "summer", "beach", "gift"],
    },
  ]
  
  // Process products to add derived fields
  export const processedProducts = products.map((product) => {
    // Calculate if product is new
    const isNew = isProductNew(product.dateAdded)
  
    // Calculate if product is on sale
    const isSale = product.salePrice !== undefined
  
    // Calculate discount percentage if on sale
    const discount = isSale ? calculateDiscount(product.price, product.salePrice!) : undefined
  
    return {
      ...product,
      isNew,
      isSale,
      discount,
    }
  })
  
  // Helper functions to get filtered products
  export const getNewArrivals = () => {
    return processedProducts
      .filter((product) => product.isNew)
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
  }
  
  export const getSaleProducts = () => {
    return processedProducts.filter((product) => product.isSale).sort((a, b) => (b.discount || 0) - (a.discount || 0))
  }
  
  export const getFeaturedProducts = () => {
    return processedProducts.filter((product) => product.isFeatured)
  }
  
  export const getProductsByCategory = (category: string) => {
    return processedProducts.filter((product) => product.category === category)
  }
  
  export const getProductById = (id: number) => {
    return processedProducts.find((product) => product.id === id)
  }
  
  export const getRelatedProducts = (product: Product, limit = 4) => {
    return processedProducts
      .filter((p) => p.id !== product.id && p.category === product.category)
      .sort(() => 0.5 - Math.random())
      .slice(0, limit)
  }
  
  export default processedProducts
  