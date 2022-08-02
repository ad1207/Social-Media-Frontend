import './Leftbar.css'
import React,{useState, useContext, useEffect} from 'react'
import { Context } from '../context/Context'
import axios from 'axios'
import { Bookmark, Chat, HelpOutline, People, PlayCircle, RssFeed, WorkOutline, Event,School } from '@mui/icons-material'

export default function Leftbar(){
    const [currentFriends , setCurrentFriends] = useState([])
    const {user:currentUser, dispatch} = useContext(Context)

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
    
    return(
        <div className='leftbar'>
            <div className='leftbar-wrapper'>
                <ul className='leftbar-list'>
                    <li className="leftbar-list-item">
                        <RssFeed className='leftbar-list-icon'/>
                        <span className="leftbar-list-text">Feed</span>
                    </li>
                    <li className="leftbar-list-item">
                        <Chat className='leftbar-list-icon'/>
                        <span className="leftbar-list-text">Chat</span>
                    </li>
                    <li className="leftbar-list-item">
                        <PlayCircle className='leftbar-list-icon'/>
                        <span className="leftbar-list-text">Videos</span>
                    </li>
                    <li className="leftbar-list-item">
                        <People className='leftbar-list-icon'/>
                        <span className="leftbar-list-text">Groups</span>
                    </li>
                    <li className="leftbar-list-item">
                        <Bookmark className='leftbar-list-icon'/>
                        <span className="leftbar-list-text">Bookmark</span>
                    </li>
                    <li className="leftbar-list-item">
                        <HelpOutline className='leftbar-list-icon'/>
                        <span className="leftbar-list-text">Questions</span>
                    </li>
                    <li className="leftbar-list-item">
                        <WorkOutline className='leftbar-list-icon'/>
                        <span className="leftbar-list-text">Jobs</span>
                    </li>
                    <li className="leftbar-list-item">
                        <Event className='leftbar-list-icon'/>
                        <span className="leftbar-list-text">Events</span>
                    </li>
                    <li className="leftbar-list-item">
                        <School className='leftbar-list-icon'/>
                        <span className="leftbar-list-text">Courses</span>
                    </li>
                </ul>
                <button className='leftbar-button'>Show more</button>
                <hr className='leftbar-hr'></hr>
                <ul className="leftbar-friend-list">
                    {currentFriends.map(u=>(<Friend key={u.id} user={u}/>))}
                </ul>
            </div>
        </div>
    )
}

function Friend({user}){
    const PF="https://social-media-api--nodejs.herokuapp.com/images/"
    return(
        <li className="leftbar-friend">
            <img src={user.profilePicture?PF+user.profilePicture:PF+'person/noAvatar.png'} alt="fri" className="leftbar-friend-img" />
            <span className="leftbar-friend-name">{user.username}</span>
        </li>
    )
}