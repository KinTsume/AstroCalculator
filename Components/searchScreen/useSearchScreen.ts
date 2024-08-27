import { useRef, useState } from "react";
import axios from "axios";

import useCalculateDistance from "../../utils/useCalculateDistance"
import CatalogueObjectCard, { CatalogueObject } from "../catalogueObjectCard/CatalogueObjectCard";

const useSearchScreen = () => {
    const [search, setSearch] = useState(Array<CatalogueObject>())
    
    const FetchSearchObjects = async(searchQuery: string): Promise<void> => {
        
        await axios
            .get('/catalogueObjects/search', {params: {searchText: searchQuery}})
            .then(function (response) {
                setSearch(response.data.catalogueObjects)
            })
    }

    return {search, FetchSearchObjects}
}

export default useSearchScreen