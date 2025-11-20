import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-32 h-32 mx-auto mb-8 relative">
          <div className="w-32 h-32 bg-gradient-to-br from-brand-teal to-brand-olive rounded-full flex items-center justify-center">
            <span className="text-4xl text-white font-bold">404</span>
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-xl">🏠</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-brand-navy mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track to find the perfect veteran housing solution.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full bg-brand-navy hover:bg-brand-navy/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            ← Back to Home
          </Link>

          <div className="text-sm text-gray-500">
            Or explore our{' '}
            <Link href="/projects" className="text-brand-teal hover:text-brand-teal/80 font-medium">
              projects
            </Link>{' '}
            or{' '}
            <Link href="/resources" className="text-brand-teal hover:text-brand-teal/80 font-medium">
              resources
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
