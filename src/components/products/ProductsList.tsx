import { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
import { Grid } from "@mui/material";
import LoadingSpinner from "../loaders/LoadingSpinner";

interface Product {
  id: number;
  name: string;
  price: number;
  details?: string;
  img: string;
  quantity: number;
  favorite: boolean;
  rating: number;
  published: boolean;
  authorId: number;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products/getAllProducts");
        const data = await response.json();
        setProducts(data.products);
        console.log("Products:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction="row"
        justifyContent="start"
        alignItems="center"
      >
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductsList;
