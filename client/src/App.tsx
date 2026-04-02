/**
 * App.tsx - 微信小程序 H5 预览主入口
 *
 * 布局结构：
 * ┌─────────────────────────────────────────────────────┐
 * │  深色背景（桌面端居中展示手机外壳）                    │
 * │  ┌─────────────────────────────────────────────┐   │
 * │  │  手机外壳 390×844px                          │   │
 * │  │  ┌─────────────────────────────────────────┐│   │
 * │  │  │  页面内容（含微信小程序规范导航栏）         ││   │
 * │  │  └─────────────────────────────────────────┘│   │
 * │  └─────────────────────────────────────────────┘   │
 * └─────────────────────────────────────────────────────┘
 */
import { Toaster } from "@/components/ui/sonner";
import { AppContext, useAppStoreState } from './store/useAppStore';
import Onboarding from './pages/Onboarding';
import Feed from './pages/Feed';
import Article from './pages/Article';
import Search from './pages/Search';
import Preference from './pages/Preference';
import Profile from './pages/Profile';
import TabBar from './components/TabBar';

function MiniAppShell() {
  const store = useAppStoreState();

  const renderPage = () => {
    // 文章详情页（覆盖所有 tab）
    if (store.currentArticle) return <Article />;
    switch (store.currentPage) {
      case 'feed':       return <Feed />;
      case 'search':     return <Search />;
      case 'preference': return <Preference />;
      case 'profile':    return <Profile />;
      default:           return <Feed />;
    }
  };

  return (
    <AppContext.Provider value={store}>
      {/* 手机外壳 */}
      <div className="phone-shell flex flex-col">
        {/* 刘海 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[300]"
          style={{ width: 126, height: 34, background: '#000', borderRadius: '0 0 20px 20px' }} />

        {/* 页面内容区（引导页或主应用） */}
        {!store.hasOnboarded ? (
          <div className="flex-1 overflow-hidden relative">
            <Onboarding />
          </div>
        ) : (
          <>
            {/* 主内容区 */}
            <div className="flex-1 overflow-hidden relative">
              {renderPage()}
            </div>
            {/* TabBar（文章详情页隐藏） */}
            {!store.currentArticle && <TabBar />}
          </>
        )}

        {/* Home 指示条 */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-[300]"
          style={{ width: 134, height: 5, background: '#000', borderRadius: 3, opacity: 0.2 }} />
      </div>
    </AppContext.Provider>
  );
}

export default function App() {
  return (
    <>
      {/* 全屏深色背景 */}
      <div className="fixed inset-0 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f1a0f 100%)' }}>

        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5"
            style={{ background: '#1DB954', filter: 'blur(80px)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-5"
            style={{ background: '#1677FF', filter: 'blur(80px)' }} />
        </div>

        {/* 手机外壳 */}
        <MiniAppShell />

        {/* 右侧说明文字（桌面端可见） */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/40 text-sm hidden xl:block max-w-[180px]">
          <div className="font-semibold text-white/60 mb-2 text-base">微澜 PulseRead</div>
          <div className="leading-relaxed text-[13px]">
            用户端小程序交互预览<br/>
            模拟 iPhone 14 Pro 尺寸<br/>
            390 × 844 px
          </div>
          <div className="mt-4 space-y-1 text-[12px]">
            <div>🌊 资讯发现</div>
            <div>🔍 智能搜索</div>
            <div>🎯 偏好设置</div>
            <div>👤 个人中心</div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
