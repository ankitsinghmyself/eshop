import React from "react";
import Slider from "react-slick";
import { Product } from "@/types/types";
import styles from "@/styles/banners/IntroBanner.module.css";
import IntroBannerCard from "@/components/banners/IntroBannerCard";

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
    slidesToShow: 2,
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
      {/* <h2 className={styles.sliderHeading}>Featured Products</h2> */}
      <Slider {...settings}>
        {products.slice(1, 4).map((product) => (
          <div key={product.id} className={styles.slickSlide}>
            <IntroBannerCard {...product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductsSlider;
