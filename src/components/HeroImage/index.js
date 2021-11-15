import React from "react";

// Styles
import { Wrapper, Content, Text } from "./HeroImage.styles";

// will receive some props
// a prop is something that can be sent to the component so that the component can change dynamically depending on the props
// a prop should NEVER be changed inside a component that receives the props
// They can only change if something re-renders and we get a new prop
//  props are sent into the component in a prop object
const HeroImage = ({ image, title, text }) => (
  <Wrapper image={image}>
    <Content>
      <Text>
        <h1>{title}</h1>
        <p>{text}</p>
      </Text>
    </Content>
  </Wrapper>
);

export default HeroImage;
