import { pool } from './database.js'
import './dotenv.js'

const createCarsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            exterior_color VARCHAR(50) NOT NULL,
            roof VARCHAR(50) NOT NULL,
            wheels VARCHAR(50) NOT NULL,
            interior VARCHAR(50) NOT NULL,
            price INTEGER NOT NULL,
            convertible BOOLEAN DEFAULT FALSE
        );
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 cars table created successfully')
    } catch (err) {
        console.error('⚠️ error creating cars table', err)
    }
}

const insertSampleData = async () => {
    await createCarsTable()

    const sampleCars = [
        { name: 'Lightning Bolt', exterior_color: 'red', roof: 'black', wheels: 'sport', interior: 'leather', price: 50000, convertible: false },
        { name: 'Thunder Strike', exterior_color: 'blue', roof: 'white', wheels: 'racing', interior: 'fabric', price: 45000, convertible: true },
        { name: 'Storm Chaser', exterior_color: 'black', roof: 'red', wheels: 'alloy', interior: 'leather', price: 55000, convertible: false }
    ]

    sampleCars.forEach((car) => {
        const insertQuery = {
            text: 'INSERT INTO cars (name, exterior_color, roof, wheels, interior, price, convertible) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        }

        const values = [
            car.name,
            car.exterior_color,
            car.roof,
            car.wheels,
            car.interior,
            car.price,
            car.convertible
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting car', err)
                return
            }
            console.log(`✅ ${car.name} added successfully`)
        })
    })
}

insertSampleData()