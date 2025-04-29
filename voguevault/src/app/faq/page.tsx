import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata = {
  title: 'Frequently Asked Questions - VogueVault',
  description: 'Find answers to common questions about VogueVault, our content, and services.',
};

export default function FAQPage() {
  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'FAQ', href: '/faq' }
  ];

  // FAQ data organized by categories
  const faqCategories = [
    {
      title: 'About VogueVault',
      questions: [
        {
          question: 'What is VogueVault?',
          answer: 'VogueVault is a premier online destination for fashion trends, lifestyle tips, beauty advice, and cultural insights. We provide thoughtfully curated content to help our readers stay informed and inspired.'
        },
        {
          question: 'Who creates the content on VogueVault?',
          answer: 'Our content is created by a team of experienced writers and editors with diverse backgrounds in fashion, lifestyle, beauty, and culture. Each contributor brings their unique expertise and perspective to provide you with high-quality, well-researched articles.'
        },
        {
          question: 'How often is new content published?',
          answer: 'We publish new articles regularly across all our categories. We focus on quality over quantity, ensuring each piece provides valuable insights and information. Subscribe to our newsletter to be notified when new content is published.'
        }
      ]
    },
    {
      title: 'Content & Categories',
      questions: [
        {
          question: 'What categories of content do you offer?',
          answer: 'VogueVault currently offers content across four main categories: Fashion, Lifestyle, Beauty, and Culture. Each category covers a wide range of topics to provide comprehensive insights and inspiration.'
        },
        {
          question: 'Can I suggest a topic for an article?',
          answer: 'Absolutely! We welcome suggestions from our readers. Please use our Contact page to submit your ideas, and our editorial team will review them. While we can\'t guarantee that every suggestion will be published, we value your input.'
        },
        {
          question: 'Do you accept guest contributions?',
          answer: 'We occasionally accept guest contributions from experts in our core content areas. If you\'re interested in contributing, please reach out through our Contact page with your credentials and article proposal.'
        }
      ]
    },
    {
      title: 'Account & Features',
      questions: [
        {
          question: 'Do I need an account to read articles?',
          answer: 'No, all our articles are freely accessible without requiring an account. However, creating an account allows you to bookmark articles, receive personalized recommendations, and participate in our community features.'
        },
        {
          question: 'How do I save articles to read later?',
          answer: 'You can save articles to read later by clicking the bookmark icon on any article. Your bookmarked articles will be saved in your account and can be accessed from the Bookmarks page.'
        },
        {
          question: 'Can I share articles on social media?',
          answer: 'Yes! Each article has social sharing buttons that allow you to easily share content on platforms like Facebook, Twitter, Pinterest, and via email. We encourage sharing articles you find valuable with your network.'
        }
      ]
    },
    {
      title: 'Technical Support',
      questions: [
        {
          question: 'The website isn\'t displaying correctly. What should I do?',
          answer: 'If you\'re experiencing display issues, try clearing your browser cache and cookies, or try accessing the site from a different browser. If problems persist, please contact us with details about your device, browser, and the specific issues you\'re encountering.'
        },
        {
          question: 'How do I subscribe to or unsubscribe from the newsletter?',
          answer: 'You can subscribe to our newsletter using the form in the footer of our website. To unsubscribe, simply click the "Unsubscribe" link at the bottom of any newsletter email you receive from us.'
        },
        {
          question: 'Is the website mobile-friendly?',
          answer: 'Yes, VogueVault is fully responsive and optimized for all devices, including smartphones and tablets. You can enjoy our content on any screen size with the same high-quality experience.'
        }
      ]
    },
    {
      title: 'Privacy & Terms',
      questions: [
        {
          question: 'How is my personal information handled?',
          answer: 'We take your privacy seriously. All personal information is handled according to our Privacy Policy, which outlines how we collect, use, and protect your data. We never sell your personal information to third parties.'
        },
        {
          question: 'Do you use cookies on the website?',
          answer: 'Yes, we use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings. For more information, please refer to our Privacy Policy.'
        },
        {
          question: 'What are the terms of using VogueVault content?',
          answer: 'All content on VogueVault is protected by copyright. While you may share links to our articles, reproduction or distribution of our content without permission is prohibited. For full details, please review our Terms of Service.'
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
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
          Find answers to common questions about VogueVault, our content, and services.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="mb-12 bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Jump to a Section</h2>
        <div className="flex flex-wrap gap-3">
          {faqCategories.map((category, index) => (
            <a 
              key={index} 
              href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-neutral-100 dark:bg-neutral-700 hover:bg-primary hover:text-white dark:hover:bg-primary px-4 py-2 rounded-full text-sm transition-colors"
            >
              {category.title}
            </a>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="space-y-12 max-w-4xl mx-auto">
        {faqCategories.map((category, categoryIndex) => (
          <div 
            key={categoryIndex} 
            id={category.title.toLowerCase().replace(/\s+/g, '-')}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-700">
              {category.title}
            </h2>
            <div className="space-y-6">
              {category.questions.map((item, itemIndex) => (
                <div 
                  key={itemIndex} 
                  className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md"
                >
                  <h3 className="text-xl font-bold mb-3">{item.question}</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-16 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-2xl mx-auto">
          If you couldn't find the answer to your question, feel free to reach out to our team.
        </p>
        <Link
          href="/contact"
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors font-medium inline-block"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
