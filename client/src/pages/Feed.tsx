/**
 * Feed 资讯发现页 - 微信小程序规范排版
 *
 * 导航栏结构（v3）：
 * ┌─────────────────────────────────────────┐
 * │  状态栏 44px                             │
 * ├──────────────────────────┬──────────────┤
 * │  🌊微澜  [降噪档位]  弹性 │ [···][✕] 胶囊│  ← 44px（主导航行）
 * ├─────────────────────────────────────────┤
 * │  地区 Tab（全部/国内/国际）               │  ← 36px
 * ├─────────────────────────────────────────┤
 * │  领域胶囊横向滚动                         │  ← 40px
 * └─────────────────────────────────────────┘
 */
import { useState, useMemo, useRef, useCallback } from 'react';
import { useApp } from '../store/useAppStore';
import { DOMAIN_CONFIGS, NOISE_LEVEL_CONFIGS, REGION_CONFIGS } from '../data/constants';
import type { DomainType, RegionType } from '../data/types';
import ArticleCard from '../components/ArticleCard';
import MpCapsule, { MpStatusBar } from '../components/MpCapsule';

export default function Feed() {
  const { articles, preference, updatePreference, setCurrentArticle, setCurrentPage } = useApp();
  const [selectedRegion, setSelectedRegion] = useState<RegionType>('all');
  const [selectedDomain, setSelectedDomain] = useState<DomainType | 'all'>('all');
  const [showNoisePicker, setShowNoisePicker] = useState(false);

  // 下拉刷新状态
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const touchStartY = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const PULL_THRESHOLD = 60;

  const currentLevel = NOISE_LEVEL_CONFIGS.find(l => l.key === preference.noiseLevel) ?? NOISE_LEVEL_CONFIGS[1];
  const subscribedDomains = DOMAIN_CONFIGS.filter(d => preference.domains.includes(d.key));

  const filtered = useMemo(() => articles.filter(a => {
    if (selectedRegion !== 'all' && a.region !== selectedRegion) return false;
    if (selectedDomain !== 'all' && a.domain !== selectedDomain) return false;
    if (a.aiScore < currentLevel.scoreThreshold) return false;
    return true;
  }), [articles, selectedRegion, selectedDomain, currentLevel]);

  const handleArticleClick = (article: typeof articles[0]) => {
    setCurrentArticle(article);
    setCurrentPage('article');
  };

  // 下拉刷新处理
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (scrollRef.current && scrollRef.current.scrollTop === 0) {
      touchStartY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling || isRefreshing) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) {
      setPullDistance(Math.min(delta * 0.5, PULL_THRESHOLD + 20));
    }
  }, [isPulling, isRefreshing]);

  const handleTouchEnd = useCallback(() => {
    if (!isPulling) return;
    setIsPulling(false);
    if (pullDistance >= PULL_THRESHOLD) {
      setIsRefreshing(true);
      setPullDistance(PULL_THRESHOLD);
      // 模拟刷新 1.5s
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
      }, 1500);
    } else {
      setPullDistance(0);
    }
  }, [isPulling, pullDistance]);

  const pullProgress = Math.min(pullDistance / PULL_THRESHOLD, 1);

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F7FA' }}>

      {/* ── 导航栏 ─────────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-white relative" style={{ boxShadow: '0 0.5px 0 #EBEBEB' }}>

        {/* 状态栏 */}
        <MpStatusBar />

        {/* 主导航行（右侧留出胶囊安全区 110px） */}
        <div className="flex items-center" style={{ height: 44, paddingLeft: 14, paddingRight: 110 }}>

          {/* Logo + App 名称 */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div
              className="w-[24px] h-[24px] rounded-[7px] flex items-center justify-center text-[13px] flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #1DB954, #17A348)' }}>
              🌊
            </div>
            <span className="text-[17px] font-bold tracking-tight" style={{ color: '#111' }}>微澜</span>
          </div>

          {/* 降噪档位标签（紧贴名称右侧） */}
          <button
            onClick={() => setShowNoisePicker(true)}
            className="flex items-center gap-1 ml-2 px-2 py-[3px] rounded-full transition-all active:scale-95 flex-shrink-0"
            style={{ background: '#F0FDF4', border: '0.5px solid #BBF7D0' }}>
            <span className="text-[12px]">{currentLevel.icon}</span>
            <span className="text-[11px] font-semibold" style={{ color: '#1DB954' }}>{currentLevel.label}</span>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ color: '#1DB954', marginLeft: 1 }}>
              <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex-1" />
        </div>

        {/* 胶囊按钮（绝对定位） */}
        <MpCapsule />

        {/* 地区 Tab */}
        <div className="flex items-center gap-5 px-4" style={{ height: 36 }}>
          {REGION_CONFIGS.map(r => (
            <button key={r.key} onClick={() => setSelectedRegion(r.key as RegionType)}
              className="relative text-[14px] font-medium h-full transition-colors"
              style={{ color: selectedRegion === r.key ? '#111' : '#BDBDBD' }}>
              {r.label}
              {selectedRegion === r.key && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full" style={{ background: '#1DB954' }} />
              )}
            </button>
          ))}
        </div>

        {/* 领域胶囊横向滚动 */}
        <div className="overflow-x-auto scrollbar-hide px-3" style={{ height: 40, display: 'flex', alignItems: 'center', borderTop: '0.5px solid #F5F5F5' }}>
          <div className="flex gap-2 w-max">
            <button onClick={() => setSelectedDomain('all')}
              className="px-3 py-1 rounded-full text-[12px] font-medium transition-all whitespace-nowrap active:scale-95"
              style={{
                background: selectedDomain === 'all' ? '#1DB954' : '#F0F0F0',
                color: selectedDomain === 'all' ? '#fff' : '#666',
              }}>
              全部
            </button>
            {subscribedDomains.map(d => (
              <button key={d.key} onClick={() => setSelectedDomain(d.key)}
                className="px-3 py-1 rounded-full text-[12px] font-medium transition-all whitespace-nowrap active:scale-95"
                style={{
                  background: selectedDomain === d.key ? d.color : '#F0F0F0',
                  color: selectedDomain === d.key ? '#fff' : '#666',
                }}>
                {d.icon} {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 文章列表（支持下拉刷新） ────────────────────────── */}
      <div
        ref={scrollRef}
        className="mp-page-content flex-1 overflow-y-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ position: 'relative' }}
      >
        {/* 下拉刷新指示器 */}
        <div
          className="flex items-center justify-center gap-2 overflow-hidden transition-all"
          style={{
            height: pullDistance > 0 || isRefreshing ? Math.max(pullDistance, isRefreshing ? PULL_THRESHOLD : 0) : 0,
            opacity: pullProgress,
            transitionDuration: isPulling ? '0ms' : '300ms',
          }}>
          {isRefreshing ? (
            <>
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#1DB954" strokeWidth="2.5" strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round" />
              </svg>
              <span className="text-[12px] font-medium" style={{ color: '#1DB954' }}>正在更新...</span>
            </>
          ) : (
            <>
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                style={{ transform: `rotate(${pullProgress * 180}deg)`, transition: isPulling ? 'none' : 'transform 300ms' }}>
                <path d="M12 5v14M5 12l7 7 7-7" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[12px]" style={{ color: '#1DB954' }}>
                {pullProgress >= 1 ? '松开刷新' : '下拉刷新'}
              </span>
            </>
          )}
        </div>

        {/* 文章列表 / 空状态 */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <div className="text-[15px] font-semibold text-gray-700 mb-1.5">
              {selectedDomain !== 'all'
                ? `暂无「${subscribedDomains.find(d => d.key === selectedDomain)?.label ?? ''}」领域资讯`
                : '暂无符合条件的资讯'}
            </div>
            <div className="text-[13px] text-gray-400 mb-5 leading-relaxed">
              {selectedDomain !== 'all'
                ? '可以降低降噪档位，或前往偏好设置订阅更多领域'
                : '尝试调整降噪档位或切换地区筛选'}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowNoisePicker(true)}
                className="px-4 py-2 rounded-full text-[13px] font-medium transition-all active:scale-95"
                style={{ background: '#F0FDF4', color: '#1DB954', border: '1px solid #BBF7D0' }}>
                调整降噪档位
              </button>
              {selectedDomain !== 'all' && (
                <button
                  onClick={() => setCurrentPage('preference')}
                  className="px-4 py-2 rounded-full text-[13px] font-medium transition-all active:scale-95"
                  style={{ background: '#1DB954', color: '#fff' }}>
                  去偏好设置
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="pt-2">
              {filtered.map(a => <ArticleCard key={a.id} article={a} onClick={handleArticleClick} />)}
            </div>
            <div className="py-5 text-center text-[11px] text-gray-300">— 已加载全部内容 —</div>
          </>
        )}
      </div>

      {/* ── 降噪选择器 Sheet ─────────────────────────────────── */}
      {showNoisePicker && (
        <div className="absolute inset-0 z-50" onClick={() => setShowNoisePicker(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl animate-slide-up"
            onClick={e => e.stopPropagation()}>
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-9 h-1 bg-gray-200 rounded-full" />
            </div>
            <div className="px-5 pb-2 pt-2">
              <h3 className="text-[16px] font-bold text-gray-900 mb-4">选择降噪档位</h3>
              {NOISE_LEVEL_CONFIGS.map(level => {
                const sel = preference.noiseLevel === level.key;
                return (
                  <button key={level.key}
                    onClick={() => { updatePreference({ noiseLevel: level.key }); setShowNoisePicker(false); }}
                    className="flex items-center gap-3 w-full p-3.5 rounded-2xl mb-2 transition-all active:scale-[0.98]"
                    style={{ background: sel ? '#E8F8EE' : '#F9F9F9', border: `1.5px solid ${sel ? '#1DB954' : 'transparent'}` }}>
                    <span className="text-xl w-7 text-center">{level.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-semibold text-gray-800">{level.label}</span>
                        {level.recommended && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded text-white font-semibold"
                            style={{ background: '#1DB954' }}>推荐</span>
                        )}
                      </div>
                      <div className="text-[12px] text-gray-400 mt-0.5">{level.description} · {level.dailyCount}</div>
                    </div>
                    {sel && <span className="text-[16px]" style={{ color: '#1DB954' }}>✓</span>}
                  </button>
                );
              })}
              <div className="h-6" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
