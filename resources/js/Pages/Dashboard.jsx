import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import MovieCarousel from '@/Components/MovieCarousel';

const Dashboard = ({ newReleases, trending, myList }) => {
  return (
    <AppLayout>
      <Head title="Dashboard" />
      
      {/* Carrusel de Novedades */}
      <div className="mt-8">
        <MovieCarousel 
          title="Novedades" 
          movies={newReleases} 
        />
      </div>

      {/* Carrusel de Tendencias */}
      <div className="mt-12">
        <MovieCarousel 
          title="Tendencias" 
          movies={trending} 
        />
      </div>

      {/* Carrusel de Mi Lista */}
      <div className="mt-12">
        <MovieCarousel 
          title="Mi Lista" 
          movies={myList} 
        />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
