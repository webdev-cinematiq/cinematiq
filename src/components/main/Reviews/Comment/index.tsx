import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as commentService from '../../../../services/commentService';
import { useSelector } from 'react-redux';
import './index.css';

export default function Review() {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useSelector((state: any) => state.accounts);

  const reviewId = "66ad4b0fb8231d01a212ff01"

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedComments = await commentService.findCommentsByReview(reviewId);
      console.log(fetchedComments)
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

  const handleSubmitComment = async () => {
    if (newComment.text.trim() === '') return;

    setIsLoading(true);
    setError(null);
    try {
      console.log(newComment)

      const createdComment = await commentService.createComment(newComment);
      setComments([...comments, createdComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
      setError('Failed to post comment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="comment-section">
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="comment">
            <strong>{comment.author}</strong>
            <p>{comment.text}</p>
            <small>{new Date(comment.created).toLocaleString()}</small>
          </div>
        ))
      )}
      <Form onSubmit={handleSubmitComment}>
        <Form.Group controlId="newComment">
          <Form.Control
            as="textarea"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment({
              ...newComment,
              review: reviewId,
              author: currentUser.name,
              text: e.target.value,
              created: new Date().toISOString()
            })}
            placeholder="Write a comment..."
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Posting...' : 'Post'}
        </Button>
      </Form>
    </div>
  );
};