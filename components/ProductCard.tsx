// PAth: nabeerabareera/components/ProductCard.tsx

import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  // Ensure the image URL is complete
  const imageUrl = `http://localhost:5000${product.image}`;

  return (
    <div className="border rounded shadow-md overflow-hidden hover:shadow-lg transition">
      <Link href={`/product/${product._id}`}>
        <Image
          src={imageUrl}
          alt={product.name}
          width={400}
          height={300}
          className="object-cover h-64 w-full"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-700">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
        <Link href={`/product/${product._id}`} className="mt-2 inline-block text-blue-500 hover:underline">
          View Details
        </Link>
      </div>
    </div>
  );
}