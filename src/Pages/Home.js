import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Components/Nav/Nav';
import "./Home_style.css";
import { auth } from '../firebase'

function Home() {

    const nav = useNavigate();

   /*  useEffect(()=>{
       if(auth.currentUser.email == "ali913888@gmail.com"){
        nav("/adp");
       } 
       else{
        nav("/");
       }
    },[])
 */

  return (
    <div className="Rider_wrapper">
      <div className='row'>
        <Nav/>
        </div>
      <div className='row'>

        <div className='col-7'/>
        <div className='col-5'>
        <h1>Wellcome {auth.currentUser.email}</h1>
        </div>
        </div>
      
      
    </div>
  )
}

export default Home
