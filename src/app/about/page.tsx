import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'About Us - VogueVaults',
  description: 'Learn about VogueVaults - Your premier destination for fashion trends, lifestyle tips, beauty advice, and cultural insights.',
};

export default function AboutPage() {
  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About VogueVaults</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
          Your premier destination for fashion trends, lifestyle tips, beauty advice, and cultural insights.
        </p>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8 mb-12">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p>
            At VogueVaults, we're dedicated to providing insightful, well-researched content that empowers our readers to make informed decisions about fashion, beauty, lifestyle, and culture. We believe in the transformative power of quality content that educates, inspires, and entertains.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">Our Vision</h2>
          <p>
            To be the most trusted and comprehensive resource for fashion enthusiasts, beauty aficionados, lifestyle seekers, and culture lovers worldwide. We aim to create a community where readers can discover the latest trends, gain valuable insights, and connect with like-minded individuals who share their passions.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p>We are committed to delivering thoroughly researched, well-written content that provides genuine value to our readers.</p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p>We maintain the highest standards of honesty and transparency in all our content and business practices.</p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
              <p>We celebrate diversity and create content that resonates with people from all backgrounds and walks of life.</p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p>We continuously evolve our content and platform to stay ahead of trends and meet the changing needs of our audience.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3">
            <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src="/images/team/malik-mohsin.jpg"
                alt="Malik Mohsin Saleem Khan"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Meet the Founder</h2>
            <h3 className="text-xl font-semibold mb-2">Malik Mohsin Saleem Khan</h3>
            <p className="text-muted-foreground mb-4">Founder & Content Director</p>
            <div className="prose dark:prose-invert">
              <p>
                Malik Mohsin Saleem Khan is the visionary founder behind VogueVaults. With a passion for fashion, beauty, and digital media, Malik established VogueVaults to create a platform that bridges the gap between high-quality content and the modern reader's needs.
              </p>
              <p>
                His entrepreneurial journey began with a simple observation: there was a significant void in the digital landscape for comprehensive, well-researched content that covered the full spectrum of fashion, beauty, lifestyle, and culture. Drawing from his background in digital media and content creation, Malik set out to build a platform that would not only inform but also inspire.
              </p>
              <p>
                Malik's approach to content is guided by his belief in the power of quality over quantity. He personally oversees the editorial direction of VogueVaults, ensuring that each piece meets the highest standards of accuracy, relevance, and engagement. His commitment to excellence has established VogueVaults as a trusted source for readers seeking authentic insights and practical advice.
              </p>
              <p>
                Beyond his role at VogueVaults, Malik is an advocate for digital literacy and the democratization of quality content. He regularly speaks at industry events and mentors aspiring content creators, sharing his knowledge and experience to help shape the future of digital publishing.
              </p>
              <p>
                Malik holds a degree in Digital Media and Communications and continues to expand his knowledge through ongoing education in emerging technologies and content strategies. When not working on VogueVaults, he enjoys exploring global fashion scenes, attending cultural events, and experimenting with photography.
              </p>
            </div>
            <div className="mt-6">
              <Link href="mailto:mohsinsaleen336@gmail.com">
                <Button variant="outline" className="mr-4">
                  Contact Malik
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Company Timeline */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Journey</h2>
        <div className="relative border-l-2 border-primary/30 pl-8 ml-4">
          <div className="mb-12 relative">
            <div className="absolute -left-10 top-0 w-6 h-6 bg-primary rounded-full"></div>
            <h3 className="text-xl font-semibold mb-2">2023</h3>
            <p className="font-medium">VogueVaults Launch</p>
            <p className="text-muted-foreground">
              VogueVaults was founded with a mission to provide high-quality content across fashion, beauty, lifestyle, and culture categories.
            </p>
          </div>
          <div className="mb-12 relative">
            <div className="absolute -left-10 top-0 w-6 h-6 bg-primary rounded-full"></div>
            <h3 className="text-xl font-semibold mb-2">2023</h3>
            <p className="font-medium">Content Expansion</p>
            <p className="text-muted-foreground">
              Expanded our content library to cover more diverse topics and perspectives within our core categories.
            </p>
          </div>
          <div className="mb-12 relative">
            <div className="absolute -left-10 top-0 w-6 h-6 bg-primary rounded-full"></div>
            <h3 className="text-xl font-semibold mb-2">2024</h3>
            <p className="font-medium">Website Redesign</p>
            <p className="text-muted-foreground">
              Launched a comprehensive website redesign to enhance user experience and content accessibility.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -left-10 top-0 w-6 h-6 bg-primary rounded-full"></div>
            <h3 className="text-xl font-semibold mb-2">2024</h3>
            <p className="font-medium">Looking Forward</p>
            <p className="text-muted-foreground">
              Continuing to grow our platform with new features, expanded content categories, and enhanced community engagement opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Stay updated with the latest trends, articles, and insights from VogueVaults by subscribing to our newsletter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button size="lg">
              Contact Us
            </Button>
          </Link>
          <Link href="/#newsletter">
            <Button variant="outline" size="lg">
              Subscribe to Newsletter
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
