export default function Hero() {
    return (
        <section className="bg-gray-100 px-6 py-10 mt-20 rounded-xl shadow">
            <h1 className="text-3xl font-bold mb-2">SSR + CSR Performance Demo</h1>
            <p className="text-gray-700">
                This section is server-rendered for SEO and speed. Scroll down to see
                a Redis-accelerated CSR component fetching paginated data!
            </p>
        </section>
    )
}
