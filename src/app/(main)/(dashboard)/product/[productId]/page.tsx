"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Typography,
  Container,
  Button,
  Grid,
  Box,
  Chip,
  Paper,
} from "@mui/material";
import useProductDetails from "@/hooks/useProductDetails";
import LoadingSpinner from "@/components/common/loaders/LoadingSpinner";
import { calculateDiscountedPrice } from "@/utils/priceUtils";
import Image from "next/image";
import BackButton from "@/components/common/buttons/BackButton";
import AddToCart from "@/components/main/cart/AddToCart";

const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const router = useRouter();
  const { product, loading, error } = useProductDetails(productId as string);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 6 }}>
        <LoadingSpinner />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h5" color={error ? "error" : "text.primary"}>
          {error || "Product not found"}
        </Typography>
        <Button
          onClick={() => router.push("/")}
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage
  ).discountedPrice;

  return (
    <Container className="page-shell" sx={{ py: 4 }}>
      <Box sx={{ mb: 2 }}>
        <BackButton />
      </Box>

      <Paper
        sx={{
          p: { xs: 2, md: 3 },
          border: "1px solid",
          borderColor: "divider",
          background: "linear-gradient(180deg, #ffffff, #f8fbf6)",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "#fff",
              }}
            >
              <Image
                src={product.img}
                alt={product.name}
                width={900}
                height={900}
                style={{ width: "100%", height: "auto", display: "block" }}
                priority
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
              {product.name}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {product.details || "No description available for this product yet."}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                ₹{product.price.toFixed(2)}
              </Typography>
              <Chip
                label={`${product.discountPercentage || 0}% OFF`}
                color="secondary"
                size="small"
              />
            </Box>

            <Typography variant="h4" color="secondary.main" sx={{ fontWeight: 900, mb: 3 }}>
              ₹{discountedPrice.toFixed(2)}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AddToCart
                data={{
                  id: product.id,
                  name: product.name,
                  img: product.img,
                  price: product.price,
                  quantity: 1,
                }}
              />
              <Typography variant="body2" color="text.secondary">
                Add to cart instantly
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductPage;
