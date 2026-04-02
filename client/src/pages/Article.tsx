/**
 * 文章详情页 - 微信小程序规范排版
 * 子页面：带返回按钮的自定义导航栏
 */
import { useState } from 'react';
import { useApp } from '../store/useAppStore';
import { MpSubNavBar } from '../components/MpNavBar';

const TABS = ['AI提炼', '原文', '双语对照'];

const DOMAIN_MAP: Record<string, { label: string; color: string; bg: string }> = {
  tech:     { label: '科技', color: '#1677FF', bg: '#E6F4FF' },
  finance:  { label: '财经', color: '#FA8C16', bg: '#FFF7E6' },
  policy:   { label: '政策', color: '#52C41A', bg: '#F6FFED' },
  commerce: { label: '商情', color: '#EB2F96', bg: '#FFF0F6' },
};
const SENTIMENT_MAP: Record<string, { label: string; color: string; bg: string }> = {
  positive: { label: '利好', color: '#52C41A', bg: '#F6FFED' },
  negative: { label: '利空', color: '#FF4D4F', bg: '#FFF1F0' },
  neutral:  { label: '中性', color: '#8C8C8C', bg: '#F5F5F5' },
};

export default function Article() {
  const { currentArticle, setCurrentPage, setCurrentArticle, toggleLike, toggleCollect } = useApp();
  const [activeTab, setActiveTab] = useState(0);

  if (!currentArticle) return null;

  const a = currentArticle;
  const domain = DOMAIN_MAP[a.domain] ?? { label: '其他', color: '#666', bg: '#F5F5F5' };
  const sentiment = SENTIMENT_MAP[a.sentiment] ?? SENTIMENT_MAP.neutral;

  const handleBack = () => {
    setCurrentArticle(null);
    setCurrentPage('feed');
  };

  return (
    <div className="flex flex-col h-full bg-white animate-page-in">
      {/* 导航栏（带返回） */}
      <MpSubNavBar
        title="资讯详情"
        onBack={handleBack}
        rightAction={
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-full active:bg-gray-100 transition-colors"
              onClick={() => toggleCollect(a.id)}>
              <svg width="20" height="20" viewBox="0 0 24 24"
                fill={a.isCollected ? '#FA8C16' : 'none'}
                stroke={a.isCollected ? '#FA8C16' : '#666'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </button>
            <button className="p-1.5 rounded-full active:bg-gray-100 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
          </div>
        }
      />

      {/* 内容区 */}
      <div className="mp-page-content flex-1">
        {/* 文章头部信息 */}
        <div className="px-4 pt-4 pb-3">
          {/* 标签行 */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] px-2 py-0.5 rounded-md font-medium"
              style={{ color: domain.color, background: domain.bg }}>{domain.label}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-md font-medium"
              style={{ color: sentiment.color, background: sentiment.bg }}>{sentiment.label}</span>
            {a.isAiTranslated && (
              <span className="text-[11px] px-2 py-0.5 rounded-md font-medium text-blue-500 bg-blue-50">🌐 AI译</span>
            )}
            <div className="ml-auto w-8 h-8 rounded-full flex flex-col items-center justify-center flex-shrink-0"
              style={{ background: a.aiScore >= 88 ? '#FF4D4F' : a.aiScore >= 75 ? '#FA8C16' : '#1DB954' }}>
              <span className="text-white font-bold leading-none" style={{ fontSize: 12 }}>{a.aiScore}</span>
              <span className="text-white leading-none" style={{ fontSize: 8, opacity: 0.85 }}>分</span>
            </div>
          </div>

          {/* 标题 */}
          <h1 className="text-[18px] font-bold text-gray-900 leading-[1.45] mb-3" style={{ letterSpacing: '0.01em' }}>
            {a.title}
          </h1>

          {/* 来源 + 时间 */}
          <div className="flex items-center gap-2 text-[12px] text-gray-400 pb-3"
            style={{ borderBottom: '0.5px solid #F0F0F0' }}>
            <span className="font-medium text-gray-500">{a.source}</span>
            <span>·</span>
            <span>{a.publishTime}</span>
          </div>
        </div>

        {/* Tab 切换 */}
        <div className="flex px-4 gap-6 sticky top-0 bg-white z-10"
          style={{ borderBottom: '0.5px solid #F0F0F0' }}>
          {TABS.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)}
              className="relative py-3 text-[14px] font-medium transition-colors"
              style={{ color: activeTab === i ? '#1DB954' : '#999' }}>
              {tab}
              {activeTab === i && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full" style={{ background: '#1DB954' }} />
              )}
            </button>
          ))}
        </div>

        {/* Tab 内容 */}
        <div className="px-4 py-4">
          {/* AI 提炼 */}
          {activeTab === 0 && (
            <div className="animate-fade-in">
              {/* AI 一句话总结 */}
              <div className="p-4 rounded-2xl mb-4"
                style={{ background: 'linear-gradient(135deg, #E8F8EE 0%, #F0FDF4 100%)', border: '1px solid #BBF7D0' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[13px] font-semibold" style={{ color: '#1DB954' }}>🤖 AI 总结</span>
                </div>
                <p className="text-[14px] text-gray-700 leading-relaxed">{a.aiSummary}</p>
              </div>

              {/* 核心要点 */}
              <div className="mb-4">
                <h3 className="text-[14px] font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>📌</span> 核心要点
                </h3>
                {a.aiKeyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3 mb-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 mt-0.5"
                      style={{ background: '#1DB954' }}>{i + 1}</div>
                    <p className="text-[13px] text-gray-700 leading-relaxed flex-1">{pt}</p>
                  </div>
                ))}
              </div>

              {/* 快捷提问 */}
              <div>
                <h3 className="text-[14px] font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>💬</span> 快捷提问
                </h3>
                <div className="flex flex-wrap gap-2">
                  {a.aiQuestions.map((q, i) => (
                    <button key={i}
                      className="px-3 py-2 rounded-xl text-[12px] font-medium transition-all active:scale-95"
                      style={{ background: '#F5F5F5', color: '#555', border: '0.5px solid #E8E8E8' }}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 原文 */}
          {activeTab === 1 && (
            <div className="animate-fade-in">
              <div className="text-[15px] text-gray-800 leading-[1.8]"
                style={{ whiteSpace: 'pre-line', letterSpacing: '0.01em' }}>
                {a.content}
              </div>
            </div>
          )}

          {/* 双语对照 */}
          {activeTab === 2 && (
            <div className="animate-fade-in">
              {a.contentEn ? (
                <div>
                  <div className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="text-[11px] font-semibold text-blue-500 mb-2">🇨🇳 中文</div>
                    <p className="text-[14px] text-gray-800 leading-[1.8]" style={{ whiteSpace: 'pre-line' }}>
                      {a.content}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-[11px] font-semibold text-gray-500 mb-2">🇺🇸 English</div>
                    <p className="text-[14px] text-gray-700 leading-[1.8]" style={{ whiteSpace: 'pre-line' }}>
                      {a.contentEn}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <div className="text-4xl mb-3">🌐</div>
                  <div className="text-[14px]">暂无英文版本</div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="h-20" />
      </div>

      {/* 底部操作栏 */}
      <div className="flex-shrink-0 bg-white px-4 py-3 flex items-center gap-3"
        style={{ borderTop: '0.5px solid #F0F0F0', paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}>
        <button
          onClick={() => toggleLike(a.id)}
          className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-2xl transition-all active:scale-95"
          style={{
            background: a.isLiked ? '#E8F8EE' : '#F5F5F5',
            color: a.isLiked ? '#1DB954' : '#666',
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24"
            fill={a.isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
          </svg>
          <span className="text-[13px] font-medium">{a.likeCount}</span>
        </button>
        <button
          onClick={() => toggleCollect(a.id)}
          className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-2xl transition-all active:scale-95"
          style={{
            background: a.isCollected ? '#FFF7E6' : '#F5F5F5',
            color: a.isCollected ? '#FA8C16' : '#666',
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24"
            fill={a.isCollected ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span className="text-[13px] font-medium">{a.isCollected ? '已收藏' : '收藏'}</span>
        </button>
        <button className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-2xl bg-gray-50 text-gray-500 transition-all active:scale-95">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          <span className="text-[13px] font-medium">分享</span>
        </button>
      </div>
    </div>
  );
}
