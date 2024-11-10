'use client';
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Typography, Container, Button, Grid } from "@mui/material";
import useProductDetails from "@/hooks/useProductDetails";
import LoadingSpinner from "@/components/common/loaders/LoadingSpinner";
import AddToCart from "@/components/cart/AddToCart";
import { calculateDiscountedPrice } from "@/utils/priceUtils";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/common/buttons/BackButton";

const ProductPage: React.FC = () => {
  const { productId } = useParams(); // Access dynamic route parameters
  const router = useRouter();

  const { product, loading, error } = useProductDetails(productId as string);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <LoadingSpinner />
      </Container>
    );
  }

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

  return (
    <Container>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BackButton />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Image
            src={product.img}
            alt={product.name}
            width={300}
            height={300}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="left">
            {product.details}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textDecoration: "line-through" }}
          >
            ₹{product.price.toFixed(2)}
          </Typography>

          {/* Calculate and display discounted price directly */}
          <Typography variant="h6" color="primary">
            ₹{
              calculateDiscountedPrice(product.price, product.discountPercentage).discountedPrice.toFixed(2)
            }
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {product.discountPercentage}% off
          </Typography>

          <AddToCart
            data={{
              id: product.id,
              name: product.name,
              img: product.img,
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
