//app/app.tsx
"use client";

import IntroBanner from "./banner/IntroBanner";
import useFetchProducts from "@/hooks/useFetchProducts";
import LoadingSpinner from "@/components/common/loaders/LoadingSpinner";
import CategorySection from "@/components/main/CategorySection/CategorySection";
import ProductsList from "@/components/main/products/ProductsList";
export default function Home() {
  const { products, loading, error } = useFetchProducts();

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
      <IntroBanner products={products} />
      <ProductsList products={products} />
      <CategorySection/>
    </>
  );
}
