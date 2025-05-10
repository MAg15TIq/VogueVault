// Sample article data structure
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'fashion' | 'beauty' | 'lifestyle' | 'culture';
  image: string;
  author: {
    name: string;
    image: string;
    role: string;
    email: string;
  };
  date: string;
  readTime: number;
  tags: string[];
}

// Default author information
const defaultAuthor = {
  name: 'Malik Mohsin Saleem Khan',
  image: '/images/team/malik-mohsin.jpg',
  role: 'Founder',
  email: 'mohsinsaleen336@gmail.com'
};

// Sample articles data
export const articlesData: Article[] = [
  {
    id: 'fashion-trends-2023',
    title: 'Fashion Trends to Watch in 2023',
    slug: 'fashion-trends-2023',
    excerpt: 'Discover the hottest fashion trends that will dominate the industry in 2023.',
    content: 'Full article content goes here...',
    category: 'fashion',
    image: 'https://i.imgur.com/example1.jpg',
    author: defaultAuthor,
    date: '2023-01-15',
    readTime: 5,
    tags: ['fashion', 'trends', '2023']
  },
  {
    id: 'skincare-routine',
    title: 'Essential Skincare Routine for All Skin Types',
    slug: 'essential-skincare-routine',
    excerpt: 'Learn the fundamentals of a good skincare routine that works for all skin types.',
    content: 'Full article content goes here...',
    category: 'beauty',
    image: 'https://i.imgur.com/example2.jpg',
    author: defaultAuthor,
    date: '2023-02-10',
    readTime: 7,
    tags: ['beauty', 'skincare', 'routine']
  },
  {
    id: 'mindfulness-practice',
    title: 'Incorporating Mindfulness into Your Daily Routine',
    slug: 'mindfulness-daily-routine',
    excerpt: 'Simple ways to practice mindfulness and improve your mental well-being every day.',
    content: 'Full article content goes here...',
    category: 'lifestyle',
    image: 'https://i.imgur.com/example3.jpg',
    author: defaultAuthor,
    date: '2023-03-05',
    readTime: 6,
    tags: ['lifestyle', 'mindfulness', 'wellness']
  },
  {
    id: 'art-exhibitions-2023',
    title: 'Must-Visit Art Exhibitions Around the World in 2023',
    slug: 'art-exhibitions-2023',
    excerpt: 'A curated list of the most anticipated art exhibitions happening globally this year.',
    content: 'Full article content goes here...',
    category: 'culture',
    image: 'https://i.imgur.com/example4.jpg',
    author: defaultAuthor,
    date: '2023-04-20',
    readTime: 8,
    tags: ['culture', 'art', 'exhibitions']
  }
];
