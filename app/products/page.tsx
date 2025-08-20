// /app/products/page.tsx
import ProductCard from "@/components/ProductCard";
import { ProductsFilter } from "@/components/ProductsFilter";
import qs from "query-string";

interface SearchParams {
  category?: string;
  subcategories?: string | string[];
  sort?: string;
  page?: string;
}

const buildUrl = (base: string, params: Record<string, any>) => {
  const qsParams = qs.stringify(params, { arrayFormat: "bracket" });
  return `${base}/products/?${qsParams}`;
};

export default async function ProductsPage(props: { searchParams?: SearchParams }) {
  const searchParams = props.searchParams || {};

  const category = searchParams.category && searchParams.category !== "All" && searchParams.category !== "all"
    ? searchParams.category
    : undefined;
  const subcategories = searchParams.subcategories;
  const sort = searchParams.sort || "newest";
  const page = searchParams.page || "1";

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const pageNum = parseInt(page as string, 10) || 1;
  const limit = 24;
  const offset = (pageNum - 1) * limit;

  const apiParams: any = { limit, offset };
  if (category) apiParams.category = category;
  if (subcategories && (Array.isArray(subcategories) ? subcategories.length > 0 : subcategories)) {
    apiParams.subcategories = subcategories;
  }
  if (sort === "low") apiParams.sort = "price_asc";
  if (sort === "high") apiParams.sort = "price_desc";
  if (sort === "rating") apiParams.sort = "rating_desc";
  if (sort === "newest") apiParams.sort = "date_added_desc";

  const apiUrl = buildUrl(baseUrl || "", apiParams);
  console.log("Fetching API URL:", apiUrl);

  let products: any[] = [];
  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    if (!res.ok) {
      console.error(`[ Server ] API request failed with status: ${res.status}`);
    } else {
      const data = await res.json();
      if (Array.isArray(data)) {
        products = data;
      } else {
        console.error("API did not return an array:", data);
      }
    }
  } catch (err) {
    console.error("Failed to fetch:", err);
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <ProductsFilter productsLength={products.length} limit={limit} />
      {products.length === 0 ? (
        <div className="py-20 text-center text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id || p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
