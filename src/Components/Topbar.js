import React,{useContext} from "react";
import {Chat, People, Person, Search, Notifications} from '@mui/icons-material';
import './Topbar.css'
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

export default function Topbar(){
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const PF = "https://social-media-api--nodejs.herokuapp.com/images/"
    const logoutHandler = (e) => {
        localStorage.removeItem("userData")
        window.location.reload()
    }
    return(
        <div className="topbar-container">
            <div className="topbar-left">
                <span className="logo" onClick={(e) => navigate('/')}>Social Media</span>
            </div>
            <div className="topbar-middle">
                <div className="searchbar">
                    <Search className="search-icon"/>
                    <input placeholder="Search for friends/posts/videos" className="search-input"/>
                </div>
            </div>
            <div className="topbar-right">
                <div className="topbar-links">
                    <span className="topbar-link" onClick={(e) => navigate('/')}>Homepage</span>
                    <span className="topbar-link" onClick={(e) => logoutHandler(e)}>Logout</span>
                </div>
                <div className="topbar-icons">
                    <div className="topbar-icon">
                        <Person/>
                        <span className="topbar-icon-badge">1</span>
                    </div>
                    <div className="topbar-icon">
                        <Chat/>
                        <span className="topbar-icon-badge">1</span>
                    </div>
                    <div className="topbar-icon">
                        <Notifications/>
                        <span className="topbar-icon-badge">1</span>
                    </div>
                </div>
                <img src={user.profilePicture?PF+user.profilePicture:PF+"person/noAvatar.png"} alt="prof" className="topbar-img" onClick={(e) => navigate(`/profile/${user.username}`)}></img>
            </div>
        </div>
    )
}