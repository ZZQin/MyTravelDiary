import { useState, useRef, useEffect, useCallback } from 'react';
import {
  trips,
  type Language,
  type TripId,
  type DayData,
  type Bilingual,
} from './data/itinerary';
import {
  type ExpenseCategory,
  expenseCategoryLabels,
  currencySymbols,
  currencyRates,
  defaultPackingItems,
  packingCategoryLabels,
  type PackingCategory,
  weatherIconMap,
} from './data/types';
import { useLocalStorage, calculateTotalExpenses } from './hooks/useLocalStorage';

/* ─── Utility: Date parsing for countdown ─── */
function parseTripDates(tripId: TripId): { start: Date; end: Date } | null {
  const trip = trips[tripId];
  const firstDay = trip.days[0];
  const lastDay = trip.days[trip.days.length - 1];
  
  // Try to parse dates from the date strings
  // Format examples: "May 8 (Fri)" or "Feb 27 (Thu)" or "5月8日（周五）"
  const enDate = firstDay.date.en;
  const year = tripId === 'thailand' ? 2026 : 2026;
  
  const monthMap: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  
  // Parse "May 8 (Fri)" format
  const match = enDate.match(/([A-Za-z]+)\s+(\d+)/);
  if (match) {
    const month = monthMap[match[1]];
    const day = parseInt(match[2], 10);
    const startDate = new Date(year, month, day);
    
    // Parse end date
    const enEndDate = lastDay.date.en;
    const endMatch = enEndDate.match(/([A-Za-z]+)\s+(\d+)/);
    if (endMatch) {
      const endMonth = monthMap[endMatch[1]];
      const endDay = parseInt(endMatch[2], 10);
      const endDate = new Date(year, endMonth, endDay);
      return { start: startDate, end: endDate };
    }
  }
  
  return null;
}

function getDaysUntilTrip(tripId: TripId): number | null {
  const dates = parseTripDates(tripId);
  if (!dates) return null;
  
  const now = new Date();
  const diffTime = dates.start.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

function getDaysLeftInTrip(tripId: TripId): number | null {
  const dates = parseTripDates(tripId);
  if (!dates) return null;
  
  const now = new Date();
  if (now < dates.start) return null;
  if (now > dates.end) return null;
  
  const diffTime = dates.end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/* ─── Google Map Embed ─── */
function MapEmbed({ query }: { query: string }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-md bg-gray-200 relative" style={{ height: 220 }}>
      <iframe
        src={src}
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Map"
      />
    </div>
  );
}

/* ─── Open in Maps link ─── */
function OpenInMaps({ query, lang }: { query: string; lang: Language }) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-blue-600 underline text-base mt-2 active:text-blue-800"
    >
      📍 {lang === 'en' ? 'Open in Google Maps' : '在 Google 地图中打开'}
    </a>
  );
}

/* ─── Countdown Widget ─── */
function CountdownWidget({ tripId, lang }: { tripId: TripId; lang: Language }) {
  const daysUntil = getDaysUntilTrip(tripId);
  const daysLeft = getDaysLeftInTrip(tripId);
  
  if (daysUntil === null && daysLeft === null) return null;
  
  let message = '';
  let isActive = false;
  
  if (daysUntil !== null && daysUntil > 0) {
    message = lang === 'en' 
      ? `${daysUntil} day${daysUntil !== 1 ? 's' : ''} until trip`
      : `还有 ${daysUntil} 天出发`;
  } else if (daysLeft !== null && daysLeft >= 0) {
    message = lang === 'en'
      ? `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left in trip`
      : `行程还剩 ${daysLeft} 天`;
    isActive = true;
  } else if (daysUntil !== null && daysUntil <= 0) {
    message = lang === 'en' ? 'Trip has ended' : '行程已结束';
  }
  
  return (
    <div className={`text-center py-2 px-4 rounded-full text-sm font-semibold ${
      isActive 
        ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' 
        : 'bg-amber-100 text-amber-700 border border-amber-300'
    }`}>
      ⏰ {message}
    </div>
  );
}

