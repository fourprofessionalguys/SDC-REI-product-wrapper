import React from 'react';
import PropTypes from 'prop-types';
import Item from './carouselItem.jsx';

const Carousel = ({
  images, handlers, pos, activeOrient,
}) => (
    <div className="carousel">
      <button
        type="button"
        className={pos === 0 ? 'left hidden' : 'left'}
        onClick={handlers.handleCarouselPos}
        value="inc"
      >
        <i className="fas fa-chevron-left" />
      </button>

      <div className="row" style={{ left: pos }}>
        {images.map((img, i) => (
          <Item
            {...img}
            active={activeOrient === img.orientation}
            handler={handlers.handleImageClick}
            index={i}
            key={`thumb-${img.id}`}
          />
        ))}
      </div>

      <button
        type="button"
        className="right"
        onClick={handlers.handleCarouselPos}
        value="dec"
      >
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  );

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlers: PropTypes.shape({
    handleImageClick: PropTypes.func,
    handleCarouselPos: PropTypes.func,
    handleZoom: PropTypes.func,
  }).isRequired,
  pos: PropTypes.number,
  activeOrient: PropTypes.string,
};
Carousel.defaultProps = {
  pos: 0,
};

export default Carousel;
