import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            maxlength: [200, 'Product name cannot exceed 200 characters'],
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            maxlength: [2000, 'Description cannot exceed 2000 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
        },
        stock: {
            type: Number,
            required: [true, 'Stock quantity is required'],
            min: [0, 'Stock cannot be negative'],
            default: 0,
        },
        images: [{
            type: String,
        }],
        sku: {
            type: String,
            unique: true,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        reviewCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

// Index for search
productSchema.index({ name: 'text', description: 'text' })

const Product = mongoose.model('Product', productSchema)

export default Product
