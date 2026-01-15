import { useEffect, useState } from "react";
import { Product } from "@/types/types";

interface UseProductDetailsResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const useProductDetails = (productId: string): UseProductDetailsResult => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/products?id=${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  return { product, loading, error };
};

export default useProductDetails;
