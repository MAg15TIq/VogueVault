/**
 * Article content generation utilities
 *
 * This file contains utility functions to help generate structured article content
 * following the SEO-friendly template format.
 */

export interface ArticleSection {
  id: string;
  title: string;
  content: string;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface ArticleStructure {
  introduction: string;
  background: ArticleSection;
  mainPoints: ArticleSection[];
  practicalApplication: ArticleSection;
  futureTrends?: ArticleSection;
  conclusion: string;
  faqs?: ArticleFAQ[];
}

/**
 * Generates structured article content in HTML format based on the provided article structure
 *
 * @param structure The article structure containing all sections
 * @returns HTML string of the formatted article content
 */
export function generateArticleContent(structure: ArticleStructure): string {
  let content = '';

  // Introduction
  content += `<section id="introduction">\n${structure.introduction}\n</section>\n\n`;

  // Background/Context
  content += `<section id="section-1">\n<h2>${structure.background.title}</h2>\n${structure.background.content}\n</section>\n\n`;

  // Main Points
  structure.mainPoints.forEach((point, index) => {
    content += `<section id="section-${index + 2}">\n<h2>${point.title}</h2>\n${point.content}\n</section>\n\n`;
  });

  // Practical Application
  content += `<section id="section-${structure.mainPoints.length + 2}">\n<h2>${structure.practicalApplication.title}</h2>\n${structure.practicalApplication.content}\n</section>\n\n`;

  // Future Trends (Optional)
  if (structure.futureTrends) {
    content += `<section id="section-${structure.mainPoints.length + 3}">\n<h2>${structure.futureTrends.title}</h2>\n${structure.futureTrends.content}\n</section>\n\n`;
  }

  // Conclusion
  content += `<section id="conclusion">\n<h2>Conclusion</h2>\n${structure.conclusion}\n</section>\n\n`;

  // FAQs (Optional)
  if (structure.faqs && structure.faqs.length > 0) {
    content += `<section id="faq">\n<h2>Frequently Asked Questions</h2>\n<div class="space-y-4">\n`;

    structure.faqs.forEach(faq => {
      content += `<div>\n<h3>${faq.question}</h3>\n<p>${faq.answer}</p>\n</div>\n`;
    });

    content += `</div>\n</section>`;
  }

  return content;
}

/**
 * Creates a sample article structure that can be used as a starting point
 *
 * @param title The article title
 * @returns A sample article structure
 */
export function createSampleArticleStructure(title: string): ArticleStructure {
  return {
    introduction: `<p>Introduction to ${title}. This should be 150-200 words that hook the reader with an engaging opening statement, clearly state what the article will cover, and briefly outline the key points.</p>`,

    background: {
      id: 'background',
      title: 'Background and Context',
      content: `<p>This section provides essential background information on ${title}. It should establish your credibility and expertise, include relevant statistics or historical context, and incorporate secondary keywords naturally.</p>
<p>Use 2-3 shorter paragraphs rather than one long block of text to improve readability.</p>`
    },

    mainPoints: [
      {
        id: 'main-point-1',
        title: 'First Key Aspect of the Topic',
        content: `<p>This section presents your first major point or argument about ${title}. Support with evidence, examples, or case studies.</p>
<p>Include at least one external link to an authoritative source and consider adding a relevant quote from an expert.</p>
<ul>
  <li>Supporting point 1</li>
  <li>Supporting point 2</li>
  <li>Supporting point 3</li>
</ul>`
      },
      {
        id: 'main-point-2',
        title: 'Second Key Aspect of the Topic',
        content: `<p>This section presents your second major point or argument about ${title}. Support with different types of evidence than the previous section.</p>
<p>Include relevant statistics or data to strengthen your argument.</p>
<blockquote>
  Expert quote or highlighted text goes here.
</blockquote>
<p>Break content into scannable paragraphs (3-4 sentences each).</p>`
      },
      {
        id: 'main-point-3',
        title: 'Third Key Aspect of the Topic',
        content: `<p>This section presents your third major point or argument about ${title}. Support with compelling evidence.</p>
<p>Address potential counterarguments or limitations to show a balanced perspective.</p>
<p>Include an internal link to related content on your site and use formatting (bold, italics) to emphasize key points.</p>`
      }
    ],

    practicalApplication: {
      id: 'practical-application',
      title: 'Practical Application and Tips',
      content: `<p>This section provides actionable advice, steps, or strategies related to ${title}.</p>
<ol>
  <li><strong>Step 1:</strong> Description of the first step or tip</li>
  <li><strong>Step 2:</strong> Description of the second step or tip</li>
  <li><strong>Step 3:</strong> Description of the third step or tip</li>
</ol>
<p>Make sure all advice is concrete and implementable by your readers.</p>`
    },

    futureTrends: {
      id: 'future-trends',
      title: 'Future Trends and Considerations',
      content: `<p>This section discusses emerging trends or future developments related to ${title}.</p>
<p>Mention potential changes or evolutions in the field and include forward-looking statements that demonstrate expertise.</p>
<p>Keep this section concise but insightful to provide additional value to readers.</p>`
    },

    conclusion: `<p>This conclusion summarizes the main points about ${title} without simply repeating them. It reinforces the key takeaway or main message and ends with a thought-provoking statement or call-to-action.</p>
<p>Remember to avoid introducing new information in the conclusion.</p>`,

    faqs: [
      {
        question: `What are the most important aspects of ${title} to understand?`,
        answer: 'Answer to the first frequently asked question. Keep this concise (2-3 sentences).'
      },
      {
        question: `How can beginners get started with ${title}?`,
        answer: 'Answer to the second frequently asked question. Keep this concise (2-3 sentences).'
      },
      {
        question: `What common misconceptions exist about ${title}?`,
        answer: 'Answer to the third frequently asked question. Keep this concise (2-3 sentences).'
      }
    ]
  };
}

/**
 * Generates SEO metadata for an article
 *
 * @param title Article title
 * @param excerpt Article excerpt/description
 * @param tags Article tags
 * @returns Object containing title, description, and keywords
 */
export function generateArticleMetadata(title: string, excerpt: string, tags: string[]) {
  return {
    title: `${title} - VogueVaults`,
    description: excerpt,
    keywords: tags.join(', ')
  };
}
