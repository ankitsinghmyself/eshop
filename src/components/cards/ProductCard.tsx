import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { calculateDiscountedPrice } from "@/utils/priceUtils";
import AddToCart from "@/components/cart/AddToCart";

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
  published,
  authorId,
}) => {
  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: 345,
        margin: "auto",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        background: "var(--secondary-gradient)",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
        }}
      >
        <IconButton
          color={favorite ? "secondary" : "default"}
          onClick={() => {
            // Handle favorite toggle
            console.log("Toggle favorite for product:", id);
          }}
          aria-label="add to favorites"
          size="large"
        >
          <FavoriteIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          zIndex: 1,
          backgroundColor: "red",
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        Hot
      </Box>

      <CardMedia
        component="img"
        width="100%"
        height="200"
        image={img}
        alt={name}
        style={{ objectFit: "cover" }}
      />

      <Grid px={1} py={"5px"}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          align="center"
          // sx={{ marginBottom: "16px" }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // limits to 3 lines
            textOverflow: "ellipsis",
          }}
        >
          {details}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            margin: "5px 0",
          }}
        >
          {discountPercentage <= 0 ? null : (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              ₹{price.toFixed(2)}
            </Typography>
          )}
          <Typography variant="h6" color="primary">
            ₹
            {calculateDiscountedPrice(
              price,
              discountPercentage
            ).discountedPrice.toFixed(2)}
          </Typography>
          {discountPercentage <= 0 ? null : (
            <Typography variant="body2" color="text.secondary">
              ({discountPercentage}% off)
            </Typography>
          )}
        </Box>
        {/* <Typography variant="body2" align="center">
          Rating:{" "}
          {Array.from({ length: rating }, (_, index) => (
            <StarIcon key={index} color="primary" />
          ))}
        </Typography> */}
      </Grid>
      <CardActions sx={{ justifyContent: "center" }}>
        <AddToCart data={{ id, name, price, img, quantity: 1 }} />
        <Button
          variant="contained"
          sx={{
            background: "var(--secondary-color)",
            color: "white",
            "&:hover": {
              background: "var(--secondary-glow)",
            },
          }}
          onClick={() => {
            // Handle buy now
            console.log("Buy now for product:", id);
            window.location.href = `/product/${id}`;
          }}
        >
          Buy Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
