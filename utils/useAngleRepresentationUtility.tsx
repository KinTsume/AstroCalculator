const useAngleRepresentationUtility = () => {
    
    const convertToArrayRepresentation = (decimalAngle: number) => {
        
        let degrees = Math.trunc(decimalAngle)

        let rest = (decimalAngle - degrees) * 60

        let minutes = Math.trunc(rest)

        rest = rest - minutes

        let seconds = rest * 60
        let roundedSeconds = Math.round(seconds * 100) / 100

        let declinationInDegrees = [degrees, Math.abs(minutes), Math.abs(roundedSeconds)]

        return declinationInDegrees
    }

    const convertToDecimalRepresentation = (arrayAngle: number[]) => {

        if(arrayAngle[1] < 0){
            throw Error("Angle sign should be only on the first value - arrayAngle[1] is negative");
        } else if(arrayAngle[2] < 0){
            throw Error("Angle sign should be only on the first value - arrayAngle[2] is negative");
        }

        let decimalAngle = arrayAngle[0]

        let signMultiplier = decimalAngle / Math.abs(decimalAngle);
        
        let decimalMinutes = (arrayAngle[1] / 60) * signMultiplier

        let decimalSeconds = (arrayAngle[2] / (60 * 60)) * signMultiplier

        decimalAngle += decimalMinutes + decimalSeconds

        return decimalAngle
    }

    return {convertToArrayRepresentation, convertToDecimalRepresentation}
}

export default useAngleRepresentationUtility