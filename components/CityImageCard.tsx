"use client";

import { useState, useEffect } from "react";
import { ExternalLink, AlertCircle } from "lucide-react";

interface CityImageCardProps {
  cityName: string;
}

// Interface for Unsplash Search API response
interface UnsplashSearchResponse {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}

// Interface for Unsplash Photo
interface UnsplashPhoto {
  id: string;
  urls: {
    regular: string;
    small: string;
    full: string;
  };
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
  links: {
    html: string;
  };
  description: string | null;
  alt_description: string | null;
  likes?: number;
  width?: number;
  height?: number;
}

// Intelligent image selection function that scores images based on quality and relevance
function selectBestImage(photos: UnsplashPhoto[], cityName: string): UnsplashPhoto {
  const iconicKeywords = [
    'landmark', 'skyline', 'tower', 'bridge', 'cathedral', 'famous',
    'downtown', 'harbor', 'temple', 'beach', 'castle', 'monument',
    'architecture', 'cityscape', 'panorama', 'aerial', 'view',
    'iconic', 'historic', 'palace', 'square', 'plaza'
  ];
  
  const avoidKeywords = [
    'interior', 'indoor', 'room', 'office', 'restaurant', 'cafe',
    'food', 'person', 'people', 'close-up', 'closeup', 'abstract'
  ];
  
  const scoredPhotos = photos.map(photo => {
    let score = 0;
    const description = ((photo.description || '') + ' ' + (photo.alt_description || '')).toLowerCase();
    
    if (description.includes(cityName.toLowerCase())) score += 60;
    iconicKeywords.forEach(keyword => { if (description.includes(keyword)) score += 15; });
    avoidKeywords.forEach(keyword => { if (description.includes(keyword)) score -= 40; });
    
    if (photo.likes && photo.likes > 100) {
      score += 50;
      if (photo.likes > 500) score += 30;
      if (photo.likes > 1000) score += 20;
    }
    
    score += Math.min(photo.likes ? photo.likes / 50 : 0, 30);
    
    if (photo.width && photo.width > 3000) score += 15;
    if (photo.height && photo.height > 3000) score += 15;
    if (photo.width && photo.width < 1920) score -= 30;
    if (photo.height && photo.height < 1080) score -= 30;
    
    return { photo, score };
  });
  
  scoredPhotos.sort((a, b) => b.score - a.score);
  return scoredPhotos[0].photo;
}

export default function CityImageCard({ cityName }: CityImageCardProps) {
  // State management for image data and loading states
  const [imageData, setImageData] = useState<UnsplashPhoto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch an iconic city photo from Unsplash based on city name
    const fetchCityImage = async () => {
      setIsLoading(true);
      setError(null);
      
      // Get the Unsplash API key from environment variables
      const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
      
      // Check if API key is configured
      if (!accessKey || accessKey === 'your_unsplash_access_key_here') {
        setError('Unsplash API key not configured. Please add your key to .env file.');
        setIsLoading(false);
        return;
      }
      
      try {
        const searchQuery = `${cityName} skyline landmark famous travel`;
        
        // Fetch BOTH landscape and portrait images in parallel
        const [landscapeResponse, portraitResponse] = await Promise.all([
          fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
              searchQuery
            )}&orientation=landscape&per_page=30&order_by=relevant`,
            {
              headers: {
                'Authorization': `Client-ID ${accessKey}`,
                'Accept-Version': 'v1'
              }
            }
          ),
          fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
              searchQuery
            )}&orientation=portrait&per_page=30&order_by=relevant`,
            {
              headers: {
                'Authorization': `Client-ID ${accessKey}`,
                'Accept-Version': 'v1'
              }
            }
          )
        ]);
        
        if (!landscapeResponse.ok || !portraitResponse.ok) {
          throw new Error('Unsplash API error');
        }
        
        const landscapeData: UnsplashSearchResponse = await landscapeResponse.json();
        const portraitData: UnsplashSearchResponse = await portraitResponse.json();
        
        // Combine all results from both orientations
        const allResults = [
          ...(landscapeData.results || []),
          ...(portraitData.results || [])
        ];
        
        if (allResults.length > 0) {
          const bestImage = selectBestImage(allResults, cityName);
          setImageData(bestImage);
          setError(null);
        } else {
          throw new Error('No images found for this city');
        }
        
      } catch (err) {
        console.error('Error fetching city image from Unsplash:', err);
        setError('Failed to load image. Using fallback.');
        
        // Fallback: Beautiful scenic default image
        setImageData({
          id: 'fallback',
          urls: {
            regular: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
            small: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
            full: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
          },
          user: {
            name: 'Unsplash',
            username: 'unsplash',
            links: {
              html: 'https://unsplash.com'
            }
          },
          links: {
            html: 'https://unsplash.com'
          },
          description: 'Beautiful scenic landscape',
          alt_description: 'Scenic mountain landscape'
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Trigger the fetch when cityName changes
    fetchCityImage();
  }, [cityName]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
      {/* Image container - responsive height with graceful cropping for both orientations */}
      <div className="relative h-80 sm:h-96 lg:h-[28rem] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
        
        {/* Loading state: Shimmer animation */}
        {isLoading && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-3"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Loading beautiful photo…</p>
            </div>
          </div>
        )}
        
        {/* Error state: Show error message if image fetch failed */}
        {error && !isLoading && !imageData && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <AlertCircle className="text-red-500 mb-3" size={48} />
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{error}</p>
          </div>
        )}
        
        {/* Image display: Responsive to both portrait and landscape */}
        {!isLoading && imageData && (
          <>
            <img
              src={imageData.urls.regular}
              alt={imageData.alt_description || imageData.description || `${cityName} iconic landmark`}
              className="w-full h-full object-cover object-center transition-opacity duration-500"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop';
              }}
            />
            
            {/* Dark gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            {/* City name overlay at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{cityName}</h3>
              
              {/* Link to explore more photos on Unsplash */}
              <a
                href={`https://unsplash.com/s/photos/${encodeURIComponent(cityName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
              >
                <span>Explore more photos</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </>
        )}
      </div>
      
      {/* Attribution section: Required by Unsplash API guidelines */}
      <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        {!isLoading && imageData && (
          <div className="flex items-center justify-center gap-1 text-xs text-gray-600 dark:text-gray-400">
            <span>Photo by</span>
            {/* Link to photographer's Unsplash profile */}
            <a
              href={`${imageData.user.links.html}?utm_source=weather_dashboard&utm_medium=referral`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              {imageData.user.name}
            </a>
            <span>on</span>
            {/* Link to Unsplash */}
            <a
              href="https://unsplash.com?utm_source=weather_dashboard&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Unsplash
            </a>
          </div>
        )}
        
        {/* Fallback text when no image is loaded */}
        {!imageData && !isLoading && (
          <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
            Discover the beauty and weather of {cityName}
          </p>
        )}
      </div>
    </div>
  );
}
