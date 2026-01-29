// MongoDB Seed Data Script for Cartora
// Run with: node scripts/seed-data.js

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') })

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('✅ MongoDB Connected')
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message)
        process.exit(1)
    }
}

// Sample data
const sampleProducts = [
    {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 99.99,
        category: 'Electronics',
        stock: 50,
        sku: 'WH-001',
        rating: 4.5,
        reviewCount: 120,
    },
    {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking',
        price: 199.99,
        category: 'Electronics',
        stock: 30,
        sku: 'SW-001',
        rating: 4.7,
        reviewCount: 85,
    },
    {
        name: 'Running Shoes',
        description: 'Comfortable running shoes for all terrains',
        price: 79.99,
        category: 'Sports',
        stock: 100,
        sku: 'RS-001',
        rating: 4.3,
        reviewCount: 200,
    },
    {
        name: 'Coffee Maker',
        description: 'Automatic coffee maker with programmable timer',
        price: 49.99,
        category: 'Home',
        stock: 25,
        sku: 'CM-001',
        rating: 4.6,
        reviewCount: 150,
    },
]

// Seed function
const seedData = async () => {
    try {
        await connectDB()

        // Import models (adjust path as needed)
        const Product = mongoose.model('Product', new mongoose.Schema({
            name: String,
            description: String,
            price: Number,
            category: String,
            stock: Number,
            sku: { type: String, unique: true },
            rating: Number,
            reviewCount: Number,
            isActive: { type: Boolean, default: true },
        }, { timestamps: true }))

        // Clear existing data
        console.log('🗑️  Clearing existing data...')
        await Product.deleteMany({})

        // Insert sample data
        console.log('📦 Inserting sample products...')
        await Product.insertMany(sampleProducts)

        console.log('✅ Sample data seeded successfully!')
        console.log(`📊 Inserted ${sampleProducts.length} products`)

        process.exit(0)
    } catch (error) {
        console.error('❌ Error seeding data:', error)
        process.exit(1)
    }
}

// Run seed
seedData()
