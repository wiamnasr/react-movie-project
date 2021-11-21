import { useState, useEffect } from "react";

import API from "../API";

// Helpers
import { isPersistedState } from "../helpers";

// crating the hook
export const useMovieFetch = (movieId) => {
  // creating 3 states, the state and the setter

  // empty object as default value
  const [state, setState] = useState({});
  // this component will start by fetching the data for the movies => set to true
  const [loading, setLoading] = useState(true);
  // initial value of false
  const [error, setError] = useState(false);

  // only one useEffect, because fetching the data one time and that is when the component mounts
  // then will not fetch anything anymore because then I will have all the data from the movie we need
  // the dependency array [movieId] will change if the movieId changes
  useEffect(() => {
    // As the useEffect can't have an async function up, we create another that is async inside it
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        // Fetching the data

        // first fetching the movie data
        const movie = await API.fetchMovie(movieId);
        // seconds grabbing the credits from another resource in the end point
        const credits = await API.fetchCredits(movieId);

        // from the API and credits, we get something back called crew, the crew has more than the directors, so filtering out the directors to just get their names
        // Get directors only
        const directors = credits.crew.filter(
          (member) => member.job === "Director"
        );

        // Now we have all the data needed to setState
        // In this case we don't need to use a previous value => just returning an object here
        setState({
          // spreading out the movie (the data we got back)
          ...movie,
          actors: credits.cast,
          // since this is ES6 syntax it will read the below as: directors: directors automatically
          directors,
        });

        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    // Storing each individual movie in  the sessionStorage
    // this will give us NULL or the actual state
    const sessionState = isPersistedState(movieId);

    if (sessionState) {
      setState(sessionState);
      // because I'm setting it to true when we start, now we need to setting it to false, otherwise it will keep showing the spinner
      setLoading(false);
      // Early return otherwise it will run the function that fetched the movie from the API
      return;
    }

    fetchMovie();
  }, [movieId]);

  // Write to sessionStorage (creating useEffect for writing to sessionStorage)
  //  it will change on movieId change and state change (dependency array) => these actually will not change as we are grabbing the data once for each movie
  // Nevertheless we should always specify all the dependencies for each useEffect
  // If something doesn't work, it gets handled in the useEffect, this way errors are easily handled and detected in the app
  useEffect(() => {
    sessionStorage.setItem(movieId, JSON.stringify(state));
  }, [movieId, state]);

  // returning an object with a state, loading and error from our hook
  return { state, loading, error };
};
