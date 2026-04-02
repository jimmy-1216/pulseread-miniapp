/**
 * 微信小程序底部 TabBar
 * 高度：56px + 底部安全区 8px = 64px
 */
import { useApp } from '../store/useAppStore';

const TABS = [
  {
    key: 'feed',
    label: '发现',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 9.5L12 3L21 9.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
          stroke={active ? '#1DB954' : '#BDBDBD'} strokeWidth="1.6"
          fill={active ? '#E8F8EE' : 'none'} strokeLinejoin="round"/>
        <path d="M9 21V12h6v9" stroke={active ? '#1DB954' : '#BDBDBD'} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: 'search',
    label: '搜索',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7"
          stroke={active ? '#1DB954' : '#BDBDBD'} strokeWidth="1.6"
          fill={active ? '#E8F8EE' : 'none'}/>
        <path d="M16.5 16.5L21 21" stroke={active ? '#1DB954' : '#BDBDBD'} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: 'preference',
    label: '偏好',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3"
          stroke={active ? '#1DB954' : '#BDBDBD'} strokeWidth="1.6"
          fill={active ? '#1DB954' : 'none'}/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"
          stroke={active ? '#1DB954' : '#BDBDBD'} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: 'profile',
    label: '我的',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4"
          stroke={active ? '#1DB954' : '#BDBDBD'} strokeWidth="1.6"
          fill={active ? '#E8F8EE' : 'none'}/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
          stroke={active ? '#1DB954' : '#BDBDBD'} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function TabBar() {
  const { currentPage, setCurrentPage } = useApp();

  return (
    <div className="mp-tabbar">
      {TABS.map(tab => {
        const active = currentPage === tab.key;
        return (
          <button
            key={tab.key}
            className="mp-tabbar-item"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            onClick={() => setCurrentPage(tab.key)}
          >
            {tab.icon(active)}
            <span
              style={{
                fontSize: 10,
                fontWeight: active ? 600 : 400,
                color: active ? '#1DB954' : '#BDBDBD',
                lineHeight: 1,
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
