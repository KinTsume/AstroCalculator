export default {
    addListener: jest.fn(),
    getCurrentPosition: jest.fn(successCallback => {
      const position = {
        coords: {
          latitude: -23.006945,
          longitude: -44.31778,
        }
      }

      successCallback(position)
    }),
    removeListeners: jest.fn(),
    requestAuthorization: jest.fn(),
    setConfiguration: jest.fn(),
    startObserving: jest.fn(),
    stopObserving: jest.fn()
  };