import Subheader from "./Subheader";
import './Profile.css'

export default function Profile() {

  const user = {
    profilePicture: '/images/judi-dench.jpg', 
    username: 'nanabanana'
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="profile-container">

      <Subheader scrollToSection={scrollToSection} />

      <div  className="profile-header">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        <h2 className="username">{user.username}</h2>
      </div><br/>


      <div id="user-info">
        {/* User Info content */}
        User Info <br/><br/><br/><br/>
      </div>
      


      <div id="collections">
        {/* Collections content */}
        Collections<br/><br/><br/><br/>
      </div>
      <div id="reviews">
        {/* Reviews content */}
        Reviews <br/><br/><br/><br/>
      </div>
      <div id="followers">
        {/* Followers content */}
        Followers <br/><br/><br/><br/>
      </div>
      <div id="following">
        {/* Following content */}
        Following<br/><br/><br/><br/>
      </div>
      
    
    </div>
  );
}
