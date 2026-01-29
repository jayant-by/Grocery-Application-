import User from '../models/User.model.js'
import jwt from 'jsonwebtoken'

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY || '24h',
    })
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        // Check if user exists
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email',
            })
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
        })

        // Generate token
        const token = generateToken(user._id)

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user,
                token,
            },
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            })
        }

        // Find user and include password
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            })
        }

        // Check password
        const isPasswordMatch = await user.comparePassword(password)

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            })
        }

        // Update last login
        user.lastLogin = new Date()
        await user.save()

        // Generate token
        const token = generateToken(user._id)

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user,
                token,
            },
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)

        res.status(200).json({
            success: true,
            data: user,
        })
    } catch (error) {
        next(error)
    }
}
