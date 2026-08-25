import { Category } from '@funbytes/types';

export interface TopicDefinition {
  id: Category | 'all';
  name: string;
  icon: string;
  color: string;
  description: string;
  subInterests: string[];
}

export const TOPIC_CATEGORIES: TopicDefinition[] = [
  {
    id: 'all',
    name: 'For You',
    icon: '⚡',
    color: '#6366F1',
    description: 'Personalized stream tailored to all your chosen interests',
    subInterests: ['Trending', 'Breaking', 'Latest'],
  },
  {
    id: 'developers',
    name: 'Developers',
    icon: '💻',
    color: '#00F5D4',
    description: 'Programming, architectures, frameworks, open-source & engineering',
    subInterests: [
      'React Native',
      'TypeScript',
      'Rust',
      'Golang',
      'PostgreSQL',
      'DevOps',
      'Docker',
      'System Design',
      'Microservices',
    ],
  },
  {
    id: 'technology',
    name: 'Technology & AI',
    icon: '🤖',
    color: '#8B5CF6',
    description: 'Generative AI, robotics, quantum processors, and consumer gadgets',
    subInterests: ['AI', 'Quantum', 'Batteries', 'Cybersecurity', 'Robotics', 'Gadgets', 'AR/VR'],
  },
  {
    id: 'memes',
    name: 'Dev Memes',
    icon: '😂',
    color: '#F72585',
    description: 'Hilarious programming humor, Friday deployments, and developer chaos',
    subInterests: ['DevHumor', 'CSS Memes', 'Git Chaos', 'Production Bugs', 'Stack Overflow'],
  },
  {
    id: 'cartoons',
    name: 'Political Cartoons',
    icon: '🎨',
    color: '#FFB703',
    description: 'Sharp editorial political satire, world affairs, and artwork',
    subInterests: ['Editorial Satire', 'Global Affairs', 'Economy Cartoons', 'Culture'],
  },
  {
    id: 'politics',
    name: 'News & Politics',
    icon: '🏛️',
    color: '#0284C7',
    description: 'Indian policy, Digital Public Infrastructure, governance, and economy',
    subInterests: ['India', 'PIB', 'DPI', 'Semiconductor', 'Renewables', 'Elections'],
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '🏏',
    color: '#10B981',
    description: 'Cricket thrillers, Champions League, Formula 1, and Olympic milestones',
    subInterests: ['Cricket', 'Football', 'Formula 1', 'IPL', 'Olympics'],
  },
  {
    id: 'bollywood',
    name: 'Entertainment',
    icon: '🎬',
    color: '#EC4899',
    description: 'Cinema spectacles, OTT binge guides, Indie music, and box office records',
    subInterests: ['Cinema', 'OTT Binge', 'Indie Folk', 'Box Office', 'Cannes'],
  },
  {
    id: 'international',
    name: 'International',
    icon: '🌎',
    color: '#3B82F6',
    description: 'World events, space exploration, and global diplomacy from BBC & Al Jazeera',
    subInterests: ['Space', 'Climate', 'Trade', 'JWST Exoplanets', 'Global Finance'],
  },
];

