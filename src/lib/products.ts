import { client } from "@/sanity/lib/client";
import { allProductsQuery } from "@/sanity/lib/queries";
import { Product } from "@/types/product";

export const fetchProducts = async (): Promise<Product[]> => {
  const products: Product[] = await client.fetch(allProductsQuery);
  return products;
};