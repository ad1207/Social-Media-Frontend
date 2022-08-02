import React,{useContext,useRef,useState} from 'react'
import "./Share.css"
import { Cancel, EmojiEmotions, Label, PermMedia, Room } from '@mui/icons-material'
import { Context } from '../context/Context'
import axios from 'axios'

export default function Share() {
    const PF = "https://social-media-api--nodejs.herokuapp.com/images/"
    const {user} = useContext(Context)
    const caption = useRef()
    const [file,setFile] = useState(null)
    const shareHandler = async(e) => {
        e.preventDefault()
        const newPost = {
            userId:user._id,
            caption: caption.current.value
        }
        if(file) {
            const data = new FormData()
            const fileName = Date.now() + user.username +file.name;
            data.append("name", fileName)
            data.append("file", file)
            
            newPost.img = fileName;
            try{
                await axios.post("https://social-media-api--nodejs.herokuapp.com/api/upload", data)
            }catch(err){
                //console.log(err)
            }
        }
        try{
            await axios.post("https://social-media-api--nodejs.herokuapp.com/api/posts/",newPost)
            window.location.reload()
        }catch(err){
            //console.log(err)
        }
    }
  return (
    <div className='share'>
        <div className="share-wrapper">
            <div className="share-top">
                <img className='share-profile-pic' alt='prof' src={user.profilePicture?PF+user.profilePicture:PF+'person/noAvatar.png'}></img>
                <input placeholder={"What's on your mind "+user.username+"?"} className='share-input' ref={caption}/>
            </div>
            <hr className='share-hr'></hr>
            {file && (
                <div className="share-img-container">
                    <img src={URL.createObjectURL(file)} alt="" className="share-img" />
                    <Cancel className='share-cancel' onClick={() => setFile(null)}/>
                </div>
            )}
            <form className="share-bottom" onSubmit={(e) => shareHandler(e)}>
                <div className="share-options">
                    <label htmlFor='file' className="share-option">
                        <PermMedia htmlColor='tomato' className='share-option-icon'/>
                        <span className="share-option-text">Video and Images</span>
                        <input type="file" style={{display:"none"}} id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])}/>
                    </label>
                    <div className="share-option">
                        <Label htmlColor='blue' className='share-option-icon'/>
                        <span className="share-option-text">Tag</span>
                    </div>
                    <div className="share-option">
                        <Room htmlColor='green' className='share-option-icon'/>
                        <span className="share-option-text">Location</span>
                    </div>
                    <div className="share-option">
                        <EmojiEmotions htmlColor='yellow' className='share-option-icon'/>
                        <span className="share-option-text">Feelings</span>
                    </div>
                </div>
                <button className='share-button' type='submit'>Share</button>
            </form>
        </div>
    </div>
  )
}
