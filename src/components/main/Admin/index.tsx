import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

import * as movieClient from '../../../services/movieService';
import * as userClient from '../../../services/userService';
import * as reviewClient from '../../../services/reviewService';

import './index.css'

type UserRole = 'user' | 'critic' | 'admin';

type User = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
};

type Review = {
  _id: string;
  userId: string;
  movieId: string;
  content: string;
  rating: number;
};

type Movie = {
  _id: string;
  title: string;
  featured: boolean;
};

// Sample data
const sampleUsers: User[] = [
  { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
  { _id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'critic' },
  { _id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
];

const sampleReviews: Review[] = [
  { _id: '1', userId: '2', movieId: '1', content: 'Great movie!', rating: 5 },
  { _id: '2', userId: '1', movieId: '2', content: 'Decent watch', rating: 3 },
  { _id: '3', userId: '2', movieId: '3', content: 'Disappointing', rating: 2 },
];

const sampleMovies: Movie[] = [
  { _id: '1', title: 'The Shawshank Redemption', featured: true },
  { _id: '2', title: 'The Godfather', featured: false },
  { _id: '3', title: 'The Dark Knight', featured: true },
];

export default function Admin() {

  const [users, setUsers] = useState<any[]>(sampleUsers);
  const [reviews, setReviews] = useState<any[]>(sampleReviews);
  const [movies, setMovies] = useState<any[]>(sampleMovies);
  const [activeTab, setActiveTab] = useState('users');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ action: () => void, message: string } | null>(null);

  const getUserName = (userId: string) => {
    const user = users.find(u => u._id === userId);
    return user ? user.name : 'Unknown User';
  };

  const getMovieTitle = (movieId: string) => {
    const movie = movies.find(m => m._id === movieId);
    return movie ? movie.title : 'Unknown Movie';
  };

  const removeUser = (userId: string) => {
    setUsers(users.filter(user => user._id !== userId));
    setReviews(reviews.filter(review => review.userId !== userId));
  };

  const removeReview = (reviewId: string) => {
    setReviews(reviews.filter(review => review._id !== reviewId));
  };

  const changeUserRole = (userId: string, newRole: UserRole) => {
    setUsers(users.map(user =>
      user._id === userId ? { ...user, role: newRole } : user
    ));
  };

  const toggleFeaturedMovie = (movieId: string) => {
    console.log(getMovieTitle(movieId))
    setMovies(movies.map(movie =>
      movie._id === movieId ? { ...movie, featured: !movie.featured } : movie
    ));
  };

  const ConfirmationModal = ({ onConfirm, onCancel, message }: { onConfirm: () => void, onCancel: () => void, message: string }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const [usersRes, reviewsRes, moviesRes] = await Promise.all([
  //       await userClient.fetchAllUsers(),
  //       await reviewClient.findAllReviews(),
  //       await movieClient.fetchAllMovies()
  //     ]);

  //     setUsers(usersRes.data);
  //     setReviews(reviewsRes.data);
  //     setMovies(moviesRes.data);
  //   } catch (err) {
  //     setError('Failed to fetch data. Please try again later.');
  //     console.error('Error fetching data:', err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const removeUser = async (userId: string) => {
  //   try {
  //     await userClient.deleteUser(userId);
  //     setUsers(users.filter(user => user._id !== userId));
  //     setReviews(reviews.filter(review => review.userId !== userId));
  //   } catch (err) {
  //     setError('Failed to remove user. Please try again.');
  //     console.error('Error removing user:', err);
  //   }
  // };

  // const removeReview = async (reviewId: string) => {
  //   try {
  //     await reviewClient.deleteReview(reviewId);
  //     setReviews(reviews.filter(review => review._id !== reviewId));
  //   } catch (err) {
  //     setError('Failed to remove review. Please try again.');
  //     console.error('Error removing review:', err);
  //   }
  // };

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

  // const ConfirmationModal = ({ onConfirm, onCancel, message }: { onConfirm: () => void, onCancel: () => void, message: string }) => (
  //   <div className="modal-overlay">
  //     <div className="modal-content">
  //       <p>{message}</p>
  //       <button onClick={onConfirm}>Confirm</button>
  //       <button onClick={onCancel}>Cancel</button>
  //     </div>
  //   </div>
  // );

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-content">
        <div className="dashboard-column">
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => changeUserRole(user._id, e.target.value as UserRole)}
                    >
                      <option value="user">User</option>
                      <option value="critic">Critic</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => setConfirmAction({
                      action: () => removeUser(user._id),
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
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Movie ID</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(review => (
                <tr key={review._id}>
                  <td>{getUserName(review.userId)}</td>
                  <td>{getMovieTitle(review.movieId)}</td>
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
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Featured</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.featured ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => toggleFeaturedMovie(movie._id)}>
                      {movie.featured ? 'Unfeature' : 'Feature'}
                    </button>
                  </td>
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