/* ─── Weather Widget (Simulated) ─── */
function WeatherWidget({ day, lang, onRefresh }: { 
  day: DayData; 
  lang: Language;
  onRefresh?: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Parse location from mapQuery for display
  const location = day.mapQuery.split(',')[0];
  
  // Simulated weather data (in a real app, this would come from an API)
  const mockWeather = {
    tempHigh: 28 + Math.floor(Math.random() * 5),
    tempLow: 22 + Math.floor(Math.random() * 4),
    condition: ['Sunny', 'Partly Cloudy', 'Cloudy'][Math.floor(Math.random() * 3)],
    humidity: 60 + Math.floor(Math.random() * 20),
  };
  
  const icon = weatherIconMap[mockWeather.condition] || '☀️';
  
  return (
    <div className="bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl p-4 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{icon}</span>
          <div>
            <div className="text-2xl font-bold">
              {mockWeather.tempHigh}° / {mockWeather.tempLow}°
            </div>
            <div className="text-sm text-white/90">
              {lang === 'en' ? mockWeather.condition : 
                mockWeather.condition === 'Sunny' ? '晴天' :
                mockWeather.condition === 'Partly Cloudy' ? '多云' : '阴天'}
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white/80 hover:text-white text-sm"
        >
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-white/20 text-sm">
          <div className="flex justify-between">
            <span>{lang === 'en' ? 'Humidity' : '湿度'}: {mockWeather.humidity}%</span>
            <span>{location}</span>
          </div>
          <div className="mt-2 text-xs text-white/70">
            {lang === 'en' 
              ? 'Weather data is simulated for demo purposes' 
              : '天气数据为演示用途'}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Header ─── */
function Header({ 
  lang, 
  setLang, 
  currentTrip, 
  setCurrentTrip,
  onOpenPacking,
}: { 
  lang: Language; 
  setLang: (l: Language) => void;
  currentTrip: TripId;
  setCurrentTrip: (t: TripId) => void;
  onOpenPacking: () => void;
}) {
  const tripData = trips[currentTrip];
  
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-sky-700 to-blue-800 text-white shadow-lg">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌏</span>
            <h1 className="text-lg font-bold leading-tight">
              {lang === 'en' ? 'Travel Itinerary' : '旅行计划'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPacking}
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              title={lang === 'en' ? 'Packing List' : '打包清单'}
            >
              🎒
            </button>
            <div className="flex bg-white/20 rounded-full p-0.5 gap-0.5">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  lang === 'en' ? 'bg-white text-sky-800 shadow' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('zh')}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  lang === 'zh' ? 'bg-white text-sky-800 shadow' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                中文
              </button>
            </div>
          </div>
        </div>
        
        {/* Countdown */}
        <div className="mb-2">
          <CountdownWidget tripId={currentTrip} lang={lang} />
        </div>
        
        {/* Trip Selector */}
        <div className="flex bg-white/10 rounded-lg p-1 gap-1">
          {(Object.keys(trips) as TripId[]).map((tripId) => (
            <button
              key={tripId}
              onClick={() => setCurrentTrip(tripId)}
              className={`flex-1 py-2 px-2 rounded-md text-sm font-medium transition-all ${
                currentTrip === tripId
                  ? 'bg-white text-sky-800 shadow'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {trips[tripId].name[lang]}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ─── Tab Bar ─── */
type TabId = 'itinerary' | 'overview' | 'tips' | 'expenses';
const tabLabels: Record<TabId, Bilingual> = {
  itinerary: { en: '📅 Day by Day', zh: '📅 每日行程' },
  overview: { en: '🗺️ Overview', zh: '🗺️ 概览' },
  tips: { en: '💡 Tips', zh: '💡 贴士' },
  expenses: { en: '💰 Expenses', zh: '💰 费用' },
};

function TabBar({
  activeTab,
  setActiveTab,
  lang,
}: {
  activeTab: TabId;
  setActiveTab: (t: TabId) => void;
  lang: Language;
}) {
  const tabs: TabId[] = ['itinerary', 'overview', 'tips', 'expenses'];
  return (
    <div className="sticky top-[136px] z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-2xl mx-auto flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-2 text-center text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'text-sky-700 border-b-3 border-sky-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tabLabels[tab][lang]}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Parse date for calendar display ─── */
function parseDateForCalendar(dateStr: string, lang: Language): { dayOfWeek: string; dayNum: string; month: string } {
  if (lang === 'en') {
    const cleanStr = dateStr.replace('≈ ', '');
    const match = cleanStr.match(/([A-Za-z]+)\s+(\d+)\s+\(([^)]+)\)/);
    if (match) {
      return {
        month: match[1],
        dayNum: match[2],
        dayOfWeek: match[3],
      };
    }
  } else {
    const cleanStr = dateStr.replace('≈ ', '');
    const match = cleanStr.match(/(\d+)月(\d+)日[（(]([^)）]+)[)）]/);
    if (match) {
      return {
        month: `${match[1]}月`,
        dayNum: match[2],
        dayOfWeek: match[3],
      };
    }
  }
  return { dayOfWeek: '', dayNum: '?', month: '' };
}

/* ─── Region color helper ─── */
function useRegionColors(tripId: TripId) {
  return trips[tripId].regionColors;
}

function rc(regionColors: Record<string, { bg: string; text: string; light: string; border: string; dot: string }>, region: string) {
  return regionColors[region] || regionColors[Object.keys(regionColors)[0]];
}

/* ─── Day Picker (horizontal scroll) ─── */
function DayPicker({
  currentDay,
  setCurrentDay,
  lang,
  days,
  regionColors,
}: {
  currentDay: number;
  setCurrentDay: (d: number) => void;
  lang: Language;
  days: DayData[];
  regionColors: Record<string, { bg: string; text: string; light: string; border: string; dot: string }>;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const btn = el.children[currentDay] as HTMLElement;
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentDay]);

  return (
    <div className="sticky top-[188px] z-30 bg-gray-50 border-b border-gray-200 py-3 px-2">
      <div
        ref={scrollRef}
        className="max-w-2xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide py-1 px-1"
      >
        {days.map((day, idx) => {
          const colors = rc(regionColors, day.region);
          const isActive = idx === currentDay;
          const calendar = parseDateForCalendar(day.date[lang], lang);
          
          return (
            <button
              key={day.day}
              onClick={() => setCurrentDay(idx)}
              className={`flex-shrink-0 flex flex-col items-center justify-center rounded-xl transition-all min-w-[64px] ${
                isActive
                  ? `${colors.bg} text-white shadow-lg scale-105`
                  : 'bg-white text-gray-600 shadow-sm hover:shadow-md border border-gray-200'
              }`}
              style={{ padding: '8px 6px' }}
            >
              <span className={`text-xs font-medium leading-none mb-1 ${isActive ? 'text-white/90' : 'text-gray-500'}`}>
                {calendar.dayOfWeek}
              </span>
              <span className="text-xl font-bold leading-tight">{calendar.dayNum}</span>
              <span className={`text-[10px] leading-none mt-0.5 ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                {calendar.month}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Journal Section ─── */
function JournalSection({ 
  day, 
  lang, 
  journalData,
  onAddEntry,
  onDeleteEntry,
}: { 
  day: number; 
  lang: Language;
  journalData: { entries: { id: string; content: string; type: string; timestamp: number }[] } | undefined;
  onAddEntry: (entry: { content: string; type: 'general' | 'restaurant' | 'warning' | 'gem' }) => void;
  onDeleteEntry: (entryId: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [newEntry, setNewEntry] = useState('');
  const [entryType, setEntryType] = useState<'general' | 'restaurant' | 'warning' | 'gem'>('general');
  
  const entries = journalData?.entries || [];
  
  const typeIcons: Record<string, string> = {
    general: '📝',
    restaurant: '🍜',
    warning: '⚠️',
    gem: '💎',
  };
  
  const typeLabels: Record<string, Bilingual> = {
    general: { en: 'General', zh: '一般' },
    restaurant: { en: 'Restaurant', zh: '餐厅' },
    warning: { en: 'Warning', zh: '注意' },
    gem: { en: 'Hidden Gem', zh: '隐藏宝藏' },
  };
  
  const handleSubmit = () => {
    if (!newEntry.trim()) return;
    onAddEntry({ content: newEntry, type: entryType });
    setNewEntry('');
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100"
      >
        <span className="font-bold text-gray-800 flex items-center gap-2">
          📓 {lang === 'en' ? 'Daily Journal' : '每日日记'}
          {entries.length > 0 && (
            <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
              {entries.length}
            </span>
          )}
        </span>
        <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="p-4 space-y-3">
          {/* Add new entry */}
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              {(['general', 'restaurant', 'warning', 'gem'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setEntryType(type)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    entryType === type
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {typeIcons[type]} {typeLabels[type][lang]}
                </button>
              ))}
            </div>
            <textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder={lang === 'en' 
                ? entryType === 'restaurant' ? 'What did you eat? How was it?' 
                  : entryType === 'warning' ? 'What should others watch out for?'
                  : entryType === 'gem' ? 'What hidden gem did you discover?'
                  : 'Write about your day...'
                : entryType === 'restaurant' ? '你吃了什么？味道如何？'
                  : entryType === 'warning' ? '其他人应该注意什么？'
                  : entryType === 'gem' ? '你发现了什么隐藏宝藏？'
                  : '写下你的一天...'}
              className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
            <button
              onClick={handleSubmit}
              disabled={!newEntry.trim()}
              className="w-full py-2 bg-purple-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 transition-all"
            >
              {lang === 'en' ? 'Add Entry' : '添加记录'}
            </button>
          </div>
          
          {/* Existing entries */}
          {entries.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {[...entries].reverse().map((entry) => (
                <div key={entry.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span>{typeIcons[entry.type]}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="text-red-400 hover:text-red-600 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="mt-1 text-gray-700 whitespace-pre-wrap">{entry.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Expense Section ─── */
function ExpenseSection({ 
  day, 
  lang, 
  expenseData,
  onAddExpense,
  onDeleteExpense,
  tripCurrency,
}: { 
  day: number; 
  lang: Language;
  expenseData: { expenses: { id: string; amount: number; currency: string; category: string; description: string; timestamp: number }[] } | undefined;
  onAddExpense: (expense: { amount: number; currency: string; category: ExpenseCategory; description: string }) => void;
  onDeleteExpense: (expenseId: string) => void;
  tripCurrency: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(tripCurrency);
  const [category, setCategory] = useState<ExpenseCategory>('food');
  const [description, setDescription] = useState('');
  
  const expenses = expenseData?.expenses || [];
  const total = calculateTotalExpenses(expenseData, tripCurrency);
  
  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;
    onAddExpense({ amount: numAmount, currency, category, description });
    setAmount('');
    setDescription('');
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100"
      >
        <span className="font-bold text-gray-800 flex items-center gap-2">
          💰 {lang === 'en' ? 'Expenses' : '费用记录'}
          {expenses.length > 0 && (
            <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
              {currencySymbols[tripCurrency]}{total.toFixed(0)}
            </span>
          )}
        </span>
        <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="p-4 space-y-3">
          {/* Add new expense */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={lang === 'en' ? 'Amount' : '金额'}
                className="flex-1 p-2 border border-gray-200 rounded-lg text-sm"
                min="0"
                step="0.01"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="p-2 border border-gray-200 rounded-lg text-sm"
              >
                {Object.keys(currencySymbols).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm"
            >
              {(Object.keys(expenseCategoryLabels) as ExpenseCategory[]).map((cat) => (
                <option key={cat} value={cat}>{expenseCategoryLabels[cat][lang]}</option>
              ))}
            </select>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={lang === 'en' ? 'Description (optional)' : '描述（可选）'}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm"
            />
            <button
              onClick={handleSubmit}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full py-2 bg-emerald-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition-all"
            >
              {lang === 'en' ? 'Add Expense' : '添加费用'}
            </button>
          </div>
          
          {/* Existing expenses */}
          {expenses.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <div className="text-sm font-semibold text-gray-600">
                {lang === 'en' ? 'Total' : '总计'}: {currencySymbols[tripCurrency]}{total.toFixed(2)}
              </div>
              {[...expenses].reverse().map((expense) => (
                <div key={expense.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span>{expenseCategoryLabels[expense.category as ExpenseCategory]?.[lang]?.split(' ')[0] || '💰'}</span>
                    <div>
                      <div className="font-medium">{currencySymbols[expense.currency]}{expense.amount} {expense.currency}</div>
                      {expense.description && <div className="text-xs text-gray-500">{expense.description}</div>}
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Photo Memories Section ─── */
function PhotoSection({ 
  day, 
  lang, 
  photoData,
  onAddPhoto,
  onDeletePhoto,
}: { 
  day: number; 
  lang: Language;
  photoData: { photos: { id: string; dataUrl: string; caption: string; timestamp: number }[] } | undefined;
  onAddPhoto: (photo: { dataUrl: string; caption: string }) => void;
  onDeletePhoto: (photoId: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const photos = photoData?.photos || [];
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onAddPhoto({ dataUrl, caption });
      setCaption('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100"
      >
        <span className="font-bold text-gray-800 flex items-center gap-2">
          📸 {lang === 'en' ? 'Photo Memories' : '照片回忆'}
          {photos.length > 0 && (
            <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
              {photos.length}
            </span>
          )}
        </span>
        <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="p-4 space-y-3">
          {/* Add photo */}
          <div className="space-y-2">
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder={lang === 'en' ? 'Photo caption (optional)' : '照片说明（可选）'}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-all"
            >
              📷 {lang === 'en' ? 'Add Photo' : '添加照片'}
            </button>
          </div>
          
          {/* Photo gallery */}
          {photos.length > 0 && (
            <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
              {[...photos].reverse().map((photo) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.dataUrl}
                    alt={photo.caption}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-lg truncate">
                      {photo.caption}
                    </div>
                  )}
                  <button
                    onClick={() => onDeletePhoto(photo.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Day Detail View ─── */
function DayDetail({ 
  day, 
  lang, 
  regionColors,
  userData,
  onAddJournal,
  onDeleteJournal,
  onAddExpense,
  onDeleteExpense,
  onAddPhoto,
  onDeletePhoto,
  onToggleVisited,
}: { 
  day: DayData; 
  lang: Language;
  regionColors: Record<string, { bg: string; text: string; light: string; border: string; dot: string }>;
  userData: {
    journals: Record<number, { entries: { id: string; content: string; type: string; timestamp: number }[] }>;
    expenses: Record<number, { expenses: { id: string; amount: number; currency: string; category: string; description: string; timestamp: number }[] }>;
    photos: Record<number, { photos: { id: string; dataUrl: string; caption: string; timestamp: number }[] }>;
    visited: Record<number, { activities: Record<number, boolean> }>;
  };
  onAddJournal: (day: number, entry: { content: string; type: 'general' | 'restaurant' | 'warning' | 'gem' }) => void;
  onDeleteJournal: (day: number, entryId: string) => void;
  onAddExpense: (day: number, expense: { amount: number; currency: string; category: ExpenseCategory; description: string }) => void;
  onDeleteExpense: (day: number, expenseId: string) => void;
  onAddPhoto: (day: number, photo: { dataUrl: string; caption: string }) => void;
  onDeletePhoto: (day: number, photoId: string) => void;
  onToggleVisited: (day: number, activityIndex: number) => void;
}) {
  const colors = rc(regionColors, day.region);
  const visitedActivities = userData.visited[day.day]?.activities || {};
  
  // Determine trip currency based on region
  const tripCurrency = day.region === 'penang' || day.region === 'thailand' ? 'THB' : 'EUR';

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
      {/* Region badge */}
      <div className="flex items-center gap-2">
        <span className={`${colors.dot} w-3 h-3 rounded-full inline-block`}></span>
        <span className={`${colors.text} text-base font-semibold`}>
          {day.regionLabel[lang]}
        </span>
      </div>

      {/* Day header */}
      <div>
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className={`${colors.bg} text-white text-lg font-bold px-3 py-1 rounded-lg`}>
            {lang === 'en' ? `Day ${day.day}` : `第${day.day}天`}
          </span>
          <span className="text-gray-500 text-base font-medium">{day.date[lang]}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mt-2 leading-snug">{day.title[lang]}</h2>
      </div>

      {/* Weather Widget */}
      <WeatherWidget day={day} lang={lang} />

      {/* Journal Section */}
      <JournalSection
        day={day.day}
        lang={lang}
        journalData={userData.journals[day.day]}
        onAddEntry={(entry) => onAddJournal(day.day, entry)}
        onDeleteEntry={(entryId) => onDeleteJournal(day.day, entryId)}
      />

      {/* Expense Section */}
      <ExpenseSection
        day={day.day}
        lang={lang}
        expenseData={userData.expenses[day.day]}
        onAddExpense={(expense) => onAddExpense(day.day, expense)}
        onDeleteExpense={(expenseId) => onDeleteExpense(day.day, expenseId)}
        tripCurrency={tripCurrency}
      />

      {/* Photo Memories */}
      <PhotoSection
        day={day.day}
        lang={lang}
        photoData={userData.photos[day.day]}
        onAddPhoto={(photo) => onAddPhoto(day.day, photo)}
        onDeletePhoto={(photoId) => onDeletePhoto(day.day, photoId)}
      />

      {/* Activities with checkmarks */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-800">
          {lang === 'en' ? '📋 Schedule' : '📋 今日安排'}
        </h3>
        <div className="space-y-2.5">
          {day.activities[lang].map((activity, idx) => {
            const isVisited = visitedActivities[idx] || false;
            return (
              <div
                key={idx}
                onClick={() => onToggleVisited(day.day, idx)}
                className={`bg-white rounded-xl p-4 shadow-sm border-2 cursor-pointer transition-all ${
                  isVisited 
                    ? 'border-emerald-400 bg-emerald-50/50' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isVisited 
                      ? 'bg-emerald-500 border-emerald-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    {isVisited && <span className="text-white text-sm">✓</span>}
                  </div>
                  <span className={`text-base leading-relaxed flex-1 ${isVisited ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                    {activity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accommodation */}
      {day.accommodation && (
        <div className={`${colors.light} rounded-xl p-4 border ${colors.border}`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">🏨</span>
            <div>
              <div className="text-sm text-gray-500 font-medium">
                {lang === 'en' ? 'Accommodation' : '住宿'}
              </div>
              <div className="text-base font-semibold text-gray-800 whitespace-pre-line">
                {day.accommodation[lang]}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map */}
      <div className="pt-2">
        <h3 className="text-lg font-bold text-gray-800 mb-3">
          {lang === 'en' ? '🗺️ Location' : '🗺️ 位置'}
        </h3>
        <MapEmbed query={day.mapQuery} />
        <OpenInMaps query={day.mapQuery} lang={lang} />
      </div>
    </div>
  );
}

/* ─── Day Navigation ─── */
function DayNav({
  currentDay,
  setCurrentDay,
  lang,
  totalDays,
}: {
  currentDay: number;
  setCurrentDay: (d: number) => void;
  lang: Language;
  totalDays: number;
}) {
  const canPrev = currentDay > 0;
  const canNext = currentDay < totalDays - 1;

  return (
    <div className="max-w-2xl mx-auto px-4 pb-6 pt-2 flex gap-3">
      <button
        onClick={() => canPrev && setCurrentDay(currentDay - 1)}
        disabled={!canPrev}
        className={`flex-1 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2 ${
          canPrev
            ? 'bg-gray-100 text-gray-700 shadow-sm active:bg-gray-200 hover:bg-gray-200'
            : 'bg-gray-50 text-gray-300 cursor-not-allowed'
        }`}
      >
        ← {lang === 'en' ? 'Prev' : '上一天'}
      </button>
      <button
        onClick={() => canNext && setCurrentDay(currentDay + 1)}
        disabled={!canNext}
        className={`flex-1 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2 ${
          canNext
            ? 'bg-sky-600 text-white shadow-md active:bg-sky-700 hover:bg-sky-700'
            : 'bg-gray-50 text-gray-300 cursor-not-allowed'
        }`}
      >
        {lang === 'en' ? 'Next' : '下一天'} →
      </button>
    </div>
  );
}

/* ─── Itinerary View ─── */
function ItineraryView({
  lang,
  currentDay,
  setCurrentDay,
  tripId,
  userData,
  onAddJournal,
  onDeleteJournal,
  onAddExpense,
  onDeleteExpense,
  onAddPhoto,
  onDeletePhoto,
  onToggleVisited,
}: {
  lang: Language;
  currentDay: number;
  setCurrentDay: (d: number) => void;
  tripId: TripId;
  userData: {
    journals: Record<number, { entries: { id: string; content: string; type: string; timestamp: number }[] }>;
    expenses: Record<number, { expenses: { id: string; amount: number; currency: string; category: string; description: string; timestamp: number }[] }>;
    photos: Record<number, { photos: { id: string; dataUrl: string; caption: string; timestamp: number }[] }>;
    visited: Record<number, { activities: Record<number, boolean> }>;
  };
  onAddJournal: (day: number, entry: { content: string; type: 'general' | 'restaurant' | 'warning' | 'gem' }) => void;
  onDeleteJournal: (day: number, entryId: string) => void;
  onAddExpense: (day: number, expense: { amount: number; currency: string; category: ExpenseCategory; description: string }) => void;
  onDeleteExpense: (day: number, expenseId: string) => void;
  onAddPhoto: (day: number, photo: { dataUrl: string; caption: string }) => void;
  onDeletePhoto: (day: number, photoId: string) => void;
  onToggleVisited: (day: number, activityIndex: number) => void;
}) {
  const tripData = trips[tripId];
  const day = tripData.days[currentDay];
  const regionColors = tripData.regionColors;
  
  return (
    <div className="bg-gray-50 min-h-[60vh]">
      <DayPicker 
        currentDay={currentDay} 
        setCurrentDay={setCurrentDay} 
        lang={lang} 
        days={tripData.days}
        regionColors={regionColors}
      />
      <DayDetail 
        day={day} 
        lang={lang} 
        regionColors={regionColors}
        userData={userData}
        onAddJournal={onAddJournal}
        onDeleteJournal={onDeleteJournal}
        onAddExpense={onAddExpense}
        onDeleteExpense={onDeleteExpense}
        onAddPhoto={onAddPhoto}
        onDeletePhoto={onDeletePhoto}
        onToggleVisited={onToggleVisited}
      />
      <DayNav 
        currentDay={currentDay} 
        setCurrentDay={setCurrentDay} 
        lang={lang} 
        totalDays={tripData.days.length}
      />
    </div>
  );
}

/* ─── Overview View ─── */
function OverviewView({ lang, tripId }: { lang: Language; tripId: TripId }) {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const tripData = trips[tripId];
  const regionColors = tripData.regionColors;

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-6 bg-gray-50 min-h-[60vh]">
      {/* Trip overview */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {lang === 'en' ? '🌏 Trip Overview' : '🌏 行程概览'}
        </h2>
        <p className="text-base text-gray-600 mb-4">{tripData.overview.duration[lang]}</p>

        <div className="space-y-3">
          {tripData.overview.stays.map((stay, idx) => {
            const colors = rc(regionColors, stay.region);
            return (
              <div key={idx} className={`${colors.light} rounded-xl p-4 border ${colors.border}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`${colors.dot} w-2.5 h-2.5 rounded-full`}></span>
                  <span className={`${colors.text} text-base font-bold`}>
                    {stay.location[lang]}
                  </span>
                </div>
                <div className="text-sm text-gray-600 ml-5">{stay.dates[lang]}</div>
                <div className="text-sm text-gray-800 font-medium ml-5">🏨 {stay.hotel[lang]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activities Guide */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {tripId === 'thailand' 
            ? (lang === 'en' ? '🏝️ Penang Activities Guide' : '🏝️ 槟城活动指南')
            : (lang === 'en' ? '🏛️ Highlights & Activities' : '🏛️ 精华活动指南')
          }
        </h2>
        <p className="text-base text-gray-600 mb-4">
          {tripId === 'thailand'
            ? (lang === 'en'
              ? 'A flexible menu of things to do during your 1 week stay in Penang (Mar 11–17).'
              : '在槟城停留1周期间（3月11–17日）可以自由组合的活动清单。')
            : (lang === 'en'
              ? 'Key highlights and activities for your Croatia & Italy adventure.'
              : '克罗地亚和意大利之旅的精彩亮点和活动。')
          }
        </p>

        <div className="space-y-2">
          {tripData.categories.map((cat, idx) => {
            const categoryColors = tripId === 'thailand' 
              ? 'bg-rose-50 border-rose-100'
              : 'bg-emerald-50 border-emerald-100';
            
            return (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenCategory(openCategory === idx ? null : idx)}
                  className="w-full px-4 py-4 flex items-center justify-between text-left active:bg-gray-50"
                >
                  <span className="text-base font-bold text-gray-800">{cat.title[lang]}</span>
                  <span className="text-xl text-gray-400 transition-transform" style={{
                    transform: openCategory === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}>
                    ▼
                  </span>
                </button>
                {openCategory === idx && (
                  <div className="px-4 pb-4 space-y-2">
                    {cat.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className={`rounded-lg p-3 text-base text-gray-700 border ${categoryColors}`}
                      >
                        • {item[lang]}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Tips View ─── */
function TipsView({ lang, tripId }: { lang: Language; tripId: TripId }) {
  const [openSection, setOpenSection] = useState<number | null>(0);
  const tripData = trips[tripId];

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-3 bg-gray-50 min-h-[60vh]">
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {lang === 'en' ? '💡 Travel Tips' : '💡 旅行贴士'}
      </h2>

      {tripData.tips.map((section, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setOpenSection(openSection === idx ? null : idx)}
            className="w-full px-4 py-4 flex items-center justify-between text-left active:bg-gray-50"
          >
            <span className="text-base font-bold text-gray-800">{section.title[lang]}</span>
            <span className="text-xl text-gray-400 transition-transform" style={{
              transform: openSection === idx ? 'rotate(180deg)' : 'rotate(0deg)',
            }}>
              ▼
            </span>
          </button>
          {openSection === idx && (
            <div className="px-4 pb-4 space-y-2">
              {section.items.map((item, iIdx) => (
                <div
                  key={iIdx}
                  className="bg-sky-50 rounded-lg p-3 text-base text-gray-700 border border-sky-100 leading-relaxed"
                >
                  • {item[lang]}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Expenses Summary View ─── */
function ExpensesView({ lang, tripId, userData }: { 
  lang: Language; 
  tripId: TripId;
  userData: { expenses: Record<number, { expenses: { amount: number; currency: string; category: string; description: string; timestamp: number }[] }> };
}) {
  const tripData = trips[tripId];
  const tripCurrency = tripId === 'thailand' ? 'THB' : 'EUR';
  
  // Aggregate all expenses
  const allExpenses: { day: number; date: string; expenses: { amount: number; currency: string; category: string; description: string }[] }[] = [];
  let grandTotal = 0;
  
  Object.entries(userData.expenses).forEach(([dayNum, dayData]) => {
    if (dayData.expenses.length > 0) {
      const day = parseInt(dayNum, 10);
      const dayInfo = tripData.days.find(d => d.day === day);
      allExpenses.push({
        day,
        date: dayInfo?.date[lang] || `Day ${day}`,
        expenses: dayData.expenses,
      });
      grandTotal += calculateTotalExpenses(dayData, tripCurrency);
    }
  });
  
  // Sort by day
  allExpenses.sort((a, b) => a.day - b.day);
  
  // Category totals
  const categoryTotals: Record<string, number> = {};
  Object.values(userData.expenses).forEach(dayData => {
    dayData.expenses.forEach(expense => {
      const rate = currencyRates[expense.currency] || 1;
      const usdAmount = expense.amount * rate;
      const targetRate = currencyRates[tripCurrency] || 1;
      const amountInTarget = usdAmount / targetRate;
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + amountInTarget;
    });
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 bg-gray-50 min-h-[60vh]">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        💰 {lang === 'en' ? 'Trip Expenses' : '行程费用'}
      </h2>
      
      {/* Grand Total */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 text-white mb-6">
        <div className="text-sm opacity-90">{lang === 'en' ? 'Total Spent' : '总花费'}</div>
        <div className="text-3xl font-bold">{currencySymbols[tripCurrency]}{grandTotal.toFixed(2)}</div>
        <div className="text-sm opacity-75 mt-1">{tripCurrency}</div>
      </div>
      
      {/* Category Breakdown */}
      {Object.keys(categoryTotals).length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-bold text-gray-800 mb-3">
            {lang === 'en' ? 'By Category' : '按类别'}
          </h3>
          <div className="space-y-2">
            {Object.entries(categoryTotals)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, total]) => (
                <div key={cat} className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {expenseCategoryLabels[cat as ExpenseCategory]?.[lang] || cat}
                  </span>
                  <span className="font-semibold">
                    {currencySymbols[tripCurrency]}{total.toFixed(0)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
      
      {/* Daily Breakdown */}
      {allExpenses.length > 0 ? (
        <div className="space-y-4">
          {allExpenses.map(({ day, date, expenses }) => {
            const dayTotal = calculateTotalExpenses({ expenses }, tripCurrency);
            return (
              <div key={day} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-800">
                    {lang === 'en' ? `Day ${day}` : `第${day}天`} · {date}
                  </span>
                  <span className="font-semibold text-emerald-600">
                    {currencySymbols[tripCurrency]}{dayTotal.toFixed(0)}
                  </span>
                </div>
                <div className="space-y-1">
                  {expenses.map((expense, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {expenseCategoryLabels[expense.category as ExpenseCategory]?.[lang]?.split(' ')[0]} {expense.description}
                      </span>
                      <span>{currencySymbols[expense.currency]}{expense.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          {lang === 'en' 
            ? 'No expenses recorded yet. Go to a day and add expenses!'
            : '还没有记录费用。去某一天添加费用吧！'}
        </div>
      )}
    </div>
  );
}

/* ─── Packing Checklist Modal ─── */
function PackingModal({ 
  isOpen, 
  onClose, 
  lang, 
  tripId,
  packingData,
  onInitPacking,
  onToggleItem,
  onAddItem,
  onDeleteItem,
}: { 
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  tripId: TripId;
  packingData: { items: { id: string; name: { en: string; zh: string }; category: string; checked: boolean }[]; lastModified: number } | undefined;
  onInitPacking: (items: { id: string; name: { en: string; zh: string }; category: string; checked: boolean }[]) => void;
  onToggleItem: (itemId: string) => void;
  onAddItem: (name: { en: string; zh: string }, category: string) => void;
  onDeleteItem: (itemId: string) => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<PackingCategory>('clothing');
  
  // Initialize default packing list if empty
  useEffect(() => {
    if (isOpen && (!packingData || packingData.items.length === 0)) {
      const items = defaultPackingItems.map(item => ({
        ...item,
        id: crypto.randomUUID(),
        checked: false,
      }));
      onInitPacking(items);
    }
  }, [isOpen, packingData, onInitPacking]);
  
  if (!isOpen) return null;
  
  const items = packingData?.items || [];
  const checkedCount = items.filter(i => i.checked).length;
  const progress = items.length > 0 ? (checkedCount / items.length) * 100 : 0;
  
  // Group by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);
  
  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    onAddItem({ en: newItemName, zh: newItemName }, newItemCategory);
    setNewItemName('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              🎒 {lang === 'en' ? 'Packing Checklist' : '打包清单'}
            </h2>
            <div className="text-sm text-gray-500 mt-1">
              {checkedCount}/{items.length} {lang === 'en' ? 'packed' : '已打包'} ({Math.round(progress)}%)
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="h-1 bg-gray-200">
          <div 
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Add item form */}
        {showAddForm && (
          <div className="p-4 bg-gray-50 border-b border-gray-200 space-y-2">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={lang === 'en' ? 'Item name' : '物品名称'}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            />
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value as PackingCategory)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            >
              {(Object.keys(packingCategoryLabels) as PackingCategory[]).map((cat) => (
                <option key={cat} value={cat}>{packingCategoryLabels[cat][lang]}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={handleAddItem}
                className="flex-1 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium"
              >
                {lang === 'en' ? 'Add' : '添加'}
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm"
              >
                {lang === 'en' ? 'Cancel' : '取消'}
              </button>
            </div>
          </div>
        )}
        
        {/* Items list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(Object.keys(packingCategoryLabels) as PackingCategory[]).map((category) => {
            const categoryItems = groupedItems[category];
            if (!categoryItems || categoryItems.length === 0) return null;
            
            const categoryChecked = categoryItems.filter(i => i.checked).length;
            
            return (
              <div key={category}>
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center justify-between">
                  {packingCategoryLabels[category][lang]}
                  <span className="text-xs text-gray-500">
                    {categoryChecked}/{categoryItems.length}
                  </span>
                </h3>
                <div className="space-y-1">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg group"
                    >
                      <button
                        onClick={() => onToggleItem(item.id)}
                        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          item.checked
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {item.checked && <span className="text-white text-xs">✓</span>}
                      </button>
                      <span className={`flex-1 ${item.checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                        {item.name[lang]}
                      </span>
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full py-3 bg-sky-500 text-white rounded-xl font-medium hover:bg-sky-600 transition-all"
          >
            + {lang === 'en' ? 'Add Custom Item' : '添加自定义物品'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main App ─── */
export function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [currentTrip, setCurrentTrip] = useState<TripId>('croatia');
  const [currentDay, setCurrentDay] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>('itinerary');
  const [isPackingOpen, setIsPackingOpen] = useState(false);

  const {
    isLoaded,
    data: userData,
    addExpense,
    deleteExpense,
    addJournalEntry,
    deleteJournalEntry,
    addPhoto,
    deletePhoto,
    toggleActivityVisited,
    initPackingList,
    togglePackingItem,
    addPackingItem,
    deletePackingItem,
  } = useLocalStorage(currentTrip);

  // Reset day when switching trips
  const handleSetTrip = useCallback((trip: TripId) => {
    setCurrentTrip(trip);
    setCurrentDay(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSetDay = useCallback((d: number) => {
    setCurrentDay(d);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const tripData = trips[currentTrip];

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-4xl mb-4">🌍</div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <Header 
        lang={lang} 
        setLang={setLang} 
        currentTrip={currentTrip}
        setCurrentTrip={handleSetTrip}
        onOpenPacking={() => setIsPackingOpen(true)}
      />
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />

      {activeTab === 'itinerary' && (
        <ItineraryView 
          lang={lang} 
          currentDay={currentDay} 
          setCurrentDay={handleSetDay}
          tripId={currentTrip}
          userData={userData}
          onAddJournal={addJournalEntry}
          onDeleteJournal={deleteJournalEntry}
          onAddExpense={addExpense}
          onDeleteExpense={deleteExpense}
          onAddPhoto={addPhoto}
          onDeletePhoto={deletePhoto}
          onToggleVisited={toggleActivityVisited}
        />
      )}
      {activeTab === 'overview' && <OverviewView lang={lang} tripId={currentTrip} />}
      {activeTab === 'tips' && <TipsView lang={lang} tripId={currentTrip} />}
      {activeTab === 'expenses' && <ExpensesView lang={lang} tripId={currentTrip} userData={userData} />}

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-400">
        {tripData.footer[lang]}
      </footer>

      {/* Packing List Modal */}
      <PackingModal
        isOpen={isPackingOpen}
        onClose={() => setIsPackingOpen(false)}
        lang={lang}
        tripId={currentTrip}
        packingData={userData.packingList}
        onInitPacking={initPackingList}
        onToggleItem={togglePackingItem}
        onAddItem={addPackingItem}
        onDeleteItem={deletePackingItem}
      />
    </div>
  );
}
