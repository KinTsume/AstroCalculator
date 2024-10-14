import { useRef, useState } from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import stars from "../../assets/stars.ts";

import useCalculateDistance from "../../utils/useCalculateDistance"
import CatalogueObjectCard, { CatalogueObject } from "../catalogueObjectCard/CatalogueObjectCard";

const mock = new MockAdapter(axios)

mock.onGet('/catalogueObjects/search', {params: {searchText: 'Hd1'}}).reply(200, {
    catalogueObjects: [stars[1], stars[2]]
})

mock.onGet('/catalogueObjects/search', {params: {searchText: 'Gurb'}}).reply(200, {
    catalogueObjects: stars
})

const useSearchScreen = ({navigation, route}: any) => {
    const [search, setSearch] = useState(Array<CatalogueObject>())
    
    const FetchSearchObjects = async(searchQuery: string): Promise<void> => {
        
        await axios
            .get('/catalogueObjects/search', {params: {searchText: searchQuery}})
            .then(function (response) {
                setSearch(response.data.catalogueObjects)
            })
            .catch(error => console.log(error))
    }

    const SetSearchedObject = (object: CatalogueObject, position: string) => {
        //route.changeObjectCallback(object, position)
        navigation.replace('SearchInputScreen', {catalogueObject: object, position})
    }

    return {search, route, FetchSearchObjects, SetSearchedObject}
}

export default useSearchScreen