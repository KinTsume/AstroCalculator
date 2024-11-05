import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';

AsyncStorageMock.multiGet = jest.fn(([keys], callback) => {
  // do something here to retrieve data
  callback([]);
});

AsyncStorageMock.positionStorage = JSON.stringify({
  latitude: 10,
  longitude: 25,
})

AsyncStorageMock.setItem = jest.fn((key, value) => {
    if(key != 'position') return
    
    AsyncStorageMock.positionStorage = value
})

AsyncStorageMock.getItem = jest.fn(async(key, callback) => {
    if(key != 'position') return null 

    const stringPosition = AsyncStorageMock.positionStorage

    return stringPosition
})

export default AsyncStorageMock;