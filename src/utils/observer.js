const makeObserver = () => {
  let observers = [];

  return Object.freeze({
    addObserver: observer => observers.push(observer),

    removeObserver: observer => {
      observers = observers.filter(o => o !== observer);
    },

    notifyObservers: data => {
      observers.forEach(observer => {
        if (typeof observer === "function") {
          observer(data);
        } else if (typeof observer.update === "function") {
          observer.update(data);
        }
      });
    },
  });
};

export default makeObserver;
