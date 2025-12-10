import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(request: NextRequest) {
  try {
    // Get the city parameter from the URL
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');

    // Validate city parameter
    if (!city) {
      return NextResponse.json(
        { error: 'City parameter is required' },
        { status: 400 }
      );
    }

    // Get the Unsplash API key from environment variables (server-side only)
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    // Check if API key is configured
    if (!accessKey) {
      console.error('Unsplash API key not configured');
      return NextResponse.json(
        { error: 'Unsplash API key not configured' },
        { status: 500 }
      );
    }

    // Build the search query with more specific landmark terms
    const searchQuery = `${city} landmark iconic famous architecture monument`;

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

    // Check if both requests were successful
    if (!landscapeResponse.ok || !portraitResponse.ok) {
      const errorText = await (landscapeResponse.ok ? portraitResponse : landscapeResponse).text();
      console.error('Unsplash API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch images from Unsplash' },
        { status: landscapeResponse.status || portraitResponse.status }
      );
    }

    // Parse the responses
    const landscapeData: UnsplashSearchResponse = await landscapeResponse.json();
    const portraitData: UnsplashSearchResponse = await portraitResponse.json();

    // Combine all results from both orientations
    const allResults = [
      ...(landscapeData.results || []),
      ...(portraitData.results || [])
    ];

    // Check if we got any results
    if (allResults.length === 0) {
      return NextResponse.json(
        { error: 'No images found for this city' },
        { status: 404 }
      );
    }

    // Return the combined results with cache control headers
    return NextResponse.json(
      {
        results: allResults,
        total: landscapeData.total + portraitData.total,
        city
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
        }
      }
    );

  } catch (error) {
    console.error('Error in Unsplash API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
