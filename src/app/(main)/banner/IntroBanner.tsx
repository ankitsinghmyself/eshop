import React from "react";
import Slider from "react-slick";
import { Product } from "@/types/types";
import styles from "@/styles/banners/IntroBanner.module.css";
import IntroBannerCard from "@/components/main/banners/IntroBannerCard";
import ProductBannerCard from "@/components/main/banners/ProductBannerCard";

interface ProductsSliderProps {
  products: Product[];
}
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}
const ProductsSlider: React.FC<ProductsSliderProps> = ({ products }) => {
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.sliderHeading}>Featured Products</h2>
      <Slider {...settings}>
        {products.slice(1, 8).map((product) => (
          <div key={product.id} className={styles.slickSlide}>
            {/* <IntroBannerCard {...product} /> */}
            <ProductBannerCard
              product={product}
              onAddToCart={() => console.log("Add to cart clicked")}
              onShopNow={() =>
                (window.location.href = `/product/${product.id}`)
              }
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductsSlider;
