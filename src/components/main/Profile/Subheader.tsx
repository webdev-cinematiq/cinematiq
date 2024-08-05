
import { BsPencil } from 'react-icons/bs'; 
import './Subheader.css'


interface SubheaderProps {
    scrollToSection: (sectionId: string) => void;
    toggleEditMode: () => void;
  }

export default function Subheader({ scrollToSection, toggleEditMode }: SubheaderProps) {


    
    return (
        <div className="container sub-header-container">
            <nav className="sub-header-nav ">
                <button className="btn follow-button">+ Follow</button>
                

                <a href="#followers" className="nav-link text-light" onClick={() => scrollToSection('followers')}>Followers</a>
                <a href="#following" className="nav-link text-light" onClick={() => scrollToSection('following')}>Following</a>
                <a href="#collections" className="nav-link text-light" onClick={() => scrollToSection('collections')}>Collections</a>
                <a href="#reviews" className="nav-link text-light" onClick={() => scrollToSection('reviews')}>Reviews</a>
                
                <button className="btn edit-button" onClick={toggleEditMode}>
                  <BsPencil />
                </button>
        </nav>
      </div>
    
    );
  }
