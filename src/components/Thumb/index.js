import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

// Styles
import { Image } from "./Thumb.styles";

const Thumb = ({ image, movieId, clickable }) => (
  <div>
    {/* Created a turner operator, checking if clickable is true, and then showing the link component with the image wrapped inside it, otherwise I show the image as is without wrapping with a link container */}
    {clickable ? (
      // will send along this id in the route and grab it later in the movie param
      <Link to={`/${movieId}`}>
        <Image src={image} alt='movie-thumb' />
      </Link>
    ) : (
      <Image src={image} alt='movie-thumb' />
    )}
  </div>
);

Thumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  clickable: PropTypes.bool,
};

export default Thumb;
