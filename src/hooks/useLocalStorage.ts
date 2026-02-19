import { useState, useEffect, useCallback } from 'react';
import type { AppUserData, UserTripData, TripId } from '../data/types';

const STORAGE_KEY = 'travel-itinerary-data-v1';

const defaultTripData = (): UserTripData => ({
  expenses: {},
  journals: {},
  photos: {},
  visited: {},
  packingList: { items: [], lastModified: Date.now() },
  weather: {},
});

export function useLocalStorage(tripId: TripId) {
  const [data, setData] = useState<AppUserData>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setData(parsed);
      }
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
    }
  }, [data, isLoaded]);

  const getTripData = useCallback((): UserTripData => {
    return data[tripId] || defaultTripData();
  }, [data, tripId]);

  const updateTripData = useCallback((updater: (prev: UserTripData) => UserTripData) => {
    setData(prev => ({
      ...prev,
      [tripId]: updater(getTripData()),
    }));
  }, [tripId, getTripData]);

  // Expense helpers
  const addExpense = useCallback((day: number, expense: { amount: number; currency: string; category: string; description: string }) => {
    updateTripData(prev => {
      const dayExpenses = prev.expenses[day] || { expenses: [] };
      return {
        ...prev,
        expenses: {
          ...prev.expenses,
          [day]: {
            expenses: [...dayExpenses.expenses, {
              id: crypto.randomUUID(),
              ...expense,
              timestamp: Date.now(),
            }],
          },
        },
      };
    });
  }, [updateTripData]);

  const deleteExpense = useCallback((day: number, expenseId: string) => {
    updateTripData(prev => {
      const dayExpenses = prev.expenses[day];
      if (!dayExpenses) return prev;
      return {
        ...prev,
        expenses: {
          ...prev.expenses,
          [day]: {
            expenses: dayExpenses.expenses.filter(e => e.id !== expenseId),
          },
        },
      };
    });
  }, [updateTripData]);

  // Journal helpers
  const addJournalEntry = useCallback((day: number, entry: { content: string; type: 'general' | 'restaurant' | 'warning' | 'gem' }) => {
    updateTripData(prev => {
      const dayJournal = prev.journals[day] || { entries: [] };
      return {
        ...prev,
        journals: {
          ...prev.journals,
          [day]: {
            entries: [...dayJournal.entries, {
              id: crypto.randomUUID(),
              ...entry,
              timestamp: Date.now(),
            }],
          },
        },
      };
    });
  }, [updateTripData]);

  const deleteJournalEntry = useCallback((day: number, entryId: string) => {
    updateTripData(prev => {
      const dayJournal = prev.journals[day];
      if (!dayJournal) return prev;
      return {
        ...prev,
        journals: {
          ...prev.journals,
          [day]: {
            entries: dayJournal.entries.filter(e => e.id !== entryId),
          },
        },
      };
    });
  }, [updateTripData]);

  // Photo helpers
  const addPhoto = useCallback((day: number, photoData: { dataUrl: string; caption: string }) => {
    updateTripData(prev => {
      const dayPhotos = prev.photos[day] || { photos: [] };
      return {
        ...prev,
        photos: {
          ...prev.photos,
          [day]: {
            photos: [...dayPhotos.photos, {
              id: crypto.randomUUID(),
              ...photoData,
              timestamp: Date.now(),
            }],
          },
        },
      };
    });
  }, [updateTripData]);

  const deletePhoto = useCallback((day: number, photoId: string) => {
    updateTripData(prev => {
      const dayPhotos = prev.photos[day];
      if (!dayPhotos) return prev;
      return {
        ...prev,
        photos: {
          ...prev.photos,
          [day]: {
            photos: dayPhotos.photos.filter(p => p.id !== photoId),
          },
        },
      };
    });
  }, [updateTripData]);

  // Visited helpers
  const toggleActivityVisited = useCallback((day: number, activityIndex: number) => {
    updateTripData(prev => {
      const dayVisited = prev.visited[day] || { activities: {} };
      const currentValue = dayVisited.activities[activityIndex] || false;
      return {
        ...prev,
        visited: {
          ...prev.visited,
          [day]: {
            activities: {
              ...dayVisited.activities,
              [activityIndex]: !currentValue,
            },
          },
        },
      };
    });
  }, [updateTripData]);

  // Packing list helpers
  const initPackingList = useCallback((items: { id: string; name: { en: string; zh: string }; category: string; checked: boolean }[]) => {
    updateTripData(prev => ({
      ...prev,
      packingList: {
        items,
        lastModified: Date.now(),
      },
    }));
  }, [updateTripData]);

  const togglePackingItem = useCallback((itemId: string) => {
    updateTripData(prev => ({
      ...prev,
      packingList: {
        ...prev.packingList,
        items: prev.packingList.items.map(item =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        ),
        lastModified: Date.now(),
      },
    }));
  }, [updateTripData]);

  const addPackingItem = useCallback((name: { en: string; zh: string }, category: string) => {
    updateTripData(prev => ({
      ...prev,
      packingList: {
        ...prev.packingList,
        items: [...prev.packingList.items, {
          id: crypto.randomUUID(),
          name,
          category,
          checked: false,
        }],
        lastModified: Date.now(),
      },
    }));
  }, [updateTripData]);

  const deletePackingItem = useCallback((itemId: string) => {
    updateTripData(prev => ({
      ...prev,
      packingList: {
        ...prev.packingList,
        items: prev.packingList.items.filter(item => item.id !== itemId),
        lastModified: Date.now(),
      },
    }));
  }, [updateTripData]);

  // Weather helpers
  const setWeather = useCallback((day: number, weather: { date: string; tempHigh: number; tempLow: number; condition: string; icon: string }) => {
    updateTripData(prev => ({
      ...prev,
      weather: {
        ...prev.weather,
        [day]: {
          weather,
          lastUpdated: Date.now(),
        },
      },
    }));
  }, [updateTripData]);

  return {
    isLoaded,
    data: getTripData(),
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
    setWeather,
  };
}

// Helper to calculate total expenses
export function calculateTotalExpenses(expenses: { expenses: { amount: number; currency: string }[] } | undefined, targetCurrency: string = 'USD'): number {
  if (!expenses || !expenses.expenses.length) return 0;
  
  const { currencyRates } = require('../data/types');
  
  return expenses.expenses.reduce((total, expense) => {
    const rate = currencyRates[expense.currency] || 1;
    const usdAmount = expense.amount * rate;
    // Convert USD to target currency
    const targetRate = currencyRates[targetCurrency] || 1;
    return total + (usdAmount / targetRate);
  }, 0);
}
