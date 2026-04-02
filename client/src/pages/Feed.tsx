/**
 * Feed 资讯发现页 - 微信小程序规范排版
 *
 * 导航栏结构：
 * ┌─────────────────────────────────────────┐
 * │  状态栏 44px                             │
 * ├──────────────────────────┬──────────────┤
 * │  Logo + 实时指示器        │ [···][✕] 胶囊│  ← 40px
 * ├─────────────────────────────────────────┤
 * │  地区 Tab（全部/国内/国际）               │  ← 36px
 * ├─────────────────────────────────────────┤
 * │  领域胶囊横向滚动                         │  ← 40px
 * └─────────────────────────────────────────┘
 */
import { useState, useMemo } from 'react';
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

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F7FA' }}>

      {/* ── 导航栏 ─────────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-white relative" style={{ boxShadow: '0 0.5px 0 #EBEBEB' }}>

        {/* 状态栏 */}
        <MpStatusBar />

        {/* 导航内容区（右侧留出胶囊安全区 102px） */}
        <div className="flex items-center" style={{ height: 40, paddingLeft: 16, paddingRight: 102 }}>
          {/* Logo */}
          <div className="flex items-center gap-2 mr-3">
            <div className="w-[26px] h-[26px] rounded-[8px] flex items-center justify-center text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #1DB954, #17A348)' }}>
              🌊
            </div>
            <span className="text-[17px] font-bold text-gray-900 tracking-tight">微澜</span>
            <span className="text-[11px] text-gray-400 font-medium">PulseRead</span>
          </div>

          {/* 弹性空间 */}
          <div className="flex-1" />

          {/* 实时指示器 */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full mr-2"
            style={{ background: '#F0FDF4', border: '0.5px solid #BBF7D0' }}>
            <div className="relative w-[7px] h-[7px]">
              <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ background: '#1DB954' }} />
              <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: '#1DB954' }} />
            </div>
            <span className="text-[11px] font-semibold" style={{ color: '#1DB954' }}>实时</span>
          </div>

          {/* 降噪按钮 */}
          <button onClick={() => setShowNoisePicker(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full transition-all active:scale-95"
            style={{ background: '#F0FDF4', border: '0.5px solid #BBF7D0' }}>
            <span className="text-[13px]">{currentLevel.icon}</span>
            <span className="text-[11px] font-semibold" style={{ color: '#1DB954' }}>{currentLevel.label}</span>
            <span className="text-[10px] text-gray-400">{filtered.length}条</span>
          </button>
        </div>

        {/* 胶囊按钮（绝对定位） */}
        <MpCapsule />

        {/* 地区 Tab */}
        <div className="flex items-center gap-5 px-4" style={{ height: 36 }}>
          {REGION_CONFIGS.map(r => (
            <button key={r.key} onClick={() => setSelectedRegion(r.key as RegionType)}
              className="relative text-[14px] font-medium h-full transition-colors"
              style={{ color: selectedRegion === r.key ? '#1DB954' : '#999' }}>
              {r.label}
              {selectedRegion === r.key && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full" style={{ background: '#1DB954' }} />
              )}
            </button>
          ))}
        </div>

        {/* 领域胶囊横向滚动 */}
        <div className="overflow-x-auto scrollbar-hide px-3" style={{ height: 40, display: 'flex', alignItems: 'center' }}>
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

      {/* ── 文章列表 ────────────────────────────────────────── */}
      <div className="mp-page-content flex-1 pt-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-[14px]">暂无符合条件的资讯</div>
            <div className="text-[12px] mt-1">尝试调整降噪档位或领域筛选</div>
          </div>
        ) : (
          filtered.map(a => <ArticleCard key={a.id} article={a} onClick={handleArticleClick} />)
        )}
        <div className="py-5 text-center text-[11px] text-gray-300">— 已加载全部内容 —</div>
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
