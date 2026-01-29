import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">
                Page Not Found
            </h2>
            <p className="text-xl text-gray-600 mb-8">
                Sorry, the page you're looking for doesn't exist.
            </p>
            <Link to="/" className="btn-primary inline-block">
                Go Back Home
            </Link>
        </div>
    )
}
