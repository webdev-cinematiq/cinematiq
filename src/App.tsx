// App.tsx
import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/main/Home';
import Search from './components/main/Search';
import Discussion from './components/main/Discussions/Discussion';
import Login from './components/main/Login';
import Registration from './components/main/Registration';
import Discussions from './components/main/Discussions';
import CreateDiscussion from './components/main/Discussions/CreateDiscussion';
import Admin from './components/main/Admin';
import Collections from './components/main/Collections';
import Collection from './components/main/Collections/Collection';
import Reviews from './components/main/Reviews';
import Review from './components/main/Reviews/Review';
import CreateCollection from './components/main/Collections/CreateCollection';
import CreateReview from './components/main/Reviews/CreateReview';
import NavBar from './components/header/NavBar';
import Movie from './components/main/Movie';
import Profile from './components/main/Profile';

// TODO: add routes for film and TV
function App() {
  return (
    <HashRouter>
      <div className="h-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="search/:mid" element={<Movie />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="discussions" element={<Discussions />} />
          <Route path="discussions/:did" element={<Discussion />} />
          <Route path="discussion/create" element={<CreateDiscussion />} />
          <Route path="admin" element={<Admin />} />
          <Route path="collections" element={<Collections />} />
          <Route path="collections/:cid" element={<Collection />} />
          <Route path="collections/create" element={<CreateCollection />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="reviews/:rid" element={<Review />} />
          <Route path="review/create" element={<CreateReview />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
