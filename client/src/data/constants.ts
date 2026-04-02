import type { DomainConfig, NoiseLevelConfig, Article } from './types';

export const DOMAIN_CONFIGS: DomainConfig[] = [
  { key: 'tech', label: '科技', icon: '💻', description: '前沿技术、AI、芯片、云计算', color: '#1677FF', bgColor: '#E6F4FF' },
  { key: 'finance', label: '财经', icon: '📈', description: '宏观经济、股市、投融资', color: '#FA8C16', bgColor: '#FFF7E6' },
  { key: 'policy', label: '政策', icon: '🏛️', description: '监管政策、法律法规、贸易', color: '#52C41A', bgColor: '#F6FFED' },
  { key: 'commerce', label: '商情', icon: '📋', description: '招投标、商业情报、竞争分析', color: '#EB2F96', bgColor: '#FFF0F6' },
];

export const NOISE_LEVEL_CONFIGS: NoiseLevelConfig[] = [
  { key: 'open', label: '视野全开', icon: '📶', description: '全部资讯，不过滤', scoreThreshold: 0, dailyCount: '200+ 条/天' },
  { key: 'focus', label: '核心聚焦', icon: '🎯', description: 'AI 评分 60 分以上', scoreThreshold: 60, dailyCount: '约 80 条/天', recommended: true },
  { key: 'major', label: '重大事件', icon: '🔥', description: 'AI 评分 75 分以上', scoreThreshold: 75, dailyCount: '约 30 条/天' },
  { key: 'quake', label: '行业地震', icon: '⚡', description: 'AI 评分 88 分以上', scoreThreshold: 88, dailyCount: '约 5 条/天' },
];

export const REGION_CONFIGS = [
  { key: 'all', label: '全部' },
  { key: 'domestic', label: '国内' },
  { key: 'international', label: '国际' },
];

