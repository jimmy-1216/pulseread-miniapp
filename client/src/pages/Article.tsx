/**
 * 文章详情页 - 微信小程序规范排版
 * 子页面：带返回按钮的自定义导航栏 + AI 问答浮动按钮
 */
import { useState, useEffect, useRef } from 'react';
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

// AI 问答模拟回答库
const AI_ANSWERS: Record<string, string> = {
  '对我有什么影响？': '根据文章内容分析，这一事件对普通投资者和从业者的主要影响体现在三个层面：\n\n**短期**：市场情绪波动，相关板块可能出现1-3%的价格调整，建议关注但不必恐慌。\n\n**中期**：行业格局重塑，头部企业将获得更多资源集中优势，中小企业面临一定压力。\n\n**长期**：整体利好行业健康发展，监管趋严将提升行业门槛，优质企业受益明显。\n\n建议您结合自身实际情况，理性评估风险与机会。',
  '背后的原因是什么？': '深入分析这一事件的深层驱动因素，可以从以下几个维度理解：\n\n**宏观层面**：当前全球经济结构调整加速，政策制定者正在主动引导产业升级，这是大背景。\n\n**行业层面**：该领域经历了数年的快速扩张期，市场开始进入成熟阶段，优胜劣汰是必然规律。\n\n**微观层面**：核心参与方的战略意图明确，通过这一动作可以达到降本增效、巩固市场地位的目的。\n\n综合来看，这是多重因素共振的结果，并非偶发事件。',
  '未来会怎样发展？': '基于当前信息和历史规律，对未来走势做出以下研判：\n\n**3个月内**：政策落地期，市场会经历一段消化阶段，波动性较高，建议保持观察。\n\n**6-12个月**：行业格局初步确立，领先者优势扩大，跟随者开始分化，是布局的关键窗口期。\n\n**1-3年**：新的竞争平衡形成，创新驱动成为主旋律，具备技术壁垒的企业将脱颖而出。\n\n需要注意的是，外部环境的不确定性（如地缘政治、政策变化）可能影响上述预判，建议持续跟踪。',
};

const DEFAULT_QUESTIONS = [
  '对我有什么影响？',
  '背后的原因是什么？',
  '未来会怎样发展？',
];

// AI 流式打字效果 Hook
function useTypewriter(text: string, speed = 18) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const tick = () => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i < text.length) {
        ref.current = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };
    ref.current = setTimeout(tick, speed);
    return () => { if (ref.current) clearTimeout(ref.current); };
  }, [text, speed]);

  return { displayed, done };
}

