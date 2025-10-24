import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'
import { validateCarCombination } from '../utilities/validation'
import { calculatePrice } from '../utilities/calcPrice'
import '../App.css'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [carData, setCarData] = useState({
        name: '',
        exterior_color: 'red',
        roof: 'black',
        wheels: 'sport',
        interior: 'fabric',
        convertible: false
    })

    const exteriorColors = ['red', 'blue', 'black', 'white']
    const roofOptions = ['black', 'white', 'red']
    const wheelOptions = ['sport', 'racing', 'alloy']
    const interiorOptions = ['fabric', 'leather']

    useEffect(() => {
        fetchCar()
    }, [id])

    const fetchCar = async () => {
        try {
            const data = await CarsAPI.getCar(id)
            setCarData(data)
        } catch (error) {
            setError('Failed to load car')
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setCarData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!carData.name.trim()) {
            setError('Please enter a car name')
            return
        }

        const validation = validateCarCombination(carData)
        if (!validation.isValid) {
            setError(validation.error)
            return
        }

        try {
            const price = calculatePrice(carData)
            const carWithPrice = { ...carData, price }
            
            await CarsAPI.updateCar(id, carWithPrice)
            navigate(`/customcars/${id}`)
        } catch (error) {
            setError('Failed to update car. Please try again.')
        }
    }

    if (loading) return <main><p>Loading car...</p></main>
    if (error && loading) return <main><p style={{ color: 'red' }}>{error}</p></main>

    const currentPrice = calculatePrice(carData)

    // Updated helper function with more vibrant colors
    const getBackgroundColor = () => {
        switch(carData.exterior_color) {
            case 'red': return '#ff4444'
            case 'blue': return '#4488ff'
            case 'black': return '#333333'
            case 'white': return '#ffffff'
            default: return '#f8f9fa'
        }
    }

    return (
        <main style={{ padding: '2rem' }}>
            <article>
                <header>
                    <h1>Edit Car: {carData.name}</h1>
                    <h3>Current Price: ${currentPrice.toLocaleString()}</h3>
                </header>

                {/* Car visual with vibrant colors */}
                <div style={{ 
                    fontSize: '80px', 
                    textAlign: 'center',
                    backgroundColor: getBackgroundColor(),
                    padding: '20px',
                    borderRadius: '10px',
                    margin: '20px 0',
                    border: '2px solid #dee2e6',
                    color: carData.exterior_color === 'black' ? 'white' : 'black'
                }}>
                    {carData.convertible ? '🏎️' : '🚗'}
                    <div style={{ 
                        fontSize: '14px', 
                        marginTop: '10px', 
                        color: carData.exterior_color === 'black' ? '#ccc' : '#666'
                    }}>
                        {carData.exterior_color} • {carData.wheels} wheels • {carData.interior} interior
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Car Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={carData.name}
                        onChange={handleInputChange}
                        placeholder="Enter car name"
                        required
                    />

                    <fieldset>
                        <legend>Exterior Color</legend>
                        {exteriorColors.map(color => (
                            <label key={color}>
                                <input
                                    type="radio"
                                    name="exterior_color"
                                    value={color}
                                    checked={carData.exterior_color === color}
                                    onChange={handleInputChange}
                                />
                                {color.charAt(0).toUpperCase() + color.slice(1)}
                            </label>
                        ))}
                    </fieldset>

                    <fieldset>
                        <legend>Roof</legend>
                        {roofOptions.map(roof => (
                            <label key={roof}>
                                <input
                                    type="radio"
                                    name="roof"
                                    value={roof}
                                    checked={carData.roof === roof}
                                    onChange={handleInputChange}
                                />
                                {roof.charAt(0).toUpperCase() + roof.slice(1)}
                            </label>
                        ))}
                    </fieldset>

                    <fieldset>
                        <legend>Wheels</legend>
                        {wheelOptions.map(wheel => (
                            <label key={wheel}>
                                <input
                                    type="radio"
                                    name="wheels"
                                    value={wheel}
                                    checked={carData.wheels === wheel}
                                    onChange={handleInputChange}
                                />
                                {wheel.charAt(0).toUpperCase() + wheel.slice(1)}
                            </label>
                        ))}
                    </fieldset>

                    <fieldset>
                        <legend>Interior</legend>
                        {interiorOptions.map(interior => (
                            <label key={interior}>
                                <input
                                    type="radio"
                                    name="interior"
                                    value={interior}
                                    checked={carData.interior === interior}
                                    onChange={handleInputChange}
                                />
                                {interior.charAt(0).toUpperCase() + interior.slice(1)}
                            </label>
                        ))}
                    </fieldset>

                    <label>
                        <input
                            type="checkbox"
                            name="convertible"
                            checked={carData.convertible}
                            onChange={handleInputChange}
                        />
                        Convertible
                    </label>

                    {error && (
                        <div style={{ color: 'red', marginBottom: '1rem' }}>
                            {error}
                        </div>
                    )}

                    <button type="submit">Update Car</button>
                </form>
            </article>
        </main>
    )
}

export default EditCar