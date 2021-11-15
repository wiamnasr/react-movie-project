// REact wants you to name all your custom hooks with "use"+"NAME"
import { useState, useEffect, useRef } from "react";

// API
import API from "../API";

// Always a great idea to have an initial state if you want to reset stuff
const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async (page, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);
      //   console.log(movies);

      //   now that data is being grabbed, we set our state
      // calling setState, providing it with an inline callback function
      // the callback function will be called with the previous state by the state setter
      // REMEMBER: If you provide a state setter with a function, it's going to be called with a previous state
      // we need the previous state when we set the state
      setState((prev) => ({
        //   returning an object, important to include parenthesis ()
        // using spread => creating new object by taking all properties from this movies and spread them out in this object here
        // When setting a state in React, its important to provide a new value
        // Never mutate the state, if you do, it won't trigger a re-render
        // ALWAYS use a setter like this to modify the state
        // ALWAYS provide it with a new value, and don't mutate the state in React
        ...movies,

        // how will this new state should look?
        // If more movies were loaded I want to append the new movies to the old state, and not wipe them out
        // performing a check on results for this purpose:
        results:
          // if the page is greater than 1, return a  new array
          // I spread out from the previous state, from it I spread out the old results
          // then comma and attach the new movies results => appends to the array the new movies
          // Then we have a colon, if we are not loading more, we can wipe out the old movies and just give it a new movies in this const called movies
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  //   Initial and Search render, using a dependency array for useEffect
  //   Triggering only on mount (when we mount the Home component - initial run)
  // for that we specify an empty array after the comma as below (empty array => will run only once)
  //   sending in 1 because I want to fetch the first page
  // added searchTerm in the dependency array, meaning that this useEffect will trigger each time the search term changes
  //  it will also trigger one time on mount (can be used for initial fetching also as for the initial fetching, the searchTerm will be an empty string)
  useEffect(() => {
    // wipe out the old state before making a new search setState(initial)
    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // Load More
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};
