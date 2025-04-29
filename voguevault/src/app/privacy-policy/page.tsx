import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata = {
  title: 'Privacy Policy - VogueVault',
  description: 'Privacy Policy for VogueVault - Your premier destination for fashion trends, lifestyle tips, and cultural insights.',
};

export default function PrivacyPolicyPage() {
  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy', href: '/privacy-policy' }
  ];

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Last Updated: {formattedDate}
        </p>
      </div>

      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8 mb-12">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p>
            At VogueVault, we respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you about how we look after your personal data when you visit our website 
            and tell you about your privacy rights and how the law protects you.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">2. The Data We Collect About You</h2>
          <p>
            Personal data, or personal information, means any information about an individual from which that person can be identified. 
            It does not include data where the identity has been removed (anonymous data).
          </p>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, 
            time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology 
            on the devices you use to access this website.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
            <li><strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our 
            third parties and your communication preferences.</li>
          </ul>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">3. How We Use Your Personal Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights 
            do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or 
            accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, 
            agents, contractors and other third parties who have a business need to know. They will only process your personal data on our 
            instructions and they are subject to a duty of confidentiality.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">5. Cookies</h2>
          <p>
            You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. 
            If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">6. Third-Party Links</h2>
          <p>
            This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those 
            connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not 
            responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">7. Changes to the Privacy Policy</h2>
          <p>
            We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
          </p>
          <p>
            You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">8. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:{' '}
            <a href="mailto:info@voguevault.com" className="text-primary hover:underline">info@voguevault.com</a> or through our{' '}
            <Link href="/contact" className="text-primary hover:underline">Contact Page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
