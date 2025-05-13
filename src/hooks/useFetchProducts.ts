import { Product } from '@/types/types';
import { useState, useEffect } from 'react';



interface UseFetchProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const useFetchProducts = (): UseFetchProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/products/getAllProducts');
        if (!response.ok) {
          throw new Error('Unable to fetch products. Please ensure MongoDB is running and accessible.');
        }
        const data = await response.json();
        setProducts(data); 
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useFetchProducts;
