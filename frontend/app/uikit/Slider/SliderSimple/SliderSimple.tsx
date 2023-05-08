import { memo } from "react";
import type { FC } from "react";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import isEmpty from "lodash/isEmpty";
import { ESliderArrow, SliderArrow } from "~/uikit";
import styles from "./SliderSimple.css";
import sliderStyles from "../Slider.css";

type TProps = {
  alt?: string;
  arrows?: boolean;
  className?: string;
  dots?: boolean;
  fade?: boolean;
  height?: string;
  images: string[];
  infinite?: boolean;
  nextArrow?: JSX.Element;
  prevArrow?: JSX.Element;
  slidesToScroll?: number;
  slidesToShow?: number;
  swipeToSlide?: boolean;
  speed?: number;
  width?: string;
};

const SliderSimpleComponent: FC<TProps> = ({
  alt = "",
  arrows = false,
  className,
  dots = false,
  fade = false,
  height,
  images,
  infinite = false,
  nextArrow,
  prevArrow,
  slidesToScroll = 1,
  slidesToShow = 1,
  speed = 500,
  swipeToSlide = false,
  width,
}) => {
  const settings = {
    arrows,
    className,
    dots,
    fade,
    infinite,
    nextArrow: arrows ? (
      <SliderArrow styles={{ right: "5px" }} type={ESliderArrow.Next} />
    ) : (
      nextArrow
    ),
    prevArrow: arrows ? (
      <SliderArrow styles={{ left: "5px" }} type={ESliderArrow.Previous} />
    ) : (
      prevArrow
    ),
    speed,
    slidesToScroll,
    slidesToShow,
    swipeToSlide,
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
