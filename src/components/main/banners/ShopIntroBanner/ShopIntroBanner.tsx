import React from "react";
import styles from "./ShopIntroBanner.module.css";
import Image from "next/image";

type ShopIntroBannerProps = {
  onShopNowClick?: () => void;
};

const ShopIntroBanner: React.FC<ShopIntroBannerProps> = ({ onShopNowClick }) => {
  return (
    <section className={`${styles.banner} page-shell`}>
      <div className={styles.content}>
        <h1 className={styles.logo}>eShop</h1>
        <p className={styles.tagline}>
          Clean deals. Fast checkout. Better daily shopping.
        </p>
        <p className={styles.subtext}>
          Everything you need, styled around one simple experience.
        </p>
        <button className={styles.ctaButton} onClick={onShopNowClick}>
          Shop Now
        </button>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
          alt="Featured shopping banner"
          className={styles.heroImage}
          width={800}
          height={540}
        />
      </div>
    </section>
  );
};

export default ShopIntroBanner;
