import { CatalogueObject } from "../components/catalogueObjectCard/CatalogueObjectCard"
import { DARK } from "./ColorPalettes"

const stars: Array<CatalogueObject> = [
    {Names: ["test"], HD_ID: 0, RA: 0.0, DE: 0.0,PhotovisualMagnitude:0.0,SpectralType:"O", ThemeColors: DARK.SearchInputScreen},
    {Names: [],HD_ID:1, RA: 1.2961219444, DE: 67.8400738889, PhotovisualMagnitude:7.6999998093,SpectralType:"K0", ThemeColors: DARK.SearchInputScreen},
    {Names:[],HD_ID:2, RA: 1.2906994444, DE: 57.7734163889, PhotovisualMagnitude:8.6000003815,SpectralType:"F5", ThemeColors: DARK.SearchInputScreen},
    {Names:[],HD_ID:3, RA: 1.2870902778, DE: 45.2234305556, PhotovisualMagnitude:6.5100002289,SpectralType:"A0", ThemeColors: DARK.SearchInputScreen},
    {Names:[],HD_ID:4, RA: 1.2844533333, DE: 30.3234513889, PhotovisualMagnitude:8.3999996185,SpectralType:"F0", ThemeColors: DARK.SearchInputScreen}
]

export default stars