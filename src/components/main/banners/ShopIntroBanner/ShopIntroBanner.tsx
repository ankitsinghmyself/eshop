import React from "react";
import styles from "./ShopIntroBanner.module.css";

type ShopIntroBannerProps = {
  onShopNowClick?: () => void;
};

const ShopIntroBanner: React.FC<ShopIntroBannerProps> = ({ onShopNowClick }) => {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h1 className={styles.logo}>🛍️ Mateshop</h1>
        <p className={styles.tagline}>Quality products that fit your lifestyle.</p>
        <p className={styles.subtext}>Shop smart, live better.</p>
        <button className={styles.ctaButton} onClick={onShopNowClick}>
          Shop Now
        </button>
      </div>

      <div className={styles.imageWrapper}>
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
          alt="Shop Hero"
          className={styles.heroImage}
        />
      </div>
    </section>
  );
};

export default ShopIntroBanner;
