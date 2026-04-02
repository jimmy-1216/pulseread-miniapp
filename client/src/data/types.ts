export type DomainType = 'tech' | 'finance' | 'policy' | 'commerce';
export type RegionType = 'all' | 'domestic' | 'international';
export type SentimentType = 'positive' | 'negative' | 'neutral';
export type NoiseLevelType = 'open' | 'focus' | 'major' | 'quake';
export type MemberLevel = 'free' | 'pro' | 'enterprise';

export interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  contentEn?: string;
  domain: DomainType;
  region: RegionType;
  source: string;
  publishTime: string;
  aiScore: number;
  sentiment: SentimentType;
  radarWords: string[];
  tags: string[];
  isAiTranslated: boolean;
  likeCount: number;
  collectCount: number;
  isLiked: boolean;
  isCollected: boolean;
  aiSummary: string;
  aiKeyPoints: string[];
  aiQuestions: string[];
}

export interface DomainConfig {
  key: DomainType;
  label: string;
  icon: string;
  description: string;
  color: string;
  bgColor: string;
}

export interface NoiseLevelConfig {
  key: NoiseLevelType;
  label: string;
  icon: string;
  description: string;
  scoreThreshold: number;
  dailyCount: string;
  recommended?: boolean;
}

export interface UserInfo {
  id: string;
  nickname: string;
  avatar: string;
  memberLevel: MemberLevel;
  readCount: number;
  collectCount: number;
  radarWords: string[];
}

export interface Preference {
  domains: DomainType[];
  noiseLevel: NoiseLevelType;
  radarWords: string[];
}
