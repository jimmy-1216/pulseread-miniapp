import { useState, useCallback, createContext, useContext } from 'react';
import type { Article, DomainType, NoiseLevelType, Preference, UserInfo } from '../data/types';
import { MOCK_ARTICLES } from '../data/constants';

export interface AppStore {
  hasOnboarded: boolean;
  userInfo: UserInfo;
  preference: Preference;
  articles: Article[];
  currentArticle: Article | null;
  currentPage: string;
  searchHistory: string[];
  setCurrentArticle: (a: Article | null) => void;
  setCurrentPage: (p: string) => void;
  completeOnboarding: (pref: Preference) => void;
  updatePreference: (pref: Partial<Preference>) => void;
  toggleLike: (id: number) => void;
  toggleCollect: (id: number) => void;
  addSearchHistory: (kw: string) => void;
  clearSearchHistory: () => void;
  resetOnboarding: () => void;
}

const DEFAULT_USER: UserInfo = {
  id: 'demo-user',
  nickname: '微澜用户',
  avatar: '',
  memberLevel: 'free',
  readCount: 128,
  collectCount: 23,
  radarWords: ['GPT-5', 'OpenAI', 'A股'],
};

const DEFAULT_PREFERENCE: Preference = {
  domains: ['tech', 'finance'],
  noiseLevel: 'focus',
  radarWords: ['GPT-5', 'OpenAI', 'A股'],
};

export function useAppStoreState(): AppStore {
  const [hasOnboarded, setHasOnboarded] = useState(() =>
    localStorage.getItem('has_onboarded') === 'true'
  );
  const [userInfo] = useState<UserInfo>(DEFAULT_USER);
  const [preference, setPreference] = useState<Preference>(() => {
    try {
      const s = localStorage.getItem('user_preference');
      return s ? JSON.parse(s) : DEFAULT_PREFERENCE;
    } catch { return DEFAULT_PREFERENCE; }
  });
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [currentPage, setCurrentPage] = useState('feed');
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const s = localStorage.getItem('search_history');
      return s ? JSON.parse(s) : ['OpenAI', 'A股', '新能源'];
    } catch { return ['OpenAI', 'A股', '新能源']; }
  });

  const completeOnboarding = useCallback((pref: Preference) => {
    setPreference(pref);
    setHasOnboarded(true);
    localStorage.setItem('has_onboarded', 'true');
    localStorage.setItem('user_preference', JSON.stringify(pref));
  }, []);

  const updatePreference = useCallback((pref: Partial<Preference>) => {
    setPreference(prev => {
      const next = { ...prev, ...pref };
      localStorage.setItem('user_preference', JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleLike = useCallback((id: number) => {
    setArticles(prev => prev.map(a =>
      a.id === id ? { ...a, isLiked: !a.isLiked, likeCount: a.isLiked ? a.likeCount - 1 : a.likeCount + 1 } : a
    ));
    setCurrentArticle(prev => prev?.id === id
      ? { ...prev, isLiked: !prev.isLiked, likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1 }
      : prev
    );
  }, []);

  const toggleCollect = useCallback((id: number) => {
    setArticles(prev => prev.map(a =>
      a.id === id ? { ...a, isCollected: !a.isCollected, collectCount: a.isCollected ? a.collectCount - 1 : a.collectCount + 1 } : a
    ));
    setCurrentArticle(prev => prev?.id === id
      ? { ...prev, isCollected: !prev.isCollected, collectCount: prev.isCollected ? prev.collectCount - 1 : prev.collectCount + 1 }
      : prev
    );
  }, []);

  const addSearchHistory = useCallback((kw: string) => {
    setSearchHistory(prev => {
      const next = [kw, ...prev.filter(k => k !== kw)].slice(0, 10);
      localStorage.setItem('search_history', JSON.stringify(next));
      return next;
    });
  }, []);

  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem('search_history');
  }, []);

  const resetOnboarding = useCallback(() => {
    setHasOnboarded(false);
    localStorage.removeItem('has_onboarded');
  }, []);

  return {
    hasOnboarded, userInfo, preference, articles, currentArticle,
    currentPage, searchHistory,
    setCurrentArticle, setCurrentPage,
    completeOnboarding, updatePreference, toggleLike, toggleCollect,
    addSearchHistory, clearSearchHistory, resetOnboarding,
  };
}

export const AppContext = createContext<AppStore | null>(null);

export function useApp(): AppStore {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
