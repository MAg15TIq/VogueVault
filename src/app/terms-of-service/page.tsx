import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata = {
  title: 'Terms of Service - VogueVaults',
  description: 'Terms of Service for VogueVaults - Your premier destination for fashion trends, lifestyle tips, and cultural insights.',
};

export default function TermsOfServicePage() {
  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Terms of Service', href: '/terms-of-service' }
  ];

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Last Updated: {formattedDate}
        </p>
      </div>

      {/* Terms of Service Content */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8 mb-12">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p>
            Welcome to VogueVaults. These Terms of Service ("Terms") govern your use of the VogueVaults website
            (the "Service") operated by VogueVaults ("us", "we", or "our").
          </p>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms,
            then you may not access the Service.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise stated, we own the intellectual property rights for all material on VogueVaults. All intellectual property rights are reserved.
          </p>
          <p>
            You may view and/or print pages from the website for your own personal use subject to restrictions set in these Terms.
          </p>
          <p>You must not:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Republish material from VogueVaults</li>
            <li>Sell, rent, or sub-license material from VogueVaults</li>
            <li>Reproduce, duplicate, or copy material from VogueVaults</li>
            <li>Redistribute content from VogueVaults (unless content is specifically made for redistribution)</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 mt-8">3. User Responsibilities</h2>
          <p>
            When using our Service, you agree to:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Provide accurate, current, and complete information when creating an account</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your account and password</li>
            <li>Not share your password or account access with others</li>
            <li>Notify us immediately of any unauthorized access to your account</li>
            <li>Be responsible for all activities that occur under your account</li>
            <li>Not use the Service for any illegal or unauthorized purpose</li>
            <li>Not violate any laws in your jurisdiction</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 mt-8">4. Content Usage and Restrictions</h2>
          <p>
            Our Service allows you to access content for informational and personal use. The content available through our Service,
            including text, graphics, images, and other material ("Content") is protected by copyright and other intellectual property laws.
          </p>
          <p>
            You are granted a limited, non-exclusive, non-transferable license to access and use the Content for personal,
            non-commercial purposes. This license does not include:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>The right to modify or create derivative works based on the Content</li>
            <li>The right to use the Content for commercial purposes</li>
            <li>The right to download or copy account information for the benefit of another merchant</li>
            <li>Any resale or commercial use of our Service or the Content</li>
            <li>Any collection and use of product listings, descriptions, or prices</li>
            <li>Any derivative use of the Service or Content</li>
            <li>Any downloading or copying of account information for the purposes of harassment or other unauthorized communication</li>
            <li>Any use of data mining, robots, or similar data gathering and extraction tools</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 mt-8">5. Prohibited Activities</h2>
          <p>
            In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>For any unlawful purpose</li>
            <li>To solicit others to perform or participate in any unlawful acts</li>
            <li>To violate any international, federal, provincial or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability</li>
            <li>To submit false or misleading information</li>
            <li>To upload or transmit viruses or any other type of malicious code</li>
            <li>To collect or track the personal information of others</li>
            <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
            <li>For any obscene or immoral purpose</li>
            <li>To interfere with or circumvent the security features of the Service</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 mt-8">6. Account Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and bar access to the Service immediately, without prior notice or liability,
            under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </p>
          <p>
            If you wish to terminate your account, you may simply discontinue using the Service. You may also contact us to request account deletion.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">7. Limitation of Liability</h2>
          <p>
            In no event shall VogueVaults, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use or alteration of your transmissions or content</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 mt-8">8. Disclaimer</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided
            without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability,
            fitness for a particular purpose, non-infringement or course of performance.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">9. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms
            is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">10. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least
            30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not
            agree to the new terms, you are no longer authorized to use the Service.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:{' '}
            <a href="mailto:info@voguevaults.com" className="text-primary hover:underline">info@voguevaults.com</a> or through our{' '}
            <Link href="/contact" className="text-primary hover:underline">Contact Page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
