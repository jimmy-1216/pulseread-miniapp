/**
 * 微信小程序右上角胶囊按钮（系统控件模拟）
 * 规格：87×32px，距右 7px，距状态栏底部 4px
 * 包含：···（更多）按钮 + 分割线 + ✕（关闭）按钮
 */
export default function MpCapsule() {
  return (
    <div className="mp-capsule">
      {/* 更多按钮 */}
      <button
        className="flex items-center justify-center w-7 h-7 rounded-full"
        style={{ WebkitTapHighlightColor: 'transparent' }}
        onClick={() => {}}
      >
        <svg width="18" height="4" viewBox="0 0 18 4" fill="none">
          <circle cx="2" cy="2" r="2" fill="#1a1a1a" />
          <circle cx="9" cy="2" r="2" fill="#1a1a1a" />
          <circle cx="16" cy="2" r="2" fill="#1a1a1a" />
        </svg>
      </button>
      {/* 分割线 */}
      <div className="mp-capsule-divider" />
      {/* 关闭按钮 */}
      <button
        className="flex items-center justify-center w-7 h-7 rounded-full"
        style={{ WebkitTapHighlightColor: 'transparent' }}
        onClick={() => {}}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1L13 13M13 1L1 13" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

/**
 * 状态栏（时间 + 信号图标）
 */
export function MpStatusBar() {
  const now = new Date();
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div className="mp-status-bar">
      {/* 左侧时间 */}
      <span style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', letterSpacing: '0.02em' }}>
        {time}
      </span>
      {/* 右侧图标（由胶囊按钮覆盖，这里只放占位） */}
      <div className="ml-auto flex items-center gap-1.5" style={{ paddingRight: 100 }}>
        {/* 信号 */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="#1a1a1a">
          <rect x="0" y="7" width="3" height="5" rx="0.5" />
          <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5" />
          <rect x="9" y="2" width="3" height="10" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="#1a1a1a"/>
          <path d="M3.5 6.5C4.8 5.2 6.3 4.5 8 4.5s3.2.7 4.5 2" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
          <path d="M1 3.5C3 1.4 5.4 0.5 8 0.5s5 .9 7 3" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        </svg>
        {/* 电池 */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#1a1a1a" strokeWidth="1"/>
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill="#1a1a1a"/>
          <path d="M22.5 4v4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}
