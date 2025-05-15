import React from "react";
import Image from "next/image";
import styles from "./ProductBannerCard.module.css";

interface Product {
  id: string | number;
  name: string;
  price: number;
  img: string;
  // any other fields if needed
}

interface ProductBannerCardProps {
  product: Product;
  onAddToCart: () => void;
  onShopNow?: () => void;
}

const ProductBannerCard: React.FC<ProductBannerCardProps> = ({
  product,
  onAddToCart,
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
        <h2 className={styles["product-name"]}>{product.name}</h2>
        <p className={styles["product-price"]}>₹{product.price.toFixed(2)}</p>
        <div className={styles.actions}>
          <button
            className={`${styles.btn} ${styles["btn-primary"]}`}
            onClick={onAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
          {onShopNow && (
            <button
              className={`${styles.btn} ${styles["btn-outline"]}`}
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
