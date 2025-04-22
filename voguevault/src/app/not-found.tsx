import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href="/" 
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors font-medium"
        >
          Return Home
        </Link>
        <Link 
          href="/search" 
          className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-md transition-colors font-medium"
        >
          Search Articles
        </Link>
      </div>
    </div>
  );
}
