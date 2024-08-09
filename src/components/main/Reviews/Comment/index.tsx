import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import * as commentService from '../../../../services/commentService';
import * as adminService from '../../../../services/adminService';
import { useSelector } from 'react-redux';
import './Comment/index.css';

export default function Comment() {
  const [comments, setComments] = useState<any[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [adminAccess, setAdminAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useSelector((state: any) => state.accounts);

  const reviewId = "66ad4b0fb8231d01a212ff01"

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedComments = await commentService.findCommentsByReview(reviewId);

      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError('Failed to load comments. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [reviewId]);

  const canDeleteComments = async () => {
    try {
      const admin = await adminService.findAdminByUserId(currentUser._id)

      if (admin) {
        setAdminAccess(admin.permissions.includes('manage_content'));
      } else {
        return;
      }
    } catch (error) {
      console.error('Error finding admin:', error);
      setError('Failed to find admin Please try again.');
    } finally {
      setIsLoading(false);
    }

  };

  canDeleteComments();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentText.trim() === '') return;

    setIsLoading(true);
    setError(null);
    try {
      const newComment = {
        review: reviewId,
        author: currentUser.name,
        text: newCommentText,
        created: new Date().toISOString()
      };

      const createdComment = await commentService.createComment(newComment);
      setComments([...comments, createdComment]);
      setNewCommentText('');
    } catch (error) {
      console.error('Error creating comment:', error);
      setError('Failed to post comment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!adminAccess) return;

    setIsLoading(true);
    setError(null);
    try {
      await commentService.deleteComment(commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError('Failed to delete comment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && comments.length === 0) return <div>Loading comments...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="comment-section">
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="comment">
            <div className="comment-text">
              <strong>{comment.author}</strong>
              <p>{comment.text}</p>
            </div>
            <div className='Row'>
              <small>{new Date(comment.created).toLocaleString()}</small>
              {adminAccess && (
                <Button
                  size="sm"
                  onClick={() => handleDeleteComment(comment._id)}
                  className="delete-comment-btn"
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))
      )}
      <Form onSubmit={handleSubmitComment}>
        <Form.Group controlId="newComment">
          <Form.Control
            as="textarea"
            rows={3}
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Write a comment..."
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Posting...' : 'Post'}
        </Button>
      </Form>
    </div>
  );
}