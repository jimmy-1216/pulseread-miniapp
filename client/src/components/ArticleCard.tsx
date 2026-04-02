/**
 * 文章卡片组件 - 微信小程序风格
 */
import type { Article } from '../data/types';
import { useApp } from '../store/useAppStore';

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

// AI 评分颜色
function scoreColor(score: number) {
  if (score >= 88) return '#FF4D4F';
  if (score >= 75) return '#FA8C16';
  return '#1DB954';
}

interface Props {
  article: Article;
  onClick: (a: Article) => void;
}

export default function ArticleCard({ article, onClick }: Props) {
  const { toggleLike, toggleCollect } = useApp();
  const domain = DOMAIN_MAP[article.domain] ?? { label: '其他', color: '#666', bg: '#F5F5F5' };
  const sentiment = SENTIMENT_MAP[article.sentiment] ?? SENTIMENT_MAP.neutral;

  return (
    <div
      className="article-card bg-white mx-3 mb-2.5 rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '0.5px solid rgba(0,0,0,0.04)' }}
      onClick={() => onClick(article)}
    >
      <div className="p-4">
        {/* 顶部：标签行 + AI 评分 */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-[11px] px-2 py-0.5 rounded-md font-medium"
            style={{ color: domain.color, background: domain.bg }}>
            {domain.label}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-md font-medium"
            style={{ color: sentiment.color, background: sentiment.bg }}>
            {sentiment.label}
          </span>
          {article.radarWords[0] && (
            <span className="text-[11px] px-2 py-0.5 rounded-md font-medium text-purple-600 bg-purple-50">
              📡 {article.radarWords[0]}
            </span>
          )}
          {/* AI 评分徽章 */}
          <div className="ml-auto flex-shrink-0">
            <div className="w-[30px] h-[30px] rounded-full flex flex-col items-center justify-center"
              style={{ background: scoreColor(article.aiScore), boxShadow: `0 2px 8px ${scoreColor(article.aiScore)}55` }}>
              <span className="text-white font-bold leading-none" style={{ fontSize: 11 }}>{article.aiScore}</span>
              <span className="text-white leading-none" style={{ fontSize: 8, opacity: 0.85 }}>分</span>
            </div>
          </div>
        </div>

        {/* 标题 */}
        <h3 className="text-[15px] font-semibold text-gray-900 leading-[1.45] mb-2 line-clamp-2"
          style={{ letterSpacing: '0.01em' }}>
          {article.title}
        </h3>

        {/* AI 摘要 */}
        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {article.aiSummary}
        </p>

        {/* AI 要点（绿色背景块） */}
        {article.aiKeyPoints.length > 0 && (
          <div className="mb-3 px-3 py-2.5 rounded-xl" style={{ background: '#F0FDF4' }}>
            {article.aiKeyPoints.slice(0, 2).map((pt, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[12px] text-gray-600 mb-1 last:mb-0">
                <span className="flex-shrink-0 mt-0.5" style={{ color: '#1DB954' }}>▸</span>
                <span className="line-clamp-1">{pt}</span>
              </div>
            ))}
          </div>
        )}

        {/* 底部：来源 + 时间 + 操作 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <span>{article.source}</span>
            <span>·</span>
            <span>{article.publishTime}</span>
            {article.isAiTranslated && (
              <>
                <span>·</span>
                <span className="text-blue-400">🌐 AI译</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-1 text-[12px] transition-all active:scale-90"
              style={{ color: article.isLiked ? '#1DB954' : '#C0C0C0' }}
              onClick={e => { e.stopPropagation(); toggleLike(article.id); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={article.isLiked ? 'currentColor' : 'none'}
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
              </svg>
              <span>{article.likeCount}</span>
            </button>
            <button
              className="flex items-center gap-1 text-[12px] transition-all active:scale-90"
              style={{ color: article.isCollected ? '#FA8C16' : '#C0C0C0' }}
              onClick={e => { e.stopPropagation(); toggleCollect(article.id); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={article.isCollected ? 'currentColor' : 'none'}
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span>{article.collectCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
