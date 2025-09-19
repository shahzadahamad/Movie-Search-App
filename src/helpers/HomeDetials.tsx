/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import CategorySection from '../components/CategorySection';
import { AudioLines, Search } from 'lucide-react';
import type { MovieData } from '../interfaces/interfaces';
import getRandomRating from './genarateRating';
import { categories } from '../constants/categories';
import { fetchMoviesBySearch, fetchMoviesDatas } from '../apis/apis';

const HomeDetails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<{ category: string; movies: MovieData[] }[]>([]);
  const [defaultMovies, setDefaultMovies] = useState<{ category: string; movies: MovieData[] }[]>([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [cache, setCache] = useState<Record<string, MovieData[]>>({});


  const fetchMoviesByCategory = async (category: string) => {
    try {
      const data = await fetchMoviesDatas(category);
      if (data.Search) {
        return data.Search.map((movie: any) => ({
          title: movie.Title,
          year: movie.Year,
          imdbID: movie.imdbID,
          poster: movie.Poster,
          rating: getRandomRating(),
        }));
      }
      return [];
    } catch (error) {
      console.error(`Error fetching ${category} movies:`, error);
      return [];
    }
  };

  // Fetch default categories on mount
  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);
      const allMovies = await Promise.all(
        categories.map(async (category) => ({
          category,
          movies: await fetchMoviesByCategory(category),
        }))
      );
      setMovies(allMovies);
      setDefaultMovies(allMovies); // save default categories
      setLoading(false);
    };

    fetchAllCategories();
  }, []);

  // Fetch movies on search query change
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        setMovies(defaultMovies); // restore original categories
        return;
      }

      if (cache[searchQuery]) {
        setMovies([{ category: `Search Results for "${searchQuery}"`, movies: cache[searchQuery] }]);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchMoviesBySearch(searchQuery);
        const searchResults = data.Search
          ? data.Search.map((movie: any) => ({
            title: movie.Title,
            year: movie.Year,
            imdbID: movie.imdbID,
            poster: movie.Poster,
            rating: getRandomRating(),
          }))
          : [];
        setCache((prevCache) => ({
          ...prevCache,
          [searchQuery]: searchResults,
        }));
        setMovies([{ category: `Search Results for "${searchQuery}"`, movies: searchResults }]);
      } catch (error) {
        console.error('Error fetching search movies:', error);
        setMovies([{ category: `Search Results for "${searchQuery}"`, movies: [] }]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSearchResults, 500);
    return () => clearTimeout(debounce);
  }, [searchQuery, defaultMovies, cache]);

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Voice recognition error:", event.error);
      setListening(false);
    };

    recognition.start();
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="relative pt-8 pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Movie Search App
          </h1>
          <p className="text-gray-400">Light, Camera... Search!</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto px-6 relative">
          <Search className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />

          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-4 pl-12 pr-16 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />

          {/* Voice button */}
          <AudioLines
            className={`text-white cursor-pointer absolute right-10 top-1/2 transform -translate-y-1/2 transition-all
    ${listening ? 'animate-pulse text-green-400' : ''}`}
            onClick={handleVoiceSearch}
          />

        </div>

      </div>


      <div className="pb-8">
        {loading ? (
          <p className="text-center text-white">Loading movies...</p>
        ) : (
          movies.map((categoryData, index) => (
            <CategorySection key={index} title={categoryData.category} movies={categoryData.movies} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeDetails;
