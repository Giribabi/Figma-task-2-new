import { useEffect, useState } from 'react'
import './Home.css'
import Loader from '../Loader/Loader'
import default_pic from './../../assets/default-pic.png'

function Home(){
    const [usersList, setUserList] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userSelected, setUserSelected] = useState(false)
    const [userProfile, setUserProfile] = useState({})
    const [theme, setTheme] = useState("light")

    function HandleTheme(){
        console.log(theme)
        if(theme==="light")
        setTheme("dark")
        else
        setTheme("light")
    }
    function HandleImage(e){
        e.target.src = default_pic;
    }

    useEffect(()=>{
        async function fetchUsers(){
            try{
                //console.log('loading')
                setLoading(true)
                const response = await fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users')
                const list = await response.json()
                setUserList(usersList=>(list))
                //console.log(list)
            }
            catch(err){
                setError(true)
                console.log(err)
            }
            finally{
                setLoading(false)
                //console.log('loaded')
            }
        }
        fetchUsers()
        //console.log(usersList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[usersList.length])
    return (
        <div className="home-page-container">
            <div className="home-page">
                <div className="heading-container">
                    <div className="heading">
                        ATG Users
                    </div>
                    <div className="mode" onClick={HandleTheme}>
                        {theme==="light"? "🌛" : "☀️"}
                    </div>
                </div>
                {
                    error
                    ?
                    <div className="error-page">
                        Error in fetching data
                        <br/>
                        Check your internet connection!
                    </div>
                    :
                    <div className="users-data-container">
                        {
                            loading
                            ?
                            <Loader/>
                            :
                            <div className="users-container"  style={{backgroundColor: theme==="dark"? "rgb(70, 70, 70)":"rgb(255, 242, 219)"}}>
                                <div className="users-list">
                                {
                                    usersList.map((user, index)=>(
                                        <a href='#selected-user'>
                                            <div
                                            className="user-item"
                                            key={`${index}`}
                                            onClick={()=>{
                                                setUserSelected(true)
                                                setUserProfile(user)
                                            }}
                                            style={{color: theme==="dark"?"white":"black", backgroundColor: theme==="dark"?"black":"white"}}
                                            >
                                            <div className="profile-pic">
                                                <img src={user.avatar} onError={HandleImage} alt='user-profile' height='40px' width='40px' />
                                            </div>
                                            <div className="user-data">
                                                <div className="user-name">
                                                    {user.profile.username}
                                                </div>    
                                                <div className="jobtitle">
                                                    {user.jobTitle}
                                                </div>
                                            </div>    
                                            </div>
                                        </a>
                                    ))
                                }
                                </div>
                                <div className="selected-user" id="selected-user">
                                {
                                    userSelected
                                    ?
                                    <div className="selected-user-profile" >
                                        <div className="selected-user-pic">
                                            <img src={userProfile.avatar} 
                                            onError={HandleImage} 
                                            alt='user-profile' 
                                            height='150px' width='150px'
                                            loading='lazy'
                                            />
                                        </div>
                                        <div className="user-info" style={{color: theme==="dark"?"white":"black", backgroundColor: theme==="dark"?"black":"white"}}>
                                            <div className="selected-user-name">
                                                <b>{"Username: "}</b><div className="info">{userProfile.profile.username}</div>
                                            </div>
                                            <div className="name">
                                                <b>{"Name: "}</b><div className="info">{userProfile.profile.firstName + " " + userProfile.profile.lastName}</div>
                                            </div>
                                            <div className="job">
                                                <b>{"Role: "}</b><div className="info">{userProfile.jobTitle}</div>
                                            </div>
                                            <div className="user-details">
                                                <b>{"About: "}</b><div className="info">{userProfile.Bio}</div>
                                            </div>
                                            <div className="contact">
                                                <b>{"Email: "}</b><div className="info">{userProfile.profile.email}</div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="user-not-selected" style={{color: theme==="dark"?"white":"black", backgroundColor: theme==="dark"?"black":"white"}}>
                                        Click on any user to view their profile
                                    </div>
                                }
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Home