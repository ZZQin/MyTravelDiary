import { useState, useRef, useEffect, useCallback } from 'react';
import {
  trips,
  type Language,
  type TripId,
  type DayData,
  type Bilingual,
} from './data/itinerary';

/* ─── Region color helper ─── */
function useRegionColors(tripId: TripId) {
  return trips[tripId].regionColors;
}

function rc(regionColors: Record<string, { bg: string; text: string; light: string; border: string; dot: string }>, region: string) {
  return regionColors[region] || regionColors[Object.keys(regionColors)[0]];
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

/* ─── Header ─── */
function Header({ 
  lang, 
  setLang, 
  currentTrip, 
  setCurrentTrip 
}: { 
  lang: Language; 
  setLang: (l: Language) => void;
  currentTrip: TripId;
  setCurrentTrip: (t: TripId) => void;
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
type TabId = 'itinerary' | 'overview' | 'tips';
const tabLabels: Record<TabId, Bilingual> = {
  itinerary: { en: '📅 Day by Day', zh: '📅 每日行程' },
  overview: { en: '🗺️ Overview', zh: '🗺️ 概览' },
  tips: { en: '💡 Tips', zh: '💡 贴士' },
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
  const tabs: TabId[] = ['itinerary', 'overview', 'tips'];
  return (
    <div className="sticky top-[100px] z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-2xl mx-auto flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center text-base font-semibold transition-all ${
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
    // Format: "May 8 (Fri)" or "Feb 27 (Thu)" or "≈ Mar 12 (Thu)"
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
    // Format: "5月8日（周五）" or "2月27日（周四）" or "≈ 3月12日（周四）"
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
    <div className="sticky top-[152px] z-30 bg-gray-50 border-b border-gray-200 py-3 px-2">
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
              {/* Day of week */}
              <span className={`text-xs font-medium leading-none mb-1 ${isActive ? 'text-white/90' : 'text-gray-500'}`}>
                {calendar.dayOfWeek}
              </span>
              {/* Day number */}
              <span className="text-xl font-bold leading-tight">{calendar.dayNum}</span>
              {/* Month */}
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

/* ─── Day Detail View ─── */
function DayDetail({ 
  day, 
  lang, 
  regionColors 
}: { 
  day: DayData; 
  lang: Language;
  regionColors: Record<string, { bg: string; text: string; light: string; border: string; dot: string }>;
}) {
  const colors = rc(regionColors, day.region);

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

      {/* Activities - Now first */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-800">
          {lang === 'en' ? '📋 Schedule' : '📋 今日安排'}
        </h3>
        <div className="space-y-2.5">
          {day.activities[lang].map((activity, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-base leading-relaxed text-gray-800"
            >
              {activity}
            </div>
          ))}
        </div>
      </div>

      {/* Accommodation - Second */}
      {day.accommodation && (
        <div className={`${colors.light} rounded-xl p-4 border ${colors.border}`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">🏨</span>
            <div>
              <div className="text-sm text-gray-500 font-medium">
                {lang === 'en' ? 'Accommodation' : '住宿'}
              </div>
              <div className="text-base font-semibold text-gray-800">
                {day.accommodation[lang]}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map - Third (last) */}
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
}: {
  lang: Language;
  currentDay: number;
  setCurrentDay: (d: number) => void;
  tripId: TripId;
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
      <DayDetail day={day} lang={lang} regionColors={regionColors} />
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
              ? 'A flexible menu of things to do during your 1–2 week stay in Penang.'
              : '在槟城停留1–2周期间可以自由组合的活动清单。')
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

/* ─── Main App ─── */
export function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [currentTrip, setCurrentTrip] = useState<TripId>('croatia');
  const [currentDay, setCurrentDay] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>('itinerary');

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

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <Header 
        lang={lang} 
        setLang={setLang} 
        currentTrip={currentTrip}
        setCurrentTrip={handleSetTrip}
      />
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />

      {activeTab === 'itinerary' && (
        <ItineraryView 
          lang={lang} 
          currentDay={currentDay} 
          setCurrentDay={handleSetDay}
          tripId={currentTrip}
        />
      )}
      {activeTab === 'overview' && <OverviewView lang={lang} tripId={currentTrip} />}
      {activeTab === 'tips' && <TipsView lang={lang} tripId={currentTrip} />}

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-400">
        {tripData.footer[lang]}
      </footer>
    </div>
  );
}
