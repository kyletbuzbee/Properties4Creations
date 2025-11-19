import Header from '@/components/Header';
import { useState } from 'react';

// Mock data - replace with Firestore queries
const projectsMock = [
  {
    id: 'oak-street-renovation',
    title: '123 Oak Street Renovation',
    city: 'Austin',
    status: 'Completed',
    veteran_focus: true,
    budget_range: '$45k-$60k',
    featured_image: null
  },
  {
    id: 'urban-loft-modernization',
    title: 'Urban Loft Modernization',
    city: 'Dallas',
    status: 'In Progress',
    veteran_focus: false,
    budget_range: '$75k-$90k',
    featured_image: null
  },
  {
    id: 'family-home-renovation',
    title: 'Family Home Renovation',
    city: 'Austin',
    status: 'Planned',
    veteran_focus: true,
    budget_range: '$55k-$70k',
    featured_image: null
  }
];

const cities = ['All Cities', 'Austin', 'Dallas', 'Houston'];
const statuses = ['All Statuses', 'Completed', 'In Progress', 'Planned'];

export default function Projects() {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [showVeteranOnly, setShowVeteranOnly] = useState(false);

  const filteredProjects = projectsMock.filter(project => {
    const cityMatch = selectedCity === 'All Cities' || project.city === selectedCity;
    const statusMatch = selectedStatus === 'All Statuses' || project.status === selectedStatus;
    const veteranMatch = !showVeteranOnly || project.veteran_focus;
    return cityMatch && statusMatch && veteranMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Planned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Our Work</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="md:w-1/4 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-6">Filter Projects</h2>

            {/* City Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Location</h3>
              {cities.map(city => (
                <label key={city} className="block mb-2">
                  <input
                    type="radio"
                    name="city"
                    value={city}
                    checked={selectedCity === city}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="mr-2"
                  />
                  {city}</label>
              ))}
            </div>

            {/* Status Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Status</h3>
              {statuses.map(status => (
                <label key={status} className="block mb-2">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={selectedStatus === status}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="mr-2"
                  />
                  {status}</label>
              ))}
            </div>

            {/* Veteran Focus Filter */}
            <div>
              <label className="block">
                <input
                  type="checkbox"
                  checked={showVeteranOnly}
                  onChange={(e) => setShowVeteranOnly(e.target.checked)}
                  className="mr-2"
                />
                <span className="font-semibold">Veteran Housing Only</span>
              </label>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                    {/* Placeholder for project image */}
                    <div className="absolute bottom-2 left-2 flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      {project.veteran_focus && (
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                          Veteran Focus
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.city}, TX</p>
                    <p className="text-sm text-gray-500">{project.budget_range}</p>
                    <a
                      href={`/projects/${project.id}`}
                      className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
