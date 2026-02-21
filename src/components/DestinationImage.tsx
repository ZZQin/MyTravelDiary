import React from 'react';
import { TripId } from '../data/types';
import { destinationImages } from '../data/itinerary';

interface DestinationImageProps {
  tripId: TripId;
  region: string;
  title?: string;
}

export function DestinationImage({ tripId, region, title }: DestinationImageProps) {
  const images = destinationImages[tripId];
  const imageUrl = images?.[region] || images?.[Object.keys(images)[0]];
  
  if (!imageUrl) return null;

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg mb-4">
      <img
        src={imageUrl}
        alt={title || 'Destination'}
        className="w-full h-48 object-cover"
        onError={(e) => {
          // Fallback if image fails to load
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white font-semibold text-lg">{title}</p>
        </div>
      )}
    </div>
  );
}
