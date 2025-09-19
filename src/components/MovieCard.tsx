import { Star, Calendar, Clock } from 'lucide-react';
import type { MovieData } from '../interfaces/interfaces';

const MovieCard: React.FC<{ movie: MovieData }> = ({ movie }) => (
  <div className="flex-none w-48 mx-2 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex items-center justify-between text-white text-sm mb-1">
            <span className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
              {movie.rating}
            </span>
            <span className="bg-black/50 px-2 py-1 rounded text-xs">
              {movie.genre}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm mb-2 truncate">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-gray-400 text-xs">
          <span className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {movie.year}
          </span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {movie.duration}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default MovieCard;