// AI 问答抽屉
function AiDrawer({
  open,
  onClose,
  questions,
  articleTitle,
}: {
  open: boolean;
  onClose: () => void;
  questions: string[];
  articleTitle: string;
}) {
  const [inputVal, setInputVal] = useState('');
  const [currentQ, setCurrentQ] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { displayed, done } = useTypewriter(answerText, 15);

  const handleAsk = (q: string) => {
    if (!q.trim()) return;
    setCurrentQ(q);
    setIsTyping(true);
    setAnswerText('');
    // 模拟 500ms 思考延迟后开始流式输出
    setTimeout(() => {
      const answer = AI_ANSWERS[q] ??
        `正在分析「${articleTitle}」相关内容...\n\n根据文章信息，${q}这个问题涉及多个维度。从核心要点来看，文章揭示了行业的关键变化趋势，建议结合自身实际情况深入思考其中的机遇与挑战。\n\n如需更深入的分析，可以尝试追问具体细节。`;
      setAnswerText(answer);
    }, 500);
  };

  useEffect(() => {
    if (done && isTyping) setIsTyping(false);
  }, [done, isTyping]);

  // 关闭时重置状态
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setCurrentQ('');
        setAnswerText('');
        setInputVal('');
        setIsTyping(false);
      }, 300);
    }
  }, [open]);

  // 渲染 markdown 粗体
  const renderAnswer = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className={line === '' ? 'h-2' : 'mb-1'}>
          {parts.map((part, j) =>
            j % 2 === 1
              ? <strong key={j} className="font-semibold text-gray-900">{part}</strong>
              : <span key={j}>{part}</span>
          )}
        </p>
      );
    });
  };

  return (
    <>
      {/* 遮罩 */}
      <div
        className="absolute inset-0 z-[200] transition-opacity duration-300"
        style={{
          background: 'rgba(0,0,0,0.45)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        onClick={onClose}
      />

      {/* 抽屉面板 */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[210] flex flex-col"
        style={{
          background: '#fff',
          borderRadius: '20px 20px 0 0',
          maxHeight: '72%',
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
        }}
      >
        {/* 抽屉头部 */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 pt-4 pb-3"
          style={{ borderBottom: '0.5px solid #F0F0F0' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[14px]"
              style={{ background: 'linear-gradient(135deg, #1DB954, #0ea5e9)' }}>
              🤖
            </div>
            <div>
              <div className="text-[14px] font-semibold text-gray-900">向 AI 提问</div>
              <div className="text-[11px] text-gray-400">基于当前文章内容回答</div>
            </div>
          </div>
          <button onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#666" strokeWidth="1.8" strokeLinecap="round">
              <path d="M2 2l8 8M10 2l-8 8"/>
            </svg>
          </button>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* 快捷问题 */}
          {!currentQ && (
            <div>
              <div className="text-[12px] text-gray-400 mb-3">快捷提问</div>
              <div className="flex flex-col gap-2">
                {[...questions, ...DEFAULT_QUESTIONS.filter(q => !questions.includes(q))].slice(0, 4).map((q, i) => (
                  <button key={i} onClick={() => handleAsk(q)}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-left transition-all active:scale-[0.98]"
                    style={{ background: '#F8F9FA', border: '0.5px solid #EBEBEB' }}>
                    <span className="text-[18px]">💬</span>
                    <span className="text-[13px] text-gray-700 flex-1">{q}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 问答对话 */}
          {currentQ && (
            <div>
              {/* 用户问题气泡 */}
              <div className="flex justify-end mb-4">
                <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-tr-md text-[13px] text-white"
                  style={{ background: 'linear-gradient(135deg, #1DB954, #16a34a)' }}>
                  {currentQ}
                </div>
              </div>

              {/* AI 回答气泡 */}
              <div className="flex gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[12px] flex-shrink-0 mt-0.5"
                  style={{ background: 'linear-gradient(135deg, #1DB954, #0ea5e9)' }}>
                  🤖
                </div>
                <div className="flex-1 px-4 py-3 rounded-2xl rounded-tl-md text-[13px] text-gray-700 leading-relaxed"
                  style={{ background: '#F5F7FA', border: '0.5px solid #EBEBEB' }}>
                  {isTyping && !displayed ? (
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    <>
                      {renderAnswer(displayed)}
                      {!done && <span className="inline-block w-0.5 h-3.5 bg-gray-500 ml-0.5 animate-pulse" />}
                    </>
                  )}
                </div>
              </div>

              {/* 继续提问按钮 */}
              {done && (
                <button onClick={() => { setCurrentQ(''); setAnswerText(''); }}
                  className="w-full py-2.5 rounded-2xl text-[13px] font-medium transition-all active:scale-[0.98]"
                  style={{ background: '#F0FDF4', color: '#1DB954', border: '0.5px solid #BBF7D0' }}>
                  换个问题问问
                </button>
              )}
            </div>
          )}
        </div>

        {/* 底部输入框 */}
        <div className="flex-shrink-0 px-4 py-3 flex items-center gap-2"
          style={{ borderTop: '0.5px solid #F0F0F0', paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}>
          <div className="flex-1 flex items-center gap-2 px-3 rounded-full"
            style={{ background: '#F5F5F5', height: 36 }}>
            <input
              className="flex-1 bg-transparent text-[13px] text-gray-800 outline-none placeholder-gray-400"
              placeholder="输入你的问题..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && inputVal.trim()) { handleAsk(inputVal.trim()); setInputVal(''); } }}
            />
          </div>
          <button
            onClick={() => { if (inputVal.trim()) { handleAsk(inputVal.trim()); setInputVal(''); } }}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
            style={{ background: inputVal.trim() ? '#1DB954' : '#E8E8E8' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={inputVal.trim() ? '#fff' : '#999'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default function Article() {
  const { currentArticle, setCurrentPage, setCurrentArticle, toggleLike, toggleCollect } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  if (!currentArticle) return null;

  const a = currentArticle;
  const domain = DOMAIN_MAP[a.domain] ?? { label: '其他', color: '#666', bg: '#F5F5F5' };
  const sentiment = SENTIMENT_MAP[a.sentiment] ?? SENTIMENT_MAP.neutral;

  const handleBack = () => {
    setCurrentArticle(null);
    setCurrentPage('feed');
  };

  return (
    <div className="flex flex-col h-full bg-white animate-page-in relative">
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

              {/* 快捷提问 - 点击打开 AI 抽屉 */}
              <div>
                <h3 className="text-[14px] font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>💬</span> 快捷提问
                </h3>
                <div className="flex flex-wrap gap-2">
                  {a.aiQuestions.map((q, i) => (
                    <button key={i}
                      onClick={() => setAiDrawerOpen(true)}
                      className="px-3 py-2 rounded-xl text-[12px] font-medium transition-all active:scale-95"
                      style={{ background: '#F0FDF4', color: '#1DB954', border: '0.5px solid #BBF7D0' }}>
                      💬 {q}
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

        <div className="h-24" />
      </div>

      {/* 底部操作栏 */}
      <div className="flex-shrink-0 bg-white px-4 py-3 flex items-center gap-2"
        style={{ borderTop: '0.5px solid #F0F0F0', paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}>
        <button
          onClick={() => toggleLike(a.id)}
          className="flex items-center gap-1.5 flex-1 justify-center py-2.5 rounded-2xl transition-all active:scale-95"
          style={{
            background: a.isLiked ? '#E8F8EE' : '#F5F5F5',
            color: a.isLiked ? '#1DB954' : '#666',
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24"
            fill={a.isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
          </svg>
          <span className="text-[12px] font-medium">{a.likeCount}</span>
        </button>
        <button
          onClick={() => toggleCollect(a.id)}
          className="flex items-center gap-1.5 flex-1 justify-center py-2.5 rounded-2xl transition-all active:scale-95"
          style={{
            background: a.isCollected ? '#FFF7E6' : '#F5F5F5',
            color: a.isCollected ? '#FA8C16' : '#666',
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24"
            fill={a.isCollected ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span className="text-[12px] font-medium">{a.isCollected ? '已收藏' : '收藏'}</span>
        </button>
        <button className="flex items-center gap-1.5 flex-1 justify-center py-2.5 rounded-2xl bg-gray-50 text-gray-500 transition-all active:scale-95">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          <span className="text-[12px] font-medium">分享</span>
        </button>

        {/* AI 问答按钮 */}
        <button
          onClick={() => setAiDrawerOpen(true)}
          className="flex items-center gap-1.5 justify-center py-2.5 px-4 rounded-2xl transition-all active:scale-95 flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #1DB954, #16a34a)',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(29,185,84,0.35)',
          }}>
          <span className="text-[14px]">🤖</span>
          <span className="text-[12px] font-semibold">问 AI</span>
        </button>
      </div>

      {/* AI 问答抽屉 */}
      <AiDrawer
        open={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        questions={a.aiQuestions}
        articleTitle={a.title}
      />
    </div>
  );
}
