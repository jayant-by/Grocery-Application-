import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-primary-600">
                        Cartora
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-primary-600 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="text-gray-700 hover:text-primary-600 transition-colors"
                        >
                            Products
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-700 hover:text-primary-600 transition-colors"
                        >
                            About
                        </Link>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex items-center space-x-4">
                        <button className="btn-secondary">
                            Sign In
                        </button>
                        <button className="btn-primary">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}
