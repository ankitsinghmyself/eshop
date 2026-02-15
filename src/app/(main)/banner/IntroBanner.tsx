import React from "react";
import Slider from "react-slick";
import { Product } from "@/types/types";
import styles from "@/styles/banners/IntroBanner.module.css";
import ProductBannerCard from "@/components/main/banners/ProductBannerCard";
import { useRouter } from "next/navigation";

interface ProductsSliderProps {
  products: Product[];
}

const ProductsSlider: React.FC<ProductsSliderProps> = ({ products }) => {
  const router = useRouter();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,

    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={`${styles.sliderContainer} page-shell`}>
      <h2 className={styles.sliderHeading}>Featured Products</h2>
      <p className={styles.sliderSubheading}>
        Curated highlights with the same modern style as the main catalog.
      </p>
      <Slider {...settings}>
        {products.slice(1, 8).map((product) => (
          <div key={product.id} className={styles.slickSlide}>
            <ProductBannerCard
              product={product}
              onShopNow={() => router.push(`/product/${product.id}`)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductsSlider;