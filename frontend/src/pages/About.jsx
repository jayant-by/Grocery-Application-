export default function About() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">About Cartora</h1>

                <div className="prose prose-lg max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Cartora is a modern e-commerce platform built with cutting-edge technology
                            to provide the best shopping experience. Our goal is to demonstrate how
                            microservices architecture can create scalable, maintainable, and performant
                            web applications.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="card">
                                <h3 className="font-semibold text-lg mb-2">Frontend</h3>
                                <ul className="text-gray-700 space-y-1">
                                    <li>• React 18</li>
                                    <li>• Vite</li>
                                    <li>• Tailwind CSS</li>
                                    <li>• React Router</li>
                                </ul>
                            </div>

                            <div className="card">
                                <h3 className="font-semibold text-lg mb-2">Backend</h3>
                                <ul className="text-gray-700 space-y-1">
                                    <li>• Node.js + Express</li>
                                    <li>• Python + Django</li>
                                    <li>• MongoDB</li>
                                    <li>• Redis & Celery</li>
                                </ul>
                            </div>

                            <div className="card">
                                <h3 className="font-semibold text-lg mb-2">Infrastructure</h3>
                                <ul className="text-gray-700 space-y-1">
                                    <li>• Docker</li>
                                    <li>• Nginx</li>
                                    <li>• AWS/GCP Ready</li>
                                </ul>
                            </div>

                            <div className="card">
                                <h3 className="font-semibold text-lg mb-2">Architecture</h3>
                                <ul className="text-gray-700 space-y-1">
                                    <li>• Microservices</li>
                                    <li>• RESTful APIs</li>
                                    <li>• Background Jobs</li>
                                    <li>• Scalable Design</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <p className="text-gray-700">
                            Have questions? We'd love to hear from you. Reach out to us at{' '}
                            <a href="mailto:info@cartora.com" className="text-primary-600 hover:underline">
                                info@cartora.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
