export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">
                        Welcome to Cartora
                    </h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        A modern e-commerce platform built with cutting-edge technology.
                        Experience seamless shopping with our microservices architecture.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors">
                            Shop Now
                        </button>
                        <button className="border-2 border-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Why Choose Cartora?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card text-center">
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-xl font-semibold mb-3">Fast & Reliable</h3>
                            <p className="text-gray-600">
                                Built on modern microservices architecture for maximum performance and scalability.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="card text-center">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-semibold mb-3">Secure</h3>
                            <p className="text-gray-600">
                                Enterprise-grade security with JWT authentication and encrypted data storage.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="card text-center">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="text-xl font-semibold mb-3">Responsive</h3>
                            <p className="text-gray-600">
                                Beautiful, mobile-first design that works perfectly on all devices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers and experience the future of e-commerce.
                    </p>
                    <button className="btn-primary text-lg py-3 px-10">
                        Create Your Account
                    </button>
                </div>
            </section>
        </div>
    )
}
