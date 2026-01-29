import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './src/config/database.js'
import authRoutes from './src/routes/auth.routes.js'
import userRoutes from './src/routes/user.routes.js'
import productRoutes from './src/routes/product.routes.js'
import { errorHandler } from './src/middleware/error.middleware.js'

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(helmet()) // Security headers
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }))
app.use(morgan('dev')) // Logging
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Cartora Backend Node.js API is running',
        timestamp: new Date().toISOString()
    })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Cartora API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            auth: '/api/auth',
            users: '/api/users',
            products: '/api/products',
        }
    })
})

// Error handling middleware (must be last)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app
