// lib/data/products.ts

export type Product = {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  discount?: number;
  category: string;
  subcategory?: string;
  description?: string;
  features?: string[];
  image: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  dateAdded: string;
  isNew?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviews: number;
  tags?: string[];
};

// Calculate if a product is new (added within the last 14 days)
const isProductNew = (dateString: string): boolean => {
  const productDate = new Date(dateString);
  const currentDate = new Date();
  const diffTime = currentDate.getTime() - productDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 14;
};

// Helper to calculate discount percentage
const calculateDiscount = (originalPrice: number, salePrice: number): number => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

let cachedProducts: Product[] = [];
let isLoading = false;
let loadPromise: Promise<void> | null = null;

// Load products from backend
const loadProducts = async (): Promise<void> => {
  if (cachedProducts.length > 0) return;
  if (isLoading && loadPromise) return loadPromise;

  isLoading = true;
  loadPromise = new Promise<void>(async (resolve, reject) => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');

      const data = await res.json();

      // Add derived fields
      const processed = data.map((product: any) => {
        const isNew = isProductNew(product.dateAdded);
        const isSale = product.salePrice !== undefined && product.salePrice < product.price;
        const discount = isSale ? calculateDiscount(product.price, product.salePrice || product.price) : undefined;

        return {
          ...product,
          isNew,
          isSale,
          discount,
        };
      });

      cachedProducts = processed;
      isLoading = false;
      resolve();
    } catch (error) {
      console.error('Error loading products:', error);
      isLoading = false;
      reject(error);
    }
  });

  return loadPromise;
};

// Get all processed products (with awaitable interface)
export const getProducts = async (): Promise<Product[]> => {
  await loadProducts();
  return [...cachedProducts];
};

// Get one product by ID
export const getProductById = async (id: number): Promise<Product | undefined> => {
  await loadProducts();
  return cachedProducts.find((product) => product.id === id);
};

// Get new arrivals
export const getNewArrivals = async (): Promise<Product[]> => {
  await loadProducts();
  return cachedProducts
    .filter((product) => product.isNew)
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
};

// Get products on sale
export const getSaleProducts = async (): Promise<Product[]> => {
  await loadProducts();
  return cachedProducts
    .filter((product) => product.isSale)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0));
};

// Get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  await loadProducts();
  return cachedProducts.filter((product) => product.isFeatured);
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  await loadProducts();
  return cachedProducts.filter((product) => product.category === category);
};

// Get related products
export const getRelatedProducts = async (product: Product, limit = 4): Promise<Product[]> => {
  await loadProducts();
  return cachedProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};