import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import * as collectionClient from '../../../../services/collectionService';
import { setCollections } from '../reducer';
import './index.css';

const CollectionDetail = () => {
  const { name, titleId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const collectionsState = useSelector((state: any) => state.collections);

  const fetchCollections = async () => {
    const collections = await collectionClient.fetchAllCollections();
    dispatch(setCollections(collections));
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const collections = collectionsState.collections;

  const collection = collections.find((c: any) => {
    const user = c.author;
    return c.titleId === titleId && user.name === name;
  });

  if (!collection) {
    return <div>Loading...</div>;
  }

  return (
    <div className="collection-detail-container">
      <Image
        src={collection.movies[0].backdrop}
        fluid
        className="collection-backdrop"
      />
      <Container>
        <Row className="collection-header">
          <Col>
            <div className="collection-info">
              <h2 className="collection-title">{collection.title}</h2>
              <p className="collection-author">
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
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="movie-item"
            >
              <div className="movie-poster-container">
                <Image src={movie.poster} fluid className="movie-poster" />
                <div className="movie-index">{index + 1}</div>
              </div>
              <div className="movie-title">
                {movie.title} ({movie.year})
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CollectionDetail;
