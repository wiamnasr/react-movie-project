import React from "react";
import PropTypes from "prop-types";

// Styles
import { Wrapper, Image } from "./Actor.styles";

const Actor = ({ name, character, imageUrl }) => (
  <Wrapper>
    <Image src={imageUrl} alt='actor-thumb' />
    <h3>{name}</h3>
    <p>{character}</p>
  </Wrapper>
);

// We have our actor component, will use special property called propTypes on this one (lower case 'p')
Actor.propTypes = {
  name: PropTypes.string,
  character: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default Actor;
