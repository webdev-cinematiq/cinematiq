import Subheader from "./Subheader";
import './Profile.css'
import { useState } from "react";

export default function Profile() {

  const [isEditing, setIsEditing] = useState(false);


  const user = {
    profilePicture: '/images/judi-dench.jpg', 
    username: 'nanabanana',
    email: 'nanabanana@gmail.com',
    password: 'movieS!10'
  };

  const collections = [
    {
      id: 1,
      title: "Action Classics",
      description: "A collection of all-time great action movies. Packed with thrilling sequences and high-octane stunts.",
      image: "/images/action-classics.jpg",
    },
    {
      id: 2,
      title: "Romantic Favorites",
      description: "Heartwarming love stories and romantic films to bring a smile to your face.",
      image: "/images/romantic-favorites.jpg",
    },
    {
      id: 3,
      title: "Sci-Fi Adventures",
      description: "Explore the universe with a selection of the best science fiction movies.",
      image: "/images/sci-fi-adventures.jpg",
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  
  return (
    <div className="profile-container">

      <Subheader scrollToSection={scrollToSection} toggleEditMode={toggleEditMode} />

      <div  className="profile-header">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        <h2 className="username">{user.username}</h2>
      </div><br/>


      <div id="user-info" className="user-container">
  
         
       
        {!isEditing && (
          <div className="rectangle public-info">
            <div className="row">
              <div className="col">
                <div className="label" >Status</div>
                <div className="value italic" id="profile-status">Critic</div>
              </div>
              <div className="col">
                <div className="label italic">Induction Date</div>
                <div className="value italic" id="profile-induction-date">January 5, 2022</div>
              </div>
            </div>
            <div className="separator"></div>
            <div className="row">
              <div className="col">
                <div className="label">Favorite Film</div>
                <div className="value italic" id="profile-film">Inception</div>
              </div>
              <div className="col">
                <div className="label">Favorite Director</div>
                <div className="value italic" id="profile-director">Christopher Nolan</div>
              </div>
            </div> <br/>
            <div className="row">
              <div className="col">
                <div className="label">Favorite Genre</div>
                <div className="value italic" id="profile-genre">Sci-Fi</div>
              </div>
              <div className="col">
                <div className="label">Favorite Actor</div>
                <div className="value italic" id="profile-actor">Leonardo DiCaprio</div>
              </div>
            </div>
          </div>
        )}

        {isEditing && (
          <div className="rectangle edit-info">
            <div className="edit-reminder-text italic">*denotes a required field</div>
            <div className="row">
              <div className="col">
                <div className="label">Status</div>
                <input type="text" defaultValue="Critic" className="value-input" id="profile-status-edit"/>
              </div>
              <div className="col">
                <div className="label italic">Induction Date</div>
                <input type="date" defaultValue="2022-01-05" className="value-input" id="profile-induction-edit"/>
              </div>
            </div>
            <div className="separator"></div>
            <div className="row">
              <div className="col">
                <div className="label">Favorite Film</div>
                <input type="text" defaultValue="Remember the Titans" className="value-input" id="profile-film-edit"/>
              </div>
              <div className="col">
                <div className="label">Favorite Director</div>
                <input type="text" defaultValue="Christopher Nolan" className="value-input" id="profile-director-edit"/>
              </div>
            </div> <br/>
            <div className="row">
              <div className="col">
                <div className="label">Favorite Genre</div>
                <input type="text" defaultValue="Sci-Fi" className="value-input" id="profile-genre-edit" />
              </div>
              <div className="col">
                <div className="label">Favorite Actor</div>
                <input type="text" defaultValue="Viggo Moretensen" className="value-input" id="profile-actor-edit" />
              </div>
            </div>
            <div className="separator"></div>

            <div className="row">
              <div className="col">
                <div className="label">Username*</div>
                <input type="text" defaultValue={user.username} className="value-input" id="profile-username-edit" />
              </div>
              <div className="col">
                <div className="label">Email*</div>
                <input type="text" defaultValue={user.email} className="value-input" id="profile-email-edit"/>
              </div>
            </div> <br/>

            <div className="row">
              <div className="col">
                <div className="label">Password*</div>
                <input type="text" defaultValue='****' className="value-input" id="profile-password-edit" />
              </div>
              <div className="col">
                <div className="label">Confirm Password*</div>
                <input type="text" defaultValue='' className="value-input" id="profile-confirm-password-edit" />
              </div>
            </div> <br/>



            <button className="save-button" onClick={toggleEditMode}>Save</button>
          </div>



          
        )}
      </div>



      <div id="collections">
        <h2 className="section-header">Collections</h2>

     
        <div className="collections-container">
          {collections.map(collection => (
            <div key={collection.id} className="collection-card">
              {/* <img src={collection.image} alt={collection.title} className="collection-image" /> */}
              <h3 className="collection-title">{collection.title}</h3>
              <p className="collection-description">{collection.description}</p>
            </div>
          ))}
        </div>
      </div>



      <div id="reviews">
        <h2 className="section-header">Reviews</h2><br/><br/><br/><br/>
      </div>


      <div id="followers">
        <h2 className="section-header">Followers</h2><br/><br/><br/><br/>
      </div>


      <div id="following">
        <h2 className="section-header">Following</h2><br/><br/><br/><br/>

      </div>
      
    
    </div>
  );
}
