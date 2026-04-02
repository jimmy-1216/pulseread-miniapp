# 微澜 PulseRead H5 设计方案

## 方案一：极简信息流（Brutalist Minimal）
<response>
<text>
**Design Movement**: 新极简主义 + 信息密度美学
**Core Principles**: 内容至上、高信息密度、克制的视觉装饰、移动端优先
**Color Philosophy**: 纯白底 + 深墨色文字 + 品牌绿 #1DB954 作为唯一强调色，营造专业感
**Layout Paradigm**: 全屏卡片流，底部固定 TabBar，顶部悬浮导航栏
**Signature Elements**: 绿色脉冲动效、AI评分徽章、情绪标签色块
**Interaction Philosophy**: 滑动流畅、点击即时反馈、骨架屏过渡
**Animation**: 页面切换淡入、卡片悬停微上浮、脉冲圆点动效
**Typography System**: PingFang SC / -apple-system 系统字体，标题 600 weight，正文 400 weight
</text>
<probability>0.08</probability>
</response>

## 方案二：深色沉浸式（Dark Immersive）
<response>
<text>
**Design Movement**: 深色模式 + 科技感
**Core Principles**: 深色底、荧光绿强调、毛玻璃卡片、高对比度
**Color Philosophy**: #0D0D0D 底色 + #1DB954 荧光绿 + 半透明白色卡片
**Layout Paradigm**: 沉浸式全屏，卡片悬浮于深色背景
**Signature Elements**: 毛玻璃效果、发光边框、数据可视化元素
**Interaction Philosophy**: 暗色环境下的舒适阅读体验
**Animation**: 卡片浮现动效、光晕扩散、数字滚动
**Typography System**: 系统字体 + 数字使用等宽字体
</text>
<probability>0.07</probability>
</response>

## 方案三：清新卡片流（Fresh Card Stream）✅ 选用
<response>
<text>
**Design Movement**: 现代移动端信息流设计，参考微信读书 + 得到 App 风格
**Core Principles**: 
  1. 圆角卡片 + 微阴影营造层次感
  2. 品牌绿 #1DB954 贯穿全局作为主色
  3. 浅灰底 #F5F7FA 衬托白色卡片
  4. 中文排版优先，信息密度适中
**Color Philosophy**: 
  - 主色: #1DB954（品牌绿）
  - 背景: #F5F7FA（浅灰）
  - 卡片: #FFFFFF
  - 文字: #1A1A1A / #666666 / #999999
  - 领域色: 科技蓝/财经橙/政策绿/商情粉
**Layout Paradigm**: 
  - 手机端宽度 375px 居中展示（模拟小程序容器）
  - 顶部固定导航栏 + 筛选栏
  - 底部固定 TabBar（4 个 Tab）
  - 中间滚动内容区
**Signature Elements**: 
  1. 绿色脉冲实时指示器（顶部导航栏右侧）
  2. AI 评分圆形徽章（卡片右上角）
  3. 情绪标签（利好/利空/中性）
**Interaction Philosophy**: 
  - 点击卡片进入详情，底部 Sheet 弹出降噪选择器
  - Tab 切换带下划线动效
  - 下拉刷新、上拉加载更多
**Animation**: 
  - 页面切换：向左滑入（模拟小程序原生）
  - 卡片加载：骨架屏渐变
  - 脉冲动效：CSS keyframe 循环
**Typography System**: 
  - 字体: -apple-system, PingFang SC, sans-serif
  - 标题: 16px / 600
  - 摘要: 14px / 400
  - 元信息: 12px / 400 灰色
</text>
<probability>0.09</probability>
</response>

## 选定方案

选用**方案三：清新卡片流**，完整还原微澜小程序的 UI 风格，以手机端宽度（375px）居中展示，模拟真实小程序交互体验。
