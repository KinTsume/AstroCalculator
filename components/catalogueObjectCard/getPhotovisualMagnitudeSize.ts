const getMagnitudeSize = (magnitude: number): number => {
    if(magnitude <= 2.5){
        return 50
    } 
    
    if (magnitude <= 5) {
        return 40
    }
    
    if(magnitude <= 7.5) {
        return 30
    }

    return 20
}
export default getMagnitudeSize