import React from 'react'

export default function Home() {
  return (
    <div>
      <section className="pt-20 pb-32 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-5xl font-extrabold mb-4">Recycling Made Simple, Safe & Transparent</h1>
            <p className="text-lg mb-6">PETman revolutionizes waste collection with technology, eco-friendly
              practices, and reliable service.</p>
            <div className="flex gap-4">
              <a className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold">Schedule Pickup</a>
              <a className="border border-white px-6 py-3 rounded-lg">Learn More</a>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-xl p-6 text-gray-800">
              <h3 className="text-xl font-bold mb-2">Account</h3>
              <p className="text-sm text-gray-600 mb-4">Sign in or create an account to schedule pickups.</p>
              <div className="flex gap-2">
                <a href="/login" className="flex-1 py-2 text-center rounded-full bg-green-100">Sign In</a>
                <a href="/register" className="flex-1 py-2 text-center rounded-full">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-2">Mission & Vision</h2>
          <p className="text-gray-600 mb-8">Our commitment to sustainability and community impact.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow"> <h3 className="text-green-600">Mission</h3>
              <p className="italic">To make recycling simple, safe, and impactful for every household and business.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow"> <h3 className="text-blue-600">Vision</h3>
              <p className="italic">A cleaner, greener Bangladesh where waste becomes a resource for all.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Impact So Far</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-2xl"> <p className="text-2xl font-bold">50K+</p>
              <p className="text-sm">Users</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-2xl"> <p className="text-2xl font-bold">500+</p>
              <p className="text-sm">Cities</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-2xl"> <p className="text-2xl font-bold">4.9★</p>
              <p className="text-sm">Rating</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-2xl"> <p className="text-2xl font-bold">3+</p>
              <p className="text-sm">Events</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl text-center font-bold mb-8">Meet the People Behind PETman</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-64 bg-green-100 rounded-2xl p-4 text-center">
              <img src="/assets/founderImage.jpg" alt="Founder" className="w-48 h-48 mx-auto block rounded-full object-cover border-2 border-green-500 mt-2 mb-3" />
              <h3 className="font-bold">Shuvo Mandal</h3>
              <p className="text-sm">Founder</p>
            </div>
            <div className="w-64 bg-green-100 rounded-2xl p-4 text-center">
              <img src="/assets/co-founderImage.jpg" alt="Co-Founder" className="w-48 h-48 mx-auto block rounded-full object-cover border-2 border-green-500 mt-2 mb-3" />
              <h3 className="font-bold">Shahriyar Hasan</h3>
              <p className="text-sm">Co-Founder</p>
            </div>
            <div className="w-64 bg-green-100 rounded-2xl p-4 text-center">
              <img src="/assets/CTO.jpg" alt="CTO" className="w-48 h-48 mx-auto block rounded-full object-cover border-2 border-green-500 mt-2 mb-3" />
              <h3 className="font-bold">Anik Mistry</h3>
              <p className="text-sm">CTO</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Why Choose PETman?</h2>
            <ul className="space-y-4">
              <li className="font-semibold">Good for the Planet</li>
              <li className="font-semibold">Easy & Convenient</li>
              <li className="font-semibold">Safe & Reliable</li>
              <li className="font-semibold">Best Price</li>
            </ul>
          </div>
          <div>
            <div className="bg-gray-100 rounded-2xl h-56" />
          </div>
        </div>
      </section>

      <section id="shop" className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 bg-green-50 rounded-2xl text-center">
                <img src="/assets/CTO.jpg" alt={`product-${i}`} className="mx-auto rounded-2xl mb-3 h-36 object-cover" />
                <h3 className="font-semibold">Product {i}</h3>
                <p className="text-sm">Short product description.</p>
                <div className="mt-3 bg-green-600 text-white rounded-2xl inline-block px-4 py-2">Visit Shop</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white bg-opacity-10 rounded-2xl p-6">
            <form className="space-y-4">
              <input placeholder="Full Name" className="w-full px-4 py-3 rounded text-black" />
              <input placeholder="Email" className="w-full px-4 py-3 rounded text-black" />
              <textarea placeholder="Details" className="w-full px-4 py-3 rounded text-black" />
              <button className="w-full bg-white text-emerald-600 px-4 py-3 rounded">Schedule Pickup</button>
            </form>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Contact Info</h3>
            <p className="mt-4">Address: 123 Green Street, Eco City</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Email: info@petman.com</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© PETman. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
