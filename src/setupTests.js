import "jest-dom/extend-expect";

/* Mock Fetch */
global.fetch = jest.fn(url => {
  // eslint-disable-next-line
  console.error("Attempt to perform a network request", url);
  throw new Error(
    "Your test is trying to reach the network with a fetch request. Please mock the fetch request."
  );
});

global.mockFetchPromise = (data, options = {}) => {
  const defaultOptions = {
    status: 200,
    headers: { "Content-Type": "application/json" }
  };
  const finalOptions = Object.assign({}, defaultOptions, options);
  const response = {
    status: finalOptions.status,
    headers: {
      get(key) {
        return finalOptions.headers[key];
      }
    },
    json() {
      return Promise.resolve(data);
    },
    text() {
      return Promise.resolve(data);
    }
  };
  response.clone = () => response;
  return Promise.resolve(response);
};

global.mockFetchOnce = response => 
  global.fetch.mockImplementationOnce(() => global.mockFetchPromise(response));
