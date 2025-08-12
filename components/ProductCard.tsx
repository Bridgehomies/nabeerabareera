// Path: nabeerabareera/components/ProductCard.tsx

import Image from "next/image";
import Link from "next/link";

export type Product = {
  _id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  description: string;
  image: string;
  category: string;
  subcategory?: string;
  inStock: boolean;
  dateAdded: string;
  rating: number;
  reviews: number;
  isSale?: boolean;
  isNew?: boolean;
  discount?: number;
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const imageUrl = `${API_URL}${product.image}`;

  return (
    <div className="border rounded shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <Link href={`/product/${product._id}`}>
        <Image
          src={imageUrl}
          alt={product.name}
          width={400}
          height={300}
          className="object-cover h-64 w-full"
          onError={(e) => {
            e.currentTarget.src = "/fallback-image.jpg"; // Optional fallback image
          }}
        />
      </Link>
      <div className="p-4">
        {/* Category */}
        <p className="text-sm text-gray-500 mt-1 uppercase">{product.category}</p>

        {/* Product Name */}
        <h3 className="text-lg font-bold mt-1">{product.name}</h3>

        {/* Price */}
        <div className="mt-2">
          {product.isSale && product.salePrice ? (
            <>
              <span className="text-accent font-bold">
                ${(product.salePrice).toFixed(2)}
              </span>
              <span className="ml-2 text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>

        {/* View Details Button */}
        <Link
          href={`/product/${product._id}`}
          className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}