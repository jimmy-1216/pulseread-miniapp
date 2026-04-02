/**
 * 搜索页 - 微信小程序规范排版
 */
import { useState, useMemo } from 'react';
import { useApp } from '../store/useAppStore';
import { SUGGESTED_RADAR_WORDS } from '../data/constants';
import ArticleCard from '../components/ArticleCard';
import MpCapsule, { MpStatusBar } from '../components/MpCapsule';

const HOT_SEARCHES = ['GPT-5', 'A股', '新能源', '华为', '美联储', '大模型', '招投标', '碳中和'];

export default function Search() {
  const { articles, searchHistory, addSearchHistory, clearSearchHistory, setCurrentArticle, setCurrentPage } = useApp();
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const results = useMemo(() => {
    if (!submitted) return [];
    const q = submitted.toLowerCase();
    return articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.aiSummary.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q)) ||
      a.source.toLowerCase().includes(q)
    );
  }, [submitted, articles]);

  const handleSearch = (kw: string) => {
    if (!kw.trim()) return;
    setQuery(kw);
    setSubmitted(kw);
    addSearchHistory(kw);
    setIsFocused(false);
  };

  const handleArticleClick = (article: typeof articles[0]) => {
    setCurrentArticle(article);
    setCurrentPage('article');
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F7FA' }}>
      {/* 导航栏 */}
      <div className="flex-shrink-0 bg-white relative" style={{ boxShadow: '0 0.5px 0 #EBEBEB' }}>
        <MpStatusBar />
        {/* 搜索栏内容区，右侧留出胶囊安全区 */}
        <div className="flex items-center gap-2" style={{ height: 40, paddingLeft: 16, paddingRight: 102 }}>
          <div className="flex-1 flex items-center gap-2 px-3 rounded-full"
            style={{ background: '#F5F5F5', height: 32 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="flex-1 bg-transparent text-[14px] text-gray-800 outline-none placeholder-gray-400"
              placeholder="搜索资讯、关键词..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 150)}
              onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
            />
            {query && (
              <button onClick={() => { setQuery(''); setSubmitted(''); }}
                className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M2 2l6 6M8 2l-6 6"/>
                </svg>
              </button>
            )}
          </div>
          {(isFocused || query) && (
            <button onClick={() => { setQuery(''); setSubmitted(''); setIsFocused(false); }}
              className="text-[14px] font-medium flex-shrink-0 transition-colors active:opacity-60"
              style={{ color: '#1DB954' }}>
              取消
            </button>
          )}
        </div>
        <MpCapsule />
      </div>

      {/* 内容区 */}
      <div className="mp-page-content flex-1">
        {/* 搜索结果 */}
        {submitted && (
          <div className="pt-3">
            <div className="px-4 mb-3 flex items-center justify-between">
              <span className="text-[13px] text-gray-500">
                共找到 <span className="font-semibold" style={{ color: '#1DB954' }}>{results.length}</span> 条结果
              </span>
            </div>
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="text-4xl mb-3">🔍</div>
                <div className="text-[14px]">未找到相关资讯</div>
                <div className="text-[12px] mt-1">换个关键词试试</div>
              </div>
            ) : (
              results.map(a => <ArticleCard key={a.id} article={a} onClick={handleArticleClick} />)
            )}
          </div>
        )}

        {/* 未搜索时：历史 + 热搜 */}
        {!submitted && (
          <div className="px-4 pt-4">
            {/* 搜索历史 */}
            {searchHistory.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[14px] font-semibold text-gray-800">搜索历史</span>
                  <button onClick={clearSearchHistory} className="text-[12px] text-gray-400 active:opacity-60">清空</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map(kw => (
                    <button key={kw} onClick={() => handleSearch(kw)}
                      className="px-3 py-1.5 rounded-full text-[13px] text-gray-600 transition-all active:scale-95"
                      style={{ background: '#F0F0F0' }}>
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 热搜榜 */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[14px] font-semibold text-gray-800">热搜榜</span>
                <span className="text-[11px] text-orange-400">🔥 实时更新</span>
              </div>
              <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
                {HOT_SEARCHES.map((kw, i) => (
                  <button key={kw} onClick={() => handleSearch(kw)}
                    className="flex items-center gap-3 w-full px-4 py-3 transition-colors active:bg-gray-50"
                    style={{ borderBottom: i < HOT_SEARCHES.length - 1 ? '0.5px solid #F5F5F5' : 'none' }}>
                    <span className="w-5 text-center text-[13px] font-bold"
                      style={{ color: i < 3 ? '#FF4D4F' : '#BDBDBD' }}>
                      {i + 1}
                    </span>
                    <span className="flex-1 text-left text-[14px] text-gray-800">{kw}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* 雷达词推荐 */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[14px] font-semibold text-gray-800">推荐雷达词</span>
                <span className="text-[11px] text-purple-400">📡 添加后实时追踪</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_RADAR_WORDS.slice(0, 8).map(kw => (
                  <button key={kw} onClick={() => handleSearch(kw)}
                    className="px-3 py-1.5 rounded-full text-[12px] font-medium transition-all active:scale-95"
                    style={{ background: '#F5F0FF', color: '#7C3AED', border: '0.5px solid #DDD6FE' }}>
                    📡 {kw}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
