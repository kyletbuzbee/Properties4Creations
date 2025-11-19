import Header from '@/components/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section with Background Image */}
        <section
          className="relative bg-cover bg-center h-screen flex items-center justify-center"
          style={{ backgroundImage: "url('/hero-renovation.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Restoring Homes,<br/>
              Rebuilding Lives<br/>
              <span className="text-blue-300">for Veterans</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Expert renovations and housing evaluations for those who served our country.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Get a Cash Offer
              </button>
              <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Find Veteran Housing
              </button>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="bg-blue-800 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border-r border-blue-600 md:border-r last:border-r-0">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-xl">Projects Completed</div>
              </div>
              <div className="border-r border-blue-600 md:border-r last:border-r-0">
                <div className="text-4xl font-bold mb-2">120+</div>
                <div className="text-xl">Veterans Housed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">$25k+</div>
                <div className="text-xl">Average Budget Saved</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Recent Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Project Card 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200"></div> {/* Placeholder for image */}
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Completed
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium ml-2">
                      Veteran Focus
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">123 Oak Street Renovation</h3>
                  <p className="text-gray-600 mb-4">Austin, TX</p>
                  <p className="text-sm text-gray-500">$45k-$60k</p>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      In Progress
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Urban Loft Modernization</h3>
                  <p className="text-gray-600 mb-4">Dallas, TX</p>
                  <p className="text-sm text-gray-500">$75k-$90k</p>
                </div>
              </div>

              {/* Project Card 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Planned
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium ml-2">
                      Veteran Focus
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Family Home Renovation</h3>
                  <p className="text-gray-600 mb-4">Houston, TX</p>
                  <p className="text-sm text-gray-500">$55k-$70k</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">What Our Community Says</h2>
            <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
              <blockquote className="text-xl italic text-center mb-6">
                "Kyle's team transformed our home into a dream. As a veteran, it means the world!"
              </blockquote>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div> {/* Placeholder for photo */}
                  <div>
                    <p className="font-bold">John Smith</p>
                    <p className="text-sm text-gray-600">Veteran Soldier</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Carousel dots placeholder */}
            <div className="flex justify-center mt-8">
              <div className="w-3 h-3 bg-blue-600 rounded-full mx-1"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full mx-1"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full mx-1"></div>
            </div>
          </div>
        </section>

        {/* Get Involved CTA */}
        <section className="bg-red-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8">
              Whether you're a seller looking to help veterans, a veteran seeking housing, or a partner interested in supporting our mission.
            </p>
            <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Get Involved Today
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
