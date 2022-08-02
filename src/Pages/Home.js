import React from "react";
import './Home.css'
import Feed from "../Components/Feed";
import Leftbar from "../Components/Leftbar";
import Rightbar from "../Components/Rightbar";
import Topbar from "../Components/Topbar";

export default function HomePage(){
    return(
    <>
        <Topbar/>
        <div className="home-container">
            <Leftbar/>
            <Feed/>
        </div>
        
    </>
    
    )
}