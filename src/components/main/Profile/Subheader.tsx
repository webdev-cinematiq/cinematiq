import { BsPencil } from 'react-icons/bs'; 
import './Subheader.css'


interface SubheaderProps {
    scrollToSection: (sectionId: string) => void;
  }

export default function Subheader({ scrollToSection }: SubheaderProps) {

    
    return (
        <div className="container sub-header-container">
            <nav className="sub-header-nav ">
                <button className="btn me-2">+ Follow</button>
                

                <a href="#followers" className="nav-link text-light" onClick={() => scrollToSection('followers')}>Followers</a>
                <a href="#following" className="nav-link text-light" onClick={() => scrollToSection('following')}>Following</a>
                <a href="#collections" className="nav-link text-light" onClick={() => scrollToSection('collections')}>Collections</a>
                <a href="#reviews" className="nav-link text-light" onClick={() => scrollToSection('reviews')}>Reviews</a>
                
       
        </nav>
      </div>
    
    );
  }