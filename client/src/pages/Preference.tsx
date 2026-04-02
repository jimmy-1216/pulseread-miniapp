/**
 * 偏好设置页 - 微信小程序规范排版
 */
import { useState } from 'react';
import { useApp } from '../store/useAppStore';
import { DOMAIN_CONFIGS, NOISE_LEVEL_CONFIGS, SUGGESTED_RADAR_WORDS } from '../data/constants';
import type { DomainType, NoiseLevelType } from '../data/types';
import MpCapsule, { MpStatusBar } from '../components/MpCapsule';

export default function Preference() {
  const { preference, updatePreference } = useApp();
  const [newWord, setNewWord] = useState('');

  const toggleDomain = (key: DomainType) => {
    const domains = preference.domains.includes(key)
      ? preference.domains.filter(d => d !== key)
      : [...preference.domains, key];
    if (domains.length === 0) return;
    updatePreference({ domains });
  };

  const setNoiseLevel = (key: NoiseLevelType) => updatePreference({ noiseLevel: key });

  const addRadarWord = (word: string) => {
    if (!word.trim() || preference.radarWords.includes(word)) return;
    updatePreference({ radarWords: [...preference.radarWords, word.trim()] });
    setNewWord('');
  };

  const removeRadarWord = (word: string) =>
    updatePreference({ radarWords: preference.radarWords.filter(w => w !== word) });

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F7FA' }}>
      {/* 导航栏 */}
      <div className="flex-shrink-0 bg-white relative" style={{ boxShadow: '0 0.5px 0 #EBEBEB' }}>
        <MpStatusBar />
        <div className="flex items-center" style={{ height: 40, paddingLeft: 16, paddingRight: 102 }}>
          <span className="text-[17px] font-bold text-gray-900 tracking-tight">偏好设置</span>
        </div>
        <MpCapsule />
      </div>

      {/* 内容区 */}
      <div className="mp-page-content flex-1 px-4 pt-4">

        {/* ── 降噪档位 ── */}
        <div className="mb-5">
          <h3 className="text-[13px] font-semibold text-gray-400 mb-2 uppercase tracking-wide">降噪档位</h3>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
            {NOISE_LEVEL_CONFIGS.map((level, i) => {
              const sel = preference.noiseLevel === level.key;
              return (
                <button key={level.key} onClick={() => setNoiseLevel(level.key)}
                  className="flex items-center gap-3 w-full px-4 py-3.5 transition-colors active:bg-gray-50"
                  style={{ borderBottom: i < NOISE_LEVEL_CONFIGS.length - 1 ? '0.5px solid #F5F5F5' : 'none' }}>
                  <span className="text-xl w-7 text-center">{level.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-medium text-gray-800">{level.label}</span>
                      {level.recommended && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded text-white font-semibold"
                          style={{ background: '#1DB954' }}>推荐</span>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{level.dailyCount}</div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: sel ? '#1DB954' : '#D0D0D0' }}>
                    {sel && <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#1DB954' }} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 订阅领域 ── */}
        <div className="mb-5">
          <h3 className="text-[13px] font-semibold text-gray-400 mb-2 uppercase tracking-wide">订阅领域</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {DOMAIN_CONFIGS.map(domain => {
              const sel = preference.domains.includes(domain.key);
              return (
                <button key={domain.key} onClick={() => toggleDomain(domain.key)}
                  className="flex items-center gap-3 p-3.5 rounded-2xl transition-all active:scale-[0.97] border-2"
                  style={{
                    borderColor: sel ? domain.color : '#EBEBEB',
                    background: sel ? domain.bgColor : '#fff',
                  }}>
                  <span className="text-xl">{domain.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="text-[13px] font-semibold" style={{ color: sel ? domain.color : '#333' }}>
                      {domain.label}
                    </div>
                  </div>
                  {sel && (
                    <div className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ background: domain.color }}>✓</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 雷达词 ── */}
        <div className="mb-5">
          <h3 className="text-[13px] font-semibold text-gray-400 mb-2 uppercase tracking-wide">雷达词追踪</h3>
          <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
            {/* 输入框 */}
            <div className="flex items-center gap-2 mb-3 p-2.5 rounded-xl" style={{ background: '#F5F5F5' }}>
              <span className="text-[14px]">📡</span>
              <input
                className="flex-1 bg-transparent text-[13px] text-gray-800 outline-none placeholder-gray-400"
                placeholder="添加关键词，如：GPT-5、A股..."
                value={newWord}
                onChange={e => setNewWord(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addRadarWord(newWord)}
              />
              <button onClick={() => addRadarWord(newWord)}
                className="px-3 py-1 rounded-lg text-white text-[12px] font-semibold transition-all active:scale-95"
                style={{ background: '#1DB954' }}>
                添加
              </button>
            </div>

            {/* 已添加的雷达词 */}
            {preference.radarWords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {preference.radarWords.map(word => (
                  <div key={word} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{ background: '#F5F0FF', border: '0.5px solid #DDD6FE' }}>
                    <span className="text-[12px] font-medium" style={{ color: '#7C3AED' }}>{word}</span>
                    <button onClick={() => removeRadarWord(word)}
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all active:scale-90"
                      style={{ background: '#C4B5FD' }}>
                      <svg width="7" height="7" viewBox="0 0 8 8" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M1.5 1.5l5 5M6.5 1.5l-5 5"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 推荐雷达词 */}
            <div>
              <div className="text-[11px] text-gray-400 mb-2">推荐添加</div>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_RADAR_WORDS.filter(w => !preference.radarWords.includes(w)).slice(0, 8).map(word => (
                  <button key={word} onClick={() => addRadarWord(word)}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium transition-all active:scale-95"
                    style={{ background: '#F5F5F5', color: '#666' }}>
                    + {word}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}
