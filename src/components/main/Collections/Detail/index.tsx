import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import * as collectionClient from '../../../../services/collectionService';
import { setCollections } from '../reducer';
import './index.css';

const CollectionDetail: React.FC = () => {
  const { name, titleId } = useParams<{ name: string; titleId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const collectionsState = useSelector((state: any) => state.collections);

  const fetchCollections = async () => {
    const collections = await collectionClient.fetchAllCollections();
    dispatch(setCollections(collections));
  };

  useEffect(() => {
    fetchCollections();
  }, [dispatch]);

  const collections = collectionsState.collections;

  const collection =
    collections.find(
      (c: any) => c.titleId === titleId && c.author.name === name
    ) || {};

  if (!collection || !collection.movies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="collection-detail-container">
      {collection.movies[0] && (
        <div
          className="collection-backdrop-container"
          style={{ backgroundImage: `url(${collection.movies[0].backdrop})` }}
        >
          <div className="fade-left"></div>
          <div className="fade-right"></div>
        </div>
      )}
      <div className="horizontal-line"></div>
      <Container>
        <Row className="collection-header">
          <Col>
            <div className="collection-info">
              <h2 className="collection-title">{collection.title}</h2>
              <p className="collection-author">
                <img src={collection.author.avatar} alt="Author avatar" />
                collection by {collection.author.name}
              </p>
              <p className="collection-description">{collection.description}</p>
            </div>
          </Col>
        </Row>
        <Row className="movie-grid">
          {collection.movies.map((movie: any, index: any) => (
            <Col
              key={movie._id}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              className="movie-item"
            >
              <div className="movie-poster-container">
                <Image src={movie.poster} fluid className="movie-poster" />
                <div className="movie-index">{index + 1}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CollectionDetail;
