export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Welcome to <span className="text-accent">VogueVault</span>
        </h1>
        <p className="text-xl mb-8">
          Your destination for fashion, beauty, lifestyle, and culture.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
          <CategoryCard title="Fashion" />
          <CategoryCard title="Beauty" />
          <CategoryCard title="Lifestyle" />
          <CategoryCard title="Culture" />
        </div>
      </main>
    </div>
  );
}

function CategoryCard({ title }: { title: string }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Explore our {title.toLowerCase()} articles and stay updated with the latest trends.
      </p>
    </div>
  );
}
