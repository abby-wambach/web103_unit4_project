import dotenv from 'dotenv'
import { pool } from './database.js'
import path from 'path'

// Load environment variables from the correct path
dotenv.config({ path: path.resolve('..', '.env') })

const createCarsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE cars (
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
    const insertDataQuery = `
        INSERT INTO cars (name, exterior_color, roof, wheels, interior, price, convertible)
        VALUES 
            ('Lightning Bolt', 'red', 'black', 'sport', 'leather', 50000, false),
            ('Thunder Strike', 'blue', 'white', 'racing', 'fabric', 45000, true),
            ('Storm Chaser', 'black', 'red', 'alloy', 'leather', 55000, false);
    `

    try {
        const res = await pool.query(insertDataQuery)
        console.log('🎉 sample data inserted successfully')
    } catch (err) {
        console.error('⚠️ error inserting sample data', err)
    }
}

const setup = async () => {
    await createCarsTable()
    await insertSampleData()
}

setup()