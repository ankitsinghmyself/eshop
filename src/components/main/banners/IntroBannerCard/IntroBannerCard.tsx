import React from "react";
import { Product } from "@/types/types";
import styles from "@/styles/banners/IntroBanner.module.css";
import Image from "next/image";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import AddToCart from "../../cart/AddToCart";
import { useRouter } from "next/navigation";

interface IntroBannerCardProps extends Product {}

const IntroBannerCard: React.FC<IntroBannerCardProps> = ({
  id,
  name,
  price,
  img,
}) => {
  const router = useRouter();

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={img}
          alt={name}
          className={styles.image}
          width={600}
          height={600}
          priority
        />
        <div className={styles.gradientOverlay} />
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.price}>₹{price.toFixed(2)}</p>
          <div className={styles.buttons}>
            <AddToCart data={{ id, name, price, img, quantity: 1 }} />
            <PrimaryButton onClick={() => router.push(`/product/${id}`)}>
              Shop Now
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroBannerCard;
