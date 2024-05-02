import isEmpty from "lodash/isEmpty";
import { memo } from "react";
import type { FC } from "react";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import { SLIDER_SIMPLE_SETTINGS } from "#app/uikit";
import type { TSliderSimpleProps } from "#app/uikit";
import styles from "./SliderSimple.css";
import sliderStyles from "../Slider.css";

const SliderSimpleComponent: FC<TSliderSimpleProps> = (props) => {
  const {
    alt = "",
    dataTestId = "uikit__slider-simple",
    height,
    images,
    width,
  } = props;

  const settings = SLIDER_SIMPLE_SETTINGS(props).settings;
  const isMobileScreen = useMediaQuery({ query: "(max-width: 100px)" });

  return (
    <Slider {...settings} data-testid={dataTestId}>
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
