import { memo } from "react";
import type { FC } from "react";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import isEmpty from "lodash/isEmpty";
import { ESliderArrow, SliderArrow } from "~/uikit";
import styles from "./SliderSimple.css";
import sliderStyles from "../Slider.css";

type TProps = {
  className?: string;
  alt?: string;
  arrows?: boolean;
  dots?: boolean;
  images: string[];
  infinite?: boolean;
  height?: string;
  slidesToShow?: number;
  slidesToScroll?: number;
  speed?: number;
  width?: string;
  nextArrow?: JSX.Element;
  prevArrow?: JSX.Element;
};

const SliderSimpleComponent: FC<TProps> = ({
  className,
  alt = "",
  arrows = false,
  dots = false,
  height,
  images,
  infinite = false,
  nextArrow,
  slidesToShow = 1,
  slidesToScroll = 1,
  speed = 500,
  width,

  prevArrow,
}) => {
  const settings = {
    arrows: arrows,
    className,
    dots: dots,
    infinite: infinite,
    nextArrow: arrows ? (
      <SliderArrow styles={{ right: "5px" }} type={ESliderArrow.Next} />
    ) : (
      nextArrow
    ),
    speed: speed,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    prevArrow: arrows ? (
      <SliderArrow styles={{ left: "5px" }} type={ESliderArrow.Previous} />
    ) : (
      prevArrow
    ),
  };
  const isMobileScreen = useMediaQuery({ query: "(max-width: 100px)" });

  return (
    <Slider {...settings}>
      {!isEmpty(images) &&
        images.map((image, index) => {
          return (
            <div className="SliderSimple-Item" key={index}>
              {isMobileScreen ? (
                <img
                  alt={alt}
                  className="SliderSimple-Image SliderSimple-Image__mobile"
                  height={height}
                  src={image}
                  width={width}
                />
              ) : (
                <>
                  <img
                    alt={alt}
                    className="SliderSimple-Image"
                    height={height}
                    src={image}
                    width={width}
                  />
                </>
              )}
            </div>
          );
        })}
    </Slider>
  );
};

export const SliderSimple = memo(SliderSimpleComponent);

export function sliderSimpleLinks() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: sliderStyles },
  ];
}
