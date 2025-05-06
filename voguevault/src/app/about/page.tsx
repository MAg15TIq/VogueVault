import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SocialProof from '@/components/features/SocialProof';

export const metadata = {
  title: 'About Us - VogueVault',
  description: 'Learn about VogueVault, our mission, and the team behind your favorite fashion and lifestyle magazine.',
};

export default function AboutPage() {
  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About VogueVault</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
          Your premier destination for fashion trends, lifestyle tips, and cultural insights.
        </p>
      </div>

      {/* Our Story Section */}
      <section className="mb-16">
        <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              VogueVault was founded in 2024 with a simple mission: to provide thoughtful, well-researched content on fashion, lifestyle, beauty, and culture. In a world of fast content and clickbait headlines, we wanted to create a space where readers could find articles with substance and style.
            </p>
            <p>
              Founded by Malik Mohsin Saleem Khan, VogueVault brings a unique perspective and expertise to every piece we publish. We believe that fashion and lifestyle content can be both accessible and intelligent, practical and inspiring.
            </p>
            <p>
              What sets VogueVault apart is our commitment to quality over quantity. Rather than churning out dozens of articles daily, we focus on creating fewer, more meaningful pieces that our readers can truly benefit from.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Content</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              We prioritize well-researched, thoughtfully written articles that provide real value to our readers.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Authenticity</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              We believe in being genuine and transparent in our content, recommendations, and relationships with our audience.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              We're constantly exploring new ideas, trends, and perspectives to keep our content fresh and forward-thinking.
            </p>
          </div>
        </div>
      </section>

      {/* Reader Testimonials Section */}
      <section className="mb-16">
        <SocialProof
          title="What Our Readers Say About Us"
          description="Don't just take our word for it. Here's what our community has to say about VogueVault."
        />
      </section>

      {/* Meet the Author Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet the Author</h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="relative md:w-1/3 h-64 md:h-auto">
                <Image
                  src="/images/team/malik-mohsin.jpg"
                  alt="Malik Mohsin Saleem Khan - Author"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <h3 className="text-2xl font-bold">Malik Mohsin Saleem Khan</h3>
                <p className="text-primary mb-4">Founder & Author</p>
                <div className="prose prose-lg dark:prose-invert">
                  <p>
                    Malik Mohsin Saleem Khan is the creative force behind VogueVault, bringing his passion for fashion, lifestyle, beauty, and culture to every article on the site. With a keen eye for trends and a commitment to thoughtful, well-researched content, Malik has created a unique voice in the digital publishing landscape.
                  </p>
                  <p>
                    His approach combines in-depth research with accessible writing, making complex topics engaging and relevant to readers from all backgrounds. Malik's work spans across all VogueVault categories, offering expert insights on everything from sustainable fashion practices to mindful living techniques.
                  </p>
                  <p>
                    When not writing for VogueVault, Malik enjoys traveling to gather new perspectives, experimenting with photography, and exploring the intersection of traditional and contemporary cultural expressions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
          Have questions, feedback, or just want to say hello? We'd love to hear from you!
        </p>
        <Link
          href="/contact"
          className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md transition-colors font-medium inline-block"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
