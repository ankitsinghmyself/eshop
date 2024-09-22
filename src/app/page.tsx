//app/app.tsx
"use client";

import ProductsList from "@/components/products/ProductsList";
import IntroBanner from "./(home)/banner/IntroBanner";
import useFetchProducts from "@/hooks/useFetchProducts";
import LoadingSpinner from "@/components/common/loaders/LoadingSpinner";
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
    </>
  );
}
