/**
 * 微信小程序自定义导航栏
 *
 * 规范：
 * - 状态栏高度：44px（iOS 刘海屏）
 * - 胶囊按钮：87×32px，距右 7px，顶部 = 状态栏高 + 4px = 48px
 * - 导航栏内容区高度：40px（与胶囊等高 + 上下各 4px）
 * - 导航栏总高度：44 + 40 = 84px
 * - 内容区右侧 padding = 胶囊宽(87) + 右间距(7) + 内边距(8) = 102px
 */
import MpCapsule, { MpStatusBar } from './MpCapsule';

interface MpNavBarProps {
  /** 左侧内容（logo/标题/返回按钮） */
  left?: React.ReactNode;
  /** 中间内容（标题） */
  center?: React.ReactNode;
  /** 背景色，默认白色 */
  bgColor?: string;
  /** 是否显示底部分割线 */
  showBorder?: boolean;
}

export default function MpNavBar({
  left,
  center,
  bgColor = '#fff',
  showBorder = true,
}: MpNavBarProps) {
  return (
    <div
      className="mp-navbar flex-shrink-0"
      style={{
        background: bgColor,
        borderBottom: showBorder ? '0.5px solid #F0F0F0' : 'none',
      }}
    >
      {/* 状态栏 */}
      <MpStatusBar />

      {/* 导航内容区 */}
      <div className="mp-navbar-content">
        {left && <div className="flex items-center gap-2">{left}</div>}
        {center && (
          <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 44 + 4, height: 32, display: 'flex', alignItems: 'center' }}>
            {center}
          </div>
        )}
      </div>

      {/* 胶囊按钮（绝对定位，覆盖在导航栏上） */}
      <MpCapsule />
    </div>
  );
}

/**
 * 带返回按钮的子页面导航栏
 */
interface MpSubNavBarProps {
  title: string;
  onBack: () => void;
  bgColor?: string;
  rightAction?: React.ReactNode;
}

export function MpSubNavBar({ title, onBack, bgColor = '#fff', rightAction }: MpSubNavBarProps) {
  return (
    <div
      className="mp-navbar flex-shrink-0"
      style={{
        background: bgColor,
        borderBottom: '0.5px solid #F0F0F0',
      }}
    >
      <MpStatusBar />
      <div className="mp-navbar-content relative">
        {/* 返回按钮 */}
        <button
          onClick={onBack}
          className="flex items-center gap-1 -ml-1 px-2 py-1 rounded-lg active:bg-gray-100 transition-colors"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M8.5 1.5L1.5 8.5L8.5 15.5" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* 标题居中 */}
        <div
          className="absolute left-1/2 -translate-x-1/2 font-semibold text-gray-900"
          style={{ top: 44 + 4, height: 32, display: 'flex', alignItems: 'center', fontSize: 17, letterSpacing: '0.01em' }}
        >
          {title}
        </div>

        {/* 右侧操作 */}
        {rightAction && (
          <div className="ml-auto">{rightAction}</div>
        )}
      </div>
      <MpCapsule />
    </div>
  );
}
