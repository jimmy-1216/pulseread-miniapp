/**
 * 个人中心页 - 微信小程序规范排版
 */
import { useApp } from '../store/useAppStore';
import MpCapsule, { MpStatusBar } from '../components/MpCapsule';

const MENU_ITEMS = [
  { icon: '⭐', label: '我的收藏', desc: '已收藏的资讯' },
  { icon: '📖', label: '阅读历史', desc: '最近浏览记录' },
  { icon: '🔔', label: '消息通知', desc: '雷达词触发提醒' },
  { icon: '📊', label: '数据报告', desc: '每周阅读分析' },
];
const SETTINGS = [
  { icon: '🎯', label: '偏好设置' },
  { icon: '🔒', label: '隐私设置' },
  { icon: '💬', label: '意见反馈' },
  { icon: '❓', label: '帮助中心' },
];

export default function Profile() {
  const { userInfo, preference, articles, resetOnboarding } = useApp();
  const collectedCount = articles.filter(a => a.isCollected).length;
  const likedCount = articles.filter(a => a.isLiked).length;

  const memberBadge = userInfo.memberLevel === 'pro'
    ? { label: 'Pro', color: '#FA8C16', bg: '#FFF7E6' }
    : userInfo.memberLevel === 'enterprise'
    ? { label: '企业版', color: '#1677FF', bg: '#E6F4FF' }
    : { label: '免费版', color: '#8C8C8C', bg: '#F5F5F5' };

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F7FA' }}>
      {/* 导航栏 */}
      <div className="flex-shrink-0 relative" style={{ background: 'linear-gradient(160deg, #1DB954 0%, #17A348 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.05)' }} />
        {/* 状态栏（白色文字版） */}
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
        {/* 导航内容区 */}
        <div className="relative flex items-center" style={{ height: 40, paddingLeft: 16, paddingRight: 102 }}>
          <span className="text-[17px] font-bold text-white tracking-tight">我的</span>
        </div>
        {/* 白色胶囊（绿色背景上） */}
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
            {/* 头像 */}
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
        {/* 会员升级卡（免费版显示） */}
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

        {/* 重置引导（调试用） */}
        <button onClick={resetOnboarding}
          className="w-full py-3 rounded-2xl text-[13px] text-gray-400 transition-all active:bg-gray-100"
          style={{ background: '#F5F5F5' }}>
          重新体验引导流程
        </button>

        <div className="h-6" />
      </div>
    </div>
  );
}
