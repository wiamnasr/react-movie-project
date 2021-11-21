// Will need these components from React
// useState will be used to create what's called a controlled component (it means I will have an input field but its going to be controlled by React)
// The input field is based on the value in the useState
// The useEffect is used to trigger when this local state changes, then will update the search term, so that it will fetch new movies from the API
// useRef is used to show a trick that can be used if we don't want to do something in the useEffect on the initial render
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Image
import searchIcon from "../../images/search-icon.svg";

// Styles
import { Wrapper, Content } from "./SearchBar.styles";

const SearchBar = ({ setSearchTerm }) => {
  const [state, setState] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);
    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt='search-icon' />
        <input
          type='text'
          placeholder='Search Movie'
          onChange={(event) => setState(event.currentTarget.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  );
};

SearchBar.propTypes = {
  callback: PropTypes.func,
};

export default SearchBar;
