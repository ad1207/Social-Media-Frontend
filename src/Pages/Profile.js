import React, { useState, useEffect, useContext } from 'react'
import Feed from "../Components/Feed";
import Leftbar from "../Components/Leftbar";
import Rightbar from "../Components/Rightbar";
import Topbar from "../Components/Topbar";
import './Profile.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Done, Cancel } from '@mui/icons-material';
import { Context } from '../context/Context';

export default function Profile() {
    const PF = "https://social-media-api--nodejs.herokuapp.com/images/"
    const [user, setUser] = useState({})
    const [file,setFile] = useState(null)
    const username = useParams().username
    const {user:currentUser} = useContext(Context)
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`https://social-media-api--nodejs.herokuapp.com/api/user?username=${username}`)
            setUser(res.data)
        }
        fetchUser()
    }, [username])

    const changeHandler = async (e) => {
        e.preventDefault()
        if(file) {
            const data = new FormData()
            const fileName = Date.now() + user.username +file.name;
            data.append("name", fileName)
            data.append("file", file)
            const updatedUser = {
                userId:currentUser._id,
                profilePicture:fileName,
            }
            try{
                await axios.post("https://social-media-api--nodejs.herokuapp.com/api/upload", data)
                const res = await axios.put("https://social-media-api--nodejs.herokuapp.com/api/user/"+currentUser._id,updatedUser)
                localStorage.setItem("userData",JSON.stringify(res.data))
                window.location.reload()
            }catch(err){
                //console.log(err)
            }
        }

    }

    return (
        <>
            <Topbar />
            <div className="profile">
                <Leftbar />
                <div className="profile-right">
                    <div className="profile-right-top">
                        <div className="profile-cover">
                            
                            <img src={user.coverPicture ? PF + user.coverPicture : PF + "person/noCover.jpg"} alt="" className="profile-cover-img" />
                            {(user._id === currentUser._id)?<label htmlFor='profile' className='profile-profilepic'>
                            <input type="file" style={{display:"none"}} id="profile" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])}/>
                            {(file)?
                                    <>
                                    <img src={URL.createObjectURL(file)} alt="" className="profile-user-img" />
                                    <Done className='profile-done' onClick={(e) => changeHandler(e)}/>
                                    <Cancel className='profile-cancel' onClick={() => setFile(null)} />
                                </>:<img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="profile-user-img" />
                            }
                            </label>:<img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="profile-user-img" />}
                        </div>
                        <div className="profile-info">
                            <h4 className='profile-info-name'>{user.username}</h4>
                            <span className='profile-info-desc'>{user.about}</span>
                        </div>
                    </div>
                    <div className="profile-right-bottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>

            </div>

        </>
    )
}
