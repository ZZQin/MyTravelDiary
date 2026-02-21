export type Language = 'en' | 'zh';
export type TripId = 'thailand' | 'croatia' | 'china';

export interface Bilingual {
  en: string;
  zh: string;
}

// ===== EXPENSE TYPES =====
export type ExpenseCategory = 'accommodation' | 'food' | 'transport' | 'activities' | 'shopping' | 'other';

export interface Expense {
  id: string;
  amount: number;
  currency: string; // THB, EUR, USD, MYR, etc.
  category: ExpenseCategory;
  description: string;
  timestamp: number;
}

export interface DayExpenses {
  expenses: Expense[];
}

// ===== JOURNAL TYPES =====
export interface JournalEntry {
  id: string;
  content: string;
  type: 'general' | 'restaurant' | 'warning' | 'gem';
  timestamp: number;
}

export interface DayJournal {
  entries: JournalEntry[];
}

// ===== PHOTO TYPES =====
export interface PhotoMemory {
  id: string;
  dataUrl: string; // base64 for offline storage
  caption: string;
  timestamp: number;
}

export interface DayPhotos {
  photos: PhotoMemory[];
}

// ===== VISITED TRACKING =====
export interface VisitedActivities {
  [activityIndex: number]: boolean;
}

export interface DayVisited {
  activities: VisitedActivities;
}

// ===== PACKING CHECKLIST =====
export type PackingCategory = 'clothing' | 'toiletries' | 'electronics' | 'documents' | 'medical' | 'misc';

export interface PackingItem {
  id: string;
  name: Bilingual;
  category: PackingCategory;
  checked: boolean;
  weatherRelated?: boolean;
}

export interface TripPackingList {
  items: PackingItem[];
  lastModified: number;
}

// ===== WEATHER DATA =====
export interface WeatherData {
  date: string;
  tempHigh: number;
  tempLow: number;
  condition: string;
  icon: string;
  humidity?: number;
  precipitation?: number;
}

export interface DayWeather {
  weather: WeatherData | null;
  lastUpdated: number;
}

// ===== USER DATA (Stored in LocalStorage) =====
export interface UserTripData {
  expenses: Record<number, DayExpenses>; // day number -> expenses
  journals: Record<number, DayJournal>; // day number -> journal entries
  photos: Record<number, DayPhotos>; // day number -> photos
  visited: Record<number, DayVisited>; // day number -> visited activities
  packingList: TripPackingList;
  weather: Record<number, DayWeather>; // day number -> weather
}

export interface AppUserData {
  [tripId: string]: UserTripData;
}

// ===== CURRENCY RATES (simplified) =====
export const currencyRates: Record<string, number> = {
  THB: 0.029, // 1 THB = 0.029 USD
  EUR: 1.08,  // 1 EUR = 1.08 USD
  USD: 1,
  MYR: 0.22,  // 1 MYR = 0.22 USD
  HRK: 0.14,  // Croatian Kuna (though now using EUR)
  CNY: 0.14,  // Chinese Yuan
};

export const currencySymbols: Record<string, string> = {
  THB: '฿',
  EUR: '€',
  USD: '$',
  MYR: 'RM',
  HRK: 'kn',
  CNY: '¥',
};

