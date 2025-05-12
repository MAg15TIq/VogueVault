import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Frequently Asked Questions - VogueVaults',
  description: 'Find answers to common questions about VogueVaults, our content, and services.',
};

export default function FAQPage() {
  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'FAQ', href: '/faq' }
  ];

  // FAQ categories and questions
  const faqCategories = [
    {
      title: 'General',
      questions: [
        {
          question: 'What is VogueVaults?',
          answer: 'VogueVaults is a premier online destination for fashion, beauty, lifestyle, and culture content. We provide well-researched articles, guides, and insights to help our readers stay informed about the latest trends and developments in these areas.'
        },
        {
          question: 'Who is behind VogueVaults?',
          answer: 'VogueVaults was founded by Malik Mohsin Saleem Khan, who serves as the founder and content director. You can learn more about our team on our <a href="/about" class="text-primary hover:underline">About Us</a> page.'
        },
        {
          question: 'How often is new content published?',
          answer: 'We publish new content regularly across all our categories. Our goal is to provide fresh, relevant content that keeps our readers informed and engaged. You can subscribe to our newsletter to stay updated on our latest articles.'
        },
        {
          question: 'Is VogueVaults available in languages other than English?',
          answer: 'Currently, VogueVaults is only available in English. We may consider expanding to other languages in the future based on reader demand and resource availability.'
        },
        {
          question: 'How can I stay updated with new content?',
          answer: 'You can subscribe to our newsletter, follow us on social media, or simply visit our website regularly to see our latest articles and updates.'
        }
      ]
    },
    {
      title: 'Content & Categories',
      questions: [
        {
          question: 'What types of content does VogueVaults offer?',
          answer: 'VogueVaults offers a variety of content including in-depth articles, guides, trend analyses, product reviews, and cultural insights across our four main categories: Fashion, Beauty, Lifestyle, and Culture.'
        },
        {
          question: 'How do I navigate between different categories?',
          answer: 'You can navigate between categories using the main navigation menu at the top of the website. Each category has its own dedicated section with relevant articles and content.'
        },
        {
          question: 'Are the articles fact-checked?',
          answer: 'Yes, we strive for accuracy in all our content. Our articles are researched thoroughly and reviewed before publication to ensure the information provided is accurate and reliable.'
        },
        {
          question: 'Can I suggest topics for future articles?',
          answer: 'Absolutely! We welcome suggestions from our readers. You can send your ideas through our <a href="/contact" class="text-primary hover:underline">Contact Page</a>.'
        },
        {
          question: 'How do I search for specific topics?',
          answer: 'You can use the search function in the header of our website to find articles on specific topics or keywords of interest.'
        }
      ]
    },
    {
      title: 'Account & Subscription',
      questions: [
        {
          question: 'Do I need an account to read articles on VogueVaults?',
          answer: 'No, all our articles are freely accessible without requiring an account. However, creating an account allows you to save favorite articles, receive personalized recommendations, and participate in our community features.'
        },
        {
          question: 'How do I subscribe to the newsletter?',
          answer: 'You can subscribe to our newsletter by entering your email address in the newsletter subscription box found at the bottom of our homepage or in the footer of any page.'
        },
        {
          question: 'How often will I receive newsletter emails?',
          answer: 'Our newsletter is typically sent out weekly, featuring our latest articles and updates. We respect your inbox and will never spam you.'
        },
        {
          question: 'How can I unsubscribe from the newsletter?',
          answer: 'You can unsubscribe at any time by clicking the "Unsubscribe" link at the bottom of any newsletter email we send.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we take data privacy seriously. Your personal information is handled according to our <a href="/privacy-policy" class="text-primary hover:underline">Privacy Policy</a>, which outlines how we collect, use, and protect your data.'
        }
      ]
    },
    {
      title: 'Technical & Accessibility',
      questions: [
        {
          question: 'Is VogueVaults mobile-friendly?',
          answer: 'Yes, VogueVaults is fully responsive and optimized for viewing on all devices, including smartphones, tablets, and desktop computers.'
        },
        {
          question: 'What browsers are supported?',
          answer: 'VogueVaults supports all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to the latest version for the best experience.'
        },
        {
          question: 'How do I enable dark mode?',
          answer: 'You can toggle between light and dark mode by clicking the sun/moon icon in the top right corner of the website.'
        },
        {
          question: 'The website is not loading properly. What should I do?',
          answer: 'If you\'re experiencing technical issues, try clearing your browser cache, updating your browser, or disabling extensions that might interfere with the website. If problems persist, please contact us through our <a href="/contact" class="text-primary hover:underline">Contact Page</a>.'
        },
        {
          question: 'Is VogueVaults accessible to users with disabilities?',
          answer: 'We strive to make VogueVaults accessible to all users. We implement accessibility best practices and continuously work to improve the experience for users with disabilities.'
        }
      ]
    },
    {
      title: 'Business & Collaboration',
      questions: [
        {
          question: 'How can I advertise on VogueVaults?',
          answer: 'For advertising inquiries, please contact us at mohsinsaleen336@gmail.com with details about your brand and advertising goals.'
        },
        {
          question: 'Does VogueVaults accept guest posts or contributions?',
          answer: 'Currently, all content on VogueVaults is created by our in-house team. We\'re not accepting guest contributions at this time.'
        },
        {
          question: 'Can I republish or reference VogueVaults content?',
          answer: 'You may reference and link to our content, but republishing full articles requires explicit permission. Please review our <a href="/terms-of-service" class="text-primary hover:underline">Terms of Service</a> for more details on content usage.'
        },
        {
          question: 'How can I report copyright infringement?',
          answer: 'If you believe your copyrighted work has been used on VogueVaults without permission, please contact us with details at info@voguevaults.com.'
        },
        {
          question: 'Does VogueVaults offer affiliate programs?',
          answer: 'We may include affiliate links in some of our content. If you\'re interested in affiliate partnership opportunities, please contact us for more information.'
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Find answers to common questions about VogueVaults, our content, and services.
        </p>
      </div>

      {/* FAQ Categories Navigation */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {faqCategories.map((category, index) => (
            <a
              key={index}
              href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm font-medium transition-colors"
            >
              {category.title}
            </a>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto space-y-12 mb-16">
        {faqCategories.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            id={category.title.toLowerCase().replace(/\s+/g, '-')}
            className="scroll-mt-20"
          >
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{category.title}</h2>
            <div className="space-y-6">
              {category.questions.map((faq, faqIndex) => (
                <div
                  key={faqIndex}
                  className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6"
                >
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <div
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Still Have Questions Section */}
      <div className="max-w-4xl mx-auto bg-muted/30 rounded-xl p-8 text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          If you couldn't find the answer you were looking for, feel free to reach out to us directly. We're here to help!
        </p>
        <Link href="/contact">
          <Button size="lg">
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  );
}
