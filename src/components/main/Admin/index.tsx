import React, { useState, useEffect, useMemo } from 'react';

import * as movieClient from '../../../services/movieService';
import * as userClient from '../../../services/userService';
import * as reviewClient from '../../../services/reviewService';
import * as adminClient from '../../../services/adminService';

import './index.css'
import { useSelector } from 'react-redux';

export default function Admin() {

  const [users, setUsers] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('users');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ action: () => void, message: string } | null>(null);
  const [adminPermissions, setAdminPermissions] = useState<string[]>([]);

  const { currentUser } = useSelector((state: any) => state.accounts);

  const fetchData = async () => {

    setIsLoading(true);
    setError(null);
    try {
      if (currentUser) {
        const admin = await adminClient.findAdminByUserId(currentUser._id);
        setAdminPermissions(admin.permissions);
      }

      const [usersRes, reviewsRes] = await Promise.all([
        userClient.fetchAllUsers(),
        reviewClient.findAllReviews()
      ]);

      setUsers(usersRes);
      setReviews(reviewsRes);
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
        {adminPermissions.includes('manage_users') && (
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
                {users.map(user => (
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
        )}
        {adminPermissions.includes('manage_content') && (
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
                {reviews.map(review => (
                  <tr key={review._id}>
                    <td>{review.author}</td>
                    <td>{review.movie?.title || 'N/A'}</td>
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
        )}
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