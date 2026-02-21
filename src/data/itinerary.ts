export type { Language, TripId, Bilingual } from './types';

export interface DayData {
  day: number;
  date: { en: string; zh: string };
  title: { en: string; zh: string };
  region: string;
  regionLabel: { en: string; zh: string };
  mapQuery: string;
  accommodation: { en: string; zh: string } | null;
  activities: { en: string[]; zh: string[] };
}

export interface ActivityCategory {
  title: { en: string; zh: string };
  icon: string;
  items: { en: string; zh: string }[];
}

export interface TipSection {
  title: { en: string; zh: string };
  icon: string;
  items: { en: string; zh: string }[];
}

export interface TripOverview {
  duration: { en: string; zh: string };
  stays: {
    location: { en: string; zh: string };
    dates: { en: string; zh: string };
    hotel: { en: string; zh: string };
    region: string;
  }[];
}

export interface TripData {
  id: 'thailand' | 'croatia';
  name: { en: string; zh: string };
  footer: { en: string; zh: string };
  regionColors: Record<string, { bg: string; text: string; light: string; border: string; dot: string }>;
  days: DayData[];
  categories: ActivityCategory[];
  tips: TipSection[];
  overview: TripOverview;
}

// ===== THAILAND & PENANG REGION COLORS =====
const thailandRegionColors: Record<string, { bg: string; text: string; light: string; border: string; dot: string }> = {
  krabi:  { bg: 'bg-blue-600',    text: 'text-blue-700',    light: 'bg-blue-50',    border: 'border-blue-400',   dot: 'bg-blue-500' },
  lanta:  { bg: 'bg-emerald-600', text: 'text-emerald-700', light: 'bg-emerald-50', border: 'border-emerald-400', dot: 'bg-emerald-500' },
  lipe:   { bg: 'bg-cyan-600',    text: 'text-cyan-700',    light: 'bg-cyan-50',    border: 'border-cyan-400',   dot: 'bg-cyan-500' },
  travel: { bg: 'bg-amber-600',   text: 'text-amber-700',   light: 'bg-amber-50',   border: 'border-amber-400',  dot: 'bg-amber-500' },
  penang: { bg: 'bg-rose-600',    text: 'text-rose-700',    light: 'bg-rose-50',    border: 'border-rose-400',   dot: 'bg-rose-500' },
};

// ===== CROATIA & ITALY REGION COLORS =====
const croatiaRegionColors: Record<string, { bg: string; text: string; light: string; border: string; dot: string }> = {
  dubrovnik: { bg: 'bg-orange-600',  text: 'text-orange-700',  light: 'bg-orange-50',  border: 'border-orange-400',  dot: 'bg-orange-500' },
  split:     { bg: 'bg-blue-600',    text: 'text-blue-700',    light: 'bg-blue-50',    border: 'border-blue-400',    dot: 'bg-blue-500' },
  zadar:     { bg: 'bg-teal-600',    text: 'text-teal-700',    light: 'bg-teal-50',    border: 'border-teal-400',    dot: 'bg-teal-500' },
  travel:    { bg: 'bg-amber-600',   text: 'text-amber-700',   light: 'bg-amber-50',   border: 'border-amber-400',   dot: 'bg-amber-500' },
  italy:     { bg: 'bg-emerald-600', text: 'text-emerald-700', light: 'bg-emerald-50', border: 'border-emerald-400', dot: 'bg-emerald-500' },
  rome:      { bg: 'bg-red-600',     text: 'text-red-700',     light: 'bg-red-50',     border: 'border-red-400',     dot: 'bg-red-500' },
};

// ===== THAILAND & PENANG DAYS =====
const thailandDays: DayData[] = [
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
    title: { en: 'Transfer to Koh Lanta & Check-in Fresh House', zh: '前往兰塔岛，入住 Fresh House' },
    region: 'lanta',
    regionLabel: { en: 'Koh Lanta', zh: '兰塔岛' },
    mapQuery: 'Fresh House, Sriraya, Lanta Old Town, Koh Lanta, Thailand',
    accommodation: { 
      en: 'Fresh House (Sriraya, Lanta Old Town, Koh Lanta Yai, Koh Lanta, Thailand 81150)\n🏨 Booking ID: 630068471 | Status: Confirmed\n🛏️ Standard Fan Double Bed (Beach view, 27m², 1 king bed)\n💰 THB 1,701.02 (pay at property)', 
      zh: 'Fresh House（Sriraya, Lanta Old Town, Koh Lanta Yai, Koh Lanta, Thailand 81150）\n🏨 预订号：630068471 | 状态：已确认\n🛏️ 标准风扇双人房（海景，27平方米，1张大床）\n💰 1,701.02泰铢（到店支付）' 
    },
    activities: {
      en: [
        '📦 Morning: Check out from Ao Nang Townhouse',
        '🚐 Travel from Ao Nang/Krabi to Koh Lanta (Lanta Old Town) by van + ferry (2.5–4 hours)',
        '🏨 Arrive in the afternoon, check in to Fresh House (check-in from 13:00)',
        '🌅 Late afternoon: Walk to the beach or explore Lanta Old Town, enjoy sunset',
        '🍜 Evening: Dinner at a beachfront restaurant; ask tour agents about 4-island tours and Phi Phi day trips',
      ],
      zh: [
        '📦 早上：从 Ao Nang Townhouse 退房，准备前往兰塔岛',
        '🚐 从安南/甲米一带乘面包车+渡船前往兰塔岛老城，车船合计约2.5–4小时',
        '🏨 下午抵达后，入住 Fresh House（13:00后可办理入住）',
        '🌅 傍晚：在海滩散步或逛兰塔老城，看日落',
        '🍜 晚上：在海边餐厅吃饭，并在旅行社咨询四岛游和皮皮岛一日游',
      ],
    },
  },
  {
    day: 4,
    date: { en: 'Mar 2 (Mon)', zh: '3月2日（周一）' },
    title: { en: 'Island Exploration from Fresh House', zh: '兰塔环岛探索' },
    region: 'lanta',
    regionLabel: { en: 'Koh Lanta', zh: '兰塔岛' },
    mapQuery: 'Koh Lanta Old Town, Thailand',
    accommodation: { 
      en: 'Fresh House (Sriraya, Lanta Old Town, Koh Lanta Yai, Koh Lanta, Thailand 81150)\n🏨 Booking ID: 630068471 | Check-out: Mar 3 by 12:00', 
      zh: 'Fresh House（Sriraya, Lanta Old Town, Koh Lanta Yai, Koh Lanta, Thailand 81150）\n🏨 预订号：630068471 | 退房：3月3日12:00前' 
    },
    activities: {
      en: [
        '🛵 Spend the day exploring Koh Lanta by scooter or tuk-tuk',
        '🏖️ Visit quiet southern beaches, viewpoints, and cafés',
        '🏘️ Explore Lanta Old Town (walking distance from Fresh House)',
        '🏞️ If energy and weather allow, visit the national park & lighthouse area for cliff and sea views',
        '💻 WORK CALL 16:00-18:00 (Thailand local time) — Find quiet spot at accommodation or nearby café with WiFi',
        '🌙 Evening: Dine near Fresh House in Old Town',
      ],
      zh: [
        '🛵 白天租摩托车或坐嘟嘟车环岛',
        '🏖️ 去南部僻静海滩、各个观景点和咖啡馆',
        '🏘️ 逛 Lanta Old Town（从 Fresh House 步行可达）',
        '🏞️ 视体力和天气，可以去国家公园灯塔附近看悬崖和海景',
        '💻 工作电话 16:00-18:00（泰国当地时间）— 在住宿或附近咖啡馆找安静地方，确保有WiFi',
        '🌙 晚上在 Fresh House 附近的 Old Town 用餐',
      ],
    },
  },
  {
    day: 5,
    date: { en: 'Mar 3 (Tue)', zh: '3月3日（周二）' },
    title: { en: 'Phi Phi Islands Overnight', zh: '皮皮岛过夜游' },
    region: 'lanta',
    regionLabel: { en: 'Koh Phi Phi', zh: '皮皮岛' },
    mapQuery: 'Phi Phi Twin Palms Bungalow, Ko Phi Phi, Thailand',
    accommodation: { 
      en: 'Phi Phi Twin Palms Bungalow (108, Moo 7, Ao Nang Subdistrict, Meuang Karbi District, Ko Phi Phi, Thailand 81000)\n🏨 Booking ID: 630065883 | Status: Confirmed\n🛏️ Standard Twin Room with Balcony (Courtyard view, 24m², 2 single beds)\n💰 THB 1,117.62 (charged Mar 1, 2026)', 
      zh: 'Phi Phi Twin Palms Bungalow（108, Moo 7, Ao Nang Subdistrict, Meuang Karbi District, Ko Phi Phi, Thailand 81000）\n🏨 预订号：630065883 | 状态：已确认\n🛏️ 标准双床阳台房（庭院景观，24平方米，2张单人床）\n💰 1,117.62泰铢（已于3月1日扣款）' 
    },
    activities: {
      en: [
        '📦 Morning: Check out from Fresh House (by 12:00)',
        '🛥️ Take a speedboat or ferry from Koh Lanta to Phi Phi Islands (check-in from 14:00)',
        '📸 Visit Maya Bay, Pileh Lagoon, and Monkey Bay with snorkeling',
        '🍱 Lunch on the boat or on Phi Phi Don',
        '🏨 Check in to Phi Phi Twin Palms Bungalow (check-in from 14:00)',
        '🌙 Evening: Explore Tonsai area, dinner and drinks on Phi Phi Don',
      ],
      zh: [
        '📦 早上：从 Fresh House 退房（12:00前）',
        '🛥️ 从兰塔乘快艇或渡船前往皮皮岛（14:00后可入住）',
        '📸 游览 Maya Bay、Pileh Lagoon、Monkey Bay 并浮潜',
        '🍱 午餐在皮皮 Don 岛或船上吃',
        '🏨 入住 Phi Phi Twin Palms Bungalow（14:00后可办理入住）',
        '🌙 晚上：探索 Tonsai 区域，在皮皮 Don 岛晚餐',
      ],
    },
  },
  {
    day: 6,
    date: { en: 'Mar 4 (Wed)', zh: '3月4日（周三）' },
    title: { en: 'Return to Koh Lanta & Check-in BOHO Hostel', zh: '返回兰塔岛，入住 BOHO Hostel' },
    region: 'lanta',
    regionLabel: { en: 'Koh Lanta', zh: '兰塔岛' },
    mapQuery: 'BOHO Hostel, Saladan, Koh Lanta, Thailand',
    accommodation: { 
      en: 'BOHO Hostel (150 Moo 1, Saladan, Koh Lanta, Thailand 81150)\n🏨 Booking ID: 630072187 | Status: Paid and Confirmed\n🛏️ Standard Double Room (15m², 1 double bed)\n💰 USD 57.72 (already paid)', 
      zh: 'BOHO Hostel（150 Moo 1, Saladan, Koh Lanta, Thailand 81150）\n🏨 预订号：630072187 | 状态：已付款并确认\n🛏️ 标准双人房（15平方米，1张双人床）\n💰 57.72美元（已付款）' 
    },
    activities: {
      en: [
        '📦 Morning: Check out from Phi Phi Twin Palms Bungalow (by 11:00)',
        '🛥️ Take ferry/speedboat back to Koh Lanta (Saladan)',
        '🏨 Check in to BOHO Hostel (check-in from 14:00)',
        '🌅 Afternoon: Walk to Long Beach area or explore Sala Dan village',
        '💻 WORK CALL 15:00-17:00 (Thailand local time) — BOHO Hostel has good WiFi, find quiet corner or use private room',
        '🍜 Evening: Dinner at a beachfront restaurant near Saladan',
      ],
      zh: [
        '📦 早上：从 Phi Phi Twin Palms Bungalow 退房（11:00前）',
        '🛥️ 乘渡船/快艇返回兰塔岛（Sala Dan）',
        '🏨 入住 BOHO Hostel（14:00后可办理入住）',
        '🌅 下午：步行前往 Long Beach 一带或在 Sala Dan 小镇逛逛',
        '💻 工作电话 15:00-17:00（泰国当地时间）— BOHO Hostel WiFi不错，找安静角落或使用私人房间',
        '🍜 晚上：在 Saladan 附近的海边餐厅吃饭',
      ],
    },
  },
  {
    day: 7,
    date: { en: 'Mar 5 (Thu)', zh: '3月5日（周四）' },
    title: { en: 'Four Islands Tour & Last Night at BOHO Hostel', zh: '四岛游，BOHO Hostel 最后一晚' },
    region: 'lanta',
    regionLabel: { en: 'Koh Lanta', zh: '兰塔岛' },
    mapQuery: 'Koh Lanta Four Islands, Thailand',
    accommodation: { 
      en: 'BOHO Hostel (150 Moo 1, Saladan, Koh Lanta, Thailand 81150)\n🏨 Booking ID: 630072187 | Check-out: Mar 6 by 10:00', 
      zh: 'BOHO Hostel（150 Moo 1, Saladan, Koh Lanta, Thailand 81150）\n🏨 预订号：630072187 | 退房：3月6日10:00前' 
    },
    activities: {
      en: [
        '🛥️ Join a 4-island tour from Koh Lanta (pickup from Saladan area)',
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

  // ===== KOH LIPE (Days 8-12) =====
  {
    day: 8,
    date: { en: 'Mar 6 (Fri)', zh: '3月6日（周五）' },
    title: { en: 'Transfer to Koh Lipe & Check-in Varin Beach Resort', zh: '前往丽贝岛，入住 Varin Beach Resort' },
    region: 'lipe',
    regionLabel: { en: 'Koh Lipe', zh: '丽贝岛' },
    mapQuery: 'Varin Beach Resort, Ko Lipe, Thailand',
    accommodation: { 
      en: 'Varin Beach Resort (171 M7, Ko Lipe, Thailand 91000)\n🏨 Booking ID: 629167643 | Status: Paid and Confirmed\n🛏️ Fan Cottage (Garden view, 28m², 1 king bed) — includes Breakfast & Free WiFi\n💰 CHF 141.20 (already paid)', 
      zh: 'Varin Beach Resort（171 M7, Ko Lipe, Thailand 91000）\n🏨 预订号：629167643 | 状态：已付款并确认\n🛏️ 风扇小屋（花园景观，28平方米，1张大床）— 含早餐和免费WiFi\n💰 141.20瑞士法郎（已付款）' 
    },
    activities: {
      en: [
        '📦 Morning: Check out from BOHO Hostel (by 10:00) and head to Saladan Pier',
        '🛥️ Take booked speedboat/ferry from Saladan Pier to Koh Lipe Pattaya Beach (~10:30 departure, 2.5–3 hrs)',
        '🏨 Arrive around midday; walk or short transfer to Varin Beach Resort; check in after 15:00',
        '🏖️ Afternoon: Walk along Pattaya Beach or Sunrise Beach, explore the three main beaches and Walking Street',
        '🍜 Evening: Choose a restaurant along Walking Street for your first island dinner',
      ],
      zh: [
        '📦 早上10:00前从 BOHO Hostel 退房，前往 Saladan 码头',
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
    accommodation: { 
      en: 'Varin Beach Resort (171 M7, Ko Lipe, Thailand 91000)\n🏨 Booking ID: 629167643 | 4 nights', 
      zh: 'Varin Beach Resort（171 M7, Ko Lipe, Thailand 91000）\n🏨 预订号：629167643 | 共4晚' 
    },
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
    accommodation: { 
      en: 'Varin Beach Resort (171 M7, Ko Lipe, Thailand 91000)\n🏨 Booking ID: 629167643 | includes Breakfast', 
      zh: 'Varin Beach Resort（171 M7, Ko Lipe, Thailand 91000）\n🏨 预订号：629167643 | 含早餐' 
    },
    activities: {
      en: [
        '🌅 Wake up early to watch sunrise at Sunrise Beach',
        '☕ Breakfast at Varin Beach Resort (included)',
        '🏖️ Keep the daytime schedule empty: swim, sunbathe, read, and relax',
        '📖 No fixed plan — enjoy freedom',
        '💆 Evening: Foot or full-body massage, stay in island-chill mode',
      ],
      zh: [
        '🌅 早起去 Sunrise Beach 看日出',
        '☕ 在 Varin Beach Resort 吃早餐（已含）',
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
    accommodation: { 
      en: 'Varin Beach Resort (171 M7, Ko Lipe, Thailand 91000)\n🏨 Booking ID: 629167643 | Check-out: Mar 10 by 10:00', 
      zh: 'Varin Beach Resort（171 M7, Ko Lipe, Thailand 91000）\n🏨 预订号：629167643 | 退房：3月10日10:00前' 
    },
    activities: {
      en: [
        '🏖️ Spend the day at Varin Beach Resort or a beach bar with a great view',
        '🍹 Enjoy drinks, swimming, and taking photos',
        '🏊 Afternoon: Hang out by the pool or on the sand',
        '📸 Chat and watch the sky change colours',
        '💻 WORK CALL 16:00-18:00 (Thailand local time) — Varin Beach Resort lobby/reception area has WiFi, or use resort bar area',
        '🍽️ Evening: Choose a slightly fancier restaurant for a "special" dinner',
      ],
      zh: [
        '🏖️ 在 Varin Beach Resort 或某家视野好的海滩酒吧度过一整天',
        '🍹 点饮料、游泳、拍照',
        '🏊 下午在泳池边或沙滩上拍照、聊天',
        '📸 看天色慢慢变化',
        '💻 工作电话 16:00-18:00（泰国当地时间）— Varin Beach Resort大堂/接待区有WiFi，或使用度假村酒吧区域',
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
    date: { en: 'Mar 11 (Wed)', zh: '3月11日（周三）' },
    title: { en: 'Transfer to Penang', zh: '前往槟城' },
    region: 'travel',
    regionLabel: { en: 'Travel Day', zh: '旅行日' },
    mapQuery: 'George Town, Penang, Malaysia',
    accommodation: { en: 'Airbnb in George Town, Penang', zh: '槟城乔治市民宿' },
    activities: {
      en: [
        '🛥️ Morning: Leave Koh Lipe by ferry, via Langkawi or Kuala Perlis',
        '🚌 Continue to Penang by bus, train, or short flight (e.g. Langkawi–Penang flight, or bus/train from Kuala Perlis to Butterworth)',
        '⛴️ Ferry from Butterworth to George Town if taking land route',
        '🏨 Arrive in Penang and check in to Airbnb in George Town',
        '💻 WORK CALL 15:00-17:00 (Thailand local time) — Airbnb should have WiFi, find quiet room or nearby café like Starbucks/Co-working space',
        '🍜 Evening: Simple dinner near accommodation and rest',
      ],
      zh: [
        '🛥️ 早上从丽贝坐船离开泰国，经兰卡威或 Kuala Perlis 中转',
        '🚌 再转巴士、火车或短程航班前往槟城（例如兰卡威飞槟城，或从 Kuala Perlis 到 Butterworth）',
        '⛴️ 如走陆路，从 Butterworth 坐渡船到乔治市',
        '🏨 抵达槟城后，入住乔治市民宿',
        '💻 工作电话 15:00-17:00（泰国当地时间）— 民宿应有WiFi，找安静房间或附近星巴克/共享办公空间',
        '🍜 晚上在民宿附近简单吃饭，早点休息',
      ],
    },
  },

  // ===== PENANG WEEK (Days 14-18) =====
  {
    day: 14,
    date: { en: 'Mar 12 (Thu)', zh: '3月12日（周四）' },
    title: { en: 'George Town Walking Tour & Street Art', zh: '乔治市徒步和街头艺术' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'Armenian Street, George Town, Penang, Malaysia',
    accommodation: { en: 'Airbnb in George Town', zh: '乔治市民宿' },
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
    date: { en: 'Mar 13 (Fri)', zh: '3月13日（周五）' },
    title: { en: 'Penang Hill + Kek Lok Si Temple', zh: '升旗山 + 极乐寺' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'Penang Hill, Malaysia',
    accommodation: { en: 'Airbnb in George Town', zh: '乔治市民宿' },
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
        '🛕 参观极乐寺：万佛塔、观音像、灯笼长廊',
        '📸 拍摄山顶美景',
        '🍜 晚上在乔治市吃晚餐',
      ],
    },
  },
  {
    day: 16,
    date: { en: 'Mar 14 (Sat)', zh: '3月14日（周六）' },
    title: { en: 'Food Tour & Heritage Mansions', zh: '美食团和文化馆' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'Cheong Fatt Tze Mansion, Penang, Malaysia',
    accommodation: { en: 'Airbnb in George Town', zh: '乔治市民宿' },
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
    date: { en: 'Mar 15 (Sun)', zh: '3月15日（周日）' },
    title: { en: 'Penang National Park Hike', zh: '槟城国家公园徒步' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'Penang National Park, Malaysia',
    accommodation: { en: 'Airbnb in George Town', zh: '乔治市民宿' },
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
    date: { en: 'Mar 16 (Mon)', zh: '3月16日（周一）' },
    title: { en: 'Relaxation Day & Gurney Drive Sunset', zh: '放松日和 Gurney Drive 看日落' },
    region: 'penang',
    regionLabel: { en: 'Penang', zh: '槟城' },
    mapQuery: 'Gurney Drive, Penang, Malaysia',
    accommodation: { en: 'Airbnb in George Town (last night)', zh: '乔治市民宿（最后一晚）' },
    activities: {
      en: [
        '😴 Sleep in and have a late breakfast',
        '🏖️ Light activity: stroll around George Town, visit quirky museums like Wonderfood Museum',
        '🌅 Walk along Gurney Drive seafront around sunset',
        '💻 WORK CALL 16:00-18:00 (Thailand local time) — Airbnb WiFi or nearby hotel lobby (G Hotel, Hotel Jen) for quiet space',
        '🍜 Dinner at Gurney Drive hawker centre',
        '💆 Get a massage to unwind',
      ],
      zh: [
        '😴 睡个懒觉，晚点吃早餐',
        '🏖️ 轻松活动：在乔治市随便走走，可以去 Wonderfood Museum 等趣味博物馆',
        '🌅 傍晚在 Gurney Drive 海边步道散步看日落',
        '💻 工作电话 16:00-18:00（泰国当地时间）— 使用民宿WiFi或附近酒店大堂（G Hotel、Hotel Jen）找安静空间',
        '🍜 在 Gurney Drive 小贩中心吃晚餐',
        '💆 做个按摩放松',
      ],
    },
  },
  {
    day: 19,
    date: { en: 'Mar 17 (Tue)', zh: '3月17日（周二）' },
    title: { en: 'Departure Day — Fly Home ✈️', zh: '返程日 — 乘飞机回家 ✈️' },
    region: 'travel',
    regionLabel: { en: 'Travel Day', zh: '旅行日' },
    mapQuery: 'Penang International Airport, Malaysia',
    accommodation: null,
    activities: {
      en: [
        '📦 Check out from hotel and store luggage if needed',
        '🛍️ Last-minute shopping or revisit favourite spots in George Town',
        '🍜 Final hawker food lunch — eat everything you\'ll miss!',
        '💻 WORK CALL 15:00-?? (9:00 AM Zurich) — Every other Tuesday call, find quiet café or hotel lobby in George Town',
        '🚕 Head to Penang International Airport (PEN) by taxi/Grab',
        '✈️ Flight departs 19:40 from Penang (PEN) to Zhengzhou (CGO)',
        '🛫 13h 20min journey with 1 stop and overnight layover',
        '📅 Arrives Zhengzhou 09:00+1 (Wednesday, March 18)',
      ],
      zh: [
        '📦 从酒店退房，如有需要可寄存行李',
        '🛍️ 最后购物或重访乔治市最喜欢的景点',
        '🍜 最后一顿小贩中心午餐——把会想念的都吃一遍！',
        '💻 工作电话 15:00-??（苏黎世时间9:00）— 隔周二例会，在乔治市找安静咖啡馆或酒店大堂',
        '🚕 乘出租车/Grab前往槟城国际机场（PEN）',
        '✈️ 航班 19:40 从槟城（PEN）起飞前往郑州（CGO）',
        '🛫 航程13小时20分钟，含1次中转和过夜停留',
        '📅 抵达郑州时间为次日（3月18日周三）09:00',
      ],
    },
  },
];

// ===== CROATIA & ITALY DAYS =====
const croatiaDays: DayData[] = [
  // ===== DUBROVNIK (Days 1-5) =====
  {
    day: 1,
    date: { en: 'May 8 (Fri)', zh: '5月8日（周五）' },
    title: { en: 'Mostar → Dubrovnik', zh: '莫斯塔尔 → 杜布罗夫尼克' },
    region: 'dubrovnik',
    regionLabel: { en: 'Dubrovnik, Croatia', zh: '克罗地亚·杜布罗夫尼克' },
    mapQuery: 'Dubrovnik Old Town, Croatia',
    accommodation: { en: 'Dubrovnik Hotel', zh: '杜布罗夫尼克酒店' },
    activities: {
      en: [
        '🚌 Midday bus from Mostar to Dubrovnik (about 3.5 hours)',
        '🏨 Check in to hotel and rest',
        '🚶 Old Town and harbor walk',
        '🍽️ Early dinner to adjust to local time',
      ],
      zh: [
        '🚌 中午从莫斯塔尔坐大巴到杜布罗夫尼克（约3.5小时）',
        '🏨 入住酒店，稍作休息',
        '🚶 在老城和港口轻松散步',
        '🍽️ 早点吃晚餐，适应当地时间',
      ],
    },
  },
  {
    day: 2,
    date: { en: 'May 9 (Sat)', zh: '5月9日（周六）' },
    title: { en: 'Dubrovnik: Cable Car & Old Town', zh: '杜城：缆车与老城' },
    region: 'dubrovnik',
    regionLabel: { en: 'Dubrovnik, Croatia', zh: '克罗地亚·杜布罗夫尼克' },
    mapQuery: 'Mount Srd, Dubrovnik, Croatia',
    accommodation: { en: 'Dubrovnik Hotel', zh: '杜布罗夫尼克酒店' },
    activities: {
      en: [
        '🚡 Cable car up Mt. Srđ for panoramic views + coffee',
        '📸 Short Old Town walk in afternoon',
        '☕ Plenty of rest breaks at cafés',
        '🍽️ Dinner at a local restaurant',
      ],
      zh: [
        '🚡 乘缆车上 Srđ 山看全景、喝咖啡',
        '📸 下午在老城内短距离散步',
        '☕ 多安排休息，在咖啡馆休息',
        '🍽️ 在当地餐厅用晚餐',
      ],
    },
  },
  {
    day: 3,
    date: { en: 'May 10 (Sun)', zh: '5月10日（周日）' },
    title: { en: 'Lokrum or Elafiti Islands', zh: '洛克鲁姆岛或埃拉菲蒂群岛' },
    region: 'dubrovnik',
    regionLabel: { en: 'Dubrovnik, Croatia', zh: '克罗地亚·杜布罗夫尼克' },
    mapQuery: 'Lokrum Island, Croatia',
    accommodation: { en: 'Dubrovnik Hotel', zh: '杜布罗夫尼克酒店' },
    activities: {
      en: [
        '⛴️ Boat to Lokrum (10–15 min) OR relaxed Elafiti boat tour with lunch',
        '🌿 Explore botanical gardens and peacocks on Lokrum',
        '🏖️ Minimal walking, easy boardwalks',
        '🍽️ Return to Dubrovnik for dinner',
      ],
      zh: [
        '⛴️ 乘船前往洛克鲁姆岛（10–15分钟）或参加轻松的埃拉菲蒂群岛船游（含午餐）',
        '🌿 探索植物园，观赏孔雀',
        '🏖️ 步行不多，以平路木栈道为主',
        '🍽️ 返回杜布罗夫尼克用晚餐',
      ],
    },
  },
  {
    day: 4,
    date: { en: 'May 11 (Mon)', zh: '5月11日（周一）' },
    title: { en: 'Dubrovnik Free Day', zh: '杜城自由日' },
    region: 'dubrovnik',
    regionLabel: { en: 'Dubrovnik, Croatia', zh: '克罗地亚·杜布罗夫尼克' },
    mapQuery: 'Dubrovnik City Walls, Croatia',
    accommodation: { en: 'Dubrovnik Hotel', zh: '杜布罗夫尼克酒店' },
    activities: {
      en: [
        '😴 Sleep in and relax',
        '🏛️ Optional: Short section of City Walls (if feeling up to it)',
        '☕ Seaside café rest and people watching',
        '🍽️ Slow pace dinner at a waterfront restaurant',
      ],
      zh: [
        '😴 睡个懒觉，放松身心',
        '🏛️ 可选：只走一小段城墙（视体力而定）',
        '☕ 在海边咖啡馆休息，看风景',
        '🍽️ 在海滨餐厅慢慢享用晚餐',
      ],
    },
  },
  {
    day: 5,
    date: { en: 'May 12 (Tue)', zh: '5月12日（周二）' },
    title: { en: 'Dubrovnik → Makarska Coast', zh: '杜城 → 马卡尔斯卡海岸' },
    region: 'travel',
    regionLabel: { en: 'Travel Day', zh: '旅行日' },
    mapQuery: 'Makarska, Croatia',
    accommodation: { en: 'Makarska Hotel', zh: '马卡尔斯卡酒店' },
    activities: {
      en: [
        '🚌 Bus or private transfer north along the coast',
        '🏨 Check in at mid-point town (e.g., Makarska)',
        '🚶 Easy seaside walk',
        '🍽️ Dinner with coastal views',
      ],
      zh: [
        '🚌 乘大巴或包车沿海岸向北',
        '🏨 入住中途海滨小镇（如马卡尔斯卡）',
        '🚶 海边轻松散步',
        '🍽️ 在海边餐厅享用晚餐',
      ],
    },
  },

  // ===== SPLIT (Days 6-9) =====
  {
    day: 6,
    date: { en: 'May 13 (Wed)', zh: '5月13日（周三）' },
    title: { en: 'Coast → Split', zh: '海岸 → 斯普利特' },
    region: 'split',
    regionLabel: { en: 'Split, Croatia', zh: '克罗地亚·斯普利特' },
    mapQuery: 'Split Riva, Croatia',
    accommodation: { en: 'Split Hotel (near Riva/Diocletian Palace)', zh: '斯普利特酒店（靠近海滨长廊）' },
    activities: {
      en: [
        '🚌 Bus/car to Split (1.5–2 hours)',
        '🏨 Check in near Riva/Diocletian\'s Palace',
        '🚶 Light evening stroll on the promenade',
        '🍽️ Dinner at a local konoba',
      ],
      zh: [
        '🚌 乘巴士/自驾1.5–2小时到斯普利特',
        '🏨 入住靠近海滨长廊/戴克里先宫的住宿',
        '🚶 傍晚在海滨长廊轻松散步',
        '🍽️ 在当地小馆（konoba）用晚餐',
      ],
    },
  },
  {
    day: 7,
    date: { en: 'May 14 (Thu)', zh: '5月14日（周四）' },
    title: { en: 'Split: Seb Arrives & Easy Day', zh: '斯普利特：Seb抵达，轻松日' },
    region: 'split',
    regionLabel: { en: 'Split, Croatia', zh: '克罗地亚·斯普利特' },
    mapQuery: 'Diocletian\'s Palace, Split, Croatia',
    accommodation: { en: 'Split Hotel', zh: '斯普利特酒店' },
    activities: {
      en: [
        '✈️ Seb arrives at SPU airport at 08:00',
        '🏛️ Easy day in Split: flat parts of Diocletian\'s Palace',
        '🚶 Riva promenade walk',
        '🍽️ Early dinner, early night to rest',
      ],
      zh: [
        '✈️ Seb 早上8:00抵达斯普利特机场',
        '🏛️ 轻松游览戴克里先宫（平地部分）',
        '🚶 海滨长廊散步',
        '🍽️ 早点吃晚餐，早点休息',
      ],
    },
  },
  {
    day: 8,
    date: { en: 'May 15 (Fri)', zh: '5月15日（周五）' },
    title: { en: 'Krka National Park Day Trip', zh: '克尔卡国家公园一日游' },
    region: 'split',
    regionLabel: { en: 'Split, Croatia', zh: '克罗地亚·斯普利特' },
    mapQuery: 'Krka National Park, Croatia',
    accommodation: { en: 'Split Hotel', zh: '斯普利特酒店' },
    activities: {
      en: [
        '🚗 Day trip by car/tour to Krka NP (~1 hour each way)',
        '🛥️ Use boats and shuttle buses within the park',
        '🌿 Stick to easy boardwalk routes',
        '🍽️ Return to Split for dinner',
      ],
      zh: [
        '🚗 乘车/报团前往克尔卡国家公园（单程约1小时）',
        '🛥️ 多用船和接驳车游览',
        '🌿 只走平缓木栈道路线',
        '🍽️ 返回斯普利特用晚餐',
      ],
    },
  },
  {
    day: 9,
    date: { en: 'May 16 (Sat)', zh: '5月16日（周六）' },
    title: { en: 'Hvar Island Day Trip', zh: '赫瓦尔岛一日游' },
    region: 'split',
    regionLabel: { en: 'Split, Croatia', zh: '克罗地亚·斯普利特' },
    mapQuery: 'Hvar Town, Croatia',
    accommodation: { en: 'Split Hotel', zh: '斯普利特酒店' },
    activities: {
      en: [
        '⛴️ Fast ferry Split–Hvar (50–70 min each way)',
        '🚶 Harbor and lower Old Town stroll',
        '🍽️ Lunch at a waterfront restaurant',
        '🌅 Return to Split late afternoon',
      ],
      zh: [
        '⛴️ 乘快速渡轮往返赫瓦尔（单程50–70分钟）',
        '🚶 在港口和下城轻松散步',
        '🍽️ 在海滨餐厅享用午餐',
        '🌅 下午晚些返回斯普利特',
      ],
    },
  },

  // ===== ZADAR & SENJ (Days 10-12) =====
  {
    day: 10,
    date: { en: 'May 17 (Sun)', zh: '5月17日（周日）' },
    title: { en: 'Split → Trogir → Zadar', zh: '斯普利特 → 特罗吉尔 → 扎达尔' },
    region: 'zadar',
    regionLabel: { en: 'Zadar, Croatia', zh: '克罗地亚·扎达尔' },
    mapQuery: 'Zadar Old Town, Croatia',
    accommodation: { en: 'Zadar Hotel', zh: '扎达尔酒店' },
    activities: {
      en: [
        '🚌 Morning bus to Trogir (30–40 min), short Old Town walk',
        '✈️ ~13:30 to SPU, Seb departs at 15:20',
        '🚌 Afternoon bus/car to Zadar (2–3 hours)',
        '🍽️ Dinner in Zadar Old Town',
      ],
      zh: [
        '🚌 早上乘巴士30–40分钟到特罗吉尔，老城散步',
        '✈️ 约13:30去斯普利特机场，Seb 15:20起飞',
        '🚌 下午乘大巴/自驾2–3小时到扎达尔',
        '🍽️ 在扎达尔老城用晚餐',
      ],
    },
  },
  {
    day: 11,
    date: { en: 'May 18 (Mon)', zh: '5月18日（周一）' },
    title: { en: 'Zadar Old Town', zh: '扎达尔老城' },
    region: 'zadar',
    regionLabel: { en: 'Zadar, Croatia', zh: '克罗地亚·扎达尔' },
    mapQuery: 'Sea Organ Zadar, Croatia',
    accommodation: { en: 'Zadar Hotel', zh: '扎达尔酒店' },
    activities: {
      en: [
        '🏛️ Easy Old Town day: Roman forum, churches, waterfront',
        '☕ Coffee breaks at historic cafés',
        '🌅 Sunset at Sea Organ & Greeting to the Sun',
        '🍽️ Seafood dinner near the water',
      ],
      zh: [
        '🏛️ 老城轻松游览：古罗马广场、教堂、海边',
        '☕ 在历史悠久的咖啡馆休息',
        '🌅 傍晚去海风琴和"向太阳致敬"看日落',
        '🍽️ 海边海鲜晚餐',
      ],
    },
  },
  {
    day: 12,
    date: { en: 'May 19 (Tue)', zh: '5月19日（周二）' },
    title: { en: 'Plitvice Lakes Day Trip', zh: '普利特维采湖一日游' },
    region: 'zadar',
    regionLabel: { en: 'Zadar, Croatia', zh: '克罗地亚·扎达尔' },
    mapQuery: 'Plitvice Lakes National Park, Croatia',
    accommodation: { en: 'Zadar Hotel', zh: '扎达尔酒店' },
    activities: {
      en: [
        '🚌 Day trip to Plitvice (1.5–2 hours each way)',
        '🛥️ Use boat and shuttle train within the park',
        '🌿 Take short lower-lakes route only',
        '🍽️ Return to Zadar for dinner',
      ],
      zh: [
        '🚌 乘大巴/自驾1.5–2小时到普利特维采',
        '🛥️ 搭乘游船和小火车游览',
        '🌿 选择下湖区短路线',
        '🍽️ 返回扎达尔用晚餐',
      ],
    },
  },
  {
    day: 13,
    date: { en: 'May 20 (Wed)', zh: '5月20日（周三）' },
    title: { en: 'Zadar → Senj', zh: '扎达尔 → 塞尼' },
    region: 'zadar',
    regionLabel: { en: 'Senj, Croatia', zh: '克罗地亚·塞尼' },
    mapQuery: 'Senj, Croatia',
    accommodation: { en: 'Senj Hotel', zh: '塞尼酒店' },
    activities: {
      en: [
        '🚌 Drive or bus along coastal D8 route to Senj (2–2.5 hours)',
        '🏨 Check in and meet friend',
        '🏖️ Easy beach or Nehaj Fortress visit',
        '🍽️ Dinner with friend',
      ],
      zh: [
        '🚌 从扎达尔沿海岸D8路线到塞尼（约2–2.5小时）',
        '🏨 入住，与朋友会面',
        '🏖️ 轻松海滩或参观 Nehaj 堡垒',
        '🍽️ 与朋友共进晚餐',
      ],
    },
  },
  {
    day: 14,
    date: { en: 'May 21 (Thu)', zh: '5月21日（周四）' },
    title: { en: 'Relaxed Day in Senj', zh: '塞尼放松日' },
    region: 'zadar',
    regionLabel: { en: 'Senj, Croatia', zh: '克罗地亚·塞尼' },
    mapQuery: 'Prva Draga Beach, Senj, Croatia',
    accommodation: { en: 'Senj Hotel', zh: '塞尼酒店' },
    activities: {
      en: [
        '🏖️ Beach time at Prva Draga or nearby',
        '🦐 Seafood lunch with friend',
        '🚶 Coastal walks at easy pace',
        '🌅 Sunset watching',
      ],
      zh: [
        '🏖️ 海滩时光（Prva Draga 或附近）',
        '🦐 与朋友吃海鲜午餐',
        '🚶 海岸散步，节奏轻松',
        '🌅 观赏日落',
      ],
    },
  },

  // ===== ITALY: VENICE & TUSCANY (Days 15-24) =====
  {
    day: 15,
    date: { en: 'May 22 (Fri)', zh: '5月22日（周五）' },
    title: { en: 'Senj → Rijeka → Venice', zh: '塞尼 → 里耶卡 → 威尼斯' },
    region: 'italy',
    regionLabel: { en: 'Venice, Italy', zh: '意大利·威尼斯' },
    mapQuery: 'Venice Santa Lucia Station, Italy',
    accommodation: { en: 'Venice Hotel', zh: '威尼斯酒店' },
    activities: {
      en: [
        '🚌 Morning bus Senj → Rijeka (1h 15–20 min)',
        '🚌 Late morning bus Rijeka → Venice (~4–4.5 hours)',
        '🚂 Local transfer to Venezia S. Lucia',
        '🤝 Meet Seb at 19:12 arrival',
      ],
      zh: [
        '🚌 早上从塞尼坐大巴到里耶卡（约1小时15–20分钟）',
        '🚌 随后从里耶卡搭乘长途巴士前往威尼斯（约4–4.5小时）',
        '🚂 换乘当地火车到圣卢西亚车站',
        '🤝 19:12与抵达的Seb会合',
      ],
    },
  },
  {
    day: 16,
    date: { en: 'May 23 (Sat)', zh: '5月23日（周六）' },
    title: { en: 'Venice Full Day with Seb', zh: '与Seb共度威尼斯整天' },
    region: 'italy',
    regionLabel: { en: 'Venice, Italy', zh: '意大利·威尼斯' },
    mapQuery: 'St. Mark\'s Square, Venice, Italy',
    accommodation: { en: 'Venice Hotel', zh: '威尼斯酒店' },
    activities: {
      en: [
        '🏛️ St. Mark\'s Square & Basilica (pre-book if possible)',
        '🌉 Rialto Bridge',
        '🛥️ Vaporetto ride along Grand Canal',
        '☕ Frequent café/gelato breaks',
      ],
      zh: [
        '🏛️ 圣马可广场和大教堂（建议预约）',
        '🌉 里亚托桥',
        '🛥️ 大运河水上巴士',
        '☕ 多安排咖啡和冰淇淋休息',
      ],
    },
  },
  {
    day: 17,
    date: { en: 'May 24 (Sun)', zh: '5月24日（周日）' },
    title: { en: 'Venice → Milan', zh: '威尼斯 → 米兰' },
    region: 'italy',
    regionLabel: { en: 'Milan, Italy', zh: '意大利·米兰' },
    mapQuery: 'Milano Centrale, Italy',
    accommodation: { en: 'Milan Hotel', zh: '米兰酒店' },
    activities: {
      en: [
        '☕ Easy morning in Venice',
        '🚄 Late morning high-speed train to Milano Centrale (~2–2.5 hours)',
        '⛪ Duomo exterior and Galleria Vittorio Emanuele II',
        '🍽️ Early dinner, early rest',
      ],
      zh: [
        '☕ 早上在威尼斯悠闲吃早餐、散步',
        '🚄 中午左右乘高速火车到米兰中央车站（约2–2.5小时）',
        '⛪ 参观米兰大教堂外观和埃马努埃莱二世长廊',
        '🍽️ 早点吃晚餐，早点休息',
      ],
    },
  },
  {
    day: 18,
    date: { en: 'May 25 (Mon)', zh: '5月25日（周一）' },
    title: { en: 'Milan → Siena → Tuscany Base', zh: '米兰 → 锡耶纳 → 托斯卡纳基地' },
    region: 'italy',
    regionLabel: { en: 'Castelnuovo Berardenga, Tuscany', zh: '意大利·托斯卡纳' },
    mapQuery: 'Castelnuovo Berardenga, Tuscany, Italy',
    accommodation: { en: 'Agriturismo in Castelnuovo Berardenga', zh: 'Castelnuovo Berardenga 乡村酒店' },
    activities: {
      en: [
        '🚄 Morning train Milan → Siena (via Florence, ~3–3.5 hours)',
        '🚗 Pick up rental car near Siena',
        '🏛️ Short Siena walk: Piazza del Campo, Duomo exterior',
        '🏨 20–30 min drive to Castelnuovo Berardenga',
      ],
      zh: [
        '🚄 早上从米兰乘火车经佛罗伦萨到锡耶纳（约3–3.5小时）',
        '🚗 在锡耶纳附近取租车',
        '🏛️ 简单逛逛坎波广场和大教堂外观',
        '🏨 开车约20–30分钟抵达Castelnuovo Berardenga',
      ],
    },
  },
  {
    day: 19,
    date: { en: 'May 26 (Tue)', zh: '5月26日（周二）' },
    title: { en: 'Chianti Wineries & Festivals', zh: '基安蒂酒庄与节庆' },
    region: 'italy',
    regionLabel: { en: 'Castelnuovo Berardenga, Tuscany', zh: '意大利·托斯卡纳' },
    mapQuery: 'Fèlsina Winery, Castelnuovo Berardenga, Italy',
    accommodation: { en: 'Agriturismo in Castelnuovo Berardenga', zh: 'Castelnuovo Berardenga 乡村酒店' },
    activities: {
      en: [
        '🍷 Morning: Visit Fèlsina or Agricola San Felice winery (10–15 min drive)',
        '🧀 Wine tasting with local salumi and pecorino',
        '🎭 Afternoon: Optional medieval festival in Arezzo area or visit Radda/Gaiole',
        '🍽️ Evening: Return to village for dinner',
      ],
      zh: [
        '🍷 上午：前往附近酒庄 Fèlsina 或 Agricola San Felice 品酒（10–15分钟车程）',
        '🧀 品尝经典基安蒂和桑娇维塞，配当地冷盘和羊奶酪',
        '🎭 下午：参加阿雷佐一带中世纪节庆，或去 Radda/Gaiole 小镇',
        '🍽️ 晚上回村庄吃晚餐',
      ],
    },
  },
  {
    day: 20,
    date: { en: 'May 27 (Wed)', zh: '5月27日（周三）' },
    title: { en: 'Val d\'Orcia: Pienza & Montalcino', zh: '瓦尔道尔恰：皮恩扎与蒙塔尔奇诺' },
    region: 'italy',
    regionLabel: { en: 'Castelnuovo Berardenga, Tuscany', zh: '意大利·托斯卡纳' },
    mapQuery: 'Pienza, Tuscany, Italy',
    accommodation: { en: 'Agriturismo in Castelnuovo Berardenga', zh: 'Castelnuovo Berardenga 乡村酒店' },
    activities: {
      en: [
        '🚗 Drive ~50 km to Pienza (~50 min)',
        '🧀 Stroll Via dell\'Amore, town walls, taste Pecorino di Pienza',
        '🍷 Drive to Montalcino for fortress views and Brunello wine',
        '🍽️ Dinner back at the agriturismo',
      ],
      zh: [
        '🚗 开车约50公里（50分钟）到皮恩扎',
        '🧀 漫步"爱之路"、城墙，品尝 Pienza 羊奶芝士',
        '🍷 再开车约20分钟到蒙塔尔奇诺，参观堡垒，品尝布鲁奈罗红酒',
        '🍽️ 傍晚返回乡村酒店用晚餐',
      ],
    },
  },
  {
    day: 21,
    date: { en: 'May 28 (Thu)', zh: '5月28日（周四）' },
    title: { en: 'Montepulciano, Hot Springs & Festival', zh: '蒙特普尔恰诺、温泉与节庆' },
    region: 'italy',
    regionLabel: { en: 'Castelnuovo Berardenga, Tuscany', zh: '意大利·托斯卡纳' },
    mapQuery: 'Montepulciano, Tuscany, Italy',
    accommodation: { en: 'Agriturismo in Castelnuovo Berardenga', zh: 'Castelnuovo Berardenga 乡村酒店' },
    activities: {
      en: [
        '🚗 Drive ~45–50 min to Montepulciano (~48 km)',
        '🏛️ Explore steep lanes, main piazza, historic wine cellars',
        '♨️ Option: Visit Bagno Vignoni thermal area (~30 min away)',
        '🎭 Or: Medieval festival events in Malmantile area',
      ],
      zh: [
        '🚗 开车约45–50分钟到蒙特普尔恰诺（约48公里）',
        '🏛️ 游览斜坡街道、主广场和古老酒窖',
        '♨️ 可选：前往约30分钟车程的 Bagno Vignoni 温泉小镇',
        '🎭 或：参加 Malmantile 一带中世纪节庆',
      ],
    },
  },
  {
    day: 22,
    date: { en: 'May 29 (Fri)', zh: '5月29日（周五）' },
    title: { en: 'Siena Deep Dive', zh: '锡耶纳深度游' },
    region: 'italy',
    regionLabel: { en: 'Castelnuovo Berardenga, Tuscany', zh: '意大利·托斯卡纳' },
    mapQuery: 'Piazza del Campo, Siena, Italy',
    accommodation: { en: 'Agriturismo in Castelnuovo Berardenga', zh: 'Castelnuovo Berardenga 乡村酒店' },
    activities: {
      en: [
        '🚗 Drive ~20–30 min to Siena (~20–23 km)',
        '🏛️ Full day: Piazza del Campo, Torre del Mangia, Duomo complex',
        '🍽️ Lunch in a quiet side street',
        '🚶 Wander contrade neighborhoods and artisan shops',
      ],
      zh: [
        '🚗 开车约20–30分钟到锡耶纳（约20–23公里）',
        '🏛️ 全天深入游览：坎波广场、曼贾塔、大教堂综合区',
        '🍽️ 午餐可选稍安静的小街餐馆',
        '🚶 在各个城区和手工艺小店慢慢逛',
      ],
    },
  },
  {
    day: 23,
    date: { en: 'May 30 (Sat)', zh: '5月30日（周六）' },
    title: { en: 'Cortona & Arezzo', zh: '科尔托纳与阿雷佐' },
    region: 'italy',
    regionLabel: { en: 'Castelnuovo Berardenga, Tuscany', zh: '意大利·托斯卡纳' },
    mapQuery: 'Cortona, Tuscany, Italy',
    accommodation: { en: 'Agriturismo in Castelnuovo Berardenga', zh: 'Castelnuovo Berardenga 乡村酒店' },
    activities: {
      en: [
        '🚗 Drive ~45–50 min to Cortona (~45 km)',
        '🏛️ Enjoy panoramic views, Etruscan history, relaxed lanes',
        '☕ Coffee or aperitivo with a view',
        '🎭 Option: Continue to Arezzo for medieval festival events',
      ],
      zh: [
        '🚗 开车约45–50分钟（约45公里）到科尔托纳',
        '🏛️ 欣赏全景、了解伊特鲁里亚历史，在悠闲小巷漫步',
        '☕ 在观景处喝咖啡或开胃酒',
        '🎭 可选：继续前往阿雷佐参加中世纪节庆活动',
      ],
    },
  },
  {
    day: 24,
    date: { en: 'May 31 (Sun)', zh: '5月31日（周日）' },
    title: { en: 'Maggiolata Festival & Transfer to Rome', zh: '花卉节与前往罗马' },
    region: 'italy',
    regionLabel: { en: 'Rome, Italy', zh: '意大利·罗马' },
    mapQuery: 'Lucignano, Tuscany, Italy',
    accommodation: { en: 'Rome Hotel', zh: '罗马酒店' },
    activities: {
      en: [
        '🚗 Drive ~35–40 min to Lucignano for Maggiolata Lucignanese flower festival',
        '🌸 Enjoy floral floats, parades, music, and local food',
        '🍽️ Lunch at the festival',
        '🚄 Afternoon: Depart towards Rome by car or train (~3–3.5 hours)',
      ],
      zh: [
        '🚗 开车约35–40分钟到 Lucignano 参加 Maggiolata Lucignanese 花卉节',
        '🌸 欣赏花车游行、乐队表演，品尝当地美食',
        '🍽️ 中午在节庆现场用餐',
        '🚄 下午前往罗马（约3–3.5小时）',
      ],
    },
  },

  // ===== ROME (Days 25-29) =====
  {
    day: 25,
    date: { en: 'Jun 1 (Mon)', zh: '6月1日（周一）' },
    title: { en: 'Ancient Rome Easy Day', zh: '古罗马轻松日' },
    region: 'rome',
    regionLabel: { en: 'Rome, Italy', zh: '意大利·罗马' },
    mapQuery: 'Colosseum, Rome, Italy',
    accommodation: { en: 'Rome Hotel', zh: '罗马酒店' },
    activities: {
      en: [
        '🏛️ Colosseum (easy-access route)',
        '📸 Viewpoints over the Roman Forum',
        '🚕 Taxi transfers and plenty of rests',
        '🍽️ Dinner near hotel',
      ],
      zh: [
        '🏛️ 参观斗兽场（选择相对轻松路线）',
        '📸 在观景点远眺古罗马广场',
        '🚕 建议打车往返并多安排休息',
        '🍽️ 酒店附近用晚餐',
      ],
    },
  },
  {
    day: 26,
    date: { en: 'Jun 2 (Tue)', zh: '6月2日（周二）' },
    title: { en: 'Vatican Area', zh: '梵蒂冈区域' },
    region: 'rome',
    regionLabel: { en: 'Rome, Italy', zh: '意大利·罗马' },
    mapQuery: 'Vatican City',
    accommodation: { en: 'Rome Hotel', zh: '罗马酒店' },
    activities: {
      en: [
        '⛪ Choose ONE: St. Peter\'s Basilica OR Vatican Museums',
        '☕ Slow pace with café breaks',
        '🚕 Taxi or bus for transfers',
        '🍽️ Dinner in Trastevere or near hotel',
      ],
      zh: [
        '⛪ 当天只安排圣彼得大教堂或梵蒂冈博物馆其中之一',
        '☕ 节奏放慢，多休息',
        '🚕 搭乘公交或出租车往返',
        '🍽️ 在特拉斯提弗列或酒店附近用晚餐',
      ],
    },
  },
  {
    day: 27,
    date: { en: 'Jun 3 (Wed)', zh: '6月3日（周三）' },
    title: { en: 'Classic Rome Walk', zh: '经典罗马步行' },
    region: 'rome',
    regionLabel: { en: 'Rome, Italy', zh: '意大利·罗马' },
    mapQuery: 'Trevi Fountain, Rome, Italy',
    accommodation: { en: 'Rome Hotel', zh: '罗马酒店' },
    activities: {
      en: [
        '💧 Trevi Fountain → Spanish Steps → Pantheon → Piazza Navona',
        '☕ Keep walking segments short with frequent breaks',
        '🚕 Use taxis between sections if needed',
        '🍨 Gelato stops along the way',
      ],
      zh: [
        '💧 特雷维喷泉 → 西班牙台阶 → 万神殿 → 纳沃纳广场',
        '☕ 将步行路段分成多段，中间多休息',
        '🚕 必要时乘坐出租车连接景点',
        '🍨 沿途吃冰淇淋',
      ],
    },
  },
  {
    day: 28,
    date: { en: 'Jun 4 (Thu)', zh: '6月4日（周四）' },
    title: { en: 'Extra Rome / Packing', zh: '额外的罗马时光/整理行李' },
    region: 'rome',
    regionLabel: { en: 'Rome, Italy', zh: '意大利·罗马' },
    mapQuery: 'Trastevere, Rome, Italy',
    accommodation: { en: 'Rome Hotel', zh: '罗马酒店' },
    activities: {
      en: [
        '🌅 Morning for a favorite spot or Trastevere stroll',
        '🛍️ Small shopping for souvenirs',
        '📦 Afternoon for packing and rest',
        '🍽️ Farewell dinner at a special restaurant',
      ],
      zh: [
        '🌅 上午重游喜欢的地方或在特拉斯提弗列散步',
        '🛍️ 简单购物，买纪念品',
        '📦 下午整理行李和休息',
        '🍽️ 在特色餐厅吃告别晚餐',
      ],
    },
  },
  {
    day: 29,
    date: { en: 'Jun 5 (Fri)', zh: '6月5日（周五）' },
    title: { en: 'Rome → Home', zh: '罗马 → 返程' },
    region: 'travel',
    regionLabel: { en: 'Travel Day', zh: '旅行日' },
    mapQuery: 'Rome Fiumicino Airport, Italy',
    accommodation: null,
    activities: {
      en: [
        '😴 Easy morning near hotel',
        '🚕 Transfer to airport',
        '✈️ Flight home',
        '🏠 End of wonderful journey',
      ],
      zh: [
        '😴 早上在酒店附近轻松活动',
        '🚕 前往机场',
        '✈️ 搭乘返程航班',
        '🏠 美好旅程结束',
      ],
    },
  },
];

// ===== THAILAND & PENANG CATEGORIES =====
const thailandCategories: ActivityCategory[] = [
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

// ===== CROATIA & ITALY CATEGORIES =====
const croatiaCategories: ActivityCategory[] = [
  {
    title: { en: '🏛️ Croatia Highlights', zh: '🏛️ 克罗地亚精华' },
    icon: '🏛️',
    items: [
      { en: 'Dubrovnik Old Town: UNESCO walled city, cable car to Mt. Srđ', zh: '杜布罗夫尼克老城：联合国世界文化遗产，缆车上 Srđ 山' },
      { en: 'Lokrum Island: Botanical gardens, peacocks, easy boardwalks', zh: '洛克鲁姆岛：植物园、孔雀、平缓木栈道' },
      { en: 'Split: Diocletian\'s Palace, Riva promenade', zh: '斯普利特：戴克里先宫、海滨长廊' },
      { en: 'Krka National Park: Waterfalls, boat rides, easy walks', zh: '克尔卡国家公园：瀑布、游船、轻松步行' },
      { en: 'Hvar Island: Harbor town, beaches, lavender fields', zh: '赫瓦尔岛：港口小镇、海滩、薰衣草田' },
      { en: 'Zadar: Sea Organ, Greeting to the Sun, Roman forum', zh: '扎达尔：海风琴、向太阳致敬、古罗马广场' },
      { en: 'Plitvice Lakes: UNESCO national park with lakes and waterfalls', zh: '普利特维采湖：联合国世界自然遗产，湖泊瀑布' },
    ],
  },
  {
    title: { en: '🏛️ Venice & Northern Italy', zh: '🏛️ 威尼斯与北意大利' },
    icon: '🏛️',
    items: [
      { en: 'St. Mark\'s Square & Basilica: Heart of Venice', zh: '圣马可广场和大教堂：威尼斯的心脏' },
      { en: 'Rialto Bridge: Iconic crossing over Grand Canal', zh: '里亚托桥：大运河上的标志性建筑' },
      { en: 'Grand Canal Vaporetto: Scenic water bus ride', zh: '大运河水上巴士：风景优美的水上交通' },
      { en: 'Milan Duomo: Gothic cathedral and Galleria Vittorio Emanuele II', zh: '米兰大教堂：哥特式教堂和埃马努埃莱二世长廊' },
    ],
  },
  {
    title: { en: '🍷 Tuscany Wine & Culture', zh: '🍷 托斯卡纳酒乡文化' },
    icon: '🍷',
    items: [
      { en: 'Chianti Classico Wineries: Fèlsina, Agricola San Felice', zh: '经典基安蒂酒庄：Fèlsina、Agricola San Felice' },
      { en: 'Pienza: Renaissance "ideal city", pecorino cheese capital', zh: '皮恩扎：文艺复兴"理想城市"，羊奶酪之都' },
      { en: 'Montalcino: Brunello wine and fortress views', zh: '蒙塔尔奇诺：布鲁奈罗红酒和堡垒景观' },
      { en: 'Montepulciano: Vino Nobile wine and Renaissance architecture', zh: '蒙特普尔恰诺：贵族红酒和文艺复兴建筑' },
      { en: 'Siena: Piazza del Campo, Duomo, medieval neighborhoods', zh: '锡耶纳：坎波广场、大教堂、中世纪街区' },
      { en: 'Cortona: Etruscan hill town with panoramic views', zh: '科尔托纳：伊特鲁里亚山城，全景视野' },
      { en: 'Medieval Festivals: Festa Medievale Bianco Azzurra, Maggiolata', zh: '中世纪节庆：Bianco Azzurra 节、Maggiolata 花卉节' },
    ],
  },
  {
    title: { en: '🏛️ Rome Classics', zh: '🏛️ 罗马经典' },
    icon: '🏛️',
    items: [
      { en: 'Colosseum: Ancient amphitheater, easy-access routes available', zh: '斗兽场：古罗马圆形剧场，有轻松路线' },
      { en: 'Roman Forum: Ancient ruins with viewpoints', zh: '古罗马广场：古代遗址，有观景处' },
      { en: 'Vatican: St. Peter\'s Basilica or Vatican Museums', zh: '梵蒂冈：圣彼得大教堂或梵蒂冈博物馆' },
      { en: 'Trevi Fountain: Baroque masterpiece', zh: '特雷维喷泉：巴洛克杰作' },
      { en: 'Spanish Steps: Iconic stairway', zh: '西班牙台阶：标志性阶梯' },
      { en: 'Pantheon: Ancient Roman temple', zh: '万神殿：古罗马神庙' },
      { en: 'Piazza Navona: Baroque square with fountains', zh: '纳沃纳广场：带喷泉的巴洛克广场' },
      { en: 'Trastevere: Charming neighborhood for evening strolls', zh: '特拉斯提弗列：适合傍晚散步的魅力街区' },
    ],
  },
  {
    title: { en: '🍝 Food & Dining', zh: '🍝 美食与餐饮' },
    icon: '🍝',
    items: [
      { en: 'Croatia: Fresh seafood, peka (slow-cooked meat), local wine', zh: '克罗地亚：新鲜海鲜、peka（慢炖肉）、当地葡萄酒' },
      { en: 'Italy: Regional pasta, pizza al taglio, gelato, aperitivo', zh: '意大利：地方特色意面、切块披萨、冰淇淋、开胃酒' },
      { en: 'Tuscany: Chianti wine, pecorino cheese, cured meats', zh: '托斯卡纳：基安蒂红酒、羊奶酪、腌制肉类' },
      { en: 'Rome: Carbonara, cacio e pepe, supplì, Roman-style pizza', zh: '罗马：卡邦尼意面、黑胡椒奶酪意面、炸饭团、罗马式披萨' },
    ],
  },
];

// ===== THAILAND & PENANG TIPS =====
const thailandTips: TipSection[] = [
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

// ===== CROATIA & ITALY TIPS =====
const croatiaTips: TipSection[] = [
  {
    title: { en: '✈️ Transportation', zh: '✈️ 交通' },
    icon: '✈️',
    items: [
      { en: 'Mostar → Dubrovnik: Bus (~3.5 hours)', zh: '莫斯塔尔 → 杜布罗夫尼克：大巴（约3.5小时）' },
      { en: 'Dubrovnik → Split: Coastal bus or private transfer (~3–4 hours)', zh: '杜布罗夫尼克 → 斯普利特：海岸大巴或包车（约3–4小时）' },
      { en: 'Split → Hvar: Fast ferry (50–70 min each way)', zh: '斯普利特 → 赫瓦尔：快速渡轮（单程50–70分钟）' },
      { en: 'Split → Zadar: Bus (~2–3 hours)', zh: '斯普利特 → 扎达尔：大巴（约2–3小时）' },
      { en: 'Senj → Venice: Bus via Rijeka (~5.5–6 hours total)', zh: '塞尼 → 威尼斯：经里耶卡乘大巴（总计约5.5–6小时）' },
      { en: 'Venice → Milan: High-speed train (~2–2.5 hours)', zh: '威尼斯 → 米兰：高速火车（约2–2.5小时）' },
      { en: 'Milan → Siena: Train via Florence (~3–3.5 hours)', zh: '米兰 → 锡耶纳：经佛罗伦萨乘火车（约3–3.5小时）' },
      { en: 'Tuscany: Rental car recommended for flexibility', zh: '托斯卡纳：建议租车以便灵活出行' },
    ],
  },
  {
    title: { en: '🎒 Packing Essentials', zh: '🎒 打包必备' },
    icon: '🎒',
    items: [
      { en: 'Comfortable walking shoes (cobblestone streets!)', zh: '舒适的步行鞋（鹅卵石街道！）' },
      { en: 'Light layers for variable weather (May/June)', zh: '轻便分层衣物（应对5月/6月多变天气）' },
      { en: 'Sunscreen, hat, sunglasses', zh: '防晒霜、帽子、太阳镜' },
      { en: 'Small daypack for daily outings', zh: '小型日间背包' },
      { en: 'Power adapters: Croatia (Type C/F), Italy (Type C/F/L)', zh: '电源转换器：克罗地亚（C/F型），意大利（C/F/L型）' },
      { en: 'Euros for Italy, Kuna alternative or Euros in Croatia', zh: '欧元（意大利），克罗地亚可用欧元或库纳替代' },
      { en: 'Travel insurance documents', zh: '旅行保险文件' },
      { en: 'Medications and prescriptions', zh: '药物和处方' },
    ],
  },
  {
    title: { en: '♿ Senior-Friendly Tips', zh: '♿ 长者友好提示' },
    icon: '♿',
    items: [
      { en: 'Book accommodations with elevators when possible', zh: '尽量预订带电梯的住宿' },
      { en: 'Take taxis between major sights to conserve energy', zh: '主要景点之间乘出租车，节省体力' },
      { en: 'Plan frequent rest breaks at cafés', zh: '计划在咖啡馆频繁休息' },
      { en: 'Choose easy-access routes at attractions', zh: '在景点选择轻松路线' },
      { en: 'Avoid midday heat – schedule indoor activities', zh: '避免正午高温，安排室内活动' },
      { en: 'Carry water bottles and stay hydrated', zh: '随身携带水瓶，保持水分' },
      { en: 'Travel insurance with medical coverage essential', zh: '必须购买含医疗保障的旅行保险' },
    ],
  },
  {
    title: { en: '🌤️ Weather & Best Time', zh: '🌤️ 天气与最佳时间' },
    icon: '🌤️',
    items: [
      { en: 'May–June: Pleasant temperatures, fewer crowds than summer', zh: '5月–6月：气温宜人，比夏季人少' },
      { en: 'Croatia: Warm days, cool evenings, occasional rain', zh: '克罗地亚：白天温暖，晚上凉爽，偶有降雨' },
      { en: 'Italy: Mild to warm, perfect for outdoor dining', zh: '意大利：温和到温暖，适合户外用餐' },
      { en: 'Pack a light jacket for evenings', zh: '带一件轻便外套应对晚上' },
    ],
  },
  {
    title: { en: '💰 Currency & Budget', zh: '💰 货币与预算' },
    icon: '💰',
    items: [
      { en: 'Croatia: Euro (€) widely accepted', zh: '克罗地亚：欧元广泛接受' },
      { en: 'Italy: Euro (€)', zh: '意大利：欧元' },
      { en: 'Restaurants: €15–30 per person for dinner', zh: '餐厅：晚餐每人€15–30' },
      { en: 'Wine tastings: €15–40 per person', zh: '品酒：每人€15–40' },
      { en: 'Attraction tickets: €10–25 per person', zh: '景点门票：每人€10–25' },
    ],
  },
];

// ===== TRIP OVERVIEWS =====
const thailandOverview: TripOverview = {
  duration: { en: 'February 27 – March 17, 2026', zh: '2026年2月27日 – 3月17日' },
  stays: [
    {
      location: { en: 'Ao Nang, Krabi', zh: '安南（Ao Nang）' },
      dates: { en: 'Feb 27 – Mar 1', zh: '2月27日 – 3月1日' },
      hotel: { en: 'Ao Nang Townhouse', zh: 'Ao Nang Townhouse' },
      region: 'krabi',
    },
    {
      location: { en: 'Koh Lanta (Lanta Old Town)', zh: '兰塔岛老城' },
      dates: { en: 'Mar 1 – Mar 3 (2 nights)', zh: '3月1日 – 3月3日（2晚）' },
      hotel: { en: 'Fresh House (#630068471)', zh: 'Fresh House（#630068471）' },
      region: 'lanta',
    },
    {
      location: { en: 'Koh Phi Phi', zh: '皮皮岛' },
      dates: { en: 'Mar 3 – Mar 4 (1 night)', zh: '3月3日 – 3月4日（1晚）' },
      hotel: { en: 'Phi Phi Twin Palms Bungalow (#630065883)', zh: 'Phi Phi Twin Palms Bungalow（#630065883）' },
      region: 'lanta',
    },
    {
      location: { en: 'Koh Lanta (Sala Dan)', zh: '兰塔岛 Sala Dan' },
      dates: { en: 'Mar 4 – Mar 6 (2 nights)', zh: '3月4日 – 3月6日（2晚）' },
      hotel: { en: 'BOHO Hostel (#630072187)', zh: 'BOHO Hostel（#630072187）' },
      region: 'lanta',
    },
    {
      location: { en: 'Koh Lipe', zh: '丽贝岛' },
      dates: { en: 'Mar 6 – Mar 10 (4 nights)', zh: '3月6日 – 3月10日（4晚）' },
      hotel: { en: 'Varin Beach Resort (#629167643)', zh: 'Varin Beach Resort（#629167643）' },
      region: 'lipe',
    },
    {
      location: { en: 'Penang, Malaysia', zh: '槟城，马来西亚' },
      dates: { en: 'Mar 11 – Mar 17 (7 nights)', zh: '3月11日 – 3月17日（7晚）' },
      hotel: { en: 'Airbnb in George Town', zh: '乔治市民宿' },
      region: 'penang',
    },
  ],
};

const croatiaOverview: TripOverview = {
  duration: { en: 'May 8 – June 5, 2026', zh: '2026年5月8日 – 6月5日' },
  stays: [
    {
      location: { en: 'Dubrovnik, Croatia', zh: '杜布罗夫尼克，克罗地亚' },
      dates: { en: 'May 8–12', zh: '5月8日–12日' },
      hotel: { en: 'TBD', zh: '待定' },
      region: 'dubrovnik',
    },
    {
      location: { en: 'Split, Croatia', zh: '斯普利特，克罗地亚' },
      dates: { en: 'May 13–16', zh: '5月13日–16日' },
      hotel: { en: 'TBD', zh: '待定' },
      region: 'split',
    },
    {
      location: { en: 'Zadar, Croatia', zh: '扎达尔，克罗地亚' },
      dates: { en: 'May 17–19', zh: '5月17日–19日' },
      hotel: { en: 'TBD', zh: '待定' },
      region: 'zadar',
    },
    {
      location: { en: 'Senj, Croatia', zh: '塞尼，克罗地亚' },
      dates: { en: 'May 20–21', zh: '5月20日–21日' },
      hotel: { en: 'TBD', zh: '待定' },
      region: 'zadar',
    },
    {
      location: { en: 'Venice, Italy', zh: '威尼斯，意大利' },
      dates: { en: 'May 22–23', zh: '5月22日–23日' },
      hotel: { en: 'TBD', zh: '待定' },
      region: 'italy',
    },
    {
      location: { en: 'Milan, Italy', zh: '米兰，意大利' },
      dates: { en: 'May 24', zh: '5月24日' },
      hotel: { en: 'TBD', zh: '待定' },
      region: 'italy',
    },
    {
      location: { en: 'Tuscany (Castelnuovo Berardenga)', zh: '托斯卡纳（Castelnuovo Berardenga）' },
      dates: { en: 'May 25–30', zh: '5月25日–30日' },
      hotel: { en: 'Agriturismo', zh: '乡村酒店' },
      region: 'italy',
    },
    {
      location: { en: 'Rome, Italy', zh: '罗马，意大利' },
      dates: { en: 'May 31 – Jun 5', zh: '5月31日 – 6月5日' },
      hotel: { en: 'TBD', zh: '待定' },
      region: 'rome',
    },
  ],
};

// ===== EXPORT TRIPS =====
export const trips: Record<'thailand' | 'croatia', TripData> = {
  thailand: {
    id: 'thailand',
    name: { en: 'Thailand & Malaysia', zh: '泰国和马来西亚' },
    footer: { en: '🌴 Thailand & Malaysia 2026 · Have a wonderful trip!', zh: '🌴 泰国和马来西亚 2026 · 祝旅途愉快！' },
    regionColors: thailandRegionColors,
    days: thailandDays,
    categories: thailandCategories,
    tips: thailandTips,
    overview: thailandOverview,
  },
  croatia: {
    id: 'croatia',
    name: { en: 'Croatia & Italy', zh: '克罗地亚和意大利' },
    footer: { en: '🇭🇷🇮🇹 Croatia & Italy 2026 · Have a wonderful trip!', zh: '🇭🇷🇮🇹 克罗地亚和意大利 2026 · 祝旅途愉快！' },
    regionColors: croatiaRegionColors,
    days: croatiaDays,
    categories: croatiaCategories,
    tips: croatiaTips,
    overview: croatiaOverview,
  },
};

// Legacy exports for backward compatibility
export const days = thailandDays;
export const penangCategories = thailandCategories;
export const travelTips = thailandTips;
export const tripOverview = thailandOverview;
export const regionColors = thailandRegionColors;
