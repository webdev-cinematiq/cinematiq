import React, { useState, useEffect, useMemo } from 'react';

import * as movieClient from '../../../services/movieService';
import * as userClient from '../../../services/userService';
import * as reviewClient from '../../../services/reviewService';

import './index.css'

export default function Admin() {

  const [users, setUsers] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('users');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ action: () => void, message: string } | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [usersRes, reviewsRes, moviesRes] = await Promise.all([
        userClient.fetchAllUsers(),
        reviewClient.findAllReviews(),
        movieClient.fetchAllMovies()
      ]);

      setUsers(usersRes);
      setReviews(reviewsRes);
      setMovies(moviesRes);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateUser = async (updatedUser: any) => {
    try {
      const result = await userClient.updateUser(updatedUser);
      setUsers(users.map(user => user._id === result._id ? result : user));
    } catch (err) {
      setError('Failed to update user. Please try again.');
      console.error('Error updating user:', err);
    }
  }

  const handleReputationKeyPress = (e: any, user: any) => {
    console.log(e.target.value);
    if (e.key === 'Enter') {
      handleUpdateUser({ ...user, reputation: Number(e.target.value) })
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      e.currentTarget.blur();
    }
  };

  const removeUser = async (userId: string) => {
    try {
      await userClient.deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
      setReviews(reviews.filter(review => review.userId !== userId));
    } catch (err) {
      setError('Failed to remove user. Please try again.');
      console.error('Error removing user:', err);
    }
  };

  const removeReview = async (reviewId: string) => {
    try {
      await reviewClient.deleteReview(reviewId);
      setReviews(reviews.filter(review => review._id !== reviewId));
    } catch (err) {
      setError('Failed to remove review. Please try again.');
      console.error('Error removing review:', err);
    }
  };

  // const toggleFeaturedMovie = async (movieId: string) => {
  //   try {
  //     const movie = movies.find(m => m._id === movieId);
  //     if (!movie) return;

  //     const updatedMovie = await axios.patch(`${API_BASE_URL}/movies/${movieId}`, {
  //       featured: !movie.featured
  //     });
  //     setMovies(movies.map(m => m._id === movieId ? updatedMovie.data : m));
  //   } catch (err) {
  //     setError('Failed to update movie. Please try again.');
  //     console.error('Error updating movie:', err);
  //   }
  // };

  const ConfirmationModal = ({ onConfirm, onCancel, message }: { onConfirm: () => void, onCancel: () => void, message: string }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-content">
        <div className="dashboard-column">
          <h2>Users</h2>
          <table className='user-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Reputation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>
                    <select
                      defaultValue={user.role}
                      onChange={(e) => handleUpdateUser({ ...user, role: e.target.value })}
                    >
                      <option value="VIEWER">Viewer</option>
                      <option value="CRITIC">Critic</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </td>
                  <td>
                    <input
                      className="reputation-input"
                      defaultValue={user.reputation}
                      onKeyDown={(e) => handleReputationKeyPress(e, user)}
                    />
                  </td>
                  <td>
                    <button onClick={() => setConfirmAction({
                      action: () => removeUser(user),
                      message: `Are you sure you want to remove ${user.name}?`
                    })}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dashboard-column">
          <h2>Reviews</h2>
          <table className='reviews-table'>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Movie Title</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews?.map(review => (
                <tr key={review._id}>
                  <td>{review.author}</td>
                  <td>{review.movie.title}</td>
                  <td>{review.rating}</td>
                  <td>
                    <button onClick={() => setConfirmAction({
                      action: () => removeReview(review._id),
                      message: 'Are you sure you want to remove this review?'
                    })}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dashboard-column">
          <h2>Movies</h2>
          <table className='movies-table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Featured</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {movies?.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.featured ? 'Yes' : 'No'}</td>
                  {/* <td>
                    <button onClick={() => toggleFeaturedMovie(movie._id)}>
                      {movie.featured ? 'Unfeature' : 'Feature'}
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {confirmAction && (
        <ConfirmationModal
          onConfirm={() => {
            confirmAction.action();
            setConfirmAction(null);
          }}
          onCancel={() => setConfirmAction(null)}
          message={confirmAction.message}
        />
      )}
    </div>
  );
}