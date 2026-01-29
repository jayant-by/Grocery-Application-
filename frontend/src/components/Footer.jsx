import { Link } from 'react-router-dom'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-4">Cartora</h3>
                        <p className="text-sm">
                            Modern e-commerce platform built with cutting-edge technology.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="hover:text-primary-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="hover:text-primary-400 transition-colors">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-primary-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-primary-400 transition-colors">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-400 transition-colors">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-400 transition-colors">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-primary-400 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-400 transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>&copy; {currentYear} Cartora. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
