import Product from '../models/Product.model.js'

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, category, search, sort = '-createdAt' } = req.query

        // Build query
        const query = { isActive: true }

        if (category) {
            query.category = category
        }

        if (search) {
            query.$text = { $search: search }
        }

        // Execute query with pagination
        const products = await Product.find(query)
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        // Get total count
        const count = await Product.countDocuments(query)

        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                total: count,
                page: parseInt(page),
                pages: Math.ceil(count / limit),
            },
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            })
        }

        res.status(200).json({
            success: true,
            data: product,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body)

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        })
    } catch (error) {
        next(error)
    }
}
