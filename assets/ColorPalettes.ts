interface ColorPalette {
  Palette: string,
  ThemeButton: {
    Icon: string,
    IconBackground: string, 
    SliderBackground: string
  },
  NavigationContainer: NavContainerColors,
  ManualInputScreen: ManualInputScreenColors,
  SearchInputScreen: SearchInputScreenColors
}

export interface NavContainerColors{
  Background: string,
  Icons: string
}

export interface ManualInputScreenColors{
  Background: string,
  PropertyInput: string,
  PropertyContainer: string,
  ResultButton: string,
  TextColor: string,
  PlaceholderTextColor: string
}

export interface SearchInputScreenColors{
  Background: string,
  SearchInput: string,
  SearchInputContainer: string,
  TextColor: string,
  PlaceholderTextColor: string,
  Icons: string
}

export const DARK: ColorPalette = {
  Palette: 'dark',
  ThemeButton: {
    Icon: '#6b6b6b',
    IconBackground: '#000000', 
    SliderBackground: '#474747'
  },
  NavigationContainer: {
    Background: "black",
    Icons: "#6b6b6b"
  },
  ManualInputScreen: {
    Background: 'black',
    PropertyInput: 'black',
    PropertyContainer: '#212121',
    ResultButton: '#212121',
    TextColor: 'white',
    PlaceholderTextColor: 'lightgray'
  },
  SearchInputScreen: {
    Background: 'black',
    SearchInput: 'black',
    SearchInputContainer: '#212121',
    TextColor: 'gray',
    PlaceholderTextColor: '#212121',
    Icons: "#6b6b6b"
  }
}

export const LIGHT: ColorPalette = {
  Palette: 'light',
  ThemeButton: {
    Icon: '#faee0a',
    IconBackground: '#2082e4', 
    SliderBackground: '#a8fff8'
  },
  NavigationContainer: {
    Background: "#c7fbff",
    Icons: "blue"
  },
  ManualInputScreen: {
    Background: '#ecf0f1',
    PropertyInput: 'lightblue',
    PropertyContainer: '#bff2ff',
    ResultButton: '#40d3f7',
    TextColor: 'black',
    PlaceholderTextColor: 'darkgray'
  },
  SearchInputScreen: {
    Background: 'gray',
    SearchInput: 'lightblue',
    SearchInputContainer: '#bff2ff',
    TextColor: 'black',
    PlaceholderTextColor: 'darkgray',
    Icons: "#212121"
  }
}