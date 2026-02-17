export type Language = 'en' | 'zh';

export interface Bilingual {
  en: string;
  zh: string;
}

export interface DayData {
  day: number;
  date: Bilingual;
  title: Bilingual;
  region: 'krabi' | 'lanta' | 'lipe' | 'travel' | 'penang';
  regionLabel: Bilingual;
  mapQuery: string;
  accommodation: Bilingual | null;
  activities: { en: string[]; zh: string[] };
}

export interface PenangCategory {
  title: Bilingual;
  icon: string;
  items: Bilingual[];
}

export interface TipSection {
  title: Bilingual;
  icon: string;
  items: Bilingual[];
}

export const regionColors: Record<string, { bg: string; text: string; light: string; border: string; dot: string }> = {
  krabi:  { bg: 'bg-blue-600',    text: 'text-blue-700',    light: 'bg-blue-50',    border: 'border-blue-400',   dot: 'bg-blue-500' },
  lanta:  { bg: 'bg-emerald-600', text: 'text-emerald-700', light: 'bg-emerald-50', border: 'border-emerald-400', dot: 'bg-emerald-500' },
  lipe:   { bg: 'bg-cyan-600',    text: 'text-cyan-700',    light: 'bg-cyan-50',    border: 'border-cyan-400',   dot: 'bg-cyan-500' },
  travel: { bg: 'bg-amber-600',   text: 'text-amber-700',   light: 'bg-amber-50',   border: 'border-amber-400',  dot: 'bg-amber-500' },
  penang: { bg: 'bg-rose-600',    text: 'text-rose-700',    light: 'bg-rose-50',    border: 'border-rose-400',   dot: 'bg-rose-500' },
};

export const days: DayData[] = [
  // ===== AO NANG & KRABI (Days 1-2) =====
  {
    day: 1,
    date: { en: 'Feb 27 (Thu)', zh: '2月27日（周四）' },
    title: { en: 'Arrival in Krabi & Check-in', zh: '抵达甲米并入住' },
    region: 'krabi',
    regionLabel: { en: 'Ao Nang & Krabi', zh: '安南和甲米' },
    mapQuery: 'Ao Nang, Krabi, Thailand',
    accommodation: { en: 'Ao Nang Townhouse (Ao Nang, Krabi 81180)', zh: 'Ao Nang Townhouse（泰国甲米 Ao Nang, Krabi 81180）' },
    activities: {
      en: [
        '✈️ Flight arrives at Krabi Airport at 18:05 (6:05 PM)',
        '🛂 Clear immigration and collect luggage',
        '🚕 Take taxi or pre-booked transfer to Ao Nang (approx. 30–40 min drive)',
        '🏨 Check in to Ao Nang Townhouse (check-in after 14:00) and rest',
        '🍜 Dinner at a nearby restaurant, then sleep early to adjust to the time zone',
      ],
      zh: [
        '✈️ 航班 18:05 抵达甲米机场（下午6:05）',
        '🛂 办理入境手续和取行李',
        '🚕 乘坐出租车或预订的接机服务前往安南（车程约30–40分钟）',
        '🏨 抵达后入住 Ao Nang Townhouse（14:00后可办理入住），稍作休息',
        '🍜 晚上在酒店附近找一家餐厅吃晚餐，早点休息适应时差',
      ],
    },
  },
  {
    day: 2,
    date: { en: 'Feb 28 (Fri)', zh: '2月28日（周五）' },
    title: { en: 'Railay Beach & Krabi Town', zh: 'Railay 海滩和甲米镇' },
    region: 'krabi',
    regionLabel: { en: 'Ao Nang & Krabi', zh: '安南和甲米' },
    mapQuery: 'Railay Beach, Krabi, Thailand',
    accommodation: { en: 'Ao Nang Townhouse', zh: 'Ao Nang Townhouse' },
    activities: {
      en: [
        '🛥️ Morning: Take a longtail boat from Ao Nang Beach to Railay Beach (about 10–15 min)',
        '🏖️ Spend the day swimming, sunbathing, exploring Railay and Phra Nang Beach, or watching rock climbers',
        '🚕 Afternoon: Return to Ao Nang, then head to Krabi Town by taxi or songthaew to explore the old town and riverside',
        '🌙 Evening: Dinner at a night market in Krabi Town (such as the Weekend Walking Street market)',
        '🏨 Return to Ao Nang Townhouse for the night',
      ],
      zh: [
        '🛥️ 早上从安南海滩乘长尾船前往 Railay Beach，船程约10–15分钟',
        '🏖️ 白天在 Railay 和 Phra Nang Beach 游泳、晒太阳、拍照或看攀岩',
        '🚕 下午返回安南后，乘车或双条车去甲米镇，逛老城区、河边步道',
        '🌙 晚上在甲米镇夜市吃晚餐（如周末的 Walking Street 市集）',
        '🏨 然后返回 Ao Nang Townhouse 住宿',
      ],
    },
  },

  // ===== KOH LANTA (Days 3-7) =====
  {
    day: 3,
    date: { en: 'Mar 1 (Sun)', zh: '3月1日（周日）' },
    title: { en: 'Transfer to Koh Lanta', zh: '前往兰塔岛' },
    region: 'lanta',
    regionLabel: { en: 'Koh Lanta', zh: '兰塔岛' },
    mapQuery: 'Sala Dan, Koh Lanta, Thailand',
    accommodation: { en: 'Sala Dan House', zh: 'Sala Dan House' },
    activities: {
      en: [
        '📦 Morning: Check out from Ao Nang Townhouse',
        '🚐 Travel from Ao Nang/Krabi to Koh Lanta (Sala Dan) by van + ferry (2.5–4 hours)',
        '🏨 Arrive in the afternoon, check in to Sala Dan House (after 14:00)',
        '🌅 Late afternoon: Walk to Long Beach area or explore Sala Dan village, enjoy sunset',
        '🍜 Evening: Dinner at a beachfront restaurant; ask tour agents about 4-island tours and Phi Phi day trips',
      ],
      zh: [
        '📦 早上：从 Ao Nang Townhouse 退房，准备前往兰塔岛',
        '🚐 从安南/甲米一带乘面包车+渡船前往兰塔岛 Sala Dan，车船合计约2.5–4小时',
        '🏨 下午抵达后，入住 Sala Dan House（14:00后可办理入住）',
        '🌅 傍晚：步行前往 Long Beach 一带或在 Sala Dan 小镇逛逛，看日落',
        '🍜 晚上：在海边餐厅吃饭，并在旅行社咨询四岛游和皮皮岛一日游',
      ],
    },
  },
  {
    day: 4,
    date: { en: 'Mar 2 (Mon)', zh: '3月2日（周一）' },
    title: { en: 'Island Exploration', zh: '兰塔环岛探索' },
    region: 'lanta',
    regionLabel: { en: 'Koh Lanta', zh: '兰塔岛' },
    mapQuery: 'Koh Lanta Old Town, Thailand',
    accommodation: { en: 'Sala Dan House', zh: 'Sala Dan House' },
    activities: {
      en: [
        '🛵 Spend the day exploring Koh Lanta by scooter or tuk-tuk',
        '🏖️ Visit quiet southern beaches, viewpoints, and cafés',
        '🏘️ Explore Lanta Old Town',
        '🏞️ If energy and weather allow, visit the national park & lighthouse area for cliff and sea views',
        '🌙 Evening: Dine near Sala Dan House and sleep early',
      ],
      zh: [
        '🛵 白天租摩托车或坐嘟嘟车环岛',
        '🏖️ 去南部僻静海滩、各个观景点和咖啡馆',
        '🏘️ 顺路逛 Lanta Old Town',
        '🏞️ 视体力和天气，可以去国家公园灯塔附近看悬崖和海景',
        '🌙 晚上回到 Sala Dan 一带吃饭，早睡，为第二天出海做准备',
      ],
    },
  },
  {
    day: 5,
    date: { en: 'Mar 3 (Tue)', zh: '3月3日（周二）' },
    title: { en: 'Four Islands Tour', zh: '四岛游' },
    region: 'lanta',
    regionLabel: { en: 'Koh Lanta', zh: '兰塔岛' },
    mapQuery: 'Koh Lanta Four Islands, Thailand',
    accommodation: { en: 'Sala Dan House', zh: 'Sala Dan House' },
    activities: {
      en: [
        '🛥️ Join a 4-island tour from Koh Lanta (pickup from Sala Dan area)',
        '🤿 Snorkeling, beach stops on small islands, and visit to Emerald Cave',
        '🍱 Simple lunch on board or on a beach',
        '🏖️ Spend the day in clear water between islands',
        '💆 Return by late afternoon; dinner by the sea and enjoy a relaxing massage',
      ],
      zh: [
        '🛥️ 参加从兰塔出发的「四岛游」，从 Sala Dan 一带接送',
        '🤿 浮潜、在小岛沙滩上停留，游泳穿过 Emerald Cave 到隐藏小泻湖',
        '🍱 午餐在船上或小岛上简单解决',
        '🏖️ 白天在清澈海水里浮潜、玩沙',
        '💆 傍晚返回兰塔岛，在海边吃饭，做个按摩放松',
      ],
    },
  },
  {
    day: 6,
    date: { en: 'Mar 4 (Wed)', zh: '3月4日（周三）' },
    title: { en: 'Phi Phi Islands Day Trip', zh: '皮皮岛一日游' },
    region: 'lanta',
    regionLabel: { en: 'Koh Lanta', zh: '兰塔岛' },
    mapQuery: 'Phi Phi Islands, Thailand',
    accommodation: { en: 'Sala Dan House', zh: 'Sala Dan House' },
    activities: {
      en: [
        '🛥️ Morning: Take a speedboat or ferry from Koh Lanta to the Phi Phi Islands',
        '📸 Visit Maya Bay, Pileh Lagoon, and Monkey Bay with snorkeling included',
        '🍱 Lunch on the boat or on Phi Phi Don; free time to walk around Tonsai area',
        '🏖️ Return to Koh Lanta in the afternoon',
        '🍹 Relax at Sala Dan House, casual dinner and drinks in the evening',
      ],
      zh: [
        '🛥️ 早上从兰塔乘快艇或渡船前往皮皮群岛',
        '📸 行程包括 Maya Bay、Pileh Lagoon、Monkey Bay，并安排浮潜时间',
        '🍱 中午在皮皮 Don 岛或船上吃午餐，有自由时间在 Tonsai 一带走走',
        '🏖️ 下午返回兰塔岛',
        '🍹 傍晚回到 Sala Dan House 休息，晚上轻松吃饭、喝点东西',
      ],
    },
  },
  {
    day: 7,
    date: { en: 'Mar 5 (Thu)', zh: '3月5日（周四）' },
    title: { en: 'Free Day & Preparation', zh: '自由活动和准备' },
    region: 'lanta',
    regionLabel: { en: 'Koh Lanta', zh: '兰塔岛' },
    mapQuery: 'Sala Dan, Koh Lanta, Thailand',
    accommodation: { en: 'Sala Dan House (last night)', zh: 'Sala Dan House（最后一晚）' },
    activities: {
      en: [
        '😴 Full relax day: sleep in, spend time on your favourite beach',
        '🧘 Optional: yoga class or Thai cooking class',
        '🛒 Afternoon: Buy essentials — sunscreen, seasickness pills, water, dry bag',
        '🎫 Reconfirm ferry and transfer time to Koh Lipe from Saladan Pier',
        '🧳 Pack bags in the evening and get an early night',
      ],
      zh: [
        '😴 完全放松：睡个懒觉，在最喜欢的海滩再躺一整天',
        '🧘 可选：去上瑜伽课、泰国料理课',
        '🛒 下午买好路上需要的东西（防晒、晕船药、水、防水包等）',
        '🎫 确认明天从 Saladan 码头前往丽贝岛的船票和接送时间',
        '🧳 晚上整理行李，早点休息',
      ],
    },
  },

  // ===== KOH LIPE (Days 8-12) =====
  {
    day: 8,
    date: { en: 'Mar 6 (Fri)', zh: '3月6日（周五）' },
    title: { en: 'Transfer to Koh Lipe', zh: '前往丽贝岛' },
    region: 'lipe',
    regionLabel: { en: 'Koh Lipe', zh: '丽贝岛' },
    mapQuery: 'Koh Lipe, Thailand',
    accommodation: { en: 'Varin Beach Resort (check-in after 15:00)', zh: 'Varin Beach Resort（15:00后入住）' },
    activities: {
      en: [
        '📦 Morning: Check out from Sala Dan House and head to Saladan Pier',
        '🛥️ Take booked speedboat/ferry from Saladan Pier to Koh Lipe Pattaya Beach (~10:30 departure, 2.5–3 hrs)',
        '🏨 Arrive around midday; walk or short transfer to Varin Beach Resort; check in after 15:00',
        '🏖️ Afternoon: Walk along Pattaya Beach or Sunrise Beach, explore the three main beaches and Walking Street',
        '🍜 Evening: Choose a restaurant along Walking Street for your first island dinner',
      ],
      zh: [
        '📦 早上退房后前往 Saladan 码头',
        '🛥️ 乘坐已预订的快艇/渡船前往丽贝岛 Pattaya Beach，约10:30出发，航程约2.5–3小时',
        '🏨 中午或下午早些时候抵达，步行或短程接驳前往 Varin Beach Resort；15:00后可办理入住',
        '🏖️ 下午：在 Pattaya Beach 或 Sunrise Beach 散步，熟悉三大海滩和 Walking Street 的大致方向',
        '🍜 晚上：在 Walking Street 上找餐厅吃饭，感受小岛夜晚氛围',
      ],
    },
  },
  {
    day: 9,
    date: { en: 'Mar 7 (Sat)', zh: '3月7日（周六）' },
    title: { en: 'Snorkeling & Island Hopping', zh: '浮潜和跳岛' },
    region: 'lipe',
    regionLabel: { en: 'Koh Lipe', zh: '丽贝岛' },
    mapQuery: 'Koh Lipe, Satun, Thailand',
    accommodation: { en: 'Varin Beach Resort', zh: 'Varin Beach Resort' },
    activities: {
      en: [
        '🤿 Join a half-day or full-day snorkeling trip around Koh Lipe',
        '🐠 Visit nearby islands for coral reefs and tropical fish',
        '🍱 Simple lunch on a small island or on the boat',
        '🏖️ Relax on quiet sandy beaches',
        '🌅 Return by late afternoon for sunset on the beach, then revisit a favourite restaurant',
      ],
      zh: [
        '🤿 参加半日或一日的浮潜团，去丽贝周边小岛',
        '🐠 看珊瑚和热带鱼',
        '🍱 中午一般在小岛或船上吃简餐',
        '🏖️ 在无人小沙滩上发呆',
        '🌅 傍晚回到丽贝本岛看日落，晚上回到喜欢的餐厅用餐',
      ],
    },
  },
  {
    day: 10,
    date: { en: 'Mar 8 (Sun)', zh: '3月8日（周日）' },
    title: { en: 'Sunrise & Relaxation', zh: '日出和放空' },
    region: 'lipe',
    regionLabel: { en: 'Koh Lipe', zh: '丽贝岛' },
    mapQuery: 'Sunrise Beach, Koh Lipe, Thailand',
    accommodation: { en: 'Varin Beach Resort', zh: 'Varin Beach Resort' },
    activities: {
      en: [
        '🌅 Wake up early to watch sunrise at Sunrise Beach',
        '☕ Breakfast at a beachfront café',
        '🏖️ Keep the daytime schedule empty: swim, sunbathe, read, and relax',
        '📖 No fixed plan — enjoy freedom',
        '💆 Evening: Foot or full-body massage, stay in island-chill mode',
      ],
      zh: [
        '🌅 早起去 Sunrise Beach 看日出',
        '☕ 然后在海边咖啡馆吃早餐',
        '🏖️ 白天什么都不用安排：游泳、晒太阳、看书、发呆',
        '📖 随心所欲，没有固定计划',
        '💆 晚上做个脚部或全身按摩，继续小岛躺平模式',
      ],
    },
  },
  {
    day: 11,
    date: { en: 'Mar 9 (Mon)', zh: '3月9日（周一）' },
    title: { en: 'Resort Day', zh: '度假村日' },
    region: 'lipe',
    regionLabel: { en: 'Koh Lipe', zh: '丽贝岛' },
    mapQuery: 'Varin Beach Resort, Koh Lipe, Thailand',
    accommodation: { en: 'Varin Beach Resort', zh: 'Varin Beach Resort' },
    activities: {
      en: [
        '🏖️ Spend the day at Varin Beach Resort or a beach bar with a great view',
        '🍹 Enjoy drinks, swimming, and taking photos',
        '🏊 Afternoon: Hang out by the pool or on the sand',
        '📸 Chat and watch the sky change colours',
        '🍽️ Evening: Choose a slightly fancier restaurant for a "special" dinner',
      ],
      zh: [
        '🏖️ 在 Varin Beach Resort 或某家视野好的海滩酒吧度过一整天',
        '🍹 点饮料、游泳、拍照',
        '🏊 下午在泳池边或沙滩上拍照、聊天',
        '📸 看天色慢慢变化',
        '🍽️ 晚上找一家稍正式一点的餐厅，来一顿有「仪式感」的晚餐',
      ],
    },
  },
  {
    day: 12,
    date: { en: 'Mar 10 (Tue)', zh: '3月10日（周二）' },
    title: { en: 'Check-out & Flexible Day', zh: '退房 + 机动日' },
    region: 'travel',
    regionLabel: { en: 'Travel Day', zh: '旅行日' },
    mapQuery: 'Koh Lipe, Thailand',
    accommodation: null,
    activities: {
      en: [
        '📦 Morning: Check out of Varin Beach Resort before 10:00; leave luggage at hotel if boat is later',
        '🔄 Buffer day: repeat any activity you loved, or reschedule weather-affected trips',
        '🛥️ Depart Koh Lipe by ferry to Malaysia (Langkawi Kuah Jetty or Telaga Harbour) or Thai mainland port',
        '✈️ Continue towards Penang by flight, bus, train, or combination',
        '🌙 If breaking the journey, overnight in Langkawi or a mainland town',
      ],
      zh: [
        '📦 早上10:00前从 Varin Beach Resort 退房，如乘船时间较晚可以寄存行李',
        '🔄 把这一天当机动：如果前面天气不好或特别喜欢某个活动，可以再安排一次',
        '🛥️ 从丽贝乘船前往马来西亚（兰卡威 Kuah Jetty 或 Telaga Harbour），或到泰国本土港口',
        '✈️ 再转飞机、巴士或火车前往槟城',
        '🌙 若中途在兰卡威或本土城市过夜，将「前往槟城」顺延到第二天',
      ],
    },
  },

  // ===== TRAVEL DAY =====
  {
    day: 13,
    date: { en: 'approx. Mar 11 (Wed)', zh: '约3月11日（周三）' },
    title: { en: 'Transfer to Penang', zh: '前往槟城' },
    region: 'travel',
    regionLabel: { en: 'Travel Day', zh: '旅行日' },
    mapQuery: 'George Town, Penang, Malaysia',
    accommodation: { en: 'Hotel near George Town, Penang', zh: '槟城乔治市附近酒店' },
    activities: {
      en: [
        '🛥️ Morning: Leave Koh Lipe by ferry, via Langkawi or Kuala Perlis',
        '🚌 Continue to Penang by bus, train, or short flight (e.g. Langkawi–Penang flight, or bus/train from Kuala Perlis to Butterworth)',
        '⛴️ Ferry from Butterworth to George Town if taking land route',
        '🏨 Arrive in Penang and check in to a hotel near George Town',
        '🍜 Evening: Simple dinner near accommodation and rest',
      ],
      zh: [
        '🛥️ 早上从丽贝坐船离开泰国，经兰卡威或 Kuala Perlis 中转',
        '🚌 再转巴士、火车或短程航班前往槟城（例如兰卡威飞槟城，或从 Kuala Perlis 到 Butterworth）',
        '⛴️ 如走陆路，从 Butterworth 坐渡船到乔治市',
        '🏨 抵达槟城后，入住乔治市附近酒店',
        '🍜 晚上在酒店附近简单吃饭，早点休息',
      ],
    },
  },

  // ===== PENANG WEEK 1 (Days 14-19) =====
  {
    day: 14,
    date: { en: '≈ Mar 12 (Thu)', zh: '≈ 3月12日（周四）' },
    title: { en: 'George Town Walking Tour & Street Art', zh: '乔治市徒步和街头艺术' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'Armenian Street, George Town, Penang, Malaysia',
    accommodation: { en: 'George Town Hotel', zh: '乔治市酒店' },
    activities: {
      en: [
        '🚶 Explore UNESCO Heritage Zone: Armenian Street, Love Lane, and surroundings',
        '🎨 Street art hunting: "Kids on Bicycle", "Brother and Sister on a Swing" and more',
        '🏛️ Visit shophouses, temples, and creative cafés',
        '🍜 Hawker lunch at Chulia Street or nearby food centre',
        '🌙 Evening: Explore more of George Town at night',
      ],
      zh: [
        '🚶 探索联合国世界文化遗产老城：Armenian Street、Love Lane 一带',
        '🎨 街头艺术打卡：寻找"骑脚踏车的小孩""姐弟共骑"等经典壁画',
        '🏛️ 逛老店屋、寺庙和创意咖啡馆',
        '🍜 在 Chulia Street 或附近小贩中心吃午餐',
        '🌙 晚上继续探索乔治市夜景',
      ],
    },
  },
  {
    day: 15,
    date: { en: '≈ Mar 13 (Fri)', zh: '≈ 3月13日（周五）' },
    title: { en: 'Penang Hill + Kek Lok Si Temple', zh: '升旗山 + 极乐寺' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'Penang Hill, Malaysia',
    accommodation: { en: 'George Town Hotel', zh: '乔治市酒店' },
    activities: {
      en: [
        '🚡 Take the funicular up Penang Hill for island views',
        '🌿 Walk rainforest trails or The Habitat canopy walk',
        '🛕 Visit Kek Lok Si Temple: Ten Thousand Buddhas Pagoda, Kuan Yin statue, and colourful lanterns',
        '📸 Take photos of the stunning hilltop views',
        '🍜 Dinner in George Town',
      ],
      zh: [
        '🚡 乘坐缆车上升旗山，看全岛景色',
        '🌿 在 The Habitat 雨林步道和树冠走道散步',
        '🛕 参观极乐寺：万佛塔、观音像和灯笼长廊',
        '📸 拍摄山顶美景',
        '🍜 晚上在乔治市吃晚餐',
      ],
    },
  },
  {
    day: 16,
    date: { en: '≈ Mar 14 (Sat)', zh: '≈ 3月14日（周六）' },
    title: { en: 'Food Tour & Heritage Mansions', zh: '美食团和文化馆' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'Cheong Fatt Tze Mansion, Penang, Malaysia',
    accommodation: { en: 'George Town Hotel', zh: '乔治市酒店' },
    activities: {
      en: [
        '🍜 Join a guided food tour in George Town: char kway teow, laksa, Hokkien mee, nasi lemak, and more',
        '🏛️ Visit The Blue Mansion (Cheong Fatt Tze): restored Chinese mansion with East-West architecture',
        '🏛️ Visit Pinang Peranakan Mansion: learn about Baba-Nyonya history through furniture, costumes, and décor',
        '🏛️ Optional: Visit Khoo Kongsi Clan House, one of the grandest Chinese clan houses',
        '☕ Afternoon tea at Eastern & Oriental Hotel',
      ],
      zh: [
        '🍜 报名当地美食徒步团：尝试炒粿条、叻沙、福建面、椰浆饭等',
        '🏛️ 参观蓝屋（Cheong Fatt Tze）：中西合璧的华人豪宅',
        '🏛️ 参观娘惹文化馆（Pinang Peranakan Mansion）：通过家具、服饰了解峇峇娘惹文化',
        '🏛️ 可选：参观邱公司（Khoo Kongsi），装饰华丽的宗祠',
        '☕ 去东姑与东方酒店（E&O）体验经典英式下午茶',
      ],
    },
  },
  {
    day: 17,
    date: { en: '≈ Mar 15 (Sun)', zh: '≈ 3月15日（周日）' },
    title: { en: 'Penang National Park Hike', zh: '槟城国家公园徒步' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'Penang National Park, Malaysia',
    accommodation: { en: 'George Town Hotel', zh: '乔治市酒店' },
    activities: {
      en: [
        '🥾 Hike through rainforest trails in Penang National Park',
        '🐢 Visit Turtle Beach or Monkey Beach',
        '🦎 Chances to see wildlife and conservation areas',
        '🍱 Pack lunch or eat at the park entrance',
        '🌙 Evening: Rest and recover in George Town',
      ],
      zh: [
        '🥾 在槟城国家公园走雨林步道',
        '🐢 前往 Turtle Beach 或 Monkey Beach',
        '🦎 有机会看到野生动物和保护区',
        '🍱 带午餐或在公园入口处吃',
        '🌙 晚上在乔治市休息恢复',
      ],
    },
  },
  {
    day: 18,
    date: { en: '≈ Mar 16 (Mon)', zh: '≈ 3月16日（周一）' },
    title: { en: 'Relaxation Day & Gurney Drive Sunset', zh: '放松日和 Gurney Drive 看日落' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'Gurney Drive, Penang, Malaysia',
    accommodation: { en: 'George Town Hotel', zh: '乔治市酒店' },
    activities: {
      en: [
        '😴 Sleep in and have a late breakfast',
        '🏖️ Light activity: stroll around George Town, visit quirky museums like Wonderfood Museum',
        '🌅 Walk along Gurney Drive seafront around sunset',
        '🍜 Dinner at Gurney Drive hawker centre',
        '💆 Get a massage to unwind',
      ],
      zh: [
        '😴 睡个懒觉，晚点吃早餐',
        '🏖️ 轻松活动：在乔治市随便走走，可以去 Wonderfood Museum 等趣味博物馆',
        '🌅 傍晚在 Gurney Drive 海边步道散步看日落',
        '🍜 在 Gurney Drive 小贩中心吃晚餐',
        '💆 做个按摩放松',
      ],
    },
  },
  {
    day: 19,
    date: { en: '≈ Mar 17 (Tue)', zh: '≈ 3月17日（周二）' },
    title: { en: 'Batu Ferringhi Beach + Night Market', zh: '峇都丁宜海滩 + 夜市' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'Batu Ferringhi Beach, Penang, Malaysia',
    accommodation: { en: 'George Town Hotel', zh: '乔治市酒店' },
    activities: {
      en: [
        '🏖️ Spend the day at Batu Ferringhi beach',
        '🏊 Swimming, sunbathing, and beach walks',
        '🛍️ Evening: Browse the Batu Ferringhi night market',
        '🍜 Try street food stalls',
        '🚕 Return to George Town',
      ],
      zh: [
        '🏖️ 白天在峇都丁宜海滩散步、玩水',
        '🏊 游泳、晒太阳',
        '🛍️ 晚上逛峇都丁宜夜市',
        '🍜 吃路边摊小吃',
        '🚕 返回乔治市',
      ],
    },
  },

  // ===== PENANG WEEK 2 (Days 20-26) =====
  {
    day: 20,
    date: { en: '≈ Mar 18 (Wed)', zh: '≈ 3月18日（周三）' },
    title: { en: 'Balik Pulau Countryside Cycling', zh: 'Balik Pulau 乡村骑行' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'Balik Pulau, Penang, Malaysia',
    accommodation: { en: 'George Town Hotel', zh: '乔治市酒店' },
    activities: {
      en: [
        '🚲 Join a cycling or countryside tour in Balik Pulau',
        '🌾 Ride through rice fields, villages, and orchards',
        '🍈 Taste tropical fruits along the way',
        '📸 See a different, rural side of Penang island',
        '🌙 Return to George Town for dinner',
      ],
      zh: [
        '🚲 参加 Balik Pulau 骑行或乡村游',
        '🌾 穿过稻田、小村庄和果园',
        '🍈 沿途品尝热带水果',
        '📸 看看岛的另一面',
        '🌙 返回乔治市吃晚餐',
      ],
    },
  },
  {
    day: 21,
    date: { en: '≈ Mar 19 (Thu)', zh: '≈ 3月19日（周四）' },
    title: { en: 'Entopia + Tropical Fruit Farm', zh: '蝴蝶园 + 热带水果园' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'Entopia by Penang Butterfly Farm, Malaysia',
    accommodation: { en: 'George Town Hotel', zh: '乔治市酒店' },
    activities: {
      en: [
        '🦋 Visit Entopia Butterfly Farm: see butterflies and insects',
        '🍉 Head to Tropical Fruit Farm for tastings and guided tour',
        '📸 Photo opportunities in beautiful garden settings',
        '🍜 Lunch at the farm or nearby',
        '🌙 Relaxed evening in George Town',
      ],
      zh: [
        '🦋 参观 Entopia 蝴蝶公园：看各种蝴蝶和昆虫',
        '🍉 去 Tropical Fruit Farm 品尝热带水果或参加导览',
        '📸 在美丽的花园里拍照',
        '🍜 在农场或附近吃午餐',
        '🌙 晚上在乔治市轻松度过',
      ],
    },
  },
  {
    day: 22,
    date: { en: '≈ Mar 20 (Fri)', zh: '≈ 3月20日（周五）' },
    title: { en: 'Free Day: Museums & Shopping', zh: '自由日：博物馆、购物或休息' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'George Town, Penang, Malaysia',
    accommodation: { en: 'George Town Hotel', zh: '乔治市酒店' },
    activities: {
      en: [
        '🎯 Completely flexible day',
        '🏛️ Option: Visit Wonderfood Museum, Upside Down Museum, or other fun museums',
        '🛍️ Option: Go shopping in George Town',
        '😴 Option: Just rest and enjoy the hotel',
        '🍜 Try any food you haven\'t tried yet!',
      ],
      zh: [
        '🎯 完全自由的一天',
        '🏛️ 可选：去 Wonderfood Museum、倒立博物馆等轻松打卡拍照',
        '🛍️ 可选：在乔治市购物',
        '😴 可选：就在酒店休息',
        '🍜 尝试还没有试过的美食！',
      ],
    },
  },
  {
    day: 23,
    date: { en: '≈ Mar 21 (Sat)', zh: '≈ 3月21日（周六）' },
    title: { en: 'Cooking Class + Trishaw Tour', zh: '烹饪课 + 三轮车游' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'George Town, Penang, Malaysia',
    accommodation: { en: 'George Town Hotel', zh: '乔治市酒店' },
    activities: {
      en: [
        '👨‍🍳 Join a cooking class: learn to cook Malaysian or Nyonya dishes like laksa or curry',
        '🍜 Enjoy the dishes you cooked for lunch',
        '🛺 Afternoon: Join a trishaw ride to cover more of the old town in a relaxed way',
        '🏛️ Visit mosques, churches, and temples to learn about multicultural heritage',
        '🎶 Evening: Visit a night market with live entertainment if available',
      ],
      zh: [
        '👨‍🍳 参加烹饪课：学习制作叻沙、咖喱等马来或娘惹料理',
        '🍜 中午享用自己做的菜',
        '🛺 下午参加三轮车游，在晚风中慢慢逛老城',
        '🏛️ 路过清真寺、教堂、庙宇，了解多元文化',
        '🎶 晚上逛有街头表演的夜市',
      ],
    },
  },
  {
    day: 24,
    date: { en: '≈ Mar 22 (Sun)', zh: '≈ 3月22日（周日）' },
    title: { en: 'ESCAPE Theme Park (Full Day)', zh: 'ESCAPE 主题乐园（全天）' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'ESCAPE Penang, Malaysia',
    accommodation: { en: 'George Town Hotel', zh: '乔治市酒店' },
    activities: {
      en: [
        '🎢 Full day at ESCAPE Penang',
        '🧗 Rope courses and zip lines',
        '🌊 Water slides and water activities',
        '🍱 Lunch at the park',
        '🌙 Return to George Town tired but happy!',
      ],
      zh: [
        '🎢 在 ESCAPE 玩一整天',
        '🧗 绳索、高空滑索',
        '🌊 滑水道和水上活动',
        '🍱 在乐园里吃午餐',
        '🌙 晚上带着疲惫但开心的心情返回乔治市！',
      ],
    },
  },
  {
    day: 25,
    date: { en: '≈ Mar 23 (Mon)', zh: '≈ 3月23日（周一）' },
    title: { en: 'Cameron Highlands Day Trip (Optional)', zh: '金马仑高原一日游（可选）' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'Cameron Highlands, Malaysia',
    accommodation: { en: 'George Town Hotel', zh: '乔治市酒店' },
    activities: {
      en: [
        '🚌 Optional day trip to Cameron Highlands (about 3–4 hours drive each way)',
        '🍵 Visit tea plantations and strawberry farms',
        '🌿 Enjoy the cool highland climate',
        '📸 Beautiful scenery and photo opportunities',
        '🌙 Return to Penang in the evening (or skip this and have a free day)',
      ],
      zh: [
        '🚌 可选：前往金马仑高原一日游（单程约3–4小时车程）',
        '🍵 参观茶园和草莓农场',
        '🌿 享受凉爽的高原气候',
        '📸 美丽的风景和拍照机会',
        '🌙 晚上返回槟城（或者跳过这天，当自由日）',
      ],
    },
  },
  {
    day: 26,
    date: { en: '≈ Mar 24 (Tue)', zh: '≈ 3月24日（周二）' },
    title: { en: 'Free Day & Farewell Dinner', zh: '自由日，最后购物，告别晚餐' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'George Town, Penang, Malaysia',
    accommodation: { en: 'George Town Hotel', zh: '乔治市酒店' },
    activities: {
      en: [
        '🎯 Final free day in Penang',
        '🛍️ Last-minute shopping for souvenirs',
        '📸 Revisit favourite spots for final photos',
        '🍜 Final hawker food run — eat everything you\'ll miss!',
        '🍽️ Farewell dinner at a special restaurant',
      ],
      zh: [
        '🎯 在槟城的最后一个自由日',
        '🛍️ 最后买些纪念品',
        '📸 重访最喜欢的地方拍最后的照片',
        '🍜 最后一次扫荡小贩中心——把会想念的都吃一遍！',
        '🍽️ 在一家特别的餐厅吃告别晚餐',
      ],
    },
  },
];

export const penangCategories: PenangCategory[] = [
  {
    title: { en: '🏛️ George Town City & Culture', zh: '🏛️ 乔治市城市与文化' },
    icon: '🏛️',
    items: [
      { en: 'UNESCO Heritage Zone: Armenian Street, Love Lane, street art, shophouses, temples', zh: '联合国世界文化遗产老城：Armenian Street、Love Lane，壁画、老店屋和寺庙' },
      { en: 'Street Art: "Kids on Bicycle", "Brother and Sister on a Swing" murals', zh: '街头壁画打卡："骑脚踏车的小孩""姐弟共骑"等经典壁画' },
      { en: 'The Blue Mansion (Cheong Fatt Tze): East-West architecture', zh: '蓝屋（Cheong Fatt Tze）：中西合璧建筑风格' },
      { en: 'Pinang Peranakan Mansion: Baba-Nyonya history', zh: '娘惹文化馆：了解峇峇娘惹文化' },
      { en: 'Khoo Kongsi Clan House: ornate architecture and museum', zh: '邱公司（Khoo Kongsi）：华丽宗祠和小型博物馆' },
      { en: 'Quirky Museums: Wonderfood Museum, Upside Down Museum', zh: '奇趣博物馆：Wonderfood Museum、倒立博物馆' },
    ],
  },
  {
    title: { en: '🍜 Food & Markets', zh: '🍜 吃喝和市集' },
    icon: '🍜',
    items: [
      { en: 'Hawker Food: Gurney Drive, Chulia Street, New Lane — char kway teow, laksa, Hokkien mee, nasi lemak', zh: '小贩中心美食：Gurney Drive、Chulia Street、New Lane — 炒粿条、叻沙、福建面、椰浆饭' },
      { en: 'Guided Food Tour in George Town', zh: '跟团美食步行，一次试很多小吃' },
      { en: 'Nyonya cuisine + afternoon tea at Eastern & Oriental Hotel', zh: '娘惹餐 + 东姑与东方酒店下午茶' },
      { en: 'Weekend Hin Market at Hin Bus Depot: live music, art, creative food', zh: '周末 Hin Bus Depot 创意市集：音乐、艺术摊位和特色小吃' },
    ],
  },
  {
    title: { en: '⛰️ Hills, Temples & Nature', zh: '⛰️ 山、庙、自然' },
    icon: '⛰️',
    items: [
      { en: 'Penang Hill: funicular + The Habitat canopy walk', zh: '升旗山：缆车 + The Habitat 树冠走道' },
      { en: 'Kek Lok Si Temple: Ten Thousand Buddhas Pagoda, Kuan Yin statue', zh: '极乐寺：万佛塔、观音像、灯笼长廊' },
      { en: 'Penang National Park: Turtle Beach, Monkey Beach', zh: '槟城国家公园：Turtle Beach、Monkey Beach' },
      { en: 'Entopia Butterfly Farm + Tropical Fruit Farm', zh: '蝴蝶公园 + 热带水果园' },
      { en: 'ESCAPE Theme Park: rope courses, zip lines, water slides', zh: 'ESCAPE 主题乐园：绳索、滑水道' },
    ],
  },
  {
    title: { en: '🏖️ Beaches & Relaxation', zh: '🏖️ 海边与放松' },
    icon: '🏖️',
    items: [
      { en: 'Batu Ferringhi Beach: swimming, night market, street food', zh: '峇都丁宜海滩：玩水、夜市、路边摊' },
      { en: 'Gurney Drive Seafront: sunset walk + hawker centre dinner', zh: 'Gurney Drive 海滨：傍晚散步看日落 + 小贩中心晚餐' },
      { en: 'Balik Pulau Countryside: cycling through rice fields and orchards', zh: 'Balik Pulau 乡村：骑行穿过稻田和果园' },
    ],
  },
  {
    title: { en: '🎭 Experiences & Activities', zh: '🎭 体验类活动' },
    icon: '🎭',
    items: [
      { en: 'Heritage & Culture Walking Tour: mosques, churches, temples', zh: '文化徒步：清真寺、教堂、庙宇' },
      { en: 'Cooking Class: learn laksa, curry, and Nyonya dishes', zh: '烹饪课：学习制作叻沙、咖喱等' },
      { en: 'Bicycle or Trishaw Tour of the old town', zh: '自行车/三轮车游老城' },
      { en: 'Night Markets & Live Entertainment', zh: '夜市与现场表演' },
    ],
  },
];

export const travelTips: TipSection[] = [
  {
    title: { en: '🚗 Transportation', zh: '🚗 交通' },
    icon: '🚗',
    items: [
      { en: 'Ao Nang → Railay: Longtail boat (10–15 min, ~100–150 THB/person)', zh: '安南 → Railay：长尾船（10–15分钟，约100–150泰铢/人）' },
      { en: 'Ao Nang → Krabi Town: Songthaew or taxi (20–30 min, ~60–150 THB)', zh: '安南 → 甲米镇：双条车或出租车（20–30分钟，约60–150泰铢）' },
      { en: 'Ao Nang → Koh Lanta: Van + ferry (~2.5–4 hrs, ~350–500 THB)', zh: '安南 → 兰塔岛：面包车+渡船（约2.5–4小时，约350–500泰铢）' },
      { en: 'Koh Lanta → Koh Lipe: Speedboat/ferry 2.5–3 hrs (Bundhaya, Tigerline etc.)', zh: '兰塔岛 → 丽贝岛：快艇/渡船2.5–3小时（Bundhaya、Tigerline等）' },
      { en: 'Koh Lipe → Penang: Ferry to Langkawi, then onward by ferry/bus/train/flight (total 6–8 hrs)', zh: '丽贝岛 → 槟城：坐船到兰卡威，再转渡船/巴士/火车/航班（总计6–8小时）' },
    ],
  },
  {
    title: { en: '🎒 Packing Essentials', zh: '🎒 打包必备' },
    icon: '🎒',
    items: [
      { en: 'Sunscreen (SPF 50+), insect repellent, seasickness pills', zh: '防晒霜（SPF 50+）、驱蚊液、晕船药' },
      { en: 'Waterproof bag for boat trips', zh: '防水包（坐船和岛间移动使用）' },
      { en: 'Light, breathable clothing and swimwear', zh: '轻便透气的衣服和泳衣' },
      { en: 'Comfortable walking shoes and flip-flops', zh: '舒适的步行鞋和人字拖' },
      { en: 'Power adapter (Thailand: Type A/B/C, Malaysia: Type G)', zh: '电源转换器（泰国：A/B/C型，马来西亚：G型）' },
      { en: 'Cash: Thai Baht and Malaysian Ringgit', zh: '泰铢和马来西亚林吉特现金' },
    ],
  },
  {
    title: { en: '🌤️ Weather', zh: '🌤️ 天气注意事项' },
    icon: '🌤️',
    items: [
      { en: 'Late Feb – Mar is dry season in southern Thailand: great for beaches and boats', zh: '2月底到3月是泰国南部旱季，整体天气适合海滩和出海' },
      { en: 'Occasional afternoon showers — bring a light rain jacket', zh: '偶尔会有午后阵雨，建议带一件轻便雨衣' },
      { en: 'Penang: hot and humid — stay hydrated and take AC breaks', zh: '槟城气候炎热潮湿，要多喝水并适当在空调地方休息' },
    ],
  },
  {
    title: { en: '💰 Budget Guidance', zh: '💰 预算指导' },
    icon: '💰',
    items: [
      { en: 'Thailand daily: 1,500–3,000 THB/person (accommodation, food, transport)', zh: '泰国每日：每人约1,500–3,000泰铢（含住宿、餐饮和交通）' },
      { en: 'Thailand day tours: 1,000–2,000 THB/person (4-island, Phi Phi, snorkeling)', zh: '泰国一日游：每人约1,000–2,000泰铢（四岛游、皮皮岛、浮潜）' },
      { en: 'Penang daily: 150–300 MYR/person (accommodation, food, transport)', zh: '槟城每日：每人约150–300马币（含住宿、餐饮和交通）' },
      { en: 'Penang activities: 30–150 MYR/person (entry fees, tours, cooking classes)', zh: '槟城活动：每人约30–150马币（门票、导览、烹饪课等）' },
    ],
  },
];

export const tripOverview = {
  duration: { en: 'February 27 – End of March 2026', zh: '2026年2月27日 – 3月底' },
  stays: [
    {
      location: { en: 'Ao Nang, Krabi', zh: '安南（Ao Nang）' },
      dates: { en: 'Feb 27 – Mar 1', zh: '2月27日 – 3月1日' },
      hotel: { en: 'Ao Nang Townhouse', zh: 'Ao Nang Townhouse' },
      region: 'krabi' as const,
    },
    {
      location: { en: 'Koh Lanta (Sala Dan)', zh: '兰塔岛 Sala Dan' },
      dates: { en: 'Mar 1 – Mar 6', zh: '3月1日 – 3月6日' },
      hotel: { en: 'Sala Dan House', zh: 'Sala Dan House' },
      region: 'lanta' as const,
    },
    {
      location: { en: 'Koh Lipe', zh: '丽贝岛' },
      dates: { en: 'Mar 6 – Mar 10', zh: '3月6日 – 3月10日' },
      hotel: { en: 'Varin Beach Resort', zh: 'Varin Beach Resort' },
      region: 'lipe' as const,
    },
    {
      location: { en: 'Penang', zh: '槟城' },
      dates: { en: 'From ~Mar 11 for 1–2 weeks', zh: '约3月11日起停留1–2周' },
      hotel: { en: 'TBD', zh: '待定' },
      region: 'penang' as const,
    },
  ],
};
