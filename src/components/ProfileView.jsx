import React, { useState, useEffect } from 'react';
import * as DataInterface from './DataInterface'
import UploadToS3 from './UploadToS3';
import Pool from './UserPool'



function ProfileView() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [communityID, setCommunityID] = useState('');
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isUsernameEditable, setIsUsernameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isCommunityIDEditable, setIsCommunityIDEditable] = useState(false);

  const handleUserUpdate = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      userName: username,
      communityID: communityID,
      image: photoUrl
    }
    // setIsEditable(false);
    setIsUsernameEditable(false);
    setIsEmailEditable(false);
    setIsCommunityIDEditable(false);
    DataInterface.updateUser(userData)
    getUserInfo();
  };

  const getUserInfo = async () => {
    const data = await DataInterface.getUser();
    if (!data) {
      return;
    }
    console.log(data)
    setUsername(data.userName)
    setEmail(data.email)
    // setPhotoUrl("https://burnout-test.s3.us-west-2.amazonaws.com/user123456" );
    // setPhotoUrl("https://burnout-test.s3.us-west-2.amazonaws.com/" + Pool.getCurrentUser().username);
    setCommunityID(data.communityID)
    DataInterface.getUserImage().then((url) => {
      console.log(url);
      setPhotoUrl(url);
    }).catch((error) => {
      console.error('Error uploading file:', error);
    });
  }

const handleUpload = () => {
  const file = document.querySelector('input[type="file"]').files[0];
  DataInterface.uploadUserImage(file).then((snap) => {
    DataInterface.getUserImage().then((url) => {
      console.log(url);
      setPhotoUrl(url);
    }) 
  })
  .catch((error) => {
    console.error('Error uploading file:', error);
  });
};
  
  useEffect(() => {
    getUserInfo()
    // setPhotoUrl("https://burnout-test.s3.us-west-2.amazonaws.com/user1234");

  }, []);

  return (
    <div className="profile p-4 bg-slate-200 h-screen m-auto flex">
      {/*  column with image */}
      <section className='flex w-1/2 flex-col my-auto justify-start'>
        <h2 className="font-bold text-4xl font-saira  text-dark-navy text-center">Change Photo</h2>
        {photoUrl && <img className='m-3 mx-auto w-2/3' src={photoUrl} alt="Profile" /> }
        
        <UploadToS3 />
        <br></br>

      </section>


      {/*  column with details */}
      <section className='flex w-1/2 flex-col my-auto'>
        {/* <h2 className="font-bold text-4xl font-saira text-dark-navy text-center">Your Details</h2> */}
       {/* Details */}

      <h2 className="font-bold text-dark-navy ml-4">Username</h2>
      <div className="flex">
      <input type="text" id="name-input" className="profile-form" placeholder="Enter your full name" value={username} disabled={!isUsernameEditable} onChange={(e) => setUsername(e.target.value)}></input>

      {isUsernameEditable ? (
        <div className="m-auto flex gap-2">
          <button className="name-save font-bold text-white bg-navy rounded-20 py-2 px-4 cursor-pointer" type="save" onClick={handleUserUpdate}>Save</button>
          <button className="name-cancel font-bold text-white bg-navy rounded-20 py-2 px-4 cursor-pointer" type="cancel" onClick={() => setIsUsernameEditable(false)}>Cancel</button>
        </div>
      ) : (
        <div className="m-auto flex gap-2">
        <button className="name-edit font-bold text-white bg-navy rounded-20 py-2 px-4 cursor-pointer" type="edit" onClick={() => setIsUsernameEditable(true)}>Edit</button>
        </div>
      )}

      </div>
      <h2 className="font-bold text-dark-navy ml-4">Email</h2>
      <div className="flex">
      <input type="text" id="email-input" className="profile-form" placeholder="Enter your email" value={email} disabled={!isEmailEditable} onChange={(e) => setEmail(e.target.value)}></input>
      {isEmailEditable ? (
        <div className="m-auto flex gap-2">
          <button className="email-save font-bold text-white bg-navy rounded-20 py-2 px-4 cursor-pointer" type="save" onClick={handleUserUpdate}>Save</button>
          <button className="email-cancel font-bold text-white bg-navy rounded-20 py-2 px-4 cursor-pointer" type="cancel" onClick={() => setIsEmailEditable(false)}>Cancel</button>
        </div>
      ) : (
        <div className="m-auto flex gap-2">
        <button className="email-edit font-bold text-white bg-navy rounded-20 py-2 px-4 cursor-pointer" type="edit" onClick={() => setIsEmailEditable(true)}>Edit</button>
        </div>
      )}
      </div>
      <h2 className="font-bold text-dark-navy ml-4">Community ID</h2>
      <div className="flex">
      <input type="text" id="communityID-input" className="profile-form" placeholder="Enter your community ID" value={communityID} disabled={!isCommunityIDEditable} onChange={(e) => setCommunityID(e.target.value)}></input>
      {isCommunityIDEditable ? (
        <div className="m-auto flex gap-2">
          <button className="communityID-save font-bold text-white bg-navy rounded-20 py-2 px-4 cursor-pointer" type="save" onClick={handleUserUpdate}>Save</button>
          <button className="communityID-cancel font-bold text-white bg-navy rounded-20 py-2 px-4 cursor-pointer" type="cancel" onClick={() => setIsCommunityIDEditable(false)}>Cancel</button>
        </div>
      ) : (
        <div className="m-auto flex gap-2">
        <button className="communityID-edit font-bold text-white bg-navy rounded-20 py-2 px-4 cursor-pointer" type="edit" onClick={() => setIsCommunityIDEditable(true)}>Edit</button>
        </div>
      )}

     </div>
     </section>
     </div>

  )
}

export default ProfileView
