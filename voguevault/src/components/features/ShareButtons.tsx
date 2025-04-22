'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'minimal';
  platforms?: ('twitter' | 'facebook' | 'linkedin' | 'pinterest' | 'whatsapp' | 'email' | 'copy')[];
}

const ShareButtons = ({
  url,
  title,
  description = '',
  image = '',
  className = '',
  showLabel = true,
  size = 'md',
  variant = 'default',
  platforms = ['twitter', 'facebook', 'linkedin', 'pinterest', 'whatsapp', 'email', 'copy'],
}: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Use the current URL if none is provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  
  // Prepare share URLs for different platforms
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(title)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + shareUrl)}`,
  };

  // Handle share action
  const handleShare = (platform: string) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setShowTooltip(true);
        setTimeout(() => {
          setCopied(false);
          setShowTooltip(false);
        }, 2000);
      });
    } else if (platform in shareLinks) {
      window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'noopener,noreferrer');
    }
  };

  // Determine icon size based on the size prop
  const iconSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }[size];

  // Determine button styles based on variant
  let buttonStyles = '';
  
  switch (variant) {
    case 'outline':
      buttonStyles = 'border border-neutral-200 dark:border-neutral-700 hover:border-primary hover:text-primary';
      break;
    case 'minimal':
      buttonStyles = 'hover:text-primary';
      break;
    default: // 'default'
      buttonStyles = 'hover:bg-neutral-100 dark:hover:bg-neutral-800';
  }

  // Platform-specific colors
  const platformColors = {
    twitter: 'hover:text-[#1DA1F2]',
    facebook: 'hover:text-[#4267B2]',
    linkedin: 'hover:text-[#0077B5]',
    pinterest: 'hover:text-[#E60023]',
    whatsapp: 'hover:text-[#25D366]',
    email: 'hover:text-[#EA4335]',
    copy: 'hover:text-primary',
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {showLabel && <span className="text-neutral-600 dark:text-neutral-400 mr-2">Share:</span>}
      
      {platforms.includes('twitter') && (
        <button
          onClick={() => handleShare('twitter')}
          className={`rounded-full p-2 transition-colors ${buttonStyles} ${platformColors.twitter}`}
          aria-label="Share on Twitter"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        </button>
      )}
      
      {platforms.includes('facebook') && (
        <button
          onClick={() => handleShare('facebook')}
          className={`rounded-full p-2 transition-colors ${buttonStyles} ${platformColors.facebook}`}
          aria-label="Share on Facebook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        </button>
      )}
      
      {platforms.includes('linkedin') && (
        <button
          onClick={() => handleShare('linkedin')}
          className={`rounded-full p-2 transition-colors ${buttonStyles} ${platformColors.linkedin}`}
          aria-label="Share on LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
          </svg>
        </button>
      )}
      
      {platforms.includes('pinterest') && image && (
        <button
          onClick={() => handleShare('pinterest')}
          className={`rounded-full p-2 transition-colors ${buttonStyles} ${platformColors.pinterest}`}
          aria-label="Share on Pinterest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
          </svg>
        </button>
      )}
      
      {platforms.includes('whatsapp') && (
        <button
          onClick={() => handleShare('whatsapp')}
          className={`rounded-full p-2 transition-colors ${buttonStyles} ${platformColors.whatsapp}`}
          aria-label="Share on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </button>
      )}
      
      {platforms.includes('email') && (
        <button
          onClick={() => handleShare('email')}
          className={`rounded-full p-2 transition-colors ${buttonStyles} ${platformColors.email}`}
          aria-label="Share via Email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
      )}
      
      {platforms.includes('copy') && (
        <div className="relative">
          <button
            onClick={() => handleShare('copy')}
            className={`rounded-full p-2 transition-colors ${buttonStyles} ${platformColors.copy}`}
            aria-label="Copy Link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded whitespace-nowrap">
              {copied ? 'Copied!' : 'Copy Link'}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-neutral-800"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShareButtons;
