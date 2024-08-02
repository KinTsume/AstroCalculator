const useCalculateDistance = () => {
    
    const CalculateDistance = (originInput: number[], targetInput: number[]) => {
        let originDeclination = ConvertToSeconds(originInput)
        let targetDeclination = ConvertToSeconds(targetInput)

        let distanceInSeconds = targetDeclination - originDeclination

        let distanceInDegrees = ConvertToDegrees(distanceInSeconds)

        return distanceInDegrees
    }

    const ConvertToSeconds = (declinationInDegrees: number[]) => {
        const signSettingMultiplier = declinationInDegrees[0] < 0 ? -1 : 1
        let convertedDeclination = declinationInDegrees[0] * (60*60) + declinationInDegrees[1] * 60 * signSettingMultiplier + declinationInDegrees[2] * signSettingMultiplier 

        return convertedDeclination
    }
    
    const ConvertToDegrees = (declinationInSeconds: number) => {
        let degrees = Math.trunc(declinationInSeconds / (60*60))

        let rest = declinationInSeconds % (60*60)

        let minutes = Math.trunc(rest / 60)

        rest = rest % 60

        let seconds = parseFloat(rest.toFixed(2))

        let declinationInDegrees = [degrees, minutes, seconds]

        return declinationInDegrees
    }

    return {CalculateDistance}
}

export default useCalculateDistance