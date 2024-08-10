import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/main/Home';
import Search from './components/main/Search';
import Login from './components/main/Account/Login';
import Registration from './components/main/Account/Registration';
import Admin from './components/main/Admin';
import Collections from './components/main/Collections';
import Collection from './components/main/Collections/Detail';
import Review from './components/main/Reviews/Detail';
import Reviews from './components/main/Reviews';
import CreateCollection from './components/main/Collections/Create';
import NavBar from './components/header/NavBar';
import SearchResults from './components/main/Search/Results';
import Film from './components/main/Movies/Detail';
import Films from './components/main/Movies';
import Profile from './components/main/Profile';
import ProfilePublic from './components/main/ProfilePublic';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';

// TODO: make sure /profile/:name shows profile based on params
function App() {
  const { currentUser } = useSelector((state: any) => state.accounts);
  return (
    <HashRouter>
      <div className="h-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="search/:input" element={<SearchResults />} />
          <Route
            path="login"
            element={currentUser ? <Navigate to="/profile" /> : <Login />}
          />
          <Route path="registration" element={<Registration />} />
          <Route path="admin" element={<Admin />} />
          <Route path="collections" element={<Collections />} />
          <Route path=":name/collection/:titleId" element={<Collection />} />
          <Route
            path="collection/create"
            element={
              <ProtectedRoute>
                <CreateCollection />
              </ProtectedRoute>
            }
          />
          <Route path="reviews" element={<Reviews />} />
          <Route path=":name/review/:rid" element={<Review />} />
          <Route path="films" element={<Films />} />
          <Route path="film/details/:tmdbId" element={<Film />} />
          <Route 
            path="profile" 
            element={currentUser ? <Profile /> : <Login />} />
          <Route path="profile/:name" element={<ProfilePublic />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
