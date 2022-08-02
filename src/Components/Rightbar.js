import React from 'react'
import './Rightbar.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../context/Context'
import {Add, Remove} from '@mui/icons-material'


export default function Rightbar({user}) {
  const PF = "https://social-media-api--nodejs.herokuapp.com/images/"
  const [friends, setFriends] = useState([])
  const navigate = useNavigate()
  const {user:currentUser, dispatch} = useContext(Context)
  const [followed, setFollowed] = useState(currentUser.following.includes(user?user._id:false))
  const [currentFriends , setCurrentFriends] = useState([])

  
  useEffect(() => {
    const getFriends = async () => {
        try{
          console.log(user)
          const friendList = await axios.get(`https://social-media-api--nodejs.herokuapp.com/api/user/friends/${user._id}`)
          setFriends(friendList.data)
        }catch(err){
          console.log(err)
        }
      }
      getFriends()
  },[user])

  useEffect(() => {
    const getCurrentFriends = async () => {
        try{
          const friendList = await axios.get(`https://social-media-api--nodejs.herokuapp.com/api/user/friends/${currentUser._id}`)
          setCurrentFriends(friendList.data)
        }catch(err){
          console.log(err)
        }
      }
      getCurrentFriends()
  },[currentUser])

  
  

  const handleFollow = async () => {
    try{
      if(followed){
        await axios.put("https://social-media-api--nodejs.herokuapp.com/api/user/"+user._id+"/unfollow",{userId:currentUser._id});
        dispatch({type:"UNFOLLOW",payload:user._id})
      }
      else{
        await axios.put("https://social-media-api--nodejs.herokuapp.com/api/user/"+user._id+"/follow",{userId:currentUser._id});
        dispatch({type:"FOLLOW",payload:user._id})  
      }
      setFollowed(!followed)
    }catch(err) {
      console.log(err)
    }
    
  }
  

  

  const ProfileRIghtBar = () => {
    return(
      <>
      {user.username !== currentUser.username && (
        <button className='rightbar-follow-button' onClick={(e) => handleFollow(e)}>
         {followed?"Unfollow":"Follow"}
         {followed?<Remove/>: <Add/>}
        </button>
      )}
      <h4 className='rightbar-title'>User information</h4>
      <div className='rightbar-info'>
        <div className="rightbar-info-item">
          <span className="rightbar-info-key">City:</span>
          <span className='rightbar-info-value'>{user.city}</span>
        </div>
        <div className="rightbar-info-item">
          <span className="rightbar-info-key">From:</span>
          <span className='rightbar-info-value'>{user.from}</span>
        </div>
        <div className="rightbar-info-item">
          <span className="rightbar-info-key">Realtionshionp:</span>
          <span className='rightbar-info-value'>{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : " - "}</span>
        </div>
      </div>
      <h4 className='rightbar-title'>User Friends</h4>
      <div className="rightbar-followings">
        {friends.map((friend) => {
          return(
          <div className="rightbar-following" onClick={(e) => navigate(`/profile/${friend.username}`)}>
          <img src={friend.profilePicture?PF+friend.profilePicture:PF+"person/noAvatar.png"} alt="" className="rightbar-following-img" />
          <span className="rightbar-following-name">{friend.username}</span>
        </div>)
        })}
        
      </div>
      </>
    )
  }
  return (
    <div className='rightbar'>
      <div className="rightbar-wrapper">
       <ProfileRIghtBar/>
      </div>
    </div>
  )
}


function Online({user}){
  const PF="https://social-media-api--nodejs.herokuapp.com/images/"
  return(
    <li className="rightbar-friend">
            <div className="rightbar-profile-pic-container">
              <img src={PF+user.profilePicture} alt="" className="rightbar-profile-pic" />
              <span className="rightbar-online"></span>
            </div>
            <span className="rightbar-username">{user.username}</span>
          </li>
  )
}