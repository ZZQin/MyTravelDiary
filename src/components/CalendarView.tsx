import { useMemo } from 'react';
import { trips, TripData } from '../data/itinerary';
import { Language, TripId } from '../data/types';

interface TripPeriod {
  id: TripId;
  name: string;
  startDate: Date;
  endDate: Date;
  color: string;
  region: string;
}

const tripColors: Record<TripId, string> = {
  thailand: 'bg-blue-500',
  china: 'bg-red-500',
  croatia: 'bg-emerald-500',
};

const tripLightColors: Record<TripId, string> = {
  thailand: 'bg-blue-100',
  china: 'bg-red-100',
  croatia: 'bg-emerald-100',
};

const tripTextColors: Record<TripId, string> = {
  thailand: 'text-blue-700',
  china: 'text-red-700',
  croatia: 'text-emerald-700',
};

function parseTripDates(trip: TripData): { start: Date; end: Date } | null {
  const firstDay = trip.days[0];
  const lastDay = trip.days[trip.days.length - 1];
  
  const year = 2026;
  const monthMap: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  
  const enDate = firstDay.date.en;
  const match = enDate.match(/([A-Za-z]+)\s+(\d+)/);
  if (match) {
    const month = monthMap[match[1]];
    const day = parseInt(match[2], 10);
    const startDate = new Date(year, month, day);
    
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

export function CalendarView({ lang }: { lang: Language }) {
  const tripPeriods = useMemo(() => {
    const periods: TripPeriod[] = [];
    
    (Object.keys(trips) as TripId[]).forEach((tripId) => {
      const trip = trips[tripId];
      const dates = parseTripDates(trip);
      if (dates) {
        periods.push({
          id: tripId,
          name: trip.name[lang],
          startDate: dates.start,
          endDate: dates.end,
          color: tripColors[tripId],
          region: tripId,
        });
      }
    });
    
    return periods.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, [lang]);

  // Get all months that have trips
  const _months = useMemo(() => {
    const monthSet = new Set<string>();
    tripPeriods.forEach((period) => {
      const startMonth = period.startDate.toLocaleString('en-US', { month: 'long' });
      const endMonth = period.endDate.toLocaleString('en-US', { month: 'long' });
      monthSet.add(startMonth);
      if (startMonth !== endMonth) {
        monthSet.add(endMonth);
      }
    });
    return Array.from(monthSet);
  }, [tripPeriods]);

  const monthNames: Record<string, { en: string; zh: string }> = {
    February: { en: 'February', zh: '二月' },
    March: { en: 'March', zh: '三月' },
    April: { en: 'April', zh: '四月' },
    May: { en: 'May', zh: '五月' },
    June: { en: 'June', zh: '六月' },
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {lang === 'en' ? '📅 All Trips Calendar' : '📅 所有行程日历'}
      </h2>

      {/* Trip Legend */}
      <div className="flex flex-wrap gap-3 mb-6">
        {tripPeriods.map((period) => (
          <div key={period.id} className="flex items-center gap-2">
            <span className={`w-4 h-4 rounded-full ${period.color}`}></span>
            <span className="text-sm font-medium text-gray-700">{period.name}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="space-y-4">
        {['February', 'March', 'April', 'May', 'June'].map((month) => {
          const monthTrips = tripPeriods.filter((p) => {
            const startMonth = p.startDate.toLocaleString('en-US', { month: 'long' });
            const endMonth = p.endDate.toLocaleString('en-US', { month: 'long' });
            return startMonth === month || endMonth === month || 
                   (p.startDate.getMonth() < new Date(2026, ['February', 'March', 'April', 'May', 'June'].indexOf(month) + 1, 1).getMonth() && 
                    p.endDate.getMonth() > new Date(2026, ['February', 'March', 'April', 'May', 'June'].indexOf(month) + 1, 1).getMonth());
          });

          if (monthTrips.length === 0) return null;

          return (
            <div key={month} className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 font-semibold text-gray-700">
                {monthNames[month]?.[lang] || month} 2026
              </div>
              <div className="p-3 space-y-2">
                {monthTrips.map((trip) => {
                  const isStart = trip.startDate.toLocaleString('en-US', { month: 'long' }) === month;
                  const isEnd = trip.endDate.toLocaleString('en-US', { month: 'long' }) === month;
                  const startDay = trip.startDate.getDate();
                  const endDay = trip.endDate.getDate();
                  
                  return (
                    <div
                      key={trip.id}
                      className={`${tripLightColors[trip.id]} rounded-lg p-3 border-l-4 ${trip.color.replace('bg-', 'border-')}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${tripTextColors[trip.id]}`}>
                          {trip.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          {isStart && isEnd 
                            ? `${startDay} - ${endDay}`
                            : isStart 
                              ? `${lang === 'en' ? 'From' : '从'} ${startDay}`
                              : isEnd 
                                ? `${lang === 'en' ? 'Until' : '至'} ${endDay}`
                                : `${lang === 'en' ? 'All month' : '整月'}`
                          }
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-sky-600">{tripPeriods.length}</div>
            <div className="text-xs text-gray-500">{lang === 'en' ? 'Trips' : '行程'}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-sky-600">
              {tripPeriods.reduce((total, t) => total + Math.ceil((t.endDate.getTime() - t.startDate.getTime()) / (1000 * 60 * 60 * 24)), 0)}
            </div>
            <div className="text-xs text-gray-500">{lang === 'en' ? 'Days' : '天数'}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-sky-600">
              {new Set(tripPeriods.flatMap(t => [t.startDate.getMonth(), t.endDate.getMonth()])).size}
            </div>
            <div className="text-xs text-gray-500">{lang === 'en' ? 'Months' : '月份'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