// ===== PACKING ITEMS DEFAULTS =====
export const defaultPackingItems: Omit<PackingItem, 'id' | 'checked'>[] = [
  // Clothing
  { name: { en: 'T-shirts/Tops', zh: 'T恤/上衣' }, category: 'clothing' },
  { name: { en: 'Shorts/Pants', zh: '短裤/长裤' }, category: 'clothing' },
  { name: { en: 'Underwear', zh: '内衣' }, category: 'clothing' },
  { name: { en: 'Socks', zh: '袜子' }, category: 'clothing' },
  { name: { en: 'Swimwear', zh: '泳衣' }, category: 'clothing' },
  { name: { en: 'Light jacket', zh: '轻便外套' }, category: 'clothing', weatherRelated: true },
  { name: { en: 'Rain jacket/poncho', zh: '雨衣/雨披' }, category: 'clothing', weatherRelated: true },
  { name: { en: 'Comfortable walking shoes', zh: '舒适的步行鞋' }, category: 'clothing' },
  { name: { en: 'Sandals/Flip-flops', zh: '凉鞋/人字拖' }, category: 'clothing' },
  { name: { en: 'Hat/Cap', zh: '帽子' }, category: 'clothing' },
  { name: { en: 'Sunglasses', zh: '太阳镜' }, category: 'clothing' },
  
  // Toiletries
  { name: { en: 'Toothbrush & toothpaste', zh: '牙刷和牙膏' }, category: 'toiletries' },
  { name: { en: 'Shampoo & conditioner', zh: '洗发水和护发素' }, category: 'toiletries' },
  { name: { en: 'Body wash/soap', zh: '沐浴露/肥皂' }, category: 'toiletries' },
  { name: { en: 'Deodorant', zh: '除臭剂' }, category: 'toiletries' },
  { name: { en: 'Sunscreen (SPF 50+)', zh: '防晒霜 (SPF 50+)' }, category: 'toiletries' },
  { name: { en: 'Insect repellent', zh: '驱蚊液' }, category: 'toiletries' },
  { name: { en: 'Personal medications', zh: '个人药品' }, category: 'toiletries' },
  { name: { en: 'First aid kit', zh: '急救包' }, category: 'toiletries' },
  
  // Electronics
  { name: { en: 'Phone & charger', zh: '手机和充电器' }, category: 'electronics' },
  { name: { en: 'Power adapter', zh: '电源转换器' }, category: 'electronics' },
  { name: { en: 'Camera & memory cards', zh: '相机和存储卡' }, category: 'electronics' },
  { name: { en: 'Portable battery pack', zh: '充电宝' }, category: 'electronics' },
  { name: { en: 'Headphones', zh: '耳机' }, category: 'electronics' },
  
  // Documents
  { name: { en: 'Passport', zh: '护照' }, category: 'documents' },
  { name: { en: 'Visa documents', zh: '签证文件' }, category: 'documents' },
  { name: { en: 'Flight tickets/boarding passes', zh: '机票/登机牌' }, category: 'documents' },
  { name: { en: 'Hotel confirmations', zh: '酒店预订确认' }, category: 'documents' },
  { name: { en: 'Travel insurance', zh: '旅行保险' }, category: 'documents' },
  { name: { en: 'Driver\'s license', zh: '驾照' }, category: 'documents' },
  { name: { en: 'Emergency contacts', zh: '紧急联系人' }, category: 'documents' },
  
  // Misc
  { name: { en: 'Daypack/Backpack', zh: '日间背包' }, category: 'misc' },
  { name: { en: 'Water bottle', zh: '水瓶' }, category: 'misc' },
  { name: { en: 'Travel pillow', zh: '旅行枕' }, category: 'misc' },
  { name: { en: 'Eye mask & earplugs', zh: '眼罩和耳塞' }, category: 'misc' },
  { name: { en: 'Books/Kindle', zh: '书籍/电子书' }, category: 'misc' },
  { name: { en: 'Snacks', zh: '零食' }, category: 'misc' },
  { name: { en: 'Umbrella', zh: '雨伞' }, category: 'misc', weatherRelated: true },
  { name: { en: 'Seasickness pills', zh: '晕船药' }, category: 'misc' },
  { name: { en: 'Cash (local currency)', zh: '现金 (当地货币)' }, category: 'misc' },
  { name: { en: 'Credit/debit cards', zh: '信用卡/借记卡' }, category: 'misc' },
];

// Expense category labels
export const expenseCategoryLabels: Record<ExpenseCategory, Bilingual> = {
  accommodation: { en: '🏨 Accommodation', zh: '🏨 住宿' },
  food: { en: '🍜 Food & Dining', zh: '🍜 餐饮' },
  transport: { en: '🚗 Transport', zh: '🚗 交通' },
  activities: { en: '🎭 Activities', zh: '🎭 活动' },
  shopping: { en: '🛍️ Shopping', zh: '🛍️ 购物' },
  other: { en: '📦 Other', zh: '📦 其他' },
};

// Packing category labels
export const packingCategoryLabels: Record<PackingCategory, Bilingual> = {
  clothing: { en: '👕 Clothing', zh: '👕 衣物' },
  toiletries: { en: '🧴 Toiletries', zh: '🧴 洗漱用品' },
  electronics: { en: '🔌 Electronics', zh: '🔌 电子产品' },
  documents: { en: '📄 Documents', zh: '📄 文件' },
  medical: { en: '💊 Medical', zh: '💊 药品' },
  misc: { en: '🎒 Misc', zh: '🎒 其他' },
};

// Weather condition icons mapping
export const weatherIconMap: Record<string, string> = {
  'Clear': '☀️',
  'Sunny': '☀️',
  'Partly Cloudy': '⛅',
  'Cloudy': '☁️',
  'Overcast': '☁️',
  'Rain': '🌧️',
  'Light Rain': '🌦️',
  'Heavy Rain': '⛈️',
  'Thunderstorm': '⛈️',
  'Snow': '❄️',
  'Fog': '🌫️',
};
