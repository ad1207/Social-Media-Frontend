import './Feed.css'
import React,{useState,useEffect,useContext} from 'react'
import Share from './Share'
import Post from './Post'
import axios from "axios"
import { Context } from '../context/Context'

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(Context)
  

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username? await axios.get("https://social-media-api--nodejs.herokuapp.com/api/posts/profile/" + username) :await axios.get(`https://social-media-api--nodejs.herokuapp.com/api/posts/timeline/${user._id}`)
      setPosts(res.data.sort((p1,p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }))
    }
    fetchPosts()
  },[username,user._id])
  return (
    <div className='feed'>
        <div className="feed-wrapper">
            {(!username || username === user.username) && <Share/>}
            {posts.map((post) => <Post key={post._id} post={post}/>)}
        </div>
    </div>
  )
}
