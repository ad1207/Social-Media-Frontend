import { MoreVert } from '@mui/icons-material'
import React,{useState,useEffect} from 'react'
import "./Post.css"
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../context/Context'


export default function Post({ post }) {
    const [like,setLike] = useState(post.likes.length)
    const [isLiked,setIsLiked] = useState(false)
    const [user,setUser] = useState({})
    const {user:currentUser} = useContext(Context)
    const likeHandler = () => {
        try{
            axios.put("https://social-media-api--nodejs.herokuapp.com/api/posts/"+post._id+"/like",{userId:currentUser._id})
        }catch(err){
            console.log(err)
        }
        setLike( isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])
    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`https://social-media-api--nodejs.herokuapp.com/api/user?userId=${post.userId}`)
          setUser(res.data)
        }
        fetchUser()
      },[post.userId])
    const navigate = useNavigate()
    const PF = "https://social-media-api--nodejs.herokuapp.com/images/"
    return (
        <div className='post'>
            <div className="post-wrapper">
                <div className="post-top">
                    <div className="post-top-left">
                        <img src={user.profilePicture? PF+user.profilePicture :PF+'/person/noAvatar.png'} alt="pr" className="post-profile-pic" onClick={(e) => navigate(`/profile/${user.username}`)}/>
                        <span className='post-username'>{user.username}</span>
                        <span className='post-lastseen'>{}</span>
                    </div>
                    <div className="post-top-right">
                        <MoreVert />
                    </div>
                </div>
                <div className="post-middle">
                    <span className="post-text">{post?.caption}</span>
                    <img src={PF+post.img} className="post-img" />
                </div>
                <div className="post-bottom">
                    <div className="post-bottom-left">
                        <img src={isLiked?PF+"heart.png":PF+"like.png"} alt="like" className="like-icon" onClick={(e) => likeHandler()}/>
                        <span className='post-like-count'>{like} people liked the post</span>
                    </div>
                    <div className='post-bottom-right'>
                        <span className="post-comment-text">{post.comment} comments</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
