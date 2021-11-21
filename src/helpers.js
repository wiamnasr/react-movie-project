// Convert time to hours and minutes
export const calcTime = (time) => {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}h ${mins}m`;
};
// Convert a number to money formatting
export const convertMoney = (money) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return formatter.format(money);
};

// Persisting a state in a session storage
export const isPersistedState = (stateName) => {
  // this will return the state from the session storage is there is a state, otherwise will return null
  // by getting the item from the session storage with the name that we provide
  // to use local storage instead, simply change the sessionStorage to localStorage
  const sessionState = sessionStorage.getItem(stateName);

  // Short circuit to check if the sessionState is not null then double ampersands (&&) this will return whats to the right of the ampersands
  // otherwise it will return the sessionState which could be null if it didn't find stateName in the sessionStorage
  // to the right we need to parse as we can only write to the local and session storages as strings, parsing back from string into JSON
  return sessionState && JSON.parse(sessionState);
};
