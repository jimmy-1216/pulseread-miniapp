/**
 * 引导页 - 微信小程序规范排版
 * 无导航栏（全屏沉浸式），顶部留出状态栏高度 + 胶囊按钮安全区
 */
import { useState } from 'react';
import { DOMAIN_CONFIGS, NOISE_LEVEL_CONFIGS } from '../data/constants';
import type { DomainType, NoiseLevelType, Preference } from '../data/types';
import { useApp } from '../store/useAppStore';
import MpCapsule, { MpStatusBar } from '../components/MpCapsule';

export default function Onboarding() {
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(1);
  const [selectedDomains, setSelectedDomains] = useState<DomainType[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<NoiseLevelType>('focus');

  const toggleDomain = (key: DomainType) =>
    setSelectedDomains(prev => prev.includes(key) ? prev.filter(d => d !== key) : [...prev, key]);

  const handleNext = () => {
    if (step < 3) { setStep(step + 1); return; }
    completeOnboarding({
      domains: selectedDomains.length > 0 ? selectedDomains : ['tech'],
      noiseLevel: selectedLevel,
      radarWords: [],
    });
  };

  const canNext = step === 1 || (step === 2 && selectedDomains.length > 0) || step === 3;

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* 状态栏 + 胶囊按钮（全屏页面也要保留） */}
      <div className="relative flex-shrink-0" style={{ background: 'transparent' }}>
        <MpStatusBar />
        <MpCapsule />
      </div>

      {/* 步骤指示器 */}
      <div className="flex items-center justify-center gap-2 py-3 flex-shrink-0">
        {[1, 2, 3].map(i => (
          <div key={i} className="rounded-full transition-all duration-300"
            style={{
              width: step === i ? 20 : 6,
              height: 6,
              background: step >= i ? '#1DB954' : '#E0E0E0',
            }}
          />
        ))}
      </div>

      {/* 滚动内容区 */}
      <div className="flex-1 overflow-y-auto px-5 scrollbar-hide">
        {/* ── 步骤 1：产品介绍 ── */}
        {step === 1 && (
          <div className="flex flex-col items-center pt-6 animate-fade-in">
            <div className="relative mb-5">
              <div className="w-20 h-20 rounded-[22px] flex items-center justify-center text-4xl"
                style={{ background: 'linear-gradient(135deg, #1DB954 0%, #17A348 100%)', boxShadow: '0 10px 30px rgba(29,185,84,0.35)' }}>
                🌊
              </div>
              <div className="absolute -inset-3 rounded-[30px] -z-10"
                style={{ background: 'radial-gradient(circle, rgba(29,185,84,0.15) 0%, transparent 70%)' }} />
            </div>
            <h1 className="text-[22px] font-bold text-gray-900 mb-1.5 tracking-tight">微澜 PulseRead</h1>
            <p className="text-[13px] text-gray-400 mb-7">AI 驱动的跨领域资讯聚合</p>

            {[
              { icon: '🤖', title: 'AI 智能提炼', desc: '自动提炼核心观点，节省 80% 阅读时间' },
              { icon: '🎯', title: '精准降噪', desc: '4 档降噪，只看真正重要的资讯' },
              { icon: '🌐', title: '多领域覆盖', desc: '科技、财经、政策、商情，一站掌握' },
              { icon: '⚡', title: '实时更新', desc: '7×24 小时监控，重大事件第一时间推送' },
            ].map(f => (
              <div key={f.icon} className="flex items-start gap-3 w-full mb-3 p-3.5 rounded-2xl"
                style={{ background: '#F7FFF9', border: '1px solid #E8F8EE' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: '#E8F8EE' }}>
                  {f.icon}
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-gray-800">{f.title}</div>
                  <div className="text-[12px] text-gray-400 mt-0.5 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
            <div className="h-4" />
          </div>
        )}

        {/* ── 步骤 2：选择领域 ── */}
        {step === 2 && (
          <div className="pt-4 animate-fade-in">
            <h2 className="text-[20px] font-bold text-gray-900 mb-1">选择你感兴趣的领域</h2>
            <p className="text-[13px] text-gray-400 mb-5">至少选择 1 个，后续可随时调整</p>
            <div className="grid grid-cols-2 gap-3">
              {DOMAIN_CONFIGS.map(domain => {
                const sel = selectedDomains.includes(domain.key);
                return (
                  <button key={domain.key} onClick={() => toggleDomain(domain.key)}
                    className="relative p-4 rounded-2xl text-left transition-all duration-200 border-2 active:scale-95"
                    style={{ borderColor: sel ? domain.color : '#EBEBEB', background: sel ? domain.bgColor : '#FAFAFA' }}>
                    <div className="text-2xl mb-2">{domain.icon}</div>
                    <div className="text-[14px] font-semibold mb-0.5" style={{ color: sel ? domain.color : '#1A1A1A' }}>
                      {domain.label}
                    </div>
                    <div className="text-[11px] text-gray-400 leading-tight">{domain.description}</div>
                    {sel && (
                      <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                        style={{ background: domain.color }}>✓</div>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="h-4" />
          </div>
        )}

        {/* ── 步骤 3：降噪档位 ── */}
        {step === 3 && (
          <div className="pt-4 animate-fade-in">
            <h2 className="text-[20px] font-bold text-gray-900 mb-1">设置你的降噪档位</h2>
            <p className="text-[13px] text-gray-400 mb-5">控制每日资讯密度，后续可随时调整</p>
            <div className="flex flex-col gap-3">
              {NOISE_LEVEL_CONFIGS.map(level => {
                const sel = selectedLevel === level.key;
                return (
                  <button key={level.key} onClick={() => setSelectedLevel(level.key)}
                    className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-200 border-2 active:scale-[0.98]"
                    style={{ borderColor: sel ? '#1DB954' : '#EBEBEB', background: sel ? '#E8F8EE' : '#FAFAFA' }}>
                    <div className="text-2xl w-8 text-center">{level.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[14px] font-semibold text-gray-800">{level.label}</span>
                        {level.recommended && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded text-white font-semibold"
                            style={{ background: '#1DB954' }}>推荐</span>
                        )}
                      </div>
                      <div className="text-[12px] text-gray-400">{level.description}</div>
                      <div className="text-[12px] font-medium mt-1" style={{ color: '#1DB954' }}>{level.dailyCount}</div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: sel ? '#1DB954' : '#D0D0D0' }}>
                      {sel && <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#1DB954' }} />}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="h-4" />
          </div>
        )}
      </div>

      {/* 底部按钮 */}
      <div className="px-5 pb-8 pt-3 flex-shrink-0">
        <button onClick={handleNext} disabled={!canNext}
          className="w-full py-[15px] rounded-2xl text-white text-[16px] font-semibold transition-all duration-200 active:scale-[0.98]"
          style={{
            background: canNext ? 'linear-gradient(135deg, #1DB954 0%, #17A348 100%)' : '#C8C8C8',
            boxShadow: canNext ? '0 6px 20px rgba(29,185,84,0.35)' : 'none',
          }}>
          {step === 3 ? '开始使用 🚀' : '下一步'}
        </button>
        {step > 1 && (
          <button onClick={() => setStep(step - 1)}
            className="w-full py-3 text-[13px] text-gray-400 mt-1">
            返回上一步
          </button>
        )}
      </div>
    </div>
  );
}
