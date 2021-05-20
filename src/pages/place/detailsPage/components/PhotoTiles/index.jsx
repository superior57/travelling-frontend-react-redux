import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";
import "./style.scss";

const Slider = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const allImages = [{ type: 1, link: props.mainImage }, ...props.images];
  const items = JSON.parse(JSON.stringify(allImages));

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  let slides = items.map((item, i) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.link}
      >
        {item.type === 1 ? (
          <img src={item.link} alt={item?.altText} />
        ) : (
          <ReactPlayer
            className="video-item"
            width="73%"
            height="100%"
            controls={true}
            url={item.link}
            playing={activeIndex === i}
            config={{
              youtube: {
                preload: false
              }
            }}
          />
        )}
      </CarouselItem>
    );
  });

  return (
    <div className="PhotoTiles">
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
      </Carousel>
    </div>
  );
};

Slider.propTypes = {
  photo: PropTypes.arrayOf(PropTypes.string)
};

export default Slider;
