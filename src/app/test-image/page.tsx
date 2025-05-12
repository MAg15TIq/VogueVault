import Image from 'next/image';

export default function TestImagePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Test Image Page</h1>
      <p className="mb-4">This is a simple test page to check if images are loading correctly.</p>
      
      <div className="relative w-full h-[400px] mb-4">
        <Image
          src="/images/articles/fashion/capsule-wardrobe.jpg"
          alt="Capsule Wardrobe"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      
      <div className="relative w-full h-[400px]">
        <Image
          src="/images/team/malik-mohsin.jpg"
          alt="Malik Mohsin"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </div>
  );
}
