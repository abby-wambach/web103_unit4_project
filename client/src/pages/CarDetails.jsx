import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'
import '../App.css'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchCar()
    }, [id])

    const fetchCar = async () => {
        try {
            const data = await CarsAPI.getCar(id)
            setCar(data)
        } catch (error) {
            setError('Failed to load car details')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await CarsAPI.deleteCar(id)
                navigate('/customcars')
            } catch (error) {
                setError('Failed to delete car')
            }
        }
    }

    if (loading) return <main><p>Loading car details...</p></main>
    if (error) return <main><p style={{ color: 'red' }}>{error}</p></main>
    if (!car) return <main><p>Car not found</p></main>

    return (
        <main style={{ padding: '2rem' }}>
            <article>
                <header>
                    <h1>{car.name}</h1>
                    <h2>${car.price?.toLocaleString()}</h2>
                </header>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                        <h3>Specifications</h3>
                        <p><strong>Exterior Color:</strong> {car.exterior_color}</p>
                        <p><strong>Roof:</strong> {car.roof}</p>
                        <p><strong>Wheels:</strong> {car.wheels}</p>
                        <p><strong>Interior:</strong> {car.interior}</p>
                        <p><strong>Convertible:</strong> {car.convertible ? 'Yes' : 'No'}</p>
                    </div>
                </div>

                <footer>
                    <Link to="/customcars" role="button">Back to Gallery</Link>
                    <Link to={`/edit/${car.id}`} role="button">Edit</Link>
                    <button onClick={handleDelete}>Delete</button>
                </footer>
            </article>
        </main>
    )
}

export default CarDetails