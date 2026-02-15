import React from "react";
import {
  alpha,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { calculateDiscountedPrice } from "@/utils/priceUtils";
import AddToCart from "../cart/AddToCart";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discountPercentage?: number;
  details?: string;
  img: string;
  favorite: boolean;
  rating: number;
  published: boolean;
  authorId: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  discountPercentage,
  details,
  img,
  favorite,
  rating,
}) => {
  const discountValue = discountPercentage ?? 0;
  const discounted = calculateDiscountedPrice(price, discountPercentage).discountedPrice;
  const hasDiscount = discountValue > 0 && discounted < price;
  const safeRating = rating || 4.5;

  const formatINR = (value: number) =>
    `\u20B9${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  return (
    <Card
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: `1px solid ${alpha("#3d692c", 0.14)}`,
        borderRadius: 4,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(246,251,243,0.98) 100%)",
        boxShadow: "0 10px 28px rgba(61, 105, 44, 0.14)",
        transition: "transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 18px 42px rgba(61, 105, 44, 0.22)",
          borderColor: alpha("#3d692c", 0.35),
        },
        "&:hover .product-media": {
          transform: "scale(1.06)",
        },
      }}
    >
      <Box sx={{ position: "relative", px: 1.25, pt: 1.25 }}>
        {hasDiscount && (
          <Chip
            label={`${Math.round(discountValue)}% OFF`}
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 2,
              fontWeight: 800,
              color: "#ffffff",
              bgcolor: "#d32f2f",
              letterSpacing: 0.2,
            }}
          />
        )}

        <IconButton
          aria-label={favorite ? "remove favorite" : "add favorite"}
          color={favorite ? "error" : "default"}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 2,
            bgcolor: alpha("#ffffff", 0.92),
            backdropFilter: "blur(8px)",
            "&:hover": { bgcolor: "#ffffff" },
          }}
        >
          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>

        <Link href={`/product/${id}`} style={{ display: "block" }}>
          <Box sx={{ borderRadius: 3, overflow: "hidden", position: "relative" }}>
            <CardMedia
              className="product-media"
              component="img"
              image={img}
              alt={name}
              sx={{
                height: { xs: 210, sm: 235 },
                objectFit: "cover",
                transition: "transform 0.38s ease",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(19,29,17,0.28) 0%, rgba(19,29,17,0) 55%)",
              }}
            />
          </Box>
        </Link>
      </Box>

      <CardContent sx={{ display: "grid", gap: 1.2, flexGrow: 1, px: 2, pt: 1.6, pb: 1 }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "secondary.main",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 0.6,
            }}
          >
            Featured
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              bgcolor: alpha("#f59e0b", 0.14),
              px: 1,
              py: 0.25,
              borderRadius: 99,
            }}
          >
            <Typography variant="caption" fontWeight={700}>
              {safeRating.toFixed(1)}
            </Typography>
            <StarIcon sx={{ color: "#f59e0b", fontSize: 15 }} />
          </Box>
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 58,
            lineHeight: 1.25,
          }}
        >
          {name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 40,
          }}
        >
          {details || `Product code: ${id.slice(-6).toUpperCase()}`}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          <Typography variant="h5" color="secondary.main" fontWeight={900}>
            {formatINR(discounted)}
          </Typography>
          {hasDiscount && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              {formatINR(price)}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ pt: 0, px: 2, pb: 2, justifyContent: "space-between", gap: 1 }}>
        <Box
          sx={{
            border: "1px solid",
            borderColor: alpha("#3d692c", 0.25),
            borderRadius: 99,
            bgcolor: alpha("#61a146", 0.08),
          }}
        >
          <AddToCart data={{ id, name, price: discounted, img, quantity: 1 }} />
        </Box>
        <Button
          component={Link}
          href={`/product/${id}`}
          variant="contained"
          color="primary"
          sx={{ flexGrow: 1, minHeight: 42, fontWeight: 800 }}
        >
          View Product
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
