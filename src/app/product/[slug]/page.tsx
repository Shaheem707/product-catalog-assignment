import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/types/product";
import { fetchProducts } from "@/lib/products";

interface PageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = params;

  const products: Product[] = await fetchProducts();

  // Find the product by slug
  const product = products.find((p) => p.slug?.current === slug);

  // Get related products (max 4) with same category
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p._id !== product?._id)
    .sort(() => 0.5 - Math.random()) // shuffle randomly
    .slice(0, 4);

  if (!product) return notFound();

  return (
    <main className="max-w-6xl mx-auto p-3 sm:p-6 max-h-screen">
      <Link href={"/products"}>
        <div className="p-3 rounded-full cursor-pointer mb-5 border border-solid w-fit hover:bg-white hover:text-black transition-all ease-in duration-200 flex justify-center items-center gap-3">
          <i className="">
            <FaArrowLeft />
          </i>
          Go Back to All Products
        </div>
      </Link>

      <div className="flex flex-col gap-5 md:gap-0 md:flex-row w-full h-full">
        <div className="flex flex-col md:mb-4 md:border-r md:border-r-gray-400 w-full md:w-2/3 pr-4">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          {product.image ? (
            <img
              src={urlFor(product.image).width(400).url()}
              alt={product.title ?? "Product image"}
              className="mb-2 w-full md:w-72 h-48 object-cover rounded"
            />
          ) : (
            <div className="mb-2 max-w-72 h-48 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
              No image
            </div>
          )}

          <p className="mt-4 text-lg text-white capitalize">
            Price: $<span className="font-bold">{product.price ?? "NIL"}</span>
          </p>

          <p className="mt-4 text-gray-300 capitalize">
            Category: {product.category ?? "Does not belong to any category."}
          </p>

          <p className="mt-4 font-semibold">
            {product.availability ? <span className="text-green-500">In stock</span> : <span className="text-red-500">Out of stock</span>}
          </p>

          <p className="mt-4 text-gray-300">
            Description: {product.description ?? "No description available."}
          </p>
        </div>
        <hr className="md:hidden block text-gray-400"/>
        <div className="flex flex-col md:pl-5 h-full">
          <h2 className="font-bold mb-4">Related Products</h2>
          <div className="flex flex-col">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((p) => (
                <Link
                  key={p._id}
                  href={`/product/${p.slug?.current}`}
                  className="mb-3 p-2 border rounded hover:bg-gray-800 transition flex flex-col items-start gap-3 w-auto max-w-[130px]"
                >
                  {p.image ? (
                    <img
                      src={urlFor(p.image).width(50).height(50).url()}
                      alt={p.title ?? "Product image"}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}

                  <div className="flex flex-col">
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-sm text-gray-400">${p.price}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No related products found.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
