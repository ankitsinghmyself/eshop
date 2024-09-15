import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  details?: string;
  img: string;
  quantity: number;
  favorite: boolean;
  rating: number;
  published: boolean;
  authorId: string;
  isActive: boolean;
}

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
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data); // Assuming `data` is the array of products
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
