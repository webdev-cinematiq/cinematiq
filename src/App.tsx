import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Home from "./Home";
import Search from './Search';
import Discussion from './Discussions';
import Login from './Login';
import Registration from './Registration';
import Details from "./Details";
import Discussions from "./Discussions";
import CreateDiscussion from "./CreateDiscussion";
import Admin from "./Admin";
import Collections from "./Collections";
import Collection from "./Collection";
import Reviews from "./Reviews";
import Review from "./Review";
import CreateCollection from "./CreateCollection";
import CreateReview from "./CreateReview";

function App() {
  return (
    <HashRouter>
      <div className="h-100">
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="Home" element={<Home />} />
          <Route path="Search" element={<Search />} />
          <Route path="Login" element={<Login />} />
          <Route path="Registration" element={<Registration />} />
          <Route path="Discussions" element={<Discussions />} />
          <Route path="Discussions/:did" element={<Discussion />} />
          <Route path="CreateDiscussion" element={<CreateDiscussion />} />
          <Route path="Details" element={<Details />} />
          <Route path="Admin" element={<Admin />} />
          <Route path="Collections" element={<Collections />} />
          <Route path="Collections/:cid" element={<Collection />} />
          <Route path="CreateCollection" element={<CreateCollection />} />
          <Route path="Reviews" element={<Reviews />} />
          <Route path="Reviews/:rid" element={<Review />} />
          <Route path="CreateReview" element={<CreateReview />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App;
