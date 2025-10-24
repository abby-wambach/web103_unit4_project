const basePrices = {
    exterior_color: {
        red: 0,
        blue: 1000,
        black: 2000,
        white: 500
    },
    roof: {
        black: 0,
        white: 800,
        red: 1200
    },
    wheels: {
        sport: 0,
        racing: 3000,
        alloy: 1500
    },
    interior: {
        fabric: 0,
        leather: 2500
    },
    convertible: {
        true: 5000,
        false: 0
    }
}

export const calculatePrice = (carData) => {
    const basePrice = 40000
    let totalPrice = basePrice
    
    totalPrice += basePrices.exterior_color[carData.exterior_color] || 0
    totalPrice += basePrices.roof[carData.roof] || 0
    totalPrice += basePrices.wheels[carData.wheels] || 0
    totalPrice += basePrices.interior[carData.interior] || 0
    totalPrice += basePrices.convertible[carData.convertible.toString()] || 0
    
    return totalPrice
}