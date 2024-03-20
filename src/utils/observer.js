/**
 * @module Observer
 * This module provides functionality to create and manage an observer pattern.
 * It allows for the creation of an observer object with methods to add, remove,
 * and notify observers. Observers can be functions or objects with an `update`
 * method. This pattern is useful for implementing a publish-subscribe model,
 * where observers are notified of changes in the subject they are observing.
 */

/**
 * Creates an observer object with methods to manage observers.
 * @returns {Object} An observer object with methods to add, remove, and notify
 * observers.
 */
const makeObserver = () => {
  const observers = [];

  return Object.freeze({
    /**
     * Adds an observer to the list of observers.
     * @param {Function|Object} observer - The observer to add. Can be a function
     * or an object with an `update` method.
     */
    addObserver: observer => observers.push(observer),

    /**
     * Removes an observer from the list of observers.
     * @param {Function|Object} observer - The observer to remove. Can be a
     * function or an object with an `update` method.
     * @returns {Array} The updated list of observers after removal.
     */
    removeObserver: observer => observers.filter(o => o !== observer),

    /**
     * Notifies all observers with the provided data. If the observer is a
     * function, it is called directly. If the observer is an object, its
     * `update` method is called.
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
