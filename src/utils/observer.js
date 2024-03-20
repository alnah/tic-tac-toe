/**
 * Creates an observer object with methods to manage observers.
 * @returns {Object} An observer object with methods to add, remove, and notify
 * observers.
 */
const makeObserver = () => {
  const observers = [];

  return Object.freeze({
    /**
     * Add an observer to the list of observers.
     * @param {Function} observer - The observer function to add.
     */
    addObserver: observer => observers.push(observer),

    /**
     * Remove an observer from the list of observers.
     * @param {Function} observer - The observer function to remove.
     */
    removeObserver: observer => observers.filter(o => o !== observer),

    /**
     * Notify all observers with the provided data.
     * @param {*} data - The data to be passed to the observers.
     */
    notifyObservers: data =>
      observers.forEach(observer => {
        if (typeof observer === "function") {
          observer(data);
        } else if (typeof observer.update === "function") {
          observer.update(data);
        }
      }),
  });
};

export default makeObserver;
