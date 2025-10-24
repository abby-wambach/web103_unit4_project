import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'
import '../App.css'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchCars()
    }, [])

    const fetchCars = async () => {
        try {
            const data = await CarsAPI.getAllCars()
            setCars(data)
        } catch (error) {
            setError('Failed to load cars')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await CarsAPI.deleteCar(id)
                setCars(cars.filter(car => car.id !== id))
            } catch (error) {
                setError('Failed to delete car')
            }
        }
    }

    if (loading) return <main><p>Loading cars...</p></main>
    if (error) return <main><p style={{ color: 'red' }}>{error}</p></main>

    return (
        <main style={{ padding: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Car Gallery</h1>
                <Link to="/" role="button">Create New Car</Link>
            </header>

            {cars.length === 0 ? (
                <article>
                    <p>No cars created yet.</p>
                    <Link to="/" role="button">Create your first car!</Link>
                </article>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {cars.map(car => (
                        <article key={car.id}>
                            <header>
                                <h3>{car.name}</h3>
                                <h4>${car.price?.toLocaleString()}</h4>
                            </header>
                            <p><strong>Exterior:</strong> {car.exterior_color}</p>
                            <p><strong>Roof:</strong> {car.roof}</p>
                            <p><strong>Wheels:</strong> {car.wheels}</p>
                            <p><strong>Interior:</strong> {car.interior}</p>
                            {car.convertible && <p><strong>Convertible</strong></p>}
                            <footer>
                                <Link to={`/customcars/${car.id}`} role="button">View</Link>
                                <Link to={`/edit/${car.id}`} role="button">Edit</Link>
                                <button onClick={() => handleDelete(car.id)}>Delete</button>
                            </footer>
                        </article>
                    ))}
                </div>
            )}
        </main>
    )
}

export default ViewCars