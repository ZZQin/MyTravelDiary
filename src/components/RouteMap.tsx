import React from 'react';
import { TripId, TripRoute, Bilingual } from '../data/types';
import { tripRoutes } from '../data/itinerary';

interface RouteMapProps {
  tripId: TripId;
  lang: 'en' | 'zh';
}

export function RouteMap({ tripId, lang }: RouteMapProps) {
  const route = tripRoutes[tripId];
  
  if (!route) return null;

  // Create a static map URL using Google Maps Static API
  // Note: In production, you'd want to use a proper API key
  const waypointsParam = route.waypoints
    .map((wp) => `${wp.lat},${wp.lng}`)
    .join('|');
  
  const mapUrl = `https://maps.google.com/maps?q=${waypointsParam}&t=m&z=6&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="h-80 w-full">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Trip Route"
        />
      </div>
      
      <div className="p-4 bg-gray-50">
        <div className="flex flex-wrap gap-2">
          {route.waypoints.map((wp, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm text-sm"
            >
              <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-bold">
                {wp.day}
              </span>
              <span className="text-gray-700">{wp.name[lang]}</span>
            </div>
          ))}
        </div>      
      </div>
    </div>
  );
}
