import { useState, useEffect } from 'react'
import api from '../services/api'

export default function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // This will be connected to your API once backend is running
        const fetchProducts = async () => {
            try {
                // const response = await api.get('/products')
                // setProducts(response.data)

                // Demo data for now
                setProducts([
                    { id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/300' },
                    { id: 2, name: 'Product 2', price: 39.99, image: 'https://via.placeholder.com/300' },
                    { id: 3, name: 'Product 3', price: 49.99, image: 'https://via.placeholder.com/300' },
                    { id: 4, name: 'Product 4', price: 59.99, image: 'https://via.placeholder.com/300' },
                ])
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="text-xl">Loading products...</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Our Products</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="card hover:shadow-lg transition-shadow">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-2xl font-bold text-primary-600 mb-4">
                            ${product.price}
                        </p>
                        <button className="btn-primary w-full">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
