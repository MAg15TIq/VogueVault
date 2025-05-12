export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-primary animate-spin"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-primary/30"></div>
        </div>
        <h2 className="text-xl font-medium mt-8 animate-pulse">Loading content...</h2>
      </div>
    </div>
  );
}
