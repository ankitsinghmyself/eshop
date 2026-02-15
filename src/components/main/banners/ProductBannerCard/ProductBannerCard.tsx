import React from "react";
import Image from "next/image";
import styles from "./ProductBannerCard.module.css";

interface Product {
  id: string | number;
  name: string;
  price: number;
  img: string;
}

interface ProductBannerCardProps {
  product: Product;
  onShopNow?: () => void;
}

const ProductBannerCard: React.FC<ProductBannerCardProps> = ({
  product,
  onShopNow,
}) => {
  return (
    <div className={styles.card} tabIndex={0} aria-label={`Product: ${product.name}`}>
      <div className={styles["image-wrapper"]}>
        <Image
          src={product.img}
          alt={product.name}
          width={400}
          height={400}
          className={styles["product-image"]}
          priority={true}
        />
      </div>

      <div className={styles.info}>
        <p className={styles["product-tag"]}>Featured</p>
        <h2 className={styles["product-name"]}>{product.name}</h2>
        <p className={styles["product-price"]}>
          {"\u20B9"}
          {product.price.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
        </p>
        <div className={styles.actions}>
          {onShopNow && (
            <button
              className={`${styles.btn} ${styles["btn-primary"]}`}
              onClick={onShopNow}
              aria-label={`Shop now for ${product.name}`}
            >
              Shop Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductBannerCard;
