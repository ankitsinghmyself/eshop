//app/app.tsx
"use client";

import { useCallback } from "react";
import IntroBanner from "./banner/IntroBanner";
import useFetchProducts from "@/hooks/useFetchProducts";
import LoadingSpinner from "@/components/common/loaders/LoadingSpinner";
import CategorySection from "@/components/main/CategorySection/CategorySection";
import ProductsList from "@/components/main/products/ProductsList";
import ShopIntroBanner from "@/components/main/banners/ShopIntroBanner";
export default function Home() {
  const { products, loading, error } = useFetchProducts();
  const handleShopNow = useCallback(() => {
    const section = document.getElementById("products");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <>
      <ShopIntroBanner onShopNowClick={handleShopNow} />
      <IntroBanner products={products} />
      <ProductsList products={products} />
      <CategorySection />
    </>
  );
}
