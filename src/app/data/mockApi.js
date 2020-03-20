import data from "./data";

const delay = (ms) => {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  )
};

export const fetchData = () => {
  return delay(1000)
    .then(
      () => {
        return Promise.resolve(data)
      }
    )
};
