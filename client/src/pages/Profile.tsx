/**
 * 个人中心页 - 微信小程序规范排版
 * 菜单项：我的收藏、阅读历史、消息通知、数据报告 均有内容展示
 */
import { useState } from 'react';
import { useApp } from '../store/useAppStore';
import MpCapsule from '../components/MpCapsule';

// ── 抽屉组件 ──────────────────────────────────────────────────────────────────
function Drawer({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
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
      {/* 面板 */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[210] flex flex-col"
        style={{
          background: '#F5F7FA',
          borderRadius: '20px 20px 0 0',
          maxHeight: '75%',
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
        }}
      >
        {/* 抽屉头 */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 pt-4 pb-3 bg-white"
          style={{ borderRadius: '20px 20px 0 0', borderBottom: '0.5px solid #F0F0F0' }}>
          <span className="text-[16px] font-semibold text-gray-900">{title}</span>
          <button onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#666" strokeWidth="1.8" strokeLinecap="round">
              <path d="M2 2l8 8M10 2l-8 8"/>
            </svg>
          </button>
        </div>
        {/* 内容 */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </>
  );
}

// ── 主组件 ──────────────────────────────────────────────────────────────────
export default function Profile() {
  const { userInfo, preference, articles, searchHistory, resetOnboarding, setCurrentArticle, setCurrentPage } = useApp();
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);

  const collectedArticles = articles.filter(a => a.isCollected);
  const likedArticles = articles.filter(a => a.isLiked);
  const collectedCount = collectedArticles.length;
  const likedCount = likedArticles.length;

  const memberBadge = userInfo.memberLevel === 'pro'
    ? { label: 'Pro', color: '#FA8C16', bg: '#FFF7E6' }
    : userInfo.memberLevel === 'enterprise'
    ? { label: '企业版', color: '#1677FF', bg: '#E6F4FF' }
    : { label: '免费版', color: '#8C8C8C', bg: '#F5F5F5' };

  const MENU_ITEMS = [
    { icon: '⭐', label: '我的收藏', desc: `已收藏 ${collectedCount} 篇资讯`, key: 'collect' },
    { icon: '📖', label: '阅读历史', desc: '最近浏览记录', key: 'history' },
    { icon: '🔔', label: '消息通知', desc: '雷达词触发提醒', key: 'notify' },
    { icon: '📊', label: '数据报告', desc: '每周阅读分析', key: 'report' },
  ];
  const SETTINGS = [
    { icon: '🎯', label: '偏好设置', key: 'pref' },
    { icon: '🔒', label: '隐私设置', key: 'privacy' },
    { icon: '💬', label: '意见反馈', key: 'feedback' },
    { icon: '❓', label: '帮助中心', key: 'help' },
  ];

  const handleArticleClick = (a: typeof articles[0]) => {
    setActiveDrawer(null);
    setTimeout(() => {
      setCurrentArticle(a);
      setCurrentPage('article');
    }, 300);
  };

  return (
    <div className="flex flex-col h-full relative" style={{ background: '#F5F7FA' }}>
      {/* 导航栏 */}
      <div className="flex-shrink-0 relative" style={{ background: 'linear-gradient(160deg, #1DB954 0%, #17A348 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.05)' }} />
        {/* 状态栏 */}
        <div className="relative" style={{ height: 44, display: 'flex', alignItems: 'flex-end', padding: '0 16px 6px' }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#fff', letterSpacing: '0.02em' }}>
            {new Date().getHours().toString().padStart(2,'0')}:{new Date().getMinutes().toString().padStart(2,'0')}
          </span>
          <div style={{ marginLeft: 'auto', paddingRight: 100, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
              <rect x="0" y="7" width="3" height="5" rx="0.5"/>
              <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5"/>
              <rect x="9" y="2" width="3" height="10" rx="0.5"/>
              <rect x="13.5" y="0" width="3" height="12" rx="0.5"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="white" strokeWidth="1"/>
              <rect x="2" y="2" width="16" height="8" rx="1.5" fill="white"/>
              <path d="M22.5 4v4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        {/* 导航内容 */}
        <div className="relative flex items-center" style={{ height: 40, paddingLeft: 16, paddingRight: 102 }}>
          <span className="text-[17px] font-bold text-white tracking-tight">我的</span>
        </div>
        {/* 胶囊 */}
        <div className="mp-capsule" style={{ border: '0.5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.25)' }}>
          <button className="flex items-center justify-center w-7 h-7 rounded-full">
            <svg width="18" height="4" viewBox="0 0 18 4" fill="none">
              <circle cx="2" cy="2" r="2" fill="white"/>
              <circle cx="9" cy="2" r="2" fill="white"/>
              <circle cx="16" cy="2" r="2" fill="white"/>
            </svg>
          </button>
          <div className="mp-capsule-divider" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <button className="flex items-center justify-center w-7 h-7 rounded-full">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* 用户信息卡 */}
        <div className="relative px-5 pb-5 pt-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.25)', border: '2px solid rgba(255,255,255,0.5)' }}>
              🌊
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[18px] font-bold text-white">{userInfo.nickname}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ color: memberBadge.color, background: memberBadge.bg }}>
                  {memberBadge.label}
                </span>
              </div>
              <div className="text-[12px] text-white/70">ID: {userInfo.id}</div>
            </div>
            <button className="px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all active:scale-95"
              style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', border: '0.5px solid rgba(255,255,255,0.4)' }}>
              编辑资料
            </button>
          </div>

          {/* 数据统计 */}
          <div className="flex mt-4 pt-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.2)' }}>
            {[
              { label: '已阅读', value: userInfo.readCount },
              { label: '已收藏', value: collectedCount },
              { label: '已点赞', value: likedCount },
              { label: '雷达词', value: preference.radarWords.length },
            ].map((stat, i) => (
              <div key={stat.label} className="flex-1 text-center"
                style={{ borderRight: i < 3 ? '0.5px solid rgba(255,255,255,0.2)' : 'none' }}>
                <div className="text-[20px] font-bold text-white">{stat.value}</div>
                <div className="text-[11px] text-white/70 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="mp-page-content flex-1 px-4 pt-4">
        {/* 会员升级卡 */}
        {userInfo.memberLevel === 'free' && (
          <div className="mb-4 p-4 rounded-2xl flex items-center gap-3"
            style={{ background: 'linear-gradient(135deg, #FFF7E6 0%, #FFFBE6 100%)', border: '1px solid #FFD591' }}>
            <span className="text-2xl">👑</span>
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-orange-800">升级 Pro，解锁全部功能</div>
              <div className="text-[12px] text-orange-600 mt-0.5">无限雷达词 · 企业情报 · 数据报告</div>
            </div>
            <button className="px-3 py-1.5 rounded-full text-[12px] font-semibold text-white transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #FA8C16, #F5A623)' }}>
              升级
            </button>
          </div>
        )}

        {/* 功能菜单 */}
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-gray-400 mb-2 uppercase tracking-wide">我的内容</h3>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
            {MENU_ITEMS.map((item, i) => (
              <button key={item.label}
                onClick={() => setActiveDrawer(item.key)}
                className="flex items-center gap-3 w-full px-4 py-3.5 transition-colors active:bg-gray-50"
                style={{ borderBottom: i < MENU_ITEMS.length - 1 ? '0.5px solid #F5F5F5' : 'none' }}>
                <span className="text-xl w-7 text-center">{item.icon}</span>
                <div className="flex-1 text-left">
                  <div className="text-[14px] text-gray-800">{item.label}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{item.desc}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* 设置菜单 */}
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-gray-400 mb-2 uppercase tracking-wide">设置</h3>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
            {SETTINGS.map((item, i) => (
              <button key={item.label}
                onClick={() => setActiveDrawer(item.key)}
                className="flex items-center gap-3 w-full px-4 py-3.5 transition-colors active:bg-gray-50"
                style={{ borderBottom: i < SETTINGS.length - 1 ? '0.5px solid #F5F5F5' : 'none' }}>
                <span className="text-xl w-7 text-center">{item.icon}</span>
                <span className="flex-1 text-left text-[14px] text-gray-800">{item.label}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* 重置引导 */}
        <button onClick={resetOnboarding}
          className="w-full py-3 rounded-2xl text-[13px] text-gray-400 transition-all active:bg-gray-100"
          style={{ background: '#F5F5F5' }}>
          重新体验引导流程
        </button>

        <div className="h-6" />
      </div>

      {/* ── 我的收藏 抽屉 ── */}
      <Drawer open={activeDrawer === 'collect'} title="我的收藏" onClose={() => setActiveDrawer(null)}>
        <div className="px-4 py-4">
          {collectedArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <div className="text-5xl mb-3">⭐</div>
              <div className="text-[14px]">还没有收藏的资讯</div>
              <div className="text-[12px] mt-1">在文章详情页点击收藏星标</div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {collectedArticles.map(a => (
                <button key={a.id} onClick={() => handleArticleClick(a)}
                  className="bg-white rounded-2xl p-4 text-left transition-all active:scale-[0.98]"
                  style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
                  <div className="text-[14px] font-semibold text-gray-900 leading-snug mb-2 line-clamp-2">{a.title}</div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <span>{a.source}</span><span>·</span><span>{a.publishTime}</span>
                    <span className="ml-auto text-orange-400">⭐ 已收藏</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </Drawer>

      {/* ── 阅读历史 抽屉 ── */}
      <Drawer open={activeDrawer === 'history'} title="阅读历史" onClose={() => setActiveDrawer(null)}>
        <div className="px-4 py-4">
          {likedArticles.length === 0 && collectedArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <div className="text-5xl mb-3">📖</div>
              <div className="text-[14px]">暂无阅读记录</div>
              <div className="text-[12px] mt-1">点击资讯卡片开始阅读</div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {[...collectedArticles, ...likedArticles].slice(0, 10).map((a, i) => (
                <button key={`${a.id}-${i}`} onClick={() => handleArticleClick(a)}
                  className="bg-white rounded-2xl p-4 text-left transition-all active:scale-[0.98]"
                  style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
                  <div className="text-[14px] font-semibold text-gray-900 leading-snug mb-2 line-clamp-2">{a.title}</div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <span>{a.source}</span><span>·</span><span>{a.publishTime}</span>
                    <span className="ml-auto text-blue-400">📖 已读</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </Drawer>

      {/* ── 消息通知 抽屉 ── */}
      <Drawer open={activeDrawer === 'notify'} title="消息通知" onClose={() => setActiveDrawer(null)}>
        <div className="px-4 py-4">
          <div className="flex flex-col gap-3">
            {preference.radarWords.map((word, i) => (
              <div key={word} className="bg-white rounded-2xl p-4"
                style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[12px] px-2 py-0.5 rounded-full font-medium"
                    style={{ background: '#F0FDF4', color: '#1DB954' }}>📡 {word}</span>
                  <span className="text-[11px] text-gray-400 ml-auto">{i === 0 ? '10分钟前' : i === 1 ? '1小时前' : '今天'}</span>
                </div>
                <div className="text-[13px] text-gray-700 leading-relaxed">
                  检测到与「{word}」相关的最新资讯 {Math.floor(Math.random() * 5) + 1} 条，点击查看详情。
                </div>
              </div>
            ))}
            {preference.radarWords.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <div className="text-5xl mb-3">🔔</div>
                <div className="text-[14px]">暂无通知</div>
                <div className="text-[12px] mt-1">添加雷达词后将实时推送相关资讯</div>
              </div>
            )}
          </div>
        </div>
      </Drawer>

      {/* ── 数据报告 抽屉 ── */}
      <Drawer open={activeDrawer === 'report'} title="本周数据报告" onClose={() => setActiveDrawer(null)}>
        <div className="px-4 py-4">
          {/* 核心数据 */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: '本周阅读', value: '38 篇', icon: '📖', color: '#1DB954', bg: '#F0FDF4' },
              { label: '收藏资讯', value: `${collectedCount} 篇`, icon: '⭐', color: '#FA8C16', bg: '#FFF7E6' },
              { label: '阅读时长', value: '4.2 小时', icon: '⏱️', color: '#1677FF', bg: '#E6F4FF' },
              { label: '雷达触发', value: '12 次', icon: '📡', color: '#7C3AED', bg: '#F5F0FF' },
            ].map(item => (
              <div key={item.label} className="rounded-2xl p-4 flex flex-col gap-1"
                style={{ background: item.bg, boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
                <div className="text-[20px]">{item.icon}</div>
                <div className="text-[20px] font-bold" style={{ color: item.color }}>{item.value}</div>
                <div className="text-[11px] text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>

          {/* 领域分布 */}
          <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
            <div className="text-[14px] font-semibold text-gray-800 mb-3">阅读领域分布</div>
            {[
              { label: '科技', pct: 45, color: '#1677FF' },
              { label: '财经', pct: 30, color: '#FA8C16' },
              { label: '政策', pct: 15, color: '#52C41A' },
              { label: '商情', pct: 10, color: '#EB2F96' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 mb-3">
                <span className="text-[12px] text-gray-600 w-8">{item.label}</span>
                <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
                <span className="text-[12px] font-semibold w-8 text-right" style={{ color: item.color }}>{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </Drawer>

      {/* ── 偏好设置 抽屉 ── */}
      <Drawer open={activeDrawer === 'pref'} title="偏好设置" onClose={() => setActiveDrawer(null)}>
        <div className="px-4 py-4">
          <div className="bg-white rounded-2xl p-4 mb-3" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
            <div className="text-[13px] font-semibold text-gray-500 mb-2">已订阅领域</div>
            <div className="flex flex-wrap gap-2">
              {preference.domains.map(d => (
                <span key={d} className="px-3 py-1.5 rounded-full text-[12px] font-medium"
                  style={{ background: '#F0FDF4', color: '#1DB954', border: '0.5px solid #BBF7D0' }}>
                  ✓ {d === 'tech' ? '科技' : d === 'finance' ? '财经' : d === 'policy' ? '政策' : '商情'}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
            <div className="text-[13px] font-semibold text-gray-500 mb-2">降噪档位</div>
            <div className="text-[14px] text-gray-800">
              {preference.noiseLevel === 'focus' ? '🎯 精选模式 — 每日精华' :
               preference.noiseLevel === 'major' ? '⚖️ 均衡模式 — 重要资讯' :
               preference.noiseLevel === 'open' ? '📡 全量模式 — 全部推送' : '🚨 突发模式 — 仅重大事件'}
            </div>
          </div>
          <button onClick={() => { setActiveDrawer(null); setCurrentPage('preference'); }}
            className="w-full mt-3 py-3 rounded-2xl text-[14px] font-semibold text-white transition-all active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #1DB954, #16a34a)' }}>
            前往偏好设置修改
          </button>
        </div>
      </Drawer>

      {/* ── 隐私/反馈/帮助 简单抽屉 ── */}
      {['privacy', 'feedback', 'help'].map(key => (
        <Drawer key={key} open={activeDrawer === key}
          title={key === 'privacy' ? '隐私设置' : key === 'feedback' ? '意见反馈' : '帮助中心'}
          onClose={() => setActiveDrawer(null)}>
          <div className="px-4 py-8 flex flex-col items-center text-gray-400">
            <div className="text-5xl mb-3">
              {key === 'privacy' ? '🔒' : key === 'feedback' ? '💬' : '❓'}
            </div>
            <div className="text-[14px] text-gray-600 font-medium mb-1">
              {key === 'privacy' ? '隐私设置' : key === 'feedback' ? '意见反馈' : '帮助中心'}
            </div>
            <div className="text-[12px] text-center leading-relaxed">
              {key === 'privacy' ? '您的数据完全本地存储，不上传任何个人信息。' :
               key === 'feedback' ? '感谢您的使用！如有建议或问题，请联系我们的产品团队。' :
               '遇到问题？请查阅使用文档或联系在线客服获取帮助。'}
            </div>
          </div>
        </Drawer>
      ))}
    </div>
  );
}
