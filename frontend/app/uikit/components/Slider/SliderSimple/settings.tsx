import { ESliderArrow, SliderArrow } from "#app/uikit";
import type { TSliderSimpleProps } from "#app/uikit";

export const SLIDER_SIMPLE_SETTINGS = (props: TSliderSimpleProps) => {
  const {
    arrows = false,
    className,
    dots = false,
    fade = false,
    infinite = false,
    nextArrow,
    prevArrow,
    slidesToScroll = 1,
    slidesToShow = 1,
    speed = 500,
    swipeToSlide = false,
  } = props;

  return {
    settings: {
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
    },
  };
};