export const SUGGESTED_RADAR_WORDS = [
  'GPT-5', 'OpenAI', 'A股', '新能源', '半导体',
  '大模型', '美联储', '招投标', '政策监管', '芯片',
  '人工智能', '降息', '碳中和', '数字经济',
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'OpenAI 发布 GPT-5，多模态能力大幅提升，推理速度提升 3 倍',
    summary: 'OpenAI 正式发布 GPT-5 模型，在数学推理、代码生成和多模态理解方面取得重大突破。新模型在 MMLU 基准测试中达到 92.3% 的准确率，较 GPT-4 提升约 8 个百分点。',
    content: 'OpenAI 正式发布 GPT-5 模型，在数学推理、代码生成和多模态理解方面取得重大突破。\n\nGPT-5 采用全新的混合专家架构（MoE），在保持推理质量的同时将推理速度提升了 3 倍。多模态能力方面，GPT-5 支持视频流输入（最长 30 分钟），并能实时处理音频、图像和文本的混合输入。\n\nAPI 调用价格较 GPT-4o 下降 50%，企业版同步发布，含私有化部署选项。OpenAI 表示，GPT-5 将在未来两周内向所有 ChatGPT Plus 用户开放。\n\n多位业内专家表示，GPT-5 的发布将进一步加速企业 AI 应用落地，特别是在代码辅助、文档处理和客户服务领域。',
    contentEn: 'OpenAI has officially released GPT-5, achieving major breakthroughs in mathematical reasoning, code generation, and multimodal understanding. The new model achieves 92.3% accuracy on the MMLU benchmark.\n\nGPT-5 adopts a new Mixture of Experts (MoE) architecture, tripling inference speed while maintaining reasoning quality. GPT-5 supports video stream input (up to 30 minutes) and can process mixed inputs in real-time.\n\nAPI call prices are 50% lower than GPT-4o, with an enterprise version released simultaneously.',
    domain: 'tech', region: 'international', source: 'TechCrunch', publishTime: '2小时前',
    aiScore: 95, sentiment: 'positive', radarWords: ['GPT-5', 'OpenAI'], tags: ['OpenAI', 'GPT-5', '大模型', '多模态'],
    isAiTranslated: true, likeCount: 128, collectCount: 56, isLiked: false, isCollected: false,
    aiSummary: 'OpenAI 正式发布 GPT-5，推理速度提升 3 倍，API 价格下降 50%，将加速企业 AI 应用落地。',
    aiKeyPoints: ['多模态理解能力提升 3 倍，支持视频流输入（最长 30 分钟）', 'API 调用价格下降 50%，企业版同步发布含私有化部署', '推理速度提升 3 倍，平均延迟降至 200ms 以内'],
    aiQuestions: ['这项技术的商业化落地难点？', '国内有哪些类似竞争者？', '对开发者意味着什么？', '技术指标提升了多少？'],
  },
  {
    id: 2,
    title: '美联储宣布降息 25 个基点，A 股港股双双大涨超 2%',
    summary: '美联储在 12 月议息会议上宣布降息 25 个基点，联邦基金利率目标区间降至 4.25%-4.5%。受此消息影响，A 股三大指数集体上涨，沪指涨幅超 2%。',
    content: '美联储在 12 月议息会议上宣布降息 25 个基点，联邦基金利率目标区间降至 4.25%-4.5%。这是美联储今年第三次降息，累计降息 100 个基点。\n\n受此消息影响，A 股三大指数集体上涨，沪指涨幅超 2%，深证成指涨幅约 2.5%，创业板指涨幅约 3%。港股恒生指数涨幅约 1.8%。\n\n多位经济学家表示，美联储明年降息节奏或将放缓，预计全年降息 2-3 次，每次 25 个基点。',
    domain: 'finance', region: 'international', source: '财联社', publishTime: '4小时前',
    aiScore: 88, sentiment: 'positive', radarWords: ['美联储', 'A股'], tags: ['美联储', '降息', 'A股', '港股'],
    isAiTranslated: false, likeCount: 256, collectCount: 89, isLiked: true, isCollected: false,
    aiSummary: '美联储年内第三次降息 25bp，A 股港股双双大涨，沪指涨超 2%。明年降息节奏或放缓。',
    aiKeyPoints: ['美联储降息 25bp，今年累计降息 100bp', 'A 股沪指涨超 2%，创业板涨约 3%', '明年预计降息 2-3 次，节奏放缓'],
    aiQuestions: ['这件事对 A 股有什么影响？', '哪些行业板块会受益？', '用一句话总结核心观点', '有哪些相关背景信息？'],
  },
  {
    id: 3,
    title: '工信部发布《人工智能大模型安全管理办法》，明确备案要求',
    summary: '工信部正式发布《人工智能大模型安全管理办法》，要求向社会公众提供服务的大模型须在 30 日内完成备案，并明确了数据安全、算法透明度等核心要求。',
    content: '工信部正式发布《人工智能大模型安全管理办法》，这是继网信办《生成式人工智能服务管理暂行办法》之后，又一重要行业监管文件。\n\n核心要求：\n1. 向社会公众提供服务的大模型须在 30 日内完成备案\n2. 训练数据须符合数据安全法规，不得使用违法违规数据\n3. 须建立算法透明度报告制度，定期向主管部门报告\n\n业内人士表示，此次管理办法的出台将进一步规范大模型市场，头部企业影响较小，中小企业合规成本将有所上升。',
    domain: 'policy', region: 'domestic', source: '人民日报', publishTime: '6小时前',
    aiScore: 82, sentiment: 'neutral', radarWords: ['政策监管', '大模型'], tags: ['工信部', '大模型', '监管', '备案'],
    isAiTranslated: false, likeCount: 89, collectCount: 45, isLiked: false, isCollected: true,
    aiSummary: '工信部发布大模型安全管理办法，公众服务大模型须 30 日内备案，明确数据安全和算法透明度要求。',
    aiKeyPoints: ['公众服务大模型须 30 日内备案', '训练数据须符合数据安全法规', '须建立算法透明度报告制度'],
    aiQuestions: ['这项政策的执行时间表？', '对哪些企业影响最大？', '与之前政策有何不同？', '合规要求有哪些？'],
  },
  {
    id: 4,
    title: '某央企发布智慧城市建设项目招标公告，预算 3.2 亿元',
    summary: '某央企发布智慧城市综合管理平台建设项目招标公告，项目预算 3.2 亿元，要求投标方具备智慧城市相关资质，截止投标时间为本月底。',
    content: '某央企发布智慧城市综合管理平台建设项目招标公告，项目预算 3.2 亿元。\n\n项目概况：\n- 项目名称：智慧城市综合管理平台建设项目\n- 预算金额：3.2 亿元\n- 建设周期：18 个月\n- 截止投标：本月底\n\n资质要求：投标方须具备智慧城市相关资质，具有同类项目建设经验，近三年营业额不低于 5 亿元。',
    domain: 'commerce', region: 'domestic', source: '中国招标网', publishTime: '8小时前',
    aiScore: 76, sentiment: 'neutral', radarWords: ['招投标'], tags: ['招投标', '智慧城市', '央企', '政府采购'],
    isAiTranslated: false, likeCount: 34, collectCount: 67, isLiked: false, isCollected: false,
    aiSummary: '央企发布 3.2 亿元智慧城市平台建设招标，建设周期 18 个月，本月底截止投标。',
    aiKeyPoints: ['项目预算 3.2 亿元，建设周期 18 个月', '要求投标方具备智慧城市相关资质', '近三年营业额不低于 5 亿元'],
    aiQuestions: ['这个项目的招标条件？', '有哪些潜在竞争对手？', '项目的商业价值分析', '类似项目有哪些参考？'],
  },
  {
    id: 5,
    title: '华为发布 Mate 70 系列，搭载麒麟 9020 芯片，支持卫星通话',
    summary: '华为正式发布 Mate 70 系列旗舰手机，搭载自研麒麟 9020 芯片，支持双向卫星通话，影像系统全面升级，起售价 5999 元。',
    content: '华为正式发布 Mate 70 系列旗舰手机，这是继 Mate 60 系列之后的又一重磅产品。\n\n核心配置：\n- 处理器：麒麟 9020，4nm 工艺\n- 卫星通话：支持双向卫星通话，全球首款\n- 影像：与徕卡合作，主摄 5000 万像素\n- 电池：6000mAh，支持 100W 有线快充\n\n发布后 10 分钟内预约量突破 100 万，多款配色已显示"缺货"状态。',
    domain: 'tech', region: 'domestic', source: '36氪', publishTime: '1天前',
    aiScore: 91, sentiment: 'positive', radarWords: ['华为', '芯片'], tags: ['华为', 'Mate70', '麒麟', '卫星通话'],
    isAiTranslated: false, likeCount: 445, collectCount: 123, isLiked: false, isCollected: false,
    aiSummary: '华为 Mate 70 搭载麒麟 9020 芯片，支持双向卫星通话，发布 10 分钟预约破百万。',
    aiKeyPoints: ['麒麟 9020 芯片，4nm 工艺', '全球首款支持双向卫星通话', '发布 10 分钟预约量突破 100 万'],
    aiQuestions: ['这项技术的商业化落地难点？', '国内有哪些类似竞争者？', '对开发者意味着什么？', '技术指标提升了多少？'],
  },
  {
    id: 6,
    title: '比亚迪 11 月销量再创历史新高，新能源汽车渗透率突破 50%',
    summary: '比亚迪 11 月销量达 50.6 万辆，同比增长 67.9%，再创历史新高。国内新能源汽车市场渗透率首次突破 50%，标志着新能源汽车进入主流市场。',
    content: '比亚迪 11 月销量达 50.6 万辆，同比增长 67.9%，再创历史新高。\n\n销量数据：\n- 乘用车：47.8 万辆（同比 +71.2%）\n- 商用车：2.8 万辆（同比 +23.4%）\n- 海外出口：3.2 万辆（同比 +102.3%）\n\n国内新能源汽车市场渗透率首次突破 50%，标志着新能源汽车正式进入主流市场，燃油车市场份额持续萎缩。',
    domain: 'finance', region: 'domestic', source: '汽车之家', publishTime: '1天前',
    aiScore: 85, sentiment: 'positive', radarWords: ['新能源'], tags: ['比亚迪', '新能源汽车', '销量', '渗透率'],
    isAiTranslated: false, likeCount: 312, collectCount: 78, isLiked: true, isCollected: true,
    aiSummary: '比亚迪 11 月销量 50.6 万辆创历史新高，新能源汽车渗透率首破 50%，进入主流市场。',
    aiKeyPoints: ['11 月销量 50.6 万辆，同比增长 67.9%', '海外出口 3.2 万辆，同比增长 102.3%', '新能源汽车渗透率首次突破 50%'],
    aiQuestions: ['这件事对 A 股有什么影响？', '哪些行业板块会受益？', '用一句话总结核心观点', '有哪些相关背景信息？'],
  },
];
