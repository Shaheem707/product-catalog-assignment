import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center gap-5 bg-[url('/egor-komarov-DRCmLvLKmiw-unsplash.jpg')] bg-cover bg-center relative">
      <h1 className="text-4xl font-bold">Welcome to The Products Catalog!</h1>
      <div className="flex justify-center items-center gap-4">
        <Link href={`/products`}>
          <div className="p-4 border rounded-full hover:bg-black hover:text-white hover:border-black transition-all ease-in-out duration-200 cursor-pointer flex justify-between items-center gap-2">
            View All Products
            <FaShoppingCart />
          </div>
        </Link>
      </div>
      <div className="absolute bottom-3 right-3">
        <Link
          href={"https://github.com/Shaheem707/product-catalog-assignment"}
          target="_blank"
          className="flex justify-center items-center gap-2"
        >
          <FaGithub />
          Github URL
        </Link>
      </div>
    </section>
  );
}
