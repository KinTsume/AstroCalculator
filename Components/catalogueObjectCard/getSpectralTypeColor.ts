const getSpectralTypeColor = (spectralType: string): string => {
    switch(spectralType){
        case 'O':
            return "#0000FF"
            
        case 'B':
            return "#ADD8E6"

        case 'A':
            return "#F0FFFF"

        case 'F':
            return "#FFFFE0"

        case 'G':
            return "#FFFF00"

        case 'K':
            return "#FFE0A1"

        case 'M':
            return "#FC7E35"

        default:
            return "#000000"


    }
}
export default getSpectralTypeColor