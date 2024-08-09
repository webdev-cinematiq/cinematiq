import React, { useState, useEffect } from 'react';
import './index.css';
import { useSelector } from 'react-redux';
import * as collectionClient from '../../../../services/collectionService'
import * as reviewClient from '../../../../services/reviewService'
import { Link } from 'react-router-dom';

export default function WelcomeMessage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [recentCollection, setRecentCollection] = useState<any>(null);
  const { currentUser } = useSelector((state: any) => state.accounts);

  useEffect(() => {
    const fetchRecentCollection = async () => {
      try {
        const allCollections = await collectionClient.findCollectionsByAuthor(currentUser.name);
        setCollections(allCollections);

        // Sort collections by 'created' date in descending order
        collections.sort((a: any, b: any) => Date.parse(b.created) - Date.parse(a.created));

        // Set the most recent collection (first in the sorted array)
        if (collections.length > 0) {
          setRecentCollection(collections[0]);
          console.log(recentCollection.title)
        }
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    fetchRecentCollection();
  }, [currentUser.name]);

  return (
    <div className="welcome-container">
      <h1 className="welcome-message">
        Welcome, {currentUser.name}!
      </h1>
      {recentCollection && (
        <div className="recent-collection">
          <h2 className="recent-collection-title">Latest Collection</h2>
          <div className="collection-card">
            <h3 className="collection-title">{recentCollection.title}</h3>
            <p className="collection-description">{recentCollection.description}</p>
            <div className="collection-images">
              {recentCollection.movies?.slice(0, 3).map((movie: any, index: number) => (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}` || '/images/default-poster.jpg'}
                  alt={movie.title}
                  className="collection-image"
                />
              ))}
            </div>
            <Link to={`/${currentUser.name}/collection/${recentCollection.title_id}`} className="view-button-collection">
              View
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};