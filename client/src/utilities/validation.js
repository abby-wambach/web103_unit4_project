export const validateCarCombination = (carData) => {
    const { exterior_color, roof, wheels, interior, convertible } = carData
    
    // Rule 1: Red exterior cannot have white roof
    if (exterior_color === 'red' && roof === 'white') {
        return { isValid: false, error: 'Red exterior cannot have a white roof' }
    }
    
    // Rule 2: Convertible cars cannot have a black roof
    if (convertible && roof === 'black') {
        return { isValid: false, error: 'Convertible cars cannot have a black roof' }
    }
    
    // Rule 3: Racing wheels require fabric interior
    if (wheels === 'racing' && interior !== 'fabric') {
        return { isValid: false, error: 'Racing wheels require fabric interior' }
    }
    
    return { isValid: true, error: null }
}