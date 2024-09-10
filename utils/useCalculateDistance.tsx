const useCalculateDistance = () => {
    
    const calculateDistance = (originInput: number, targetInput: number) => {
        
        let distance = targetInput - originInput

        return distance
    }

    return {calculateDistance}
}

export default useCalculateDistance