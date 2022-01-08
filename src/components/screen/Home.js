import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const Home = ({user}) => {

    let navigate = useNavigate();
    useEffect(()=>{
        let authToken = sessionStorage.getItem('Auth Token')
        if(authToken){
            navigate('/home')
        }
        if(!authToken){
            navigate('/login')
        }
    },[])
    return (
        <div>
            Home Page
            <p>Hello <b>{user && user.email}</b></p>
        </div>
    );

};

export default Home;