import React from "react";
import { Product } from "@/types/types";
import styles from "@/styles/banners/IntroBanner.module.css";
import Image from "next/image";
import AddToCart from "../cart/AddToCart";
import PrimaryButton from "../common/buttons/PrimaryButton";

interface IntroBannerCardProps extends Product {}

const IntroBannerCard: React.FC<IntroBannerCardProps> = ({
  id,
  name,
  price,
  img,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={img}
          alt={name}
          className={styles.image}
          width={400}
          height={400}
          style={{ width: "100%" }}
        />
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.price}>₹{price.toFixed(2)}</p>
          <AddToCart data={{ id, name, price, img, quantity: 1 }} />
          <PrimaryButton onClick={()=>window.location.href = `/product/${id}`}>
            Shop Now
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default IntroBannerCard;
