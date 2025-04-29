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
              Our team of writers and editors brings diverse perspectives and expertise to every piece we publish. We believe that fashion and lifestyle content can be both accessible and intelligent, practical and inspiring.
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

      {/* Meet the Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: 'Emma Rodriguez',
              role: 'Fashion Editor',
              image: '/images/team/fashion-editor.jpg',
              bio: 'With over 10 years of experience in the fashion industry, Emma brings expert insights on the latest trends and sustainable fashion practices.'
            },
            {
              name: 'Michael Chang',
              role: 'Lifestyle Writer',
              image: '/images/team/lifestyle-writer.jpg',
              bio: 'Michael specializes in wellness, productivity, and mindful living, helping readers create balanced and fulfilling lifestyles.'
            },
            {
              name: 'Sophia Kim',
              role: 'Beauty Expert',
              image: '/images/team/beauty-expert.jpg',
              bio: 'A certified makeup artist and skincare specialist, Sophia shares evidence-based beauty advice and product recommendations.'
            },
            {
              name: 'James Wilson',
              role: 'Culture Correspondent',
              image: '/images/team/culture-correspondent.jpg',
              bio: 'James covers art, music, literature, and cultural movements with a focus on how they intersect with fashion and lifestyle.'
            }
          ].map((member) => (
            <div key={member.name} className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md text-center">
              <div className="relative h-64 w-full">
                <Image
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{member.bio}</p>
              </div>
            </div>
          ))}
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
