import ProductsSearchClient from "@/components/ProductsSearchClient";
import { fetchProducts } from "@/lib/products";
import { Product } from "@/types/product";

export default async function Page() {
  const products: Product[] = await fetchProducts();

  return (
    <main className="h-screen w-full overflow-hidden p-6">
      <ProductsSearchClient products={products} />
    </main>
  );
}
