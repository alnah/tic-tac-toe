const makeObserver = () => {
  let observers = [];

  return Object.freeze({
    addObserver: observer => observers.push(observer),

    removeObserver: observer => {
      observers = observers.filter(o => o !== observer);
    },

    notifyObservers: data => {
      console.log("notifyObservers:", data);
      observers.forEach(observer => observer.update(data));
    },
  });
};

export default makeObserver;
