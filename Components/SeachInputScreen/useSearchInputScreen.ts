import stars from '../../assets/stars.json'

interface SkyObjects{
    name: string,
    altname: string,
    declination: string,
    rightAscension: string
}

interface ObjectData{
    recno: number,
    HD: number,
    DM: string,
    RAB1900: number,
    DEB1900: number,
    q_Ptm: number,
    Ptm: number,
    n_Ptm: string,
    q_Ptg: number,
    Ptg: number,
    n_Ptg: string,
    SpT: string,
    Int: string,
    Rem: string,
    _RA_icrs: number,
    _DE_icrs: number
}

const useSearchInputScreen = () => {
    const SearchedObjects: Array<SkyObjects> = []

    const ShowSearchObjects = (searchText: string) => {
        GetSearchedObjects(searchText)
    }

    const GetSearchedObjects = (search: string | number) => {
        /*fetch('<API address>',{
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            search: searchString
            })
        })*/

        const starsArray = stars as Array<ObjectData>

        let searchResult: Array<ObjectData>= []

        const searchById = (object: ObjectData) => {
            return object.HD === search
        }

        const searchByName = (object: ObjectData, index: number, array: Array<ObjectData>) => {
            return false
        }
        
        if(typeof search === "number"){
            searchResult.push(starsArray.find(searchById) as ObjectData)
        }else {
            const search = starsArray.filter(searchByName)
            searchResult.push(...search)
        }
        return searchResult
    }

    return {}
}

export default useSearchInputScreen