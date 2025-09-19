import React from 'react'
import MovieCard from './MovieCard';
import type { MovieData } from '../interfaces/interfaces';

const CategorySection: React.FC<{ title: string, movies: MovieData[] }> = ({ title, movies }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold text-white mb-6 px-6">{title}</h2>
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex px-4 pb-2" style={{ width: 'max-content' }}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  </div>
);


export default CategorySection
