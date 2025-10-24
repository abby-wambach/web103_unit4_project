const API_BASE_URL = '/api/cars'

const getAllCars = async () => {
    try {
        const response = await fetch(API_BASE_URL)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching cars:', error)
        throw error
    }
}

const getCar = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching car:', error)
        throw error
    }
}

const createCar = async (carData) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error creating car:', error)
        throw error
    }
}

const updateCar = async (id, carData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error updating car:', error)
        throw error
    }
}

const deleteCar = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        })
        return response.ok
    } catch (error) {
        console.error('Error deleting car:', error)
        throw error
    }
}

export default {
    getAllCars,
    getCar,
    createCar,
    updateCar,
    deleteCar
}