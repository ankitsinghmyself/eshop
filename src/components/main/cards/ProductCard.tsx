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
import AddToCart from "../cart/AddToCart";
import Link from "next/link";
import "./ProductCard.css";

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
    <>
      <div
        className="grid sm:grid-rows gap-[30px] lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center p-5"
        id="product-container"
      >
        <div>
          <div className="card">
            <div className="cardimage">
              <img src={img} alt="product_image" />
            </div>
            <div className="cardcontent">
              <div className="cardheader">
                <p className="productcode">Product Code: {id.slice(-4)}</p>
                <p className="productrating">
                  {rating || 4.5}
                  <img
                    src="https://img.icons8.com/?size=100&amp;id=19417&amp;format=png&amp;color=000000"
                    alt=""
                  />
                </p>
              </div>
              <div>
                <p className="productname">{details}</p>
              </div>
              <div className="productprice">
                <p className="discountedprice">
                  ₹
                  {calculateDiscountedPrice(
                    price,
                    discountPercentage
                  ).discountedPrice.toFixed(2)}
                  
                </p>
                <p className="originalprice">{price} </p>
              </div>
            </div>
            <div className="cardbuttons">
              <button className="atc-btn">
                <AddToCart data={{ id, name, price, img, quantity: 1 }} />
                Add to cart
              </button>
              <button className="wl-btn">
                <img
                  src="https://img.icons8.com/?size=100&amp;id=19411&amp;format=png&amp;color=000000"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
