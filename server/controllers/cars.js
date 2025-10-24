import { pool } from '../config/database.js'

const getCars = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM cars ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM cars WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const createCar = async (req, res) => {
    try {
        const { name, exterior_color, roof, wheels, interior, price, convertible } = req.body
        const results = await pool.query(
            'INSERT INTO cars (name, exterior_color, roof, wheels, interior, price, convertible) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, exterior_color, roof, wheels, interior, price, convertible]
        )
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, exterior_color, roof, wheels, interior, price, convertible } = req.body
        const results = await pool.query(
            'UPDATE cars SET name = $1, exterior_color = $2, roof = $3, wheels = $4, interior = $5, price = $6, convertible = $7 WHERE id = $8 RETURNING *',
            [name, exterior_color, roof, wheels, interior, price, convertible, id]
        )
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM cars WHERE id = $1', [id])
        res.status(200).json(`Car deleted with ID: ${id}`)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getCars,
    getCar, 
    createCar,
    updateCar,
    deleteCar
}