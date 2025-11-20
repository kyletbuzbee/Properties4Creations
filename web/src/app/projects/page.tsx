'use client';

import React, { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import dynamic from 'next/dynamic';

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), { ssr: false });
import { useProjects } from '@/hooks/useProjects';

export default function ProjectsPage() {
  const [showSection8Only, setShowSection8Only] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Use the custom hook with filtering
  const { projects, loading, error, refetch } = useProjects(showSection8Only ? true : false);

  // Filter projects client-side if needed
  const filteredProjects = showSection8Only
    ? projects.filter(project => project.section8_eligible)
    : projects;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto">
              Explore our completed renovations and ongoing projects. Each home represents lives improved and communities strengthened.
            </p>

            {/* Section 8 Filter */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <span className="text-slate-200">Show all projects</span>
              <button
                onClick={() => setShowSection8Only(!showSection8Only)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 ${
                  showSection8Only ? 'bg-brand-teal' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showSection8Only ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-brand-teal font-medium">
                {showSection8Only ? 'Showing Section 8 eligible only' : 'Section 8 eligible projects available'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div>
              <div className="flex justify-between items-center mb-8">
                <div className="h-6 bg-slate-200 rounded w-32 animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-card overflow-hidden animate-pulse">
                    <div className="h-48 bg-slate-200"></div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-200 rounded w-full"></div>
                          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                          <div className="h-6 bg-slate-200 rounded w-20"></div>
                          <div className="h-8 bg-slate-200 rounded w-24"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-slate-600">{error}</p>
              <button
                onClick={refetch}
                className="mt-4 bg-brand-navy text-white px-6 py-2 rounded-lg hover:bg-brand-navy/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-slate-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                {showSection8Only ? 'No Section 8 eligible projects found' : 'No projects available'}
              </h3>
              <p className="text-slate-500 mb-6">
                {showSection8Only
                  ? 'Try showing all projects or check back later for new Section 8 eligible properties.'
                  : 'Check back later for upcoming projects.'
                }
              </p>
              {showSection8Only && (
                <button
                  onClick={() => setShowSection8Only(false)}
                  className="bg-brand-teal text-white px-6 py-2 rounded-lg hover:bg-brand-teal/90 transition-colors"
                >
                  Show All Projects
                </button>
              )}
            </div>
          ) : (
            <>
              {/* View Toggle and Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-brand-navy">
                    {showSection8Only ? 'Section 8 Eligible Projects' : 'All Projects'}
                    <span className="text-sm font-normal text-slate-600 ml-2">
                      ({filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'})
                    </span>
                  </h2>
                </div>

                {/* View Toggle */}
                <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 rounded-md transition-all ${
                      viewMode === 'list'
                        ? 'bg-brand-navy text-white shadow-sm'
                        : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
                    }`}
                  >
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    List
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-4 py-2 rounded-md transition-all ${
                      viewMode === 'map'
                        ? 'bg-brand-navy text-white shadow-sm'
                        : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
                    }`}
                  >
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Map
                  </button>
                </div>
              </div>

              {/* Projects View */}
              {viewMode === 'list' ? (
                /* Projects Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                /* Projects Map */
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                  <PropertyMap
                    projects={filteredProjects}
                    selectedProjectId={selectedProjectId}
                    onProjectClick={(project) => {
                      setSelectedProjectId(project.id);
                      // Scroll to project in list view or show modal/details
                      setViewMode('list');
                    }}
                  />
                </div>
              )}

              {/* Section 8 Info Notice */}
              {showSection8Only && filteredProjects.length > 0 && (
                <div className="mt-12 bg-brand-teal/10 border border-brand-teal/20 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-8 h-8 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-brand-navy mb-2">Section 8 Eligible Projects</h3>
                      <p className="text-slate-700 mb-3">
                        These properties are certified for Section 8 voucher programs. Veterans and other qualified applicants
                        can use Housing Choice (Section 8) vouchers to help with rent payments.
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <a href="/get-started" className="text-brand-teal hover:text-brand-teal/80 font-medium">
                          Get Started →
                        </a>
                        <a href="/resources/section8" className="text-brand-navy hover:text-brand-navy/80 font-medium">
                          Learn About Section 8 →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-brand-red text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Have a Property to Contribute?</h2>
          <p className="text-xl mb-8">
            Join our mission to provide quality housing for veterans. We'll evaluate your property
            and provide a fair cash offer.
          </p>
          <a
            href="/get-started"
            className="inline-block bg-white text-brand-red hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Get a Cash Offer Today
          </a>
        </div>
      </section>
    </main>
  );
}
