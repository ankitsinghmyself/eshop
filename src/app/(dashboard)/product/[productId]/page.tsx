"use client"; // This directive is used if you are using this file as a client component

import { useParams, useRouter } from "next/navigation";
import { Typography, Container, Button, Grid } from "@mui/material";
import useProductDetails from "@/hooks/useProductDetails";
import LoadingSpinner from "@/components/common/loaders/LoadingSpinner";
import { FC } from "react";
import AddToCart from "@/components/user/cart/AddToCart";

const ProductPage: FC = () => {
  const { productId } = useParams(); // Access dynamic route parameters
  const router = useRouter();

  // Ensure productId is a string
  const { product, loading, error } = useProductDetails(productId as string);

  // Loading state
  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <LoadingSpinner />
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
        <Button
          onClick={() => router.push("/")}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  // No product found
  if (!product) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4">Product not found</Typography>
        <Button
          onClick={() => router.push("/")}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  // Product details
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <img
            src={product.img}
            alt={product.name}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            align="left"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              textOverflow: "ellipsis",
            }}
          >
            {product.details}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <AddToCart
            data={{
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
