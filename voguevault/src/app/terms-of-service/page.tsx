import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata = {
  title: 'Terms of Service - VogueVault',
  description: 'Terms of Service for VogueVault - Your premier destination for fashion trends, lifestyle tips, and cultural insights.',
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
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using VogueVault (the "Website"), you accept and agree to be bound by the terms and provisions of this agreement. 
            If you do not agree to abide by the above, please do not use this Website.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">2. Use License</h2>
          <p>
            Permission is granted to temporarily view the materials (information or content) on VogueVault's website for personal, 
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>Attempt to decompile or reverse engineer any software contained on VogueVault's website;</li>
            <li>Remove any copyright or other proprietary notations from the materials; or</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>
          <p>
            This license shall automatically terminate if you violate any of these restrictions and may be terminated by VogueVault at any time. 
            Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials 
            in your possession whether in electronic or printed format.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">3. Disclaimer</h2>
          <p>
            The materials on VogueVault's website are provided on an 'as is' basis. VogueVault makes no warranties, expressed or implied, 
            and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, 
            fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <p>
            Further, VogueVault does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use 
            of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">4. Limitations</h2>
          <p>
            In no event shall VogueVault or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
            or due to business interruption) arising out of the use or inability to use the materials on VogueVault's website, 
            even if VogueVault or a VogueVault authorized representative has been notified orally or in writing of the possibility of such damage. 
            Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, 
            these limitations may not apply to you.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">5. Accuracy of Materials</h2>
          <p>
            The materials appearing on VogueVault's website could include technical, typographical, or photographic errors. 
            VogueVault does not warrant that any of the materials on its website are accurate, complete or current. 
            VogueVault may make changes to the materials contained on its website at any time without notice. 
            However, VogueVault does not make any commitment to update the materials.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">6. Links</h2>
          <p>
            VogueVault has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. 
            The inclusion of any link does not imply endorsement by VogueVault of the site. Use of any such linked website is at the user's own risk.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">7. Modifications</h2>
          <p>
            VogueVault may revise these terms of service for its website at any time without notice. 
            By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the 
            exclusive jurisdiction of the courts in that location.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">9. Privacy</h2>
          <p>
            Your use of VogueVault is also governed by our Privacy Policy, which is incorporated by reference into these Terms of Service.
            Please review our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> to understand our practices.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">10. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:info@voguevault.com" className="text-primary hover:underline">info@voguevault.com</a> or through our{' '}
            <Link href="/contact" className="text-primary hover:underline">Contact Page